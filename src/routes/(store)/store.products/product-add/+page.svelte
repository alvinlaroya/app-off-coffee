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
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import {
        Select,
        SelectTrigger,
        SelectValue,
        SelectContent,
        SelectItem,
    } from "$lib/components/ui/select";
    import { Button } from "$lib/components/ui/button";

    import { Upload } from "lucide-svelte";

    import MultiVariantInput from "../../(components)/multi-variant-input.svelte";
    import MultipleSelect from "$lib/components/reusable/MultipleSelect.svelte";

    export let data;
    $: ({ categories } = data);

    let previewImage;

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        previewImage = URL.createObjectURL(file);
    };

    let category;

    let variants = [
        {
            name: "Size",
            optional: true,
            values: [
                {
                    name: "Tall",
                    price: 10.0,
                    is_available: true,
                },
            ],
        },
    ];

    let product = {
        name: "",
        description: "",
        price: "",
        category: [],
        upsell: [],
        variants: [],
        image: "",
    };
</script>

<div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
    <Card class="w-full col-span-2">
        <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            {category}
            <CardDescription
                >Fill out the form to add a new product.</CardDescription
            >
        </CardHeader>
        <CardContent>
            <form class="grid gap-6">
                <div class="grid gap-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                        id="name"
                        placeholder="Enter product name"
                        bind:value={product.name}
                    />
                </div>
                <div class="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Enter product description"
                        class="min-h-[120px]"
                        bind:value={product.description}
                    />
                </div>
                <div class="grid gap-2">
                    <div class="grid sm:grid-cols-2 gap-2">
                        <div class="grid gap-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                placeholder="Enter price"
                                bind:value={product.price}
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label htmlFor="category">Category</Label>

                            <Select
                                onSelectedChange={(e) =>
                                    (product.category = e.value)}
                            >
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder="Select category"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {#each categories as category}
                                        <SelectItem value={category.id}
                                            >{category.name}</SelectItem
                                        >
                                    {/each}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div class="grid gap-2">
                        <!-- <div class="col-span-full">
                            <label
                                for="photo"
                                class="block text-sm font-medium leading-6 text-gray-900"
                                >Photo</label
                            >
                            <div class="mt-2 flex items-center gap-x-3">
                                <svg
                                    class="h-12 w-12 text-gray-300"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <button
                                    type="button"
                                    class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                    >Change</button
                                >
                            </div>
                        </div> -->

                        <div class="col-span-full">
                            <label
                                for="cover-photo"
                                class="block text-sm font-medium leading-6 text-gray-900"
                                >Product Image</label
                            >
                            <div
                                class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                            >
                                <div class="text-center">
                                    <svg
                                        class="mx-auto h-12 w-12 text-gray-300"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                    <div
                                        class="mt-4 flex text-sm leading-6 text-gray-600"
                                    >
                                        <label
                                            for="file-upload"
                                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                name="file-upload"
                                                type="file"
                                                class="sr-only"
                                            />
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-600">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <MultiVariantInput data={variants} bind:value={variants} />
                </div>
            </form>
        </CardContent>
        <CardFooter>
            <Button class="ml-auto">Submit</Button>
        </CardFooter>
    </Card>
    <div class="flex flex-col sticky top-16">
        <h1>Preview Card Image</h1>
        <div class="flex justify-center w-full">
            {#if previewImage}
                <div class="mt-4 h-80 w-80 bg-red-600 overflow-hidden">
                    <img
                        src={previewImage}
                        alt="Product Preview"
                        class="rounded-md object-cover object-center"
                    />
                </div>
            {/if}
        </div>
    </div>
</div>
