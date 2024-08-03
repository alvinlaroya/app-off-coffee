<script>
    //@ts-nocheck
    import { createEventDispatcher } from "svelte";
    import { goto } from "$app/navigation";
	import { page } from "$app/stores";

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
	} from "lucide-svelte";

    const dispatch = createEventDispatcher();
    
    export let groupName = '/';

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
</script>

<div class="hidden border-r bg-muted/40 lg:block">
    <div class="flex flex-col gap-2 relative h-[100vh]">
        <div class="flex h-[60px] items-center px-6">
            <slot name="header" />
        </div>
        <div class="flex-1">
            <nav class="grid items-start px-4 text-sm font-medium">
                {#each navigations as navigation}
                    <a
                        href={navigation.link}
                        class="flex items-center gap-3 rounded-lg px-3 py-3 text-gray transition-all hover:text-primary"
                        class:bg-gray-300={`${groupName}${navigation.link}` ===
                            $page.route.id}
                    >
                        <svelte:component
                            this={navigation.icon}
                            class="h-4 w-4"
                        />
                        <span>{navigation.text}</span>
                        {#if navigation?.badge}
                            <Badge
                                class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-500"
                            >
                                {navigation.badge}
                            </Badge>
                        {/if}
                    </a>
                {/each}
            </nav>
        </div>
        <div class="absolute w-full bottom-0 flex px-5 py-2">
            <Button class="w-full" on:click={() => dispatch('logout')}>
                <LogOut class="mr-2 h-4 w-4" />
                Logout
            </Button>
        </div>
    </div>
</div>
