<script setup lang="ts">
import type { Layer, Map, Path, Polygon } from "leaflet";
import { PlusIcon, MinusIcon, HomeIcon, Maximize } from "lucide-vue-next";
import { municipalities } from "~/data/albay_municipalities.json";
import L from "leaflet";

type Site = {
  name: string;
  municipality_id: number;
  municipality_name: string;
  category: string;
  site_images: any;
  coordinates: any;
};

const props = defineProps(["site"]);

const map = ref<L.Map | null>(null);
const geojson = ref(undefined);
let geoJsonLayer: any = null;

const loadMunicipalities = () => {
  fetch("/geojson/albay_municipalities.geojson")
    .then((r) => r.json())
    .then((data) => {
      geoJsonLayer = L.geoJSON(data, {
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
            geoJsonLayer.resetStyle(layer);
          });

          // Click → zoom into the municipality
          onCityClick(layer);
        },
      }).addTo(map.value as L.Map);
    });
};

const zoomIn = () => {
  if (map.value) map.value.zoomIn();
};

const zoomOut = () => {
  if (map.value) map.value.zoomOut();
};

const maximize = () => {
  if (map.value) map.value.setView([13.2437, 123.7238], 11);
};

const onCityClick = (layer: Layer) => {
  const polygonLayer = layer as Polygon;
  layer.on("click", () => {
    if (map.value)
      map.value.fitBounds(polygonLayer.getBounds(), {
        padding: [20, 20],
      });
  });
};

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

const onMapReady = (leafletMap: L.Map) => {
  map.value = leafletMap;
};

onMounted(() => {
  loadMunicipalities();
  console.log(geoJsonLayer);
});
</script>

<template>
  <div class="w-full h-full p-6 rounded-lg relative">
    <LMap
      ref="map"
      class="rounded-lg z-10"
      :zoom="11"
      :center="[13.2437, 123.7238]"
      :use-global-leaflet="true"
      :options="{
        zoomControl: false,
      }"
      @ready="onMapReady"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        layer-type="base"
        name="OpenStreetMap"
      />
    </LMap>
    <div class="absolute top-8 right-8 z-50 flex gap-2">
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
