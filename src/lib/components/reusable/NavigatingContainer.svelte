<script>
    //@ts-nocheck
    import { navigating } from "$app/stores";
    import { LoaderCircle } from "lucide-svelte";
</script>

{#if $navigating}
    <div
        class="w-full h-full fixed z-50 flex justify-center items-center md:w-[90%] lg:w-5/6"
        style="background-color: rgba(255, 255, 255, 0.8);"
    >
        <LoaderCircle color="#000000" class="animate-spin mr-2 h-11 w-11" />
    </div>
{/if}
