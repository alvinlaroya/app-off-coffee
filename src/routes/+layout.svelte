<script>import "../app.css";
//@ts-nocheck
import { invalidate } from "$app/navigation";
import { onMount } from "svelte";
import { Toaster } from "$lib/components/ui/sonner";

export let data;
$: ({ session, supabase } = data);

onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
        if (newSession?.expires_at !== session?.expires_at) {
            invalidate("supabase:auth");
        }
    });

    return () => data.subscription.unsubscribe();
});</script>

<Toaster />

<slot></slot>
