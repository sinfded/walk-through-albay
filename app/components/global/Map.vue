<script setup lang="ts">
import type { Layer, Path, Polygon } from "leaflet";
import { PlusIcon, MinusIcon, HomeIcon, Maximize } from "lucide-vue-next";

const { $L } = useNuxtApp();
const map = ref<any>(null);
let geojsonLayer: any = null;

// Path style for normal polygons
const defaultStyle = {
  weight: 1,
  color: "#10b981",
  fillColor: "#10b981",
  fillOpacity: 0.2,
};

// Path style for hovered polygon
const highlightStyle = {
  weight: 2,
  color: "#10b981",
  fillColor: "#10b981",
  fillOpacity: 0.5,
};

onMounted(async () => {
  map.value = $L
    .map("map", { zoomControl: false })
    .setView([13.2437, 123.7238], 11);

  $L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map.value);

  loadMunicipalities();
});

const zoomIn = () => {
  if (map.value) map.value.zoomIn();
};

const zoomOut = () => {
  if (map.value) map.value.zoomOut();
};

const maximize = () => {
  if (map.value) map.value.setView([13.2437, 123.7238], 11);
};

const loadMunicipalities = () => {
  fetch("/geojson/albay_municipalities.json")
    .then((r) => r.json())
    .then((data) => {
      geojsonLayer = $L
        .geoJSON(data, {
          style: defaultStyle,

          onEachFeature: (feature, layer) => {
            const polygonLayer = layer as Polygon;

            // Tooltip
            layer.bindTooltip(feature.properties.adm3_en, {
              sticky: true,
              direction: "top",
            });

            // Mouse enter → highlight
            layer.on("mouseover", () => {
              polygonLayer.setStyle(highlightStyle);
            });

            // Mouse leave → reset
            layer.on("mouseout", () => {
              geojsonLayer.resetStyle(layer);
            });

            // Click → zoom into the municipality
            onCityClick(layer);
          },
        })
        .addTo(map.value);
    });
};

const onCityClick = (layer: Layer) => {
  const polygonLayer = layer as Polygon;
  layer.on("click", () => {
    map.value.fitBounds(polygonLayer.getBounds(), {
      padding: [20, 20],
    });
  });
};
</script>

<template>
  <div class="w-screen h-screen relative">
    <div id="map" class="w-full h-full absolute z-10"></div>
    <!-- Zoom Controls -->
    <div class="absolute top-4 right-4 z-50 flex gap-2">
      <NuxtLink to="/">
        <Button variant="outline" size="icon"> <HomeIcon /></Button>
      </NuxtLink>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline" class="min-w-56"> Albay </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56" align="center">
          <DropdownMenuLabel>Municipalities/Cities</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div class="absolute bottom-4 right-4 z-50 flex gap-2">
      <div class="flex">
        <Button
          variant="outline"
          size="icon"
          @click="zoomIn"
          class="rounded-r-none"
        >
          <PlusIcon
        /></Button>
        <Button
          variant="outline"
          size="icon"
          @click="zoomOut"
          class="rounded-l-none"
          ><MinusIcon />
        </Button>
      </div>
      <Button variant="outline" size="icon" @click="maximize"
        ><Maximize />
      </Button>
    </div>
  </div>
</template>
