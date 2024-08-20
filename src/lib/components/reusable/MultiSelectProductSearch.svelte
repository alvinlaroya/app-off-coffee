<script>
    //@ts-nocheck
    import {
        Select,
        SelectTrigger,
        SelectValue,
        SelectContent,
        SelectItem,
    } from "$lib/components/ui/select";
    import { Input } from "$lib/components/ui/input";
    import { ScrollArea } from "$lib/components/ui/scroll-area";
    import * as Avatar from "$lib/components/ui/avatar/index.js";

    import { storageProductUrl } from "$lib/constant";

    export let value;
    export let items = [];

    let searchProduct = "";
    $: searchedProducts = items.filter(
        (item) =>
            item.name.toLowerCase().search(searchProduct.toLowerCase()) >= 0,
    );
</script>

<Select onSelectedChange={(e) => (value = e)} multiple={true}>
    <SelectTrigger>
        <SelectValue placeholder="Select Products" />
    </SelectTrigger>
    <SelectContent class="p-1 max-h-80">
        <Input
            type="text"
            placeholder="Search Product"
            bind:value={searchProduct}
            class="mb-2 w-full bg-muted p-2 rounded-md focus:border-none active:border-none text-sm"
        />
        <ScrollArea class="max-h-64 w-full rounded-md border">
            {#if searchedProducts.length > 0}
                {#each searchedProducts as prod}
                    <SelectItem
                        value={prod.id}
                        label={prod.name}
                        class="hover:cursor-pointer"
                        on:click={() => (searchProduct = "")}
                    >
                        <div class="flex">
                            <Avatar.Root>
                                <Avatar.Image
                                    src={`${storageProductUrl}${prod.image}`}
                                    alt="@shadcn"
                                    class="object-cover"
                                />
                                <Avatar.Fallback>CN</Avatar.Fallback>
                            </Avatar.Root>
                            <div class="flex flex-col pl-2">
                                <h1 class="font-semibold">
                                    {prod.name}
                                </h1>
                                <span class=""
                                    >₱{Number(prod?.price).toFixed(2)}</span
                                >
                            </div>
                        </div>
                    </SelectItem>
                {/each}
            {:else}
                <div class="flex justify-center p-4">
                    <h1>No products result for {searchProduct}</h1>
                </div>
            {/if}
        </ScrollArea>
    </SelectContent>
</Select>
