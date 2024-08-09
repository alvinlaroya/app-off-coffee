<script lang="ts">
	import { page } from "$app/stores";
	import { setContext } from "svelte";
	import UserAuthForm from "./(components)/user-auth-form.svelte";
	import Button from "$lib/components/ui/button/button.svelte";
	/* import AuthenticationLight from "$lib/img/examples/authentication-light.png?enhanced";
	import AuthenticationDark from "$lib/img/examples/authentication-dark.png?enhanced"; */

	$: formType = $page?.route?.id === "/auth" ? "signin" : "signup";
	$: setContext("formType", formType);
</script>

<!-- <div class="md:hidden">
	<enhanced:img src={AuthenticationLight} alt="Authentication" class="block dark:hidden" />
	<enhanced:img src={AuthenticationDark} alt="Authentication" class="hidden dark:block" />
</div> -->
<div
	class="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0"
>
	<Button
		href="auth/signup"
		class="relative md:absolute right-4 top-4 md:right-8 md:top-8"
	>
		Signup
	</Button>
	<div
		class="bg-muted relative hidden h-[100vh] flex-col p-10 text-white lg:flex dark:border-r"
	>
		<div
			class="absolute inset-0 bg-cover bg-center"
			style="
				background-image:
					url(https://wallpapercave.com/wp/wp6701661.jpg);"
		/>
		<div class="relative z-20 flex items-center text-lg font-medium">
			<!-- <Command class="mr-2 h-6 w-6" /> -->
			<a href="/"> App Of Coffee </a>
		</div>
		<div class="relative z-20 mt-auto">
			<blockquote class="space-y-2">
				<p class="text-lg">
					&ldquo;This library has saved me countless hours of work and
					helped me deliver stunning designs to my clients faster than
					ever before. Highly recommended!&rdquo;
				</p>
				<footer class="text-sm">Sofia Davis</footer>
			</blockquote>
		</div>
	</div>
	<div class="p-0">
		<div
			class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mt-[50%] lg:mt-[5%]"
		>
			<div class="flex flex-col space-y-2 text-center">
				<h1 class="text-2xl font-semibold tracking-tight">
					Login with your credentials
				</h1>
				<p class="text-muted-foreground text-sm">
					Enter your email and password below to manage your store
				</p>
			</div>
			<UserAuthForm />
			<p class="text-muted-foreground px-8 text-center text-sm">
				By clicking continue, you agree to our
				<a
					href="/terms"
					class="hover:text-primary underline underline-offset-4"
				>
					Terms of Service
				</a>
				and
				<a
					href="/privacy"
					class="hover:text-primary underline underline-offset-4"
				>
					Privacy Policy
				</a>
				.
			</p>
		</div>
	</div>
</div>
