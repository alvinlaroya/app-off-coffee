<script>
    //@ts-nocheck
    import { createEventDispatcher } from "svelte";
    import {
        storageProductUrl,
        storageRestaurantUrl,
        days,
    } from "$lib/constant";
    import { currentlyOpen } from "$lib/utils";
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
        MapPin,
        Store,
        UserPlus,
        Plus,
        House,
        ShoppingCart,
        Clock,
    } from "lucide-svelte";

    const dispatch = createEventDispatcher();

    const storage = {
        product: storageProductUrl,
        store: storageRestaurantUrl,
    };

    export let data = undefined;
    export let products = [];
    export let bucket = undefined;
    export let uploadedImage = undefined;
    export let loading = undefined;

    let productTitleHeaight = null;

    let groupContentRef = null;
    $: groupContentYPosition = null;

    const categories = [
        {
            id: 1,
            name: "All",
        },
        {
            id: 1,
            name: "Espresso",
        },
        {
            id: 1,
            name: "Cold Brew",
        },
        {
            id: 1,
            name: "Sandwich",
        },
        {
            id: 1,
            name: "Pasta",
        },
    ];

    $: {
        console.log("RED", groupContentYPosition);
    }

    const scrollPhone = () => {
        groupContentYPosition = groupContentRef.getBoundingClientRect();
    };

    $: productPrice = Number(data?.price_added ?? 0).toFixed(2);

    $: openAndClosing = () => {
        const currentDate = new Date();
        const currentDay = currentDate.getDay();

        if (
            !data?.operation_time?.[days[currentDay - 1]]?.opening &&
            !data?.operation_time?.[days[currentDay - 1]]?.closing
        ) {
            return {
                isOpen: false,
                closing: null,
            };
        }

        const opening = data?.operation_time[days[currentDay - 1]]?.opening;
        const closing = data?.operation_time[days[currentDay - 1]]?.closing;

        return {
            isOpen: currentlyOpen(opening, closing),
            closing,
        };
    };
</script>

<div
    class="relative flex justify-center h-[550px] w-[270px] bg-[#0C0F14] border-[6px] border-black rounded-2xl z-30 m-auto"
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
        <ScrollArea class="h-[537px] w-[258px] pr-[2px] rounded-lg z-0">
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
                        class="bg-[#141921] h-8 w-8 text-white rounded-lg text-[12px]"
                    >
                        <div class="relative">
                            <ShoppingCart class="w-4 h-4 text-white" />
                            <span
                                class="absolute -top-3 -right-3 bg-red-500 w-4 h-4 rounded-full flex items-center justify-center"
                                >3</span
                            >
                        </div>
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
                    class="w-full h-full text-white px-4 py-3 sticky top-[50px] rounded-tl-3xl rounded-tr-3xl z-0 flex flex-col justify-between"
                    style="background-color: rgba(0, 0, 0, 0.7); margin-top: -{productTitleHeaight +
                        60}px"
                    bind:this={groupContentRef}
                >
                    <div class="flex justify-between space-x-2 w-full">
                        <div
                            class="flex flex-col space-y-0.5"
                            bind:clientHeight={productTitleHeaight}
                        >
                            <div class="flex space-x-2 items-center">
                                <Store class="w-3 h-3 text-white" />
                                <span class="font-semibold text-sm">
                                    {data?.name || "Product Name"}
                                </span>
                            </div>
                            <div class="flex items-center space-x-2">
                                <MapPin class="w-3 h-3 text-white" />
                                <span class="text-xs font-thin">
                                    {data?.address || "Adress"}
                                </span>
                            </div>
                            <div class="flex space-x-2 items-center">
                                <Clock class="w-3 h-3" />
                                <p class="text-xs font-thin">
                                    <span
                                        >{openAndClosing().isOpen
                                            ? "Open"
                                            : "Closed"}
                                    </span>
                                    {#if openAndClosing()?.closing}
                                        <span class="text-xs">
                                            ⋅ Closes {openAndClosing().closing}
                                        </span>
                                    {/if}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between w-full mt-2">
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
                                <UserPlus class="w-4 h-4 mr-2 text-white" />
                                <span class="text-[9px]">Follow</span>
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
                        <div class="flex space-x-4 w-[235px] overflow-x-clip">
                            {#each categories as category, idx}
                                <Button variant="ghost" class="p-1 h-8 ">
                                    <div
                                        class="w-full flex flex-col items-center space-y-[2px]"
                                    >
                                        <span
                                            class="text-[10px] font-semibold"
                                            class:text-gray-400={idx != 0}
                                            class:text-[#D17842]={idx == 0}
                                        >
                                            {category?.name}
                                        </span>
                                        <span
                                            class="h-[6px] w-[6px] rounded-full"
                                            class:bg-[#D17842]={idx == 0}
                                            class:bg-transparent={idx != 0}
                                        ></span>
                                    </div>
                                </Button>
                            {/each}
                        </div>
                        <div class="grid grid-cols-2 gap-4">
                            {#each products ?? [] as product}
                                <div
                                    class="p-2 flex flex-col space-y-2 bg-[#141921] rounded-2xl"
                                >
                                    <img
                                        src={`${storageProductUrl}${product?.image}`}
                                        class="h-[100px] w-[100px] object-cover rounded-xl"
                                        alt=""
                                    />
                                    <div class="flex-1">
                                        <div
                                            class="flex space-x-2 justify-between"
                                        >
                                            <span class="text-xs"
                                                >{product?.name ||
                                                    "Product Name"}</span
                                            >
                                            <div class="w-3">
                                                <Flame
                                                    class="w-3 h-3 fill-red-500 text-red-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="flex justify-between items-center"
                                    >
                                        <div
                                            class="flex space-x-1 text-xs font-bold"
                                        >
                                            <span class="text-[#D17842]">₱</span
                                            >
                                            <span class=""
                                                >{Number(
                                                    product?.price_added ?? 0,
                                                ).toFixed(2)}</span
                                            >
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            class="bg-[#D17842] h-6 w-6"
                                        >
                                            <Plus class="w-3 h-3 text-white" />
                                        </Button>
                                    </div>
                                </div>
                            {/each}
                        </div>
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
            </div>
        </ScrollArea>
    </div>
</div>
