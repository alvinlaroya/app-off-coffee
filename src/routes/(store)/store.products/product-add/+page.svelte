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

    export let data;
    $: ({ categories } = data);

    let previewImage;

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        previewImage = URL.createObjectURL(file);
    };

    let category;
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                    <Input id="name" placeholder="Enter product name" />
                </div>
                <div class="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Enter product description"
                        class="min-h-[120px]"
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
                            />
                        </div>
                        <div class="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue
                                        placeholder="Select category"
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                     {#each categories as category}
                                        <SelectItem value={category.id}>{category.name}</SelectItem>
                                    {/each}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
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
