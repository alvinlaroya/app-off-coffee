<script>
	//@ts-nocheck
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount } from "svelte";

	import NavigationDrawer from "$lib/components/reusable/NavigationDrawer.svelte";
	import NavigatingContainer from "$lib/components/reusable/NavigatingContainer.svelte";

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
		LoaderCircle,
	} from "lucide-svelte";

	import AppBar from "$lib/components/reusable/AppBar.svelte";
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
	import { Button } from "$lib/components/ui/button";

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
			text: "Analytics",
			link: "/store.analytics",
		},
		{
			icon: Store,
			text: "Manage Store",
			link: "/store.manage",
		},
		{
			icon: Settings,
			text: "Account",
			link: "/store.account",
		},
	];

	let openSidebar = false;
	let newCreatedAccountDialog = false;

	$: userAuthData = $page.data.user.user_metadata;

	onMount(() => {
		if (!userAuthData?.fname) {
			newCreatedAccountDialog = true;
		}
	});

	const continueHandler = () => {
		newCreatedAccountDialog = false;
		goto("store.account");
	};

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		} else {
			goto("/auth");
		}
	};
</script>

<AlertDialog.Root bind:open={newCreatedAccountDialog}>
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>New Created Account</AlertDialog.Title>
			<AlertDialog.Description>
				Please fill out all the required information for you to access
				the dashboard
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Action on:click={continueHandler}
				>Continue</AlertDialog.Action
			>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

<NavigationDrawer
	groupName="/(store)"
	{navigations}
	open={openSidebar}
	on:close={() => (openSidebar = false)}
	bind:openSidebar
	on:logout={logout}
/>

<div
	class="flex-1 ml-0 w-full md:ml-20 md:w-[90%] lg:ml-[16.666667%] lg:w-5/6 relative"
>
	<NavigatingContainer />
	<AppBar bind:openSidebar />
	<main class="p-5 py-20 bg-slate-100 w-full min-h-screen z-0">
		<slot />
	</main>
</div>
