<script>
    //@ts-nocheck
    import { createEventDispatcher } from "svelte";
    import { storageProductUrl, storageRestaurantUrl } from "$lib/constant";
    import { Button } from "$lib/components/ui/button";

    import { LoaderCircle, Camera } from "lucide-svelte";

    const dispatch = createEventDispatcher();

    const storage = {
        product: storageProductUrl,
        store: storageRestaurantUrl,
    };

    export let data;
    export let bucket;
    export let uploadedImage;
    export let loading;
</script>

<div
    class="flex flex-col justify-center w-full bg-white p-4 rounded-md shadow-sm"
>
    <div
        class="w-full h-[18rem] overflow-hidden -mt-9 rounded-md grid bg-center bg-contain"
        style="background-image: url('https://www.autopaintguard.com/wp-content/uploads/2018/03/placeholder-image10.jpg');"
    >
        {#if data?.image && !loading}
            <img
                src={uploadedImage
                    ? uploadedImage
                    : `${storage[bucket]}${data.image}`}
                alt="Product Preview"
                class="rounded-md object-cover w-full h-full"
            />
        {/if}
    </div>
    <div class="z-10 -mt-7">
        <Button
            variant="ghost"
            size="icon"
            class="bg-gray-200 rounded-full border-4 border-white ml-3 h-14 w-14"
            on:click={() => dispatch("cameraClick")}
        >
            {#if loading}
                <LoaderCircle color="#000000" class="animate-spin" />
            {:else}
                <Camera class="h-6 w-6" />
            {/if}
        </Button>
    </div>

    <div class="py-3 flex flex-col -mt-3">
        <slot name="body" />
    </div>
</div>
