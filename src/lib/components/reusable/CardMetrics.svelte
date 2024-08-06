<script>
    //@ts-nocheck
    import {
        Card,
        CardHeader,
        CardTitle,
        CardContent,
    } from "$lib/components/ui/card";

    import { Package2Icon, ShoppingCart, Users } from "lucide-svelte";
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <Card>
        <CardHeader class="flex items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium">Total Sales</CardTitle>
            <svg
                class="w-4 h-4 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        </CardHeader>
        <CardContent>
            <div class="text-3xl font-bold">$125,234</div>
            <p class="text-xs text-muted-foreground">+15% from last month</p>
        </CardContent>
    </Card>
    <Card>
        <CardHeader class="flex items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium">Total Revenue</CardTitle>
            <svg
                class="w-4 h-4 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="12" x2="12" y1="2" y2="22" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        </CardHeader>
        <CardContent>
            <div class="text-3xl font-bold">$89,345</div>
            <p class="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
    </Card>
    <Card>
        <CardHeader class="flex items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart class="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div class="text-3xl font-bold">2,345</div>
            <p class="text-xs text-muted-foreground">+20% from last month</p>
        </CardContent>
    </Card>
    <Card>
        <CardHeader class="flex items-center justify-between pb-2">
            <CardTitle class="text-sm font-medium">New Customers</CardTitle>
            <Users class="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div class="text-3xl font-bold">1,234</div>
            <p class="text-xs text-muted-foreground">+18% from last month</p>
        </CardContent>
    </Card>
</div>
