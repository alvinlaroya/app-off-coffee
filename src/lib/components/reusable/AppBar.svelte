<script>
    //@ts-nocheck
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
    import { Badge } from "$lib/components/ui/badge";
    import { Input } from "$lib/components/ui/input";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";

    import { Store, Search, Menu } from "lucide-svelte";

    export let openSidebar;
</script>

<header
    class="flex h-14 w-full md:w-[90%] lg:w-5/6 lg:h-[60px] items-center gap-4 border-b bg-white px-4 fixed top-0 z-40"
>
    <a href={"/private"} class="lg:hidden">
        <Store class="h-6 w-6" />
        <span class="sr-only">Home</span>
    </a>
    <div class="hidden md:flex">
        <Breadcrumb.Root>
            <Breadcrumb.List>
                <Breadcrumb.Item>
                    <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                    <Breadcrumb.Link href="/docs/components"
                        >Components</Breadcrumb.Link
                    >
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                    <Breadcrumb.Page class="font-bold"
                        >Recent Orders</Breadcrumb.Page
                    >
                </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
    </div>
    <div class="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form class="ml-auto flex-1 sm:flex-initial">
            <div class="relative">
                <Search
                    class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                />
                <Input
                    type="search"
                    placeholder="Search orders..."
                    class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
            </div>
        </form>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    class="rounded-full"
                    on:click={() => (openSidebar = true)}
                >
                    <Menu />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Label>My Account</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Settings</DropdownMenu.Item>
                <DropdownMenu.Item>Support</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item on:click={() => console.log("LOGOUT")}>Logout</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    </div>
</header>
