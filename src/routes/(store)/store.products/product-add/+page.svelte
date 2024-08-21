<script>
    //@ts-nocheck
    import { page } from "$app/stores";
    import { storageProductUrl } from "$lib/constant";
    import { enhance } from "$app/forms";
    import { uploadCompressImage, useEventService } from "$lib/utils";
    import { toast } from "svelte-sonner";
    import Dropzone from "svelte-file-dropzone";
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
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import {
        Select,
        SelectTrigger,
        SelectContent,
        SelectValue,
        SelectItem,
    } from "$lib/components/ui/select";
    import { Button } from "$lib/components/ui/button";
    import * as Alert from "$lib/components/ui/alert";

    import {
        Upload,
        Store,
        Clock,
        MapPin,
        LoaderCircle,
        CircleAlert,
        Camera,
        Coffee,
        Smartphone,
    } from "lucide-svelte";
    import StarIcon from "$lib/components/icons/StarIcon.svelte";

    import MultiVariantInput from "../../(components)/multi-variant-input.svelte";
    import MultipleSelect from "$lib/components/reusable/MultipleSelect.svelte";
    import CardPreview from "../../(components)/card-preview.svelte";
    import MultiSelectProductSearch from "$lib/components/reusable/MultiSelectProductSearch.svelte";

    export let data;
    $: ({ categories, allProducts } = data);

    let previewImage;

    let category;

    let product = {
        name: "",
        description: "",
        price: null,
        price_added: null,
        category: [],
        upsell: [],
        variants: [
            {
                name: "Hot or Iced",
                required: true,
                multiple: false,
                values: [
                    {
                        name: "Iced",
                        price: null,
                        is_available: true,
                        is_popular: false,
                    },
                    {
                        name: "Hot",
                        price: null,
                        is_available: true,
                        is_popular: false,
                    },
                ],
            },
        ],
        upsell: [],
        image: "",
    };

    $: {
        product.price_added =
            Number(product.price) + Math.round(Number(product.price) * 0.05);
    }

    $: priceAddedValue = `₱${product.price_added}.00`;

    let fileUpload;
    let uploadedImage = null;
    let uploadingImage = false;
    let uploadImageError = {};

    const handleImageUpload = async (e, action) => {
        let tempFile;
        if (action === "drop") {
            const { acceptedFiles, fileRejections } = e.detail;
            tempFile = acceptedFiles[0];
        } else {
            tempFile = e.target.files[0];
        }

        uploadingImage = true;
        const uniqueDate = `${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}`;
        const file = await uploadCompressImage(tempFile);
        uploadedImage = product.image;
        const { data, error } = await $page.data.supabase.storage
            .from("product-images")
            .upload(
                `public/${product.name}${file.name}${uniqueDate}.png`,
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
            product.image = data.path;
            uploadingImage = false;
            uploadedImage = null;
            uploadImageError = {};
        }
    };

    let isLoading = false;

    const onAddProductHandler = async (event) => {
        isLoading = true;
        try {
            const result = await useEventService(
                product,
                `${$page.url.href}?/addProduct`,
            );
        } catch (error) {
            console.error("ERROR ADD PRODUCT", error);
        }
        isLoading = false;
        toast.success(`${product.name} has been added`);

        product = {
            name: "",
            description: "",
            price: 0,
            price_added: 0,
            category: [],
            upsell: [],
            variants: [
                {
                    name: "",
                    optional: true,
                    values: [
                        {
                            name: "",
                            price: 0,
                            is_available: true,
                        },
                    ],
                },
            ],
            image: "",
        };
    };

    $: variantsPrice = product.variants
        .map((item) => item.values)
        .map((value) => [...value])[0]
        .reduce((sum, cur) => sum + Number(cur.price) ?? 0, 0);

    $: totalPrice = 1;
</script>

<div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
    <Card class="w-full col-span-3">
        <CardHeader>
            <CardTitle>Add New Product</CardTitle>
            <CardDescription
                >Fill out the form to add a new product.</CardDescription
            >
        </CardHeader>
        <CardContent class="mt-5">
            <form class="grid gap-6" use:enhance method="POST">
                <div class="rounded-md p-4 border">
                    <div
                        class="w-full flex-items-center p-3 bg-primary -mt-9 rounded-md"
                    >
                        <Label htmlFor="image" class="text-white"
                            >Product Details</Label
                        >
                    </div>
                    <div class="grid gap-2 my-5">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            placeholder="Enter product name"
                            bind:value={product.name}
                        />
                    </div>
                    <div class="grid gap-2 my-5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter product description"
                            class="min-h-[120px]"
                            bind:value={product.description}
                        />
                    </div>
                    <div class="grid gap-2 my-5">
                        <div class="grid sm:grid-cols-2 gap-2">
                            <div class="grid gap-2">
                                <Label htmlFor="price">Minimum Price</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder="Enter price"
                                    bind:value={product.price}
                                />
                            </div>
                            <div class="grid gap-2">
                                <Label htmlFor="price"
                                    >Final Price (Including 5% comission)</Label
                                >
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder={priceAddedValue}
                                    readonly
                                />
                            </div>
                        </div>
                    </div>
                    <div class="grid gap-2 my-5">
                        <Label htmlFor="category">Category</Label>

                        <Select
                            onSelectedChange={(e) => (product.category = e)}
                            multiple={true}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {#each categories as category}
                                    <SelectItem value={category.name}
                                        >{category.name}</SelectItem
                                    >
                                {/each}
                            </SelectContent>
                        </Select>
                    </div>
                    <div class="grid gap-2 my-5">
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
                            <Dropzone
                                on:drop={(e) => handleImageUpload(e, "drop")}
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
                                                    on:change={(e) =>
                                                        handleImageUpload(
                                                            e,
                                                            "input",
                                                        )}
                                                />
                                            </label>
                                            <p class="pl-1">or drag and drop</p>
                                        </div>
                                        <p
                                            class="text-xs leading-5 text-gray-600"
                                        >
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                            </Dropzone>
                        </div>
                    </div>
                </div>
                <div class="p-4 border rounded-md mt-3">
                    <div
                        class="w-full flex-items-center p-3 bg-primary -mt-9 rounded-md"
                    >
                        <Label htmlFor="image" class="text-white"
                            >Product Variants</Label
                        >
                    </div>
                    <MultiVariantInput
                        data={product.variants}
                        bind:value={product.variants}
                    />
                </div>
                <div class="p-4 border rounded-md mt-3">
                    <div
                        class="w-full flex space-x-3 items-center p-3 bg-primary -mt-9 mb-4 rounded-md"
                    >
                        <Label htmlFor="image" class="text-white"
                            >Frequently Bought Together (Upsell)</Label
                        >
                        <div class="bg-muted py-1 px-2 text-sm rounded-full">
                            Optional
                        </div>
                    </div>
                    <MultiSelectProductSearch
                        items={allProducts.products}
                        bind:value={product.upsell}
                    />
                </div>
            </form>
        </CardContent>
        <CardFooter>
            <Button class="ml-auto" on:click={onAddProductHandler}
                >Submit</Button
            >
        </CardFooter>
    </Card>

    <div
        class="relative lg:sticky mt-3 lg:mt-0 top-0 col-span-3 lg:col-span-1 order-1 lg:order-2"
        class:lg:top-[70px]={uploadImageError.error}
        class:lg:top-[100px]={!uploadImageError.error}
        style="align-self: flex-start"
    >
        <!-- <div class="mb-10">
            <pre>{JSON.stringify(product.variants)}</pre>
            <pre>{JSON.stringify(variantsPrice)}</pre>
        </div> -->
        <div class="flex space-x-2 justify-center items-center mb-3">
            <Smartphone class="h-4 w-4" />
            <h1 class="text-center font-semibold">Mobile Preview</h1>
        </div>

        {#if uploadImageError?.error}
            <Alert.Root variant="destructive" class="mb-9">
                <CircleAlert class="h-4 w-4" />
                <Alert.Title>{uploadImageError.title}</Alert.Title>
                <Alert.Description>{uploadImageError.desc}.</Alert.Description>
            </Alert.Root>
        {/if}
        <CardPreview
            data={product}
            {uploadedImage}
            bucket="product"
            loading={uploadingImage}
            on:cameraClick={() =>
                document.getElementById("file-upload").click()}
        />
    </div>
</div>
