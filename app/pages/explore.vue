<template>
  <div
    class="relative w-full h-screen bg-cover bg-center bg-no-repeat"
    :style="{ backgroundImage: `url(${bg_image})` }"
  >
    <!-- Dark overlay for readability -->
    <div class="absolute inset-0 bg-black/40"></div>

    <!-- Content on top -->
    <div
      class="relative z-10 flex flex-col items-center justify-center h-full p-6"
    >
      <WebHeader />
      <div class="relative z-20 px-6 w-full">
        <div class="flex w-full h-[550px]">
          <div class="basis-1/4 p-1">
            <div
              class="backdrop-blur-lg w-[350px] bg-white/30 rounded-2xl py-8 px-6 text-center shadow-lg h-full text-white"
            >
              <div>
                <span class="albay-font text-5xl"
                  >{{ currentMun?.properties.adm3_en }},</span
                ><span class="text-xl font-bold italic uppercase"> Albay</span>
              </div>
              <div>
                <p class="text-justify font-medium indent-8 mt-2">
                  {{ currentMun?.description }}
                </p>
              </div>
            </div>
          </div>
          <div class="basis-3/4 px-6">
            <Carousel
              @init-api="setApi"
              class="w-full"
              :opts="{
                align: 'start',
                loop: true,
              }"
            >
              <CarouselContent class="-ml-1 min-h-[400px] items-center">
                <CarouselItem
                  v-for="(mun, index) in municipalities"
                  :key="index"
                  class="pl-1 md:basis-1/4 lg:basis-1/5"
                >
                  <div class="py-1 px-2">
                    <div
                      class="relative rounded-2xl py-8 px-6 text-center shadow-lg bg-center bg-cover bg-no-repeat"
                      :style="{ backgroundImage: `url(${mun.bg_image_url})` }"
                      :class="[
                        currentMun?.id == mun.id ? 'h-[400px]' : 'h-[350px]',
                      ]"
                    >
                      <div
                        class="backdrop-blur-sm text-white bg-black/40 rounded-b-2xl absolute bottom-0 left-0 right-0 p-2 font-bold uppercase text-xl"
                      >
                        {{ mun.properties.adm3_en }}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
            <div class="flex gap-2 pl-2 pt-6">
              <Button
                variant="outline"
                size="icon"
                @click="prevMunicipality"
                class="text-white bg-transparent"
              >
                <ArrowLeftIcon
              /></Button>
              <Button
                variant="outline"
                size="icon"
                @click="nextMunicipality"
                class="text-white bg-transparent"
                ><ArrowRightIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { municipalities as albay_mun } from "~/data/albay_municipalities.json";
import type { CarouselApi } from "~/components/ui/carousel";
import {
  ArrowLeft,
  ArrowLeftIcon,
  ArrowRight,
  ArrowRightIcon,
  HomeIcon,
  Maximize,
} from "lucide-vue-next";
import { watchOnce } from "@vueuse/core";

type Municipality = {
  id: number;
  properties: any;
  bg_image_url: string;
  description: string;
};

const municipalities = ref<Municipality[]>([]);
const bg_image = ref<string | undefined>("/images/albay-bg.webp");
const carouselApi = ref<CarouselApi>();
const currentMun = ref<Municipality>();

const setApi = (val: CarouselApi) => {
  carouselApi.value = val;
};

const nextMunicipality = () => {
  if (carouselApi.value) {
    carouselApi.value.scrollNext();
  }
};

const prevMunicipality = () => {
  if (carouselApi.value) carouselApi.value.scrollPrev();
};

onMounted(() => {
  onLoadMunicipalities();
});

const onLoadMunicipalities = () => {
  municipalities.value = albay_mun.map((mun: Municipality) => {
    return {
      id: mun.id,
      properties: mun.properties,
      bg_image_url: `/images/municipalities/${mun.id}.jpg`,
      description: mun.description,
    };
  });
  currentMun.value = municipalities.value[0];
  bg_image.value = municipalities.value[0]?.bg_image_url;
  console.table(municipalities.value);
};

watchOnce(carouselApi, (api) => {
  if (!api) return;

  api.on("select", () => {
    currentMun.value = municipalities.value[api.selectedScrollSnap()];
    bg_image.value =
      municipalities.value[api.selectedScrollSnap()]?.bg_image_url;
  });
});
</script>

<style scoped>
/* Fade-in animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.albay-font {
  font-family: "Bonheur Royale", cursive;
  font-weight: 400;
  font-style: normal;
}
</style>
