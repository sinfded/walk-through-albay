<script setup lang="ts">
import type { Layer, Map, Path, Polygon } from "leaflet";
import {
  PlusIcon,
  MinusIcon,
  HomeIcon,
  Maximize,
  ArrowUpIcon,
  ArrowDownIcon,
} from "lucide-vue-next";
import { municipalities } from "~/data/albay_municipalities.json";
import L from "leaflet";
import type { CarouselApi } from "../ui/carousel";

type Site = {
  name: string;
  municipality_id: number;
  municipality_name: string;
  category: string;
  description: string;
  recognized_by: string;
  location: string;
  site_images: {
    front: string;
    left: string;
    right: string;
    rear: string;
    interior: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
  id: number;
  created_at: string;
};

const props = defineProps(["site", "selectedCitySites", "municipality_id"]);
const emit = defineEmits(["selectCity", "selectSite"]);

const map = ref<L.Map | null>(null);
const mapRef = ref<any>(null);
const geojson = ref(undefined);
const geoJsonLayer = ref<L.GeoJSON | null>(null);
const siteMarkers = ref<Site[]>([]);
const selectedSite = ref<Site | null>(null);

const customIcon = L.icon({
  iconUrl: "/icons/pin.png", // from public/ folder
  iconSize: [30, 40], // adjust size
  iconAnchor: [20, 40], // point of the icon at the marker location
  popupAnchor: [0, -40],
});

const siteImages = computed(() => {
  let site_images: any = {};
  if (selectedSite.value) {
    Object.entries(selectedSite.value.site_images).forEach(([key, value]) => {
      if (value === null || value === "") return;
      site_images[key] = value;
    });
  }
  return site_images;
});

const loadMunicipalities = () => {
  fetch("/geojson/albay_municipalities.geojson")
    .then((r) => r.json())
    .then((data) => {
      geoJsonLayer.value = L.geoJSON(data, {
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
            if (geoJsonLayer.value) geoJsonLayer.value.resetStyle(layer);
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
  if (map.value) {
    if (geoJsonLayer.value == null) {
      loadMunicipalities();
    }
    map.value.setView([13.2437, 123.7238], 11);
    selectedSite.value = null;
    emit("selectCity", 0);
  }
};

const zoomInSite = (lat: number, long: number, site_id: number) => {
  if (!map.value) return;
  if (geoJsonLayer.value) {
    geoJsonLayer.value.clearLayers();
    geoJsonLayer.value = null;
  }
  map.value.setView([lat, long], 20, { animate: true });
  console.log(props.selectedCitySites);

  if (!selectedSite.value) emit("selectSite", site_id);
};

const onCityClick = (layer: Layer) => {
  const polygonLayer = layer as Polygon;
  layer.on("click", () => {
    if (map.value) {
      map.value.fitBounds(polygonLayer.getBounds(), {
        padding: [20, 20],
      });
      emit("selectCity", polygonLayer.feature?.id);
    }
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

const onMapReady = () => {
  if (mapRef.value?.leafletObject) {
    map.value = mapRef.value?.leafletObject;
  }
};

const carouselApi = ref<CarouselApi>();

const setApi = (val: CarouselApi) => {
  carouselApi.value = val;
};

const nextImage = () => {
  if (carouselApi.value) {
    carouselApi.value.scrollNext();
  }
};

const prevImage = () => {
  if (carouselApi.value) carouselApi.value.scrollPrev();
};

onMounted(() => {
  loadMunicipalities();
});

watch(
  props,
  () => {
    siteMarkers.value = props.selectedCitySites;
    if (props.site) {
      const lat = props.site.coordinates.latitude;
      const long = props.site.coordinates.longitude;

      zoomInSite(lat, long, props.site.id);
      selectedSite.value = props.site;
      console.log(selectedSite.value);
    }
    if (props.municipality_id) {
      if (geoJsonLayer.value) {
        geoJsonLayer.value.eachLayer((layer: any) => {
          if (props.municipality_id == layer.feature.id) {
            map.value!.fitBounds(layer.getBounds(), {
              padding: [20, 20],
            });
          }
        });
      }
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div class="w-full h-full p-6 rounded-lg relative">
    <LMap
      ref="mapRef"
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
      <LMarker
        v-for="marker in siteMarkers"
        :key="marker.id"
        :lat-lng="[marker.coordinates.latitude, marker.coordinates.longitude]"
        :draggable="false"
        @click="
          zoomInSite(
            marker.coordinates.latitude,
            marker.coordinates.longitude,
            marker.id
          )
        "
      >
        <LTooltip>{{ marker.name }}</LTooltip>
        <LIcon
          :icon-url="`/pins/${marker.category}.png`"
          :icon-size="[30, 40]"
          :icon-anchor="[20, 40]"
        />
      </LMarker>
    </LMap>
    <div class="absolute top-8 right-8 z-50 flex flex-col gap-2 items-end">
      <div class="flex gap-2">
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
      <div
        v-if="selectedSite"
        class="h-[400px] flex gap-2 bg-white shadow rounded-xl border p-3"
      >
        <div class="flex gap-2">
          <Carousel
            @init-api="setApi"
            orientation="vertical"
            class="relative w-full max-w-xs"
            :opts="{
              align: 'start',
              loop: true,
            }"
          >
            <CarouselContent class="-mt-1 h-[380px] w-[250px]">
              <CarouselItem
                v-for="(img, key) in siteImages"
                :key="key"
                class="p-0"
              >
                <div class="h-full py-1">
                  <div
                    class="bg-center bg-cover bg-no-repeat h-full rounded-lg shadow bg-muted flex justify-end items-start"
                    :style="{ backgroundImage: `url(${img})` }"
                  >
                    <Badge class="capitalize mt-1 mr-1" variant="secondary"
                      >{{ key }} View</Badge
                    >
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
          <div class="flex flex-col gap-2 justify-center">
            <Button variant="outline" size="icon" @click="nextImage">
              <ArrowUpIcon
            /></Button>
            <Button variant="outline" size="icon" @click="prevImage"
              ><ArrowDownIcon />
            </Button>
          </div>
        </div>
        <div class="w-[300px] overflow-auto">
          <span class="font-semibold">{{ selectedSite.name }}</span>
          <p class="text-sm font-medium mt-1 text-justify indent-8 p-1">
            {{ selectedSite.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
