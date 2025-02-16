<script>
    //@ts-nocheck
    import { page } from "$app/stores";
    import { toast } from "svelte-sonner";
    import { invalidateAll, goto } from "$app/navigation";
    import { enhance } from "$app/forms";
    import {
        useEventService,
        currentlyOpen,
        uploadCompressImage,
    } from "$lib/utils";
    import { storageRestaurantUrl, days } from "$lib/constant";
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        CardFooter,
    } from "$lib/components/ui/card";
    import * as Table from "$lib/components/ui/table/index.js";
    import { Label } from "$lib/components/ui/label";
    import { Switch } from "$lib/components/ui/switch";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import * as Alert from "$lib/components/ui/alert";
    import {
        Select,
        SelectTrigger,
        SelectValue,
        SelectContent,
        SelectGroup,
        SelectLabel,
        SelectItem,
    } from "$lib/components/ui/select";
    import { Button } from "$lib/components/ui/button";
    import * as Accordion from "$lib/components/ui/accordion";

    import OperationTimeRangePicker from "../(components)/operation-time-range-picker.svelte";
    import PeakHoursPicker from "../(components)/peak-hours-picker.svelte";
    import AdvancedTelInput from "$lib/components/reusable/AdvancedTelInput.svelte";
    import CardPreview from "../(components)/card-preview.svelte";

    import LeafletMap from "$lib/components/reusable/LeafletMap.svelte";

    import {
        Upload,
        Store,
        Clock,
        MapPin,
        LoaderCircle,
        CircleAlert,
        Camera,
    } from "lucide-svelte";

    export let data;

    $: ({ myStore, recentProducts } = data);

    $: storeState = myStore ?? {
        name: "",
        description: "",
        address: "",
        location: {
            lat: null,
            long: null,
        },
        rating: 0,
        followers: 0,
        operation_time: {
            monday: {
                open: true,
                opening: null,
                closing: null,
            },
            tuesday: {
                open: true,
                opening: null,
                closing: null,
            },
            wednesday: {
                open: true,
                opening: null,
                closing: null,
            },
            thursday: {
                open: true,
                opening: null,
                closing: null,
            },
            friday: {
                open: true,
                opening: null,
                closing: null,
            },
            saturday: {
                open: true,
                opening: null,
                closing: null,
            },
            sunday: {
                open: true,
                opening: null,
                closing: null,
            },
        },
        website: "",
        phone: "",
        email: "",
        is_open_today: true,
        image: null,
        peak_hours: {
            monday: {
                from: null,
                to: null,
            },
            tuesday: {
                from: null,
                to: null,
            },
            wednesday: {
                from: null,
                to: null,
            },
            thursday: {
                from: null,
                to: null,
            },
            friday: {
                from: null,
                to: null,
            },
            saturday: {
                from: null,
                to: null,
            },
            sunday: {
                from: null,
                to: null,
            },
        },
    };

    let isLoading = false;
    let isActivating = false;

    let fileUpload;
    let uploadedImage = null;
    let uploadingImage = false;
    let uploadImageError = {};

    const handleImageUpload = async (event) => {
        uploadingImage = true;
        const uniqueDate = `${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`;
        const tempFile = event.target.files[0];
        const file = await uploadCompressImage(tempFile);
        uploadedImage = storeState.image;
        const { data, error } = await $page.data.supabase.storage
            .from("restaurant-images")
            .upload(
                `public/${storeState.name}${file.name}${uniqueDate}.png`,
                file,
                {
                    cacheControl: "3600",
                    upsert: false,
                },
            );

        if (error) {
            console.error("UPload image error", error);
            uploadImageError.title = "Image Upload Failed!";
            uploadImageError.desc = error.message;
            toast.error("Image Upload Failed!", {
                description: error.message,
            });
            uploadedImage = null;
            uploadingImage = false;
            uploadImageError.error = true;
            uploadImageError.title = "Image Upload Failed!";
            uploadImageError.desc = error.message;
        } else {
            storeState.image = data.path;
            uploadingImage = false;
            uploadedImage = null;
            uploadImageError = {};
        }
    };

    const formData = (obj) => {
        var form_data = new FormData();
        for (var key in obj) {
            form_data.append(key, obj[key]);
        }
        return form_data;
    };

    const onAddStoreHandler = async (event) => {
        isLoading = true;
        try {
            const result = await useEventService(
                storeState,
                `${$page.url.href}?/addStore`,
            );
        } catch (error) {
            console.error("ERROR ADD STORE", error);
        }
        isLoading = false;
    };

    const onUpdateStoreHandler = async (event) => {
        isLoading = true;
        try {
            const result = await useEventService(
                storeState,
                `${$page.url.href}?/updateStore`,
            );
        } catch (error) {
            console.error("ERROR ADD STORE", error);
        }
        isLoading = false;
        toast.success(`${storeState.name} has been updated`);
    };

    const updateOpenCloseHandler = async (value) => {
        isLoading = true;
        const result = await useEventService(
            {
                id: storeState.id,
                is_open_today: value,
            },
            `${$page.url.href}?/updateOpenClose`,
        );
        isLoading = false;
    };

    const storeActivationHandler = async (value) => {
        isActivating = true;
        const result = await useEventService(
            {
                id: storeState.id,
                is_active: value,
            },
            `${$page.url.href}?/updateActivation`,
        );
        isActivating = false;
    };

    $: openAndClosing = () => {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();

        if (
            !storeState?.operation_time?.[days[currentDay - 1]]?.opening &&
            !storeState?.operation_time?.[days[currentDay - 1]]?.closing
        ) {
            return {
                isOpen: false,
                closing: null,
            };
        }

        const opening =
            storeState?.operation_time[days[currentDay - 1]]?.opening;
        const closing =
            storeState?.operation_time[days[currentDay - 1]]?.closing;

        return {
            isOpen: currentlyOpen(opening, closing),
            closing,
        };
    };

    $: disabled = isLoading || isActivating;
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
    <div class="w-full col-span-3 lg:col-span-2 order-2 lg:order-1">
        {#if storeState?.id && !storeState.is_active}
            <Alert.Root variant="destructive" class="mb-4">
                <CircleAlert class="h-4 w-4" />
                <Alert.Title>Deactivated</Alert.Title>
                <Alert.Description>
                    Your store is deactivated and not visible to all customer's
                    application.
                </Alert.Description>
            </Alert.Root>
        {/if}
        <Card class="w-full">
            <form use:enhance method="POST">
                <CardHeader>
                    <div class="flex justify-between">
                        <div class="flex flex-col space-y-2">
                            <CardTitle>Manage Store</CardTitle>
                            <CardDescription
                                >Fill out the form to add details on your store.</CardDescription
                            >
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form class="grid gap-6">
                        <div class="grid gap-2">
                            <Label htmlFor="name">Store Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter product name"
                                bind:value={storeState.name}
                                {disabled}
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label htmlFor="description"
                                >Store Description</Label
                            >
                            <Textarea
                                id="description"
                                placeholder="Enter product description"
                                class="min-h-[120px]"
                                bind:value={storeState.description}
                                {disabled}
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label htmlFor="name">Store Address</Label>
                            <Input
                                id="name"
                                placeholder="Enter product name"
                                bind:value={storeState.address}
                                {disabled}
                            />
                        </div>
                        <div class="grid gap-2 pt-4">
                            <Label htmlFor="name">Phone</Label>
                            <AdvancedTelInput bind:value={storeState.phone} />
                        </div>
                        <div class="grid gap-2">
                            <Label htmlFor="name">Website</Label>
                            <Input
                                id="website"
                                name="website"
                                placeholder="Enter Website"
                                bind:value={storeState.website}
                                {disabled}
                            />
                        </div>
                        <div class="grid gap-2">
                            <Accordion.Root class="w-full" value="item-1">
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger>
                                        <Label htmlFor="name"
                                            >Operation Time</Label
                                        >
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                        <OperationTimeRangePicker
                                            bind:value={storeState.operation_time}
                                        />
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                        </div>
                        <div class="grid gap-2">
                            <Accordion.Root class="w-full" value="item-1">
                                <Accordion.Item value="item-1">
                                    <Accordion.Trigger>
                                        <Label htmlFor="name">Peak Hours</Label>
                                    </Accordion.Trigger>
                                    <Accordion.Content>
                                        <PeakHoursPicker
                                            operationTime={storeState.operation_time}
                                            bind:value={storeState.peak_hours}
                                        />
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                        </div>
                        <Input
                            id="image"
                            class="hidden"
                            type="file"
                            on:change={handleImageUpload}
                        />
                    </form>
                    <div class="p-0">
                        <h1 class="font-semibold mt-5 mb-3">
                            Set up your store location
                        </h1>
                        <LeafletMap
                            store={storeState}
                            bind:value={storeState.location}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <div class="flex justify-end w-full">
                        {#if storeState?.id}
                            <Button
                                class="ml-1"
                                type="submit"
                                disabled={isLoading || isActivating}
                                on:click={onUpdateStoreHandler}
                            >
                                {#if isLoading}
                                    <LoaderCircle
                                        color="#ffffff"
                                        class="animate-spin mr-2"
                                    />
                                {/if}
                                Save Changes
                            </Button>
                        {:else}
                            <Button
                                class="ml-1"
                                type="submit"
                                disabled={isLoading || isActivating}
                                on:click={onAddStoreHandler}
                            >
                                {#if isLoading}
                                    <LoaderCircle
                                        color="#ffffff"
                                        class="animate-spin mr-2"
                                    />
                                {/if}
                                Submit
                            </Button>
                        {/if}
                    </div>
                </CardFooter>
            </form>
        </Card>
    </div>

    <div
        class="relative lg:sticky mt-3 lg:mt-0 top-0 col-span-3 lg:col-span-1 order-1 lg:order-2"
        class:lg:top-[70px]={uploadImageError.error}
        class:lg:top-[100px]={!uploadImageError.error}
        style="align-self: flex-start"
    >
        {#if uploadImageError?.error}
            <Alert.Root variant="destructive" class="mb-9">
                <CircleAlert class="h-4 w-4" />
                <Alert.Title>{uploadImageError.title}</Alert.Title>
                <Alert.Description>{uploadImageError.desc}.</Alert.Description>
            </Alert.Root>
        {/if}
        <CardPreview
            data={storeState}
            {uploadedImage}
            bucket="store"
            loading={uploadingImage}
            on:cameraClick={() => document.getElementById("image").click()}
        >
            <svelte:fragment slot="body">
                <div class="flex justify-between mb-4">
                    <h1 class="text-2xl font-semibold">
                        {storeState?.name || "Store Name"}
                    </h1>
                    <span>4.3 (127)</span>
                </div>
                <div class="flex space-x-2 items-center">
                    <Store class="w-4 h-4" />
                    <span class="text-sm">Coffee Shop</span>
                </div>
                <div class="flex space-x-2 items-center">
                    <Clock class="w-4 h-4" />
                    <p class="text-sm">
                        <span class="text-green-800"
                            >{openAndClosing().isOpen ? "Open" : "Closed"}
                        </span>
                        {#if openAndClosing()?.closing}
                            <span>
                                ⋅ Closes {openAndClosing().closing}
                            </span>
                        {/if}
                    </p>
                </div>
                <div class="flex space-x-2 items-center">
                    <MapPin class="w-4 h-4" />
                    <span class="text-sm"
                        >{storeState?.address ?? "No Store Address"}</span
                    >
                </div>
                <div class="py-3 text-sm font-thin">
                    {storeState.description ?? "No Description"}
                </div>
            </svelte:fragment>
        </CardPreview>
    </div>
</div>
<Card class="w-full mt-6">
    <CardHeader>
        <div class="flex justify-between">
            <CardTitle>Recent Products</CardTitle>
            <Button on:click={() => goto("/store.products")}>Show All</Button>
        </div>
    </CardHeader>
    <CardContent>
        <Table.Root>
            <Table.Caption
                >{recentProducts.length > 0
                    ? "A list of your recently added products."
                    : "No added products yet"}
            </Table.Caption>
            <Table.Header>
                <Table.Row>
                    <Table.Head class="w-[100px]">Status</Table.Head>
                    <Table.Head>Name</Table.Head>
                    <Table.Head>Category</Table.Head>
                    <Table.Head>Variants</Table.Head>
                    <Table.Head class="text-right">Price</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {#each recentProducts as product, i (i)}
                    <Table.Row>
                        <Table.Cell class="font-medium"
                            >{product.is_available
                                ? "Available"
                                : "Unavailable"}</Table.Cell
                        >
                        <Table.Cell class="font-medium"
                            >{product.name}</Table.Cell
                        >
                        <Table.Cell>
                            <div class="flex flex-row space-x-2">
                                {#each product?.category ?? [] as category}
                                    <span
                                        class="bg-primary text-white text-xs w-auto px-2 py-0.5 rounded-full"
                                        >{category}</span
                                    >
                                {/each}
                            </div>
                        </Table.Cell>
                        <Table.Cell>
                            <div class="flex flex-row space-x-6">
                                {#each product?.variants ?? [] as variant}
                                    <div class="flex flex-col">
                                        <span class="text-xs mb-1 -mt-4"
                                            >{variant?.name}:</span
                                        >
                                        <div class="flex flex-row space-x-1">
                                            {#each variant?.values ?? [] as value}
                                                <span
                                                    class="bg-primary text-white text-xs w-auto px-2 py-0.5 rounded-full"
                                                    >{value.name}</span
                                                >
                                            {/each}
                                        </div>
                                    </div>
                                {/each}
                            </div>
                        </Table.Cell>
                        <Table.Cell class="text-right"
                            >₱{product.price.toFixed(2)}</Table.Cell
                        >
                    </Table.Row>
                {/each}
            </Table.Body>
        </Table.Root>
    </CardContent>
</Card>
<Card class="w-full mt-6">
    <CardHeader>
        <CardTitle>Store Activation</CardTitle>
        <CardDescription
            >Your store is not visible to the customer's application if
            deactivated.</CardDescription
        >
    </CardHeader>
    <CardContent>
        {#if storeState.is_active}
            <Button
                variant="destructive"
                on:click={() => storeActivationHandler(false)}
                disabled={isLoading || isActivating}
            >
                {#if isActivating}
                    <LoaderCircle color="#ffffff" class="animate-spin mr-2" />
                {/if}
                Deactivate Store
            </Button>
        {:else}
            <Button
                on:click={() => storeActivationHandler(true)}
                disabled={isLoading || isActivating}
            >
                {#if isActivating}
                    <LoaderCircle color="#ffffff" class="animate-spin mr-2" />
                {/if}
                Activate Store
            </Button>
        {/if}
    </CardContent>
</Card>

<div
    class="fixed bottom-0 right-0 md:bottom-5 md:right-5 w-full md:w-auto flex items-center space-x-4 bg-white p-3 md:rounded-full shadow-lg md:shadow-md border border-gray"
>
    {#if isLoading}
        <LoaderCircle color="#000000" class="animate-spin" />
    {:else}
        <Switch
            id="open-store"
            bind:checked={storeState.is_open_today}
            onCheckedChange={(e) => updateOpenCloseHandler(e)}
        />
    {/if}
    <Label for="open-store"
        >{storeState.is_open_today ? "OPEN" : "CLOSE"} TODAY</Label
    >
</div>
