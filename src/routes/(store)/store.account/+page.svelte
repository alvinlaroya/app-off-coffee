<script>
    //@ts-nocheck
    import { page } from "$app/stores";
    import { invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";
    import { enhance, applyAction, deserialize } from "$app/forms";
    import {
        Avatar,
        AvatarImage,
        AvatarFallback,
    } from "$lib/components/ui/avatar";
    import { Label } from "$lib/components/ui/label";
    import { Input } from "$lib/components/ui/input";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import {
        Select,
        SelectTrigger,
        SelectValue,
        SelectContent,
        SelectItem,
    } from "$lib/components/ui/select";
    import { Button } from "$lib/components/ui/button";
    import { Store, AtSign } from "lucide-svelte";

    $: ({ fname, lname, email, address, phone, avatar } =
        $page.data.user.user_metadata);

    let isLoading = false;

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
</script>

{#key $page.data.user}
    <form
        use:enhance
        method="POST"
        action="?/update"
        on:submit|preventDefault={onSubmit}
    >
        <div class="w-full mx-auto grid md:grid-cols-2 gap-8">
            <div>
                <header class="bg-primary py-6 px-4 md:px-6 rounded-t-lg">
                    <div class="flex items-center gap-4">
                        <Avatar class="h-20 w-20">
                            <AvatarImage
                                src={avatar}
                                alt="profile-avatar"
                                class="object-cover"
                            />
                            <AvatarFallback>AOC</AvatarFallback>
                        </Avatar>
                        <div class="grid gap-0.5">
                            <div class="text-primary-foreground font-semibold">
                                {fname ?? ""}
                                {lname ?? ""}
                            </div>
                            <div
                                class="text-primary-foreground text-sm flex items-center"
                            >
                                <AtSign class="h-4 w-4 mr-1" />
                                {email}
                            </div>
                            <div
                                class="text-primary-foreground text-sm flex items-center"
                            >
                                <Store class="h-4 w-4 mr-1" /> Manifiesto Owner
                            </div>
                        </div>
                    </div>
                </header>
                <div class="bg-background px-4 md:px-6 py-8">
                    <nav class="flex gap-4 mb-6 border-b border-muted pb-4">
                        <a
                            href="#"
                            class="text-sm font-medium text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            Personal Info
                        </a>
                        <a
                            href="#"
                            class="text-sm font-medium text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            Account
                        </a>
                        <a
                            href="#"
                            class="text-sm font-medium text-muted-foreground hover:text-foreground"
                            prefetch={false}
                        >
                            Privacy
                        </a>
                    </nav>
                    <div class="space-y-8">
                        <section>
                            <h2 class="text-lg font-semibold">
                                Personal Information
                            </h2>
                            <div
                                class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
                            >
                                <div class="space-y-2">
                                    <Label htmlFor="fname">First Name</Label>
                                    <Input
                                        id="fname"
                                        name="fname"
                                        value={fname ?? ""}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div class="space-y-2">
                                    <Label htmlFor="lname">Last Name</Label>
                                    <Input
                                        id="lname"
                                        name="lname"
                                        value={lname ?? ""}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div class="space-y-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        value={address ?? ""}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div class="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email ?? ""}
                                        disabled
                                    />
                                </div>
                                <div class="space-y-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={phone ?? ""}
                                        disabled={isLoading}
                                    />
                                </div>
                                <div class="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        defaultValue="San Francisco, CA"
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div>
                <div class="bg-background px-4 md:px-6 py-8">
                    <div class="space-y-8">
                        <section>
                            <h2 class="text-lg font-semibold">
                                Account Settings
                            </h2>
                            <div
                                class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
                            >
                                <div class="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        value={email}
                                        disabled
                                    />
                                </div>
                                <div class="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        value="appofcoffee"
                                        type="password"
                                        disabled
                                    />
                                </div>
                                <div class="flex items-center space-x-3">
                                    <Label htmlFor="email-notifications"
                                        >Email Notifications</Label
                                    >
                                    <Checkbox
                                        id="email-notifications"
                                        defaultChecked
                                    />
                                </div>
                            </div>
                        </section>
                        <section>
                            <h2 class="text-lg font-semibold">Privacy</h2>
                            <div
                                class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4"
                            >
                                <div class="space-y-2">
                                    <Label htmlFor="profile-visibility"
                                        >Profile Visibility</Label
                                    >
                                    <Select id="profile-visibility">
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="Select visibility"
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="public"
                                                >Public</SelectItem
                                            >
                                            <SelectItem value="private"
                                                >Private</SelectItem
                                            >
                                            <SelectItem value="friends"
                                                >Friends Only</SelectItem
                                            >
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div class="space-y-2">
                                    <Label htmlFor="data-sharing"
                                        >Data Sharing</Label
                                    >
                                    <Checkbox id="data-sharing" />
                                </div>
                                <div class="space-y-2">
                                    <Label htmlFor="location-tracking"
                                        >Location Tracking</Label
                                    >
                                    <Checkbox id="location-tracking" />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <div class="flex justify-end mt-8 col-span-2">
                <div class="flex space-x-2">
                    <Button class="ml-auto" variant="destructive"
                        >Delete Account</Button
                    >
                    <Button class="ml-auto" variant="secondary"
                        >Reset Password</Button
                    >
                    <Button class="ml-auto" type="submit"
                        >{isLoading ? "Loading" : "Save Changes"}</Button
                    >
                </div>
            </div>
        </div>
    </form>
{/key}
