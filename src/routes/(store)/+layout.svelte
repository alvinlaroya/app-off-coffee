<script>
	//@ts-nocheck
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	import NavigationDrawer from "$lib/components/reusable/NavigationDrawer.svelte";

	import {
		LayoutDashboard,
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

	import AppBar from "$lib/components/reusable/AppBar.svelte";

	export let data;
	$: ({ supabase } = data);

	const navigations = [
		{
			icon: LayoutDashboard,
			text: "Dashboard",
			link: "/store.dashboard",
		},
		{
			icon: ShoppingCart,
			text: "Orders",
			link: "/store.orders",
			badge: 14,
		},
		{
			icon: Package2,
			text: "Products",
			link: "/store.products",
		},
		{
			icon: Users,
			text: "Customers",
			link: "/store.customers",
		},
		{
			icon: LineChart,
			text: "Analyytics",
			link: "/store.analytics",
		},
	];

	let openSidebar = false;

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			goto("/auth");
		}
	};
</script>

<div class="flex min-h-screen w-full overflow-hidden">
	<NavigationDrawer
		groupName="/(store)"
		{navigations}
		open={openSidebar}
		on:close={() => (openSidebar = false)}
		on:logout={logout}
	/>
	<div class="flex-1 ml-0 w-full md:ml-[16.666667%] md:w-5/6 relative">
		<AppBar />
		<main class="p-5 overflow-auto py-20">
			<slot />
		</main>
	</div>
</div>
