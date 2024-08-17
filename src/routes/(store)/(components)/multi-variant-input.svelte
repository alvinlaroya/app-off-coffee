<script>
    //@ts-nocheck
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Switch } from "$lib/components/ui/switch";

    import { Plus, Trash } from "lucide-svelte";

    export let data;
    let variants = data;
    export let value;
    $: value = variants;
</script>

<div class="grid gap-2 mt-3">
    <div class="flex flex-col">
        {#each variants as variant, variant_idx}
            <div class="border-b border-dashed pb-2 my-2">
                <div class="flex space-x-3 items-center">
                    <div class="flex w-full flex-col gap-1.5">
                        <div class="flex space-x-4 items-center">
                            <Label for="variant-name" class="text-xs"
                                >Variant Name</Label
                            >
                            <span class="mx-5 -mt-1 text-gray-300">|</span>
                            <div class="flex items-center space-x-4">
                                <Switch
                                    id="open-store"
                                    bind:checked={variant.required}
                                    onCheckedChange={(e) =>
                                        (variant.required = e)}
                                />
                                <Label class="text-xs"
                                    >{variant.required
                                        ? "Required"
                                        : "Optional"}</Label
                                >
                            </div>
                        </div>
                        <Input
                            id="price"
                            type="text"
                            placeholder="Ex. Size"
                            on:keydown={(e) =>
                                console.log(e.currentTarget.value)}
                            bind:value={variant.name}
                        />
                    </div>

                    <Button
                        variant="destructive"
                        size="sm"
                        class="mt-6"
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
                        class="mt-6"
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
                                    >{variant?.name ?? ""} Variant</Label
                                >
                                <Input
                                    id="variant-name"
                                    type="text"
                                    placeholder="Ex. Grande"
                                    bind:value={value.name}
                                />
                            </div>

                            <div
                                class="flex w-full max-w-sm flex-col gap-1.5 my-2"
                            >
                                <Label
                                    for="variant-nam"
                                    class="text-xs flex items-center "
                                >
                                    {value?.name ?? ""} Additional Price
                                    <span
                                        class="bg-primary ml-2 text-white text-[10px] px-2 py-0.5 rounded-full"
                                    >
                                        {value?.price
                                            ? `+ ${value?.price}.00`
                                            : `Free`}
                                    </span>
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    placeholder={value.price ?? "FREE"}
                                    bind:value={value.price}
                                />
                            </div>

                            <Button
                                variant="destructive"
                                class="mt-6"
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
                                class="mt-6"
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
