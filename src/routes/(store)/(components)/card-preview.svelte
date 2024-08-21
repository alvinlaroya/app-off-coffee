<script>
    //@ts-nocheck
    import { createEventDispatcher } from "svelte";
    import { storageProductUrl, storageRestaurantUrl } from "$lib/constant";
    import { Button } from "$lib/components/ui/button";
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

    import {
        LoaderCircle,
        Camera,
        ChevronLeft,
        Heart,
        Coffee,
        Croissant,
        StarIcon,
        Flame,
        BatteryMedium,
        SignalHigh,
    } from "lucide-svelte";

    const dispatch = createEventDispatcher();

    const storage = {
        product: storageProductUrl,
        store: storageRestaurantUrl,
    };

    export let data = undefined;
    export let bucket = undefined;
    export let uploadedImage = undefined;
    export let loading = undefined;

    let productTitleHeaight = null;

    let groupContentRef = null;
    $: groupContentYPosition = null;

    $: {
        console.log("RED", groupContentYPosition);
    }

    const scrollPhone = () => {
        groupContentYPosition = groupContentRef.getBoundingClientRect();
    };

    $: productPrice = Number(data?.price_added ?? 0).toFixed(2);
</script>

<div
    class="relative flex justify-center h-[550px] w-[270px] bg-[#0C0F14] border-[6px] border-black rounded-2xl z-30 mx-auto"
    style="box-shadow: 5px 5px 5px 12px rgb(209, 218, 218)"
>
    <!--  Dynamic Island notch -->
    <div
        class="absolute flex justify-between items-center px-3 w-full z-30 mt-1"
    >
        <span class="text-[12px] text-white">7:11 </span>
        <span
            class="absolute ml-[33%] border border-black bg-black w-16 h-4 rounded-full"
        >
        </span>
        <div class="flex space-x-1 items-center">
            <SignalHigh class="w-4 h-4 text-white fill-white" />
            <BatteryMedium class="w-5 h-5 text-white mt-[2px]" />
        </div>
    </div>
    <!-- right buttns -->
    <span
        class="absolute -right-2 top-20 border-2 border-black h-10 rounded-md z-30"
    ></span>

    <!-- left buttns -->
    <span
        class="absolute -left-2 top-16 border-2 border-black h-6 rounded-md z-30"
    ></span>
    <span
        class="absolute -left-2 top-32 border-2 border-black h-12 rounded-md z-30"
    ></span>
    <span
        class="absolute -left-2 top-48 border-2 border-black h-12 rounded-md z-30"
    ></span>
    <div class="z-10 p-0">
        <!-- Scrollable Screen -->
        <ScrollArea
            class="h-[537px] w-[258px] pr-[2px] pb-[65px] rounded-lg z-0"
        >
            <!-- Product Hero Image -->
            <div
                class="w-full h-[340px] overflow-clip z-0 object-center"
                style="background-image: url('https://www.autopaintguard.com/wp-content/uploads/2018/03/placeholder-image10.jpg');"
            >
                <div
                    class="absolute left-0 top-0 w-full mt-6 py-2 px-3 flex justify-between"
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        class="bg-[#141921] h-8 w-8 rounded-lg"
                    >
                        <ChevronLeft class="w-4 h-4 text-white" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        class="bg-[#141921] h-8 w-8 rounded-lg"
                    >
                        <Heart class="w-4 h-4 text-red-500 fill-red-500" />
                    </Button>
                </div>

                {#if loading}
                    <div
                        class="absolute top-32 left-0 w-full flex justify-center"
                    >
                        <LoaderCircle
                            class="w-10 h-10 text-black animate-spin"
                        />
                    </div>
                {/if}
                {#if data?.image && !loading}
                    <img
                        src={uploadedImage
                            ? "https://images.pexels.com/photos/7362647/pexels-photo-7362647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            : `${storage[bucket]}${data.image}`}
                        alt="Product Preview"
                        class="object-cover w-full h-full"
                    />
                {/if}
            </div>

            <!-- Product Below The Fold -->
            <div class="flex flex-col bg-[#0C0F14]">
                <!-- Group Details -->
                <div
                    class="w-full h-full text-white p-4 sticky top-[50px] rounded-tl-3xl rounded-tr-3xl z-0 flex flex-col justify-between"
                    style="background-color: rgba(0, 0, 0, 0.5); margin-top: -{productTitleHeaight +
                        65}px"
                    bind:this={groupContentRef}
                >
                    <div class="flex justify-between space-x-2 w-full">
                        <div
                            class="flex flex-col"
                            bind:clientHeight={productTitleHeaight}
                        >
                            <span class="font-semibold text-sm">
                                {data?.name || "Product Name"}
                            </span>
                            <span class="text-xs font-thin">Iced Coffee</span>
                        </div>
                        <div class="flex items-center space-x-1">
                            <button
                                class="flex flex-col h-10 w-10 items-center justify-center rounded-md bg-[#141921]"
                            >
                                <Croissant class="w-4 h-4 text-[#D17842]" />
                                <span class="text-[8px]">Pastry</span>
                            </button>
                            <button
                                class="flex flex-col h-10 w-10 items-center justify-center rounded-md bg-[#141921]"
                            >
                                <Coffee class="w-4 h-4 text-[#D17842]" />
                                <span class="text-[8px]">Coffee</span>
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-between w-full mt-1.5">
                        <div class="flex items-center">
                            <div class="flex items-center space-x-1">
                                <StarIcon
                                    class="w-4 h-4 fill-[#D17842] text-[#D17842]"
                                />
                                <span class="font-semibold text-sm">4.5</span>
                                <span class="font-thin text-[9px]">(2,000)</span
                                >
                            </div>
                        </div>
                        <div class="flex items-center">
                            <div
                                class="flex h-8 w-[85px] items-center justify-center rounded-md bg-[#141921]"
                            >
                                <Flame
                                    class="w-3 h-3 fill-red-500 text-red-500 mr-1"
                                />
                                <span class="text-[9px]">Popular</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="w-full p-3 text-white flex flex-col space-y-5 h-[150px]"
                >
                    <div class="flex flex-col space-y-1.5 pb-1">
                        <span class="text-[11px] font-semibold"
                            >Description</span
                        >
                        <span class="text-[10px] font-thin"
                            >{data?.description || "Lorem ipsum dolor"}</span
                        >
                    </div>
                    <div class="flex flex-col space-y-5">
                        <div class="flex">
                            <span>Customize Your Order!</span>
                        </div>
                        {#each data?.variants ?? [] as variant}
                            <div class="flex flex-col">
                                <div class="flex justify-between mb-2">
                                    <span class="text-[11px] font-semibold"
                                        >{variant?.name ?? "Variant"}</span
                                    >
                                    <span
                                        class="text-[9px] font-semibold text-white px-2 py-0.5 flex items-center rounded-full"
                                        class:bg-[#D17842]={variant?.required}
                                        class:text-white={variant?.required}
                                        class:bg-gray-300={!variant?.required}
                                        class:text-black={!variant?.required}
                                        >{variant?.required
                                            ? "Required"
                                            : "Optional"}</span
                                    >
                                </div>
                                <div
                                    class="flex space-x-2 mt-1 w-[235px] overflow-x-clip"
                                >
                                    {#each variant.values ?? [] as value, valueIdx}
                                        <button
                                            class="px-5 py-3.5 rounded-lg text-xs bg-[#141921] text-nowrap flex flex-row items-center relative"
                                            class:border={valueIdx == 0 &&
                                                variant.required}
                                            class:border-[#D17842]={valueIdx ==
                                                0}
                                        >
                                            <span
                                                class="text-[8px] absolute right-2 top-0"
                                                class:text-red-400={value?.price >
                                                    0}
                                                class:text-green-600={value?.price <=
                                                    0}
                                                >{value?.price &&
                                                value.price > 0
                                                    ? `+ ₱${value.price}`
                                                    : "Free"}</span
                                            >
                                            <div class="flex items-center">
                                                {#if value.is_popular}
                                                    <Flame
                                                        class="w-3 h-3 fill-red-500 text-red-500 mr-1"
                                                    />
                                                {/if}
                                                {value?.name}
                                            </div>
                                        </button>
                                    {/each}
                                </div>
                            </div>
                        {/each}
                    </div>
                    <!-- Partner Your Coffee With -->
                    <div class="flex">
                        <span>Parner your coffee with:</span>
                    </div>
                    <div class="flex flex-col w-full text-white">
                        <!-- <pre>{JSON.stringify(data.upsell)}</pre> -->
                    </div>
                </div>

                <!-- Footer -->
                <div
                    class="flex justify-between absolute bottom-0 left-0 w-full p-3 space-x-8 text-white bg-[#0C0F14]"
                >
                    <div class="flex flex-col justify-center items-center">
                        <span class="text-[10px] font-thin">Price</span>
                        <div class="flex space-x-1 -mt-[2px]">
                            <span class="text-[#D17842]">₱</span>
                            <span class="font-semibold">{productPrice}</span>
                        </div>
                    </div>
                    <button
                        class="w-full bg-[#D17842] rounded-xl text-sm font-semibold"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </ScrollArea>
    </div>
</div>
