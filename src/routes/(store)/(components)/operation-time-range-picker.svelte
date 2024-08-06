<script>
    //@ts-nocheck
    import { Label } from "$lib/components/ui/label";
    import { Switch } from "$lib/components/ui/switch";
    import {
        Select,
        SelectTrigger,
        SelectValue,
        SelectContent,
        SelectGroup,
        SelectLabel,
        SelectItem,
    } from "$lib/components/ui/select";
    import { Button } from "$lib/components/ui/button";

    const timeValues = [
        "12:00 AM",
        "01:00 AM",
        "02:00 AM",
        "03:00 AM",
        "04:00 AM",
        "05:00 AM",
        "06:00 AM",
        "07:00 AM",
        "08:00 AM",
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "01:00 PM",
        "02:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
        "08:00 PM",
        "09:00 PM",
        "10:00 PM",
        "11:00 PM",
    ];

    const dailyOpentime = {
        monday: {
            open: true,
            opening: null,
            closing: null,
        },
        tuesday: {
            open: true,
            opening: null,
            closing: null,
        },
        wednesday: {
            open: true,
            opening: null,
            closing: null,
        },
        thursday: {
            open: true,
            opening: null,
            closing: null,
        },
        friday: {
            open: true,
            opening: null,
            closing: null,
        },
        saturday: {
            open: true,
            opening: null,
            closing: null,
        },
        sunday: {
            open: true,
            opening: null,
            closing: null,
        },
    };
</script>

{#each Object.entries(dailyOpentime) as [key, value]}
    <div class="grid gap-2 grid-cols-4 items-center pt-2">
        <h1 class="text-xs font-semibold">
            {key.toUpperCase()}
        </h1>
        <div class="flex items-center space-x-2">
            <Switch
                id="open-store"
                bind:checked={dailyOpentime[key].open}
                onCheckedChange={(e) => (dailyOpentime[key].open = e)}
            />
            <Label for="open-store"
                >{dailyOpentime[key].open ? "OPEN" : "CLOSE"}</Label
            >
        </div>
        <div>
            <Select
                id="category"
                selected={{
                    value: dailyOpentime[key].opening,
                }}
                disabled={!dailyOpentime[key].open}
                onSelectedChange={(e) => (dailyOpentime[key].opening = e.value)}
            >
                <SelectTrigger>
                    <SelectValue
                        placeholder={dailyOpentime[key]?.opening ??
                            "Opening time"}
                    />
                </SelectTrigger>
                <SelectContent class="h-60 overflow-auto">
                    <SelectGroup>
                        <SelectLabel>Opening time:</SelectLabel>
                        {#each timeValues as time}
                            <SelectItem value={time}>{time}</SelectItem>
                        {/each}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div class="flex items-center">
            <span class="mr-2">-</span>
            <Select
                id="category"
                selected={{
                    value: dailyOpentime[key].closing,
                }}
                disabled={!dailyOpentime[key].open}
                onSelectedChange={(e) => (dailyOpentime[key].closing = e.value)}
            >
                <SelectTrigger>
                    <SelectValue
                        placeholder={dailyOpentime[key]?.closing ??
                            "Closing time"}
                    />
                </SelectTrigger>
                <SelectContent class="h-60 overflow-auto">
                    <SelectGroup>
                        <SelectLabel>Closing time</SelectLabel>
                        {#each timeValues as time}
                            <SelectItem value={time}>{time}</SelectItem>
                        {/each}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
{/each}
