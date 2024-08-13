<script>
    import { getContext } from "svelte";
    import { invalidateAll, goto } from "$app/navigation";
    import { enhance, applyAction, deserialize } from "$app/forms";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { cn } from "$lib/utils.js";

    import { LoaderCircle, Facebook, Mail, Github, LogIn } from "lucide-svelte";

    let className = undefined;
    export { className as class };

    let isLoading = false;

    /** @param {{ currentTarget: EventTarget & HTMLFormElement}} event */
    async function onSubmit(event) {
        isLoading = true;

        const data = new FormData(event.currentTarget);

        const response = await fetch(event.currentTarget.action, {
            method: "POST",
            body: data,
        });

        /** @type {import('@sveltejs/kit').ActionResult} */
        const result = deserialize(await response.text());

        if (result.type === "success") {
            // rerun all `load` functions, following the successful update
            await invalidateAll();
        }

        applyAction(result);

        isLoading = false;
    }

    const formType = getContext("formType");
</script>

<div class={cn("grid gap-6", className)} {...$$restProps}>
    <!-- on:submit|preventDefault={onSubmit} -->
    <form
        use:enhance
        method="POST"
        action="?/login"
        on:submit|preventDefault={onSubmit}
    >
        <div class="grid gap-2">
            <div class="grid gap-1">
                <Label class="sr-only" for="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    placeholder="name@example.com"
                    type="email"
                    autocapitalize="none"
                    autocomplete="email"
                    autocorrect="off"
                    disabled={isLoading}
                />
            </div>
            <div class="grid gap-1">
                <Label class="sr-only" for="email">Password</Label>
                <Input
                    id="password"
                    name="password"
                    placeholder="password"
                    type="password"
                    autocapitalize="none"
                    autocomplete="password"
                    autocorrect="off"
                    disabled={isLoading}
                />
            </div>
            {#if formType === "signin"}
                <Button type="submit" disabled={isLoading}>
                    {#if isLoading}
                        <LoaderCircle color="#eab676" class="animate-spin" />
                    {:else}
                        <LogIn class="mr-2 h-4 w-4" />
                    {/if}
                    <span class="ml-3">Login</span>
                </Button>
            {:else}
                <Button
                    formaction="?/signup"
                    type="submit"
                    disabled={isLoading}
                >
                    {#if isLoading}
                        <LoaderCircle color="#eab676" class="animate-spin" />
                    {/if}
                    Signup
                </Button>
            {/if}
        </div>
    </form>
    <div class="relative">
        <div class="absolute inset-0 flex items-center">
            <span class="w-full border-t" />
        </div>
        <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-background text-muted-foreground px-2">
                Or continue with
            </span>
        </div>
    </div>
    <form method="POST" class="grid grid-cols-3">
        <Button
            variant="outline"
            type="submit"
            class="bg-[#0165E1] text-white  "
            disabled={isLoading}
            formaction="?/login&provider=facebook"
        >
            {#if isLoading}
                <!-- <Icons.spinner class="mr-2 h-4 w-4 animate-spin" /> -->
                <h1>Loading</h1>
            {:else}
                <Facebook class="mr-2 h-4 w-4" />
            {/if}
            Facebook
        </Button>
        <Button
            variant="outline"
            type="submit"
            class="bg-black text-white  "
            disabled={isLoading}
            formaction="?/login&provider=github"
        >
            {#if isLoading}
                <!-- <Icons.spinner class="mr-2 h-4 w-4 animate-spin" /> -->
                <h1>Loading</h1>
            {:else}
                <Github class="mr-2 h-4 w-4" />
            {/if}
            Github
        </Button>
        <Button
            variant="outline"
            type="submit"
            class="bg-white text-black"
            disabled={isLoading}
            formaction="?/login&provider=github"
        >
            {#if isLoading}
                <!-- <Icons.spinner class="mr-2 h-4 w-4 animate-spin" /> -->
                <h1>Loading</h1>
            {:else}
                <img src="https://supabase.com/dashboard/img/icons/apple-icon.svg" class="h-5 w-5 mr-2" alt="">
            {/if}
            Apple ID
        </Button>
    </form>
</div>
