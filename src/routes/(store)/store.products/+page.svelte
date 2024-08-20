<script>
    //@ts-nocheck
    import { goto } from "$app/navigation";
    import Button from "$lib/components/ui/button/button.svelte";
    import { PackagePlus } from "lucide-svelte";

    export let data;
    $: ({ allProducts } = data);
</script>

<div class="flex w-full">
    <!-- <a href="/store.products/product-add">Add Product</a>
    <a href="/store.products/product-details/525242">Product Detail</a> -->
    <div class="flex flex-col w-full justify-end">
        <div class="flex justify-end">
            <Button on:click={() => goto("/store.products/product-add")}>
                <PackagePlus class="mr-2 h-4 w-4" />
                Add Product
            </Button>
        </div>
        <ul>
            <!-- {#each allProducts.products as product}
                <li>{product.name}</li>
            {/each} -->
        </ul>
    </div>
</div>
