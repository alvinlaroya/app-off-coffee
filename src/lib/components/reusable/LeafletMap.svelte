<script>
    //@ts-nocheck
    import { onMount, onDestroy } from "svelte";
    import { storageRestaurantUrl, days } from "$lib/constant";

    export let store = "";

    export let value;
    let leaflet;
    let mapElement;
    let map;
    let centerLocation = {
        lat: "",
        lng: "",
    };

    $: value = centerLocation;

    onMount(async () => {
        leaflet = await import("leaflet");
        await getLocation();
    });

    async function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }

    async function showPosition(position) {
        centerLocation.lat = position.coords.latitude;
        centerLocation.lng = position.coords.longitude;
        value = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
        };
        const location = {
            lat: position.coords.latitude,
            long: position.coords.longitude,
        };

        map = leaflet
            .map(mapElement)
            .setView([location.lat, location.long], 17);

        leaflet
            .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            })
            .addTo(map);

        leaflet
            .marker([location.lat, location.long])
            .bindPopup(`${store.name}`)
            .openPopup();

        map.on("drag", draggingMap);
    }

    const draggingMap = () => {
        centerLocation.lat = map.getCenter().lat;
        centerLocation.lng = map.getCenter().lng;
    };

    let mapHeight;
    let mapWidth;

    onDestroy(async () => {
        if (map) {
            console.log("Unloading Leaflet map.");
            map.remove();
        }
    });
</script>


<main class="relative">
    <img
        src={`https://www.pngplay.com/wp-content/uploads/9/Map-Marker-PNG-HD-Quality.png`}
        class="absolute z-30 h-14 w-14"
        style="left: {mapWidth / 2 - 27}px; top: {mapHeight / 2 - 58}px"
        alt=""
    />
    <div
        bind:this={mapElement}
        bind:clientHeight={mapHeight}
        bind:clientWidth={mapWidth}
        class="z-10"
    ></div>
</main>

<style>
    @import "leaflet/dist/leaflet.css";
    @import "https://unpkg.com/leaflet@1.9.3/dist/leaflet.css";
    @import "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css";
    @import "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css";
    main div {
        height: 800px;
    }
</style>
