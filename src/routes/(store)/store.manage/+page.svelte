<script>
    //@ts-nocheck
    import { page } from "$app/stores";
    import { toast } from "svelte-sonner";
    import { invalidateAll } from "$app/navigation";
    import { enhance, applyAction, deserialize } from "$app/forms";
    import { useEventService, currentlyOpen } from "$lib/utils";
    import { storageRestaurantUrl, days } from "$lib/constant";
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
        CardFooter,
    } from "$lib/components/ui/card";
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

    import {
        Upload,
        Store,
        Clock,
        MapPin,
        LoaderCircle,
        CircleAlert,
    } from "lucide-svelte";

    export let data;

    $: ({ myStore } = data);

    $: storeState = myStore ?? {
        name: "",
        description: "",
        address: "",
        location: {},
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

    let uploadedImage = null;

    const handleImageUpload = async (event) => {
        const uniqueDate = `${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`;
        const file = event.target.files[0];
        uploadedImage = URL.createObjectURL(file);
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
        } else {
            storeState.image = data.path;
        }

        uploadedImage = null;
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
        isLoading = true;
        const result = await useEventService(
            {
                id: storeState.id,
                is_active: value,
            },
            `${$page.url.href}?/updateActivation`,
        );
        isLoading = false;
    };

    $: openAndClosing = () => {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();
        const opening = storeState.operation_time[days[currentDay - 1]].opening;
        const closing = storeState.operation_time[days[currentDay - 1]].closing;
        return {
            isOpen: currentlyOpen(opening, closing),
            closing,
        };
    };

    $: disabled = isLoading || !storeState.is_active;
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
                        <div class="flex flex-col items-end space-y-2">
                            <Label for="open-store"
                                >{storeState.is_open_today ? "OPEN" : "CLOSE"} TODAY</Label
                            >
                            <Switch
                                id="open-store"
                                bind:checked={storeState.is_open_today}
                                onCheckedChange={(e) =>
                                    updateOpenCloseHandler(e)}
                            />
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
                        <div class="grid gap-2">
                            <div
                                class="grid sm:grid-cols-1 gap-2 divide-y"
                            ></div>
                            <div class="grid gap-2">
                                <Label htmlFor="image">Product Image</Label>
                                <div class="flex items-center gap-2">
                                    <Input
                                        id="image"
                                        type="file"
                                        on:change={handleImageUpload}
                                    />
                                    <Button variant="outline" size="sm">
                                        <Upload class="h-4 w-4 mr-2" />
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <div class="flex justify-end w-full">
                        {#if storeState?.id}
                            <Button
                                class="ml-1"
                                type="submit"
                                disabled={isLoading}
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
                                disabled={isLoading}
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

    <div class="relative lg:sticky mt-5 lg:mt-0 top-0 lg:top-[100px] col-span-3 lg:col-span-1 order-1 lg:order-2" style="align-self: flex-start">
        <div
            class="flex flex-col justify-center w-full bg-white p-4 rounded-md shadow-sm"
        >
            <div class="w-full overflow-hidden -mt-9">
                {#if storeState?.image}
                    <img
                        src={uploadedImage
                            ? uploadedImage
                            : `${storageRestaurantUrl}${storeState.image}`}
                        alt="Product Preview"
                        class="rounded-md object-cover object-center"
                    />
                {:else}
                    <img
                        src="https://www.autopaintguard.com/wp-content/uploads/2018/03/placeholder-image10.jpg"
                        alt="Product Preview"
                        class="rounded-md object-cover object-center"
                    />
                {/if}
            </div>
            <div class="py-3 flex flex-col">
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
                        </span>⋅ Closes {openAndClosing().closing}
                    </p>
                </div>
                <div class="flex space-x-2 items-center">
                    <MapPin class="w-4 h-4" />
                    <span class="text-sm"
                        >{storeState?.address || "Store Address"}</span
                    >
                </div>
                <div class="py-3 text-sm font-thin">
                    {storeState.description}
                </div>
            </div>
        </div>
    </div>
</div>
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
                disabled={isLoading}
            >
                {#if isLoading}
                    <LoaderCircle color="#ffffff" class="animate-spin mr-2" />
                {/if}
                Deactivate Store
            </Button>
        {:else}
            <Button
                on:click={() => storeActivationHandler(true)}
                disabled={isLoading}
            >
                {#if isLoading}
                    <LoaderCircle color="#ffffff" class="animate-spin mr-2" />
                {/if}
                Activate Store
            </Button>
        {/if}
    </CardContent>
</Card>
