<script setup lang="ts">
import type { Path, Polygon } from "leaflet";

const { $L } = useNuxtApp();
const map = ref<any>(null);
let geojsonLayer: any = null;

// Path style for normal polygons
const defaultStyle = {
  weight: 1,
  color: "#333",
  fillColor: "#3b82f6",
  fillOpacity: 0.2,
};

// Path style for hovered polygon
const highlightStyle = {
  weight: 2,
  color: "#000",
  fillColor: "#10b981",
  fillOpacity: 0.5,
};

onMounted(async () => {
  map.value = $L.map("map").setView([13.2437, 123.7238], 11);

  $L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map.value);

  loadMunicipalities();
});

const loadMunicipalities = () => {
  fetch("/geojson/albay_municipalities.json")
    .then((r) => r.json())
    .then((data) => {
      geojsonLayer = $L
        .geoJSON(data, {
          style: defaultStyle,

          onEachFeature: (feature, layer) => {
            const polygonLayer = layer as Polygon;
            // Mouse enter → highlight
            layer.on("mouseover", () => {
              polygonLayer.setStyle(highlightStyle);
            });

            // Mouse leave → reset
            layer.on("mouseout", () => {
              geojsonLayer.resetStyle(layer);
            });

            // Click → zoom into the municipality
            layer.on("click", () => {
              map.value.fitBounds(polygonLayer.getBounds(), {
                padding: [20, 20],
              });
            });
          },
        })
        .addTo(map.value);
    });
};
</script>

<template>
  <div id="map" class="w-full h-screen"></div>
</template>
