<script>
    //@ts-nocheck
    import { createEventDispatcher } from "svelte";
    import { goto } from "$app/navigation";
    import { page, navigating } from "$app/stores";

    import { Badge } from "$lib/components/ui/badge";
    import { Button } from "$lib/components/ui/button";

    import {
        LayoutDashboard,
        ShoppingCart,
        Package,
        Package2,
        Users,
        Search,
        LineChart,
        Store,
        LogOut,
        X,
    } from "lucide-svelte";

    const dispatch = createEventDispatcher();

    export let groupName = "/";

    export let navigations = [
        {
            icon: LayoutDashboard,
            text: "Dashboard",
            link: "/dashboard",
        },
        {
            icon: ShoppingCart,
            text: "Orders",
            link: "/orders",
            badge: 14,
        },
        {
            icon: Package2,
            text: "Products",
            link: "/products",
        },
        {
            icon: Users,
            text: "Customers",
            link: "/customers",
        },
        {
            icon: LineChart,
            text: "Analyytics",
            link: "/analytics",
        },
    ];

    export let openSidebar = false;
    $: if ($navigating) openSidebar = false;

    let screenWidth;

    $: expandedSidenav = screenWidth >= 140;
</script>

<div
    bind:clientWidth={screenWidth}
    class="border-r bg-white lg:block w-full sm:w-20 lg:w-1/6 fixed left-0 top-0 h-screen z-50 transition-all md:ml-0"
    class:w-20={true}
    class:-ml-[100%]={!openSidebar}
    class:ml-0={openSidebar}
>
    <div class="flex flex-col gap-2 relative h-[100vh]">
        <div class="flex h-[60px] items-center pl-6 pr-4 justify-between">
            <a href="#!" class="flex items-center gap-2 font-semibold">
                <Store class="h-6 w-6" />
                {#if expandedSidenav}
                    <span class="">Acme Inc</span>
                {/if}
            </a>
            <Button
                variant="ghost"
                size="icon"
                class="rounded-full flex sm:hidden"
                on:click={() => dispatch("close")}
            >
                <X />
            </Button>
        </div>
        <div class="flex-1">
            <nav class="grid items-start px-4 text-sm font-medium">
                {#each navigations as navigation}
                    <a
                        href={navigation.link}
                        data-sveltekit-preload-data="tap"
                        class="flex md:grid lg:flex items-center rounded-lg px-3 py-3 text-gray transition-all"
                        class:gap-3={expandedSidenav}
                        class:hover:bg-gray-100={`${groupName}${navigation.link}` !==
                            $page.route.id}
                        class:hover:text-white={`${groupName}${navigation.link}` ===
                            $page.route.id}
                        class:bg-[#A67B5B]={`${groupName}${navigation.link}` ===
                            $page.route.id}
                        class:text-white={`${groupName}${navigation.link}` ===
                            $page.route.id}
                        class:disabled={!$page.data.user.user_metadata?.fname &&
                            navigation.link !== "/store.account"}
                    >
                        <svelte:component
                            this={navigation.icon}
                            class="h-4 w-4"
                        />
                        {#if expandedSidenav}
                            <span class="flex md:hidden lg:flex"
                                >{navigation.text}</span
                            >
                        {/if}

                        {#if navigation?.badge}
                            <Badge
                                class="ml-auto absolute right-5 md:right-3 lg:right-5 lg:flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500"
                            >
                                {navigation.badge}
                            </Badge>
                        {/if}
                    </a>
                {/each}
            </nav>
        </div>
        <div class="absolute w-full bottom-0 flex px-5 py-2">
            <Button
                class="w-full"
                size="icon"
                on:click={() => dispatch("logout")}
            >
                <LogOut class="mr-2 h-4 w-4" />
                {expandedSidenav ? "Logout" : ""}
            </Button>
        </div>
    </div>
</div>

<style>
    .disabled {
        pointer-events: none;
        color: #ccc;
        cursor: not-allowed;
    }
</style>
