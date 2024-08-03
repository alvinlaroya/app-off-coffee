<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
	import { Badge } from "$lib/components/ui/badge";
	import { Input } from "$lib/components/ui/input";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
	import { Button } from "$lib/components/ui/button";

	import {
		House,
		ShoppingCart,
		Package,
		Package2,
		Users,
		Search,
		LineChart,
		Store,
		Menu,
		Mail,
		Settings,
		LogOut,
	} from "lucide-svelte";
	import { Root } from "postcss";

	export let data;
	$: ({ supabase } = data);

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			goto("/auth");
		}
	};

	const navigations = [
		{
			icon: House,
			text: "Home",
			link: "/private",
		},
		{
			icon: ShoppingCart,
			text: "Orders",
			link: "/private/orders",
			badge: 14,
		},
		{
			icon: Package2,
			text: "Products",
			link: "/private/products",
		},
		{
			icon: Users,
			text: "Customers",
			link: "/private/customers",
		},
		{
			icon: LineChart,
			text: "Analyytics",
			link: "/private/analytics",
		},
	];
</script>

<div class="grid min-h-screen w-full overflow-hidden lg:grid-cols-[280px_1fr]">
	<div class="hidden border-r bg-muted/40 lg:block">
		<div class="flex flex-col gap-2 relative h-[100vh]">
			<div class="flex h-[60px] items-center px-6">
				<a href="#" class="flex items-center gap-2 font-semibold">
					<Store class="h-6 w-6" />
					<span class="">Acme Inc</span>
				</a>
			</div>
			<div class="flex-1">
				<nav class="grid items-start px-4 text-sm font-medium">
					{#each navigations as navigation}
						<a
							href={navigation.link}
							class="flex items-center gap-3 rounded-lg px-3 py-3 text-gray transition-all hover:text-primary"
							class:bg-gray-300={navigation.link ===
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
				<Button class="w-full" on:click={logout}>
					<LogOut class="mr-2 h-4 w-4" />
					Logout
				</Button>
			</div>
		</div>
	</div>
	<div class="flex flex-col">
		<header
			class="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6"
		>
			<a href={"/private"} class="lg:hidden">
				<Package2 class="h-6 w-6" />
				<span class="sr-only">Home</span>
			</a>
			<div class="flex-1">
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
			<div
				class="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4"
			>
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
						<DropdownMenu.Item on:click={logout}
							>Logout</DropdownMenu.Item
						>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		</header>
		<main class="p-5">
			<slot />
		</main>
	</div>
</div>
