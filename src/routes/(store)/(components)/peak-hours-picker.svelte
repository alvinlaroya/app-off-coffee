<script>
    //@ts-nocheck
    import { Label } from "$lib/components/ui/label";
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

    export let value = {
        monday: {
            from: null,
            to: null,
        },
        tuesday: {
            from: null,
            to: null,
        },
        wednesday: {
            from: null,
            to: null,
        },
        thursday: {
            from: null,
            to: null,
        },
        friday: {
            from: null,
            to: null,
        },
        saturday: {
            from: null,
            to: null,
        },
        sunday: {
            from: null,
            to: null,
        },
    };

    export let operationTime = {};

    const filteredTimeValues = (values, day) => {
        /* const a = values.indexOf(operationTime[day].opening);
        const b = values.indexOf(operationTime[day].closing);
        const result = values.splice(a, b - a + 1);
        return result; */
        return values;
    };
</script>

{#each Object.entries(value) as [key, val]}
    <div
        class="grid gap-2 grid-cols-4 items-center pt-2 my-4 md:my-0 w-full md:w-[70%]"
    >
        <h1 class="text-xs font-semibold col-span-4 md:col-span-2">
            {key.toUpperCase()}
        </h1>
        <div class="col-span-2 md:col-span-1">
            <Select
                selected={{
                    value: value[key].from,
                }}
                onSelectedChange={(e) => (value[key].from = e.value)}
                disabled={!operationTime[key].open}
            >
                <SelectTrigger>
                    <SelectValue placeholder={value[key]?.from ?? (!operationTime[key].open ? "Closed" : "From")} />
                </SelectTrigger>
                <SelectContent class="h-60 overflow-auto">
                    <SelectGroup>
                        <SelectLabel>Opening time:</SelectLabel>
                        {#each filteredTimeValues(timeValues, key) as time}
                            <SelectItem value={time}>{time}</SelectItem>
                        {/each}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div class="flex items-center col-span-2 md:col-span-1">
            <span class="mr-2">-</span>
            <Select
                selected={{
                    value: value[key].to,
                }}
                onSelectedChange={(e) => (value[key].to = e.value)}
                disabled={!operationTime[key].open}
            >
                <SelectTrigger>
                    <SelectValue placeholder={value[key]?.from ?? (!operationTime[key].open ? "Closed" : "To")} />
                </SelectTrigger>
                <SelectContent class="h-60 overflow-auto">
                    <SelectGroup>
                        <SelectLabel>Closing time</SelectLabel>
                        {#each filteredTimeValues(timeValues, key) as time}
                            <SelectItem value={time}>{time}</SelectItem>
                        {/each}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    </div>
{/each}
