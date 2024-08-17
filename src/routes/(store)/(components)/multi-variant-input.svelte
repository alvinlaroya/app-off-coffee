<script>
    //@ts-nocheck
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";

    import { Button } from "$lib/components/ui/button";

    import { Plus, Trash } from "lucide-svelte";

    export let data;
    let variants = data;
    export let value;
    $: value = variants;
</script>

<div class="grid gap-2 mt-3">
    <div class="w-full flex-items-center p-3 bg-gray-700">
        <Label htmlFor="image" class="text-white">Product Variants</Label>
    </div>
    <div class="flex flex-col">
        {#each variants as variant, variant_idx}
            <div class="border-b border-dashed pb-2 my-2">
                <div class="flex space-x-3 items-center">
                    <div class="flex w-full flex-col gap-1.5">
                        <Label for="variant-nam" class="text-xs"
                            >Variant Name</Label
                        >
                        <Input
                            id="price"
                            type="text"
                            on:keydown={(e) =>
                                console.log(e.currentTarget.value)}
                            bind:value={variant.name}
                        />
                    </div>

                    <Button
                        variant="destructive"
                        size="sm"
                        class="mt-5"
                        on:click={() =>
                            (variants = variants.filter(
                                (_, i) => i !== variant_idx,
                            ))}
                        disabled={variants.length <= 1}
                    >
                        <Trash class="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        class="mt-5"
                        size="sm"
                        on:click={() =>
                            (variants = [
                                ...variants,
                                {
                                    name: "",
                                    optional: true,
                                    values: [
                                        {
                                            name: "",
                                            price: 0.0,
                                            is_available: true,
                                        },
                                    ],
                                },
                            ])}
                    >
                        <Plus class="h-4 w-4 mr-2" />
                        Add Variant
                    </Button>
                </div>
                <div class="border-l border-dashed ml-14 my-1 pl-7 py-1">
                    {#each variant.values as value, idx}
                        <div class="flex space-x-3 items-center">
                            <div
                                class="border border-dashed w-24 -ml-7 mt-5"
                            ></div>
                            <div
                                class="flex w-full max-w-sm flex-col gap-1.5 my-2"
                            >
                                <Label for="variant-nam" class="text-xs"
                                    >{variant?.name ?? ""} Value</Label
                                >
                                <Input
                                    id="variant-name"
                                    type="text"
                                    bind:value={value.name}
                                />
                            </div>

                            <div
                                class="flex w-full max-w-sm flex-col gap-1.5 my-2"
                            >
                                <Label for="variant-nam" class="text-xs"
                                    >{value?.name ?? ""} Additional Price</Label
                                >
                                <Input
                                    id="price"
                                    type="number"
                                    bind:value={value.price}
                                />
                            </div>

                            <Button
                                variant="destructive"
                                class="mt-8"
                                size="sm"
                                on:click={() =>
                                    (variant.values = variant.values.filter(
                                        (_, i) => i !== idx,
                                    ))}
                                disabled={variant.values.length <= 1}
                            >
                                <Trash class="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                class="mt-8"
                                size="sm"
                                on:click={() =>
                                    (variants[variant_idx].values = [
                                        ...variant.values,
                                        {
                                            name: "",
                                            price: 0.0,
                                            is_available: true,
                                        },
                                    ])}
                            >
                                <Plus class="h-4 w-4" />
                            </Button>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>
