<template>
  <div class="h-screen w-screen flex bg-gray-100">
    <div class="w-[450px] h-screen p-6 pr-0">
      <div class="w-full h-full">
        <div class="flex flex-col gap-2 h-full">
          <div class="flex gap-2">
            <NuxtLink to="/">
              <Button variant="outline" size="icon"> <HomeIcon /></Button>
            </NuxtLink>
            <DropdownMenu class="w-full">
              <DropdownMenuTrigger as-child>
                <Button variant="outline" class="min-w-56 grow"> Albay </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent class="w-full" align="end">
                <DropdownMenuLabel>Municipalities/Cities</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    v-for="(mun, idm) in municipalities"
                    :key="idm"
                    @click="selectMunicipality(mun.id)"
                  >
                    {{ mun.properties.adm3_en }}
                    <!-- <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>  -->
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            class="p-4 w-full bg-white shadow rounded-2xl h-full overflow-auto"
          >
            <div class="w-full h-full" v-if="selectedMun != undefined">
              <div
                class="relative rounded-lg py-8 px-6 text-center shadow-lg bg-center bg-cover bg-no-repeat h-[350px]"
                :style="{
                  backgroundImage: `url(${selectedMun.bg_image_url})`,
                }"
              >
                <div
                  class="backdrop-blur-sm text-white bg-black/40 rounded-b-lg absolute bottom-0 left-0 right-0 p-2 font-bold uppercase text-xl"
                >
                  {{ selectedMun.properties.adm3_en }}
                </div>
              </div>
              <div class="rounded-lg border mt-4 shadow-lg">
                <Accordion
                  type="single"
                  collapsible
                  class="w-full"
                  default-value="sites"
                >
                  <AccordionItem value="history">
                    <AccordionTrigger class="py-3 px-4"
                      >History</AccordionTrigger
                    >
                    <AccordionContent class="py-3 px-4 pt-0">
                      <p class="indent-8 text-justify font-medium">
                        {{ selectedMun.description }}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="sites">
                    <AccordionTrigger class="py-3 px-4">Sites</AccordionTrigger>
                    <AccordionContent class="py-3 px-4 pt-0">
                      <div
                        v-for="(site, ids) in sites"
                        :key="ids"
                        class="shadow px-3 py-2 border rounded-lg mb-2"
                      >
                        <div class="flex justify-between items-center">
                          <span class="text-sm font-medium">{{
                            site.name
                          }}</span>
                          <Button
                            @click="zoomInSite(site)"
                            variant="ghost"
                            size="icon"
                            class="text-blue-400"
                            ><MapPinIcon
                          /></Button>
                        </div>
                        <div
                          class="flex flex-col text-xs font-medium text-muted-foreground"
                        >
                          <span>Latitude: {{ site.coordinates.latitude }}</span>
                          <span
                            >Longitude: {{ site.coordinates.longitude }}</span
                          >
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ClientOnly>
      <Map
        :site="selectedSite"
        :selected-city-sites="sites"
        @select-city="onSelectCity"
      />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {
  PlusIcon,
  MinusIcon,
  HomeIcon,
  Maximize,
  MapPinIcon,
} from "lucide-vue-next";
import { municipalities } from "~/data/albay_municipalities.json";

type Municipality = {
  id: number;
  properties: any;
  bg_image_url: string;
  description: string;
};

type Site = {
  name: string;
  municipality_id: number;
  municipality_name: string;
  category: string;
  site_images: any;
  coordinates: any;
};

const selectedSite = ref<Site>();
const sites = ref<Site[]>([]);

const selectedMun = ref<Municipality>();
const supabase = useSupabaseClient();

const selectMunicipality = (munId: number) => {
  selectedMun.value = municipalities.find((mun) => mun.id == munId);
};

const onLoadSites = async () => {
  if (selectedMun.value) {
    const { data, error } = await supabase
      .from("sites")
      .select()
      .eq("municipality_id", selectedMun.value?.id);

    if (error) console.error(error);

    sites.value = data as Site[];
  }
};

const onSelectCity = (id: number) => {
  selectMunicipality(id);
};

const zoomInSite = (site: Site) => {
  selectedSite.value = site;
};

onMounted(() => {
  selectMunicipality(500501000);
  onLoadSites();
});

watch(selectedMun, (val) => {
  onLoadSites();
});
</script>

<style></style>
