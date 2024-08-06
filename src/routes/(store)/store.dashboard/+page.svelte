<script>
    import {
        Card,
        CardHeader,
        CardTitle,
        CardContent,
    } from "$lib/components/ui/card";
    import {
        Table,
        TableHeader,
        TableRow,
        TableHead,
        TableBody,
        TableCell,
    } from "$lib/components/ui/table";
    import { Badge } from "$lib/components/ui/badge";

    import { page } from "$app/stores";

    import CardMetrics from "$lib/components/reusable/CardMetrics.svelte";

    export let data;
    $: ({ notes } = data);
</script>

<div class="flex flex-col min-h-screen">
    <main class="flex-1 w-full mx-auto p-2 grid gap-8">
        <CardMetrics />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader class="flex items-center justify-between pb-2">
                    <CardTitle class="text-sm font-medium"
                        >Top Selling Products</CardTitle
                    >
                    <a
                        href="#"
                        class="text-sm font-medium text-primary"
                        data-sveltekit-preload-data="tap"
                    >
                        View All
                    </a>
                </CardHeader>
                <CardContent>
                    <div class="grid gap-4">
                        {#each Array(4) as _}
                            <div class="flex items-center gap-4">
                                <!-- svelte-ignore a11y-img-redundant-alt -->
                                <img
                                    src="http://2.bp.blogspot.com/-swesfwQN5HQ/VPdQ-CCcg1I/AAAAAAAAA2E/sDxeH4J_6lo/s1600/coffee-1.jpg"
                                    width="64"
                                    height="64"
                                    alt="Product Image"
                                    class="rounded-md object-cover"
                                />
                                <div>
                                    <div class="font-medium">Acme Widgets</div>
                                    <p class="text-xs text-muted-foreground">
                                        Innovative widgets for your business
                                    </p>
                                    <div class="font-bold text-primary">
                                        $24.99
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader class="flex items-center justify-between pb-2">
                    <CardTitle class="text-sm font-medium"
                        >Featured Promotions</CardTitle
                    >
                    <a
                        href="#"
                        class="text-sm font-medium text-primary"
                        data-sveltekit-preload-data="tap"
                    >
                        View All
                    </a>
                </CardHeader>
                <CardContent>
                    <div class="grid gap-4">
                        {#each Array(4) as _}
                            <div class="flex items-center gap-4">
                                <!-- svelte-ignore a11y-img-redundant-alt -->
                                <img
                                    src="http://2.bp.blogspot.com/-swesfwQN5HQ/VPdQ-CCcg1I/AAAAAAAAA2E/sDxeH4J_6lo/s1600/coffee-1.jpg"
                                    width="64"
                                    height="64"
                                    alt="Promotion Image"
                                    class="rounded-md object-cover"
                                />
                                <div>
                                    <div class="font-medium">Summer Sale</div>
                                    <p class="text-xs text-muted-foreground">
                                        Save up to 50% on selected items
                                    </p>
                                    <div class="font-bold text-primary">
                                        Ends July 31
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader class="flex items-center justify-between pb-2">
                    <CardTitle class="text-sm font-medium"
                        >Recent Orders</CardTitle
                    >
                    <a
                        href="#"
                        class="text-sm font-medium text-primary"
                        data-sveltekit-preload-data="tap"
                    >
                        View All
                    </a>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead class="w-[100px]">Order</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead class="hidden md:table-cell"
                                    >Date</TableHead
                                >
                                <TableHead class="text-right">Amount</TableHead>
                                <TableHead class="hidden sm:table-cell"
                                    >Status</TableHead
                                >
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell class="font-medium">#3210</TableCell>
                                <TableCell>Olivia Martin</TableCell>
                                <TableCell class="hidden md:table-cell"
                                    >February 20, 2023</TableCell
                                >
                                <TableCell class="text-right">$42.25</TableCell>
                                <TableCell class="hidden sm:table-cell">
                                    <Badge class="text-xs" variant="secondary">
                                        Shipped
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell class="font-medium">#3209</TableCell>
                                <TableCell>Ava Johnson</TableCell>
                                <TableCell class="hidden md:table-cell"
                                    >January 5, 2023</TableCell
                                >
                                <TableCell class="text-right">$74.99</TableCell>
                                <TableCell class="hidden sm:table-cell">
                                    <Badge class="text-xs" variant="secondary">
                                        Paid
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell class="font-medium">#3204</TableCell>
                                <TableCell>Michael Johnson</TableCell>
                                <TableCell class="hidden md:table-cell"
                                    >August 3, 2022</TableCell
                                >
                                <TableCell class="text-right">$64.75</TableCell>
                                <TableCell class="hidden sm:table-cell">
                                    <Badge class="text-xs" variant="outline">
                                        Unfulfilled
                                    </Badge>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell class="font-medium">#3203</TableCell>
                                <TableCell>Lisa Anderson</TableCell>
                                <TableCell class="hidden md:table-cell"
                                    >July 15, 2022</TableCell
                                >
                                <TableCell class="text-right">$34.50</TableCell>
                                <TableCell class="hidden sm:table-cell">
                                    <Badge class="text-xs" variant="secondary">
                                        Shipped
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card>
                <CardHeader class="flex items-center justify-between pb-2">
                    <CardTitle class="text-sm font-medium"
                        >Customer Analytics</CardTitle
                    >
                    <a
                        href="#"
                        class="text-sm font-medium text-primary"
                        data-sveltekit-preload-data="tap"
                    >
                        View All
                    </a>
                </CardHeader>
                <CardContent>
                    <!-- <BarchartChart class="aspect-[9/4]" /> -->
                </CardContent>
            </Card>
        </div>
    </main>
</div>
