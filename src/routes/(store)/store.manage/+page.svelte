<script>
    //@ts-nocheck
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

    import { Upload, Store, Clock, MapPin } from "lucide-svelte";

    let previewImage;

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        previewImage = URL.createObjectURL(file);
    };

    let storeState = {
        name: "Manifiesto",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        address: "San Antonio, Agoo, La Union",
        location: {},
        rating: 0,
        followers: 0,
        operation_time: {},
        website: "manifiesto.com",
        phone: "+639388566223",
        email: "manifiesto@gmail.com",
        peak_hours: {},
    };

    let is_open_today = false;
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
    <Card class="w-full col-span-2">
        <CardHeader>
            <CardTitle>
                <div class="flex justify-between">
                    <h1>Create Store</h1>
                    <div class="flex flex-col items-end space-y-2">
                        <Label for="open-store"
                            >{is_open_today ? "OPEN" : "CLOSE"} TODAY</Label
                        >
                        <Switch
                            id="open-store"
                            bind:checked={is_open_today}
                            onCheckedChange={(e) => (is_open_today = e)}
                        />
                    </div>
                </div>
            </CardTitle>
            <CardDescription
                >Fill out the form to add details on your store.</CardDescription
            >
        </CardHeader>
        <CardContent>
            <form class="grid gap-6">
                <div class="grid gap-2">
                    <Label htmlFor="name">Store Name</Label>
                    <Input
                        id="name"
                        placeholder="Enter product name"
                        bind:value={storeState.name}
                    />
                </div>
                <div class="grid gap-2">
                    <Label htmlFor="description">Store Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Enter product description"
                        class="min-h-[120px]"
                        bind:value={storeState.description}
                    />
                </div>
                <div class="grid gap-2">
                    <Label htmlFor="name">Store Address</Label>
                    <Input
                        id="name"
                        placeholder="Enter product name"
                        bind:value={storeState.address}
                    />
                </div>
                <div class="grid gap-2">
                    <Accordion.Root class="w-full" value="item-1">
                        <Accordion.Item value="item-1">
                            <Accordion.Trigger>
                                <Label htmlFor="name">Operation Time</Label>
                            </Accordion.Trigger>
                            <Accordion.Content>
                                <OperationTimeRangePicker />
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
                    />
                </div>
                <div class="grid gap-2">
                    <Accordion.Root class="w-full" value="item-1">
                        <Accordion.Item value="item-1">
                            <Accordion.Trigger>
                                <Label htmlFor="name">Peak Hours</Label>
                            </Accordion.Trigger>
                            <Accordion.Content>
                                <PeakHoursPicker />
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion.Root>
                </div>
                <div class="grid gap-2">
                    <div class="grid sm:grid-cols-1 gap-2 divide-y"></div>
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
            <Button class="ml-auto">Submit</Button>
        </CardFooter>
    </Card>
    <div class="sticky top-[100px]" style="align-self: flex-start">
        <div
            class="flex flex-col justify-center w-full bg-white p-4 rounded-md shadow-sm"
        >
            <div class="w-full overflow-hidden -mt-9">
                {#if previewImage}
                    <img
                        src={previewImage}
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
                    <h1 class="text-3xl font-semibold">{storeState.name}</h1>
                    <span>4.3 (127)</span>
                </div>
                <div class="flex space-x-2 items-center">
                    <Store class="w-4 h-4" />
                    <span class="text-sm">Coffee Shop</span>
                </div>
                <div class="flex space-x-2 items-center">
                    <Clock class="w-4 h-4" />
                    <p class="text-sm">
                        <span class="text-green-800">Open </span>| Closes 10pm
                    </p>
                </div>
                <div class="flex space-x-2 items-center">
                    <MapPin class="w-4 h-4" />
                    <span class="text-sm">{storeState.address}</span>
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
        <Button variant="destructive">Deactivate Store</Button>
    </CardContent>
</Card>
