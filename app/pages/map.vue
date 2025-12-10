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
                    <AccordionContent v-if="sites.length > 0" class="p-3 pt-0">
                      <div
                        v-for="(site, ids) in sites"
                        :key="ids"
                        class="p-3 rounded-lg flex items-center overflow-hidden truncate gap-3 hover:cursor-pointer hover:bg-gray-100"
                        @click="zoomInSite(site)"
                        :class="[ids + 1 == sites.length ? 'mb-0' : 'mb-2']"
                      >
                        <div class="min-w-12 h-12">
                          <img
                            class="w-12 h-12 object-cover rounded-full"
                            :src="site.site_images.front"
                            alt=""
                          />
                        </div>
                        <div class="flex flex-col w-[170px]">
                          <div class="min-w-0">
                            <p class="text-sm font-medium text-wrap">
                              {{ site.name }}
                            </p>
                          </div>
                          <span
                            class="text-muted-foreground font-medium text-xs italic"
                            >{{
                              categories.find(
                                (cat) => cat.value == site.category
                              )?.text
                            }}</span
                          >
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div v-else class="w-full h-full">
              <div class="w-full p-10">
                <img src="/logo.png" alt="Seal of Albay" />
              </div>
              <div class="w-full mt-4 text-center">
                <span class="text-2xl font-bold">Walk Through Albay</span>
                <p class="text-justify indent-8 mt-2 text-sm font-medium">
                  is an interactive website that takes users on a digital
                  journey through the rich history, culture, and heritage of
                  Albay Province. It features an engaging GIS-based map that
                  highlights the province’s historical structures, landmarks,
                  and cultural sites, allowing visitors to explore each location
                  with detailed descriptions, images, and stories from the past.
                  The website aims to preserve and promote Albay’s historical
                  identity, offering an educational and immersive experience for
                  students, researchers, tourists, and locals alike. Through
                  this virtual walkthrough, users can discover how Albay’s
                  vibrant culture and enduring legacy continue to shape its
                  communities today.
                </p>
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
        :municipality_id="selectedMun?.id"
        @select-city="onSelectCity"
        @select-site="onSelectSite"
      />
    </ClientOnly>
    <Dialog :modal="true" :open="introModal">
      <DialogContent
        class="overflow-hidden flex p-0 max-h-[600px] md:max-w-[800px] lg:max-w-[900px] bg-green-800"
        :show-close-button="false"
      >
        <div class="p-6 bg-green-800 text-white">
          <div class="flex justify-between">
            <div class="flex flex-col basis-1/2">
              <span class="text-2xl">Province of</span>
              <h1 class="text-9xl albay-font font-extrabold">Albay</h1>
            </div>
            <div class="basis-1/2 text-right pt-6">
              <p>
                Albay, originally called Ibalon, has been settled for over 2,000
                years and had early trade links with China. The province was
                renamed Albay in 1663 and survived Moro raids and the 1814
                eruption of Mayon Volcano, which destroyed towns and led to the
                founding of Legazpi.
              </p>
            </div>
          </div>
          <div class="flex items-baseline justify-between">
            <img src="/Albay_Map.png" alt="" class="-mt-16 -ml-10" />
            <Button
              @click="introModal = false"
              class="uppercase font-black border"
              variant="ghost"
              >Walk With Me</Button
            >
          </div>
        </div>
      </DialogContent>
    </Dialog>
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

const categories = [
  {
    text: "Church",
    value: "church",
  },
  {
    text: "Gabaldon",
    value: "gabaldon",
  },
  {
    text: "School",
    value: "school",
  },
  {
    text: "Municipal Hall",
    value: "municipal_hall",
  },
  {
    text: "Ancestral House",
    value: "ancestral_house",
  },
  {
    text: "Cimburrio",
    value: "cimburrio",
  },
];

const selectedSite = ref<Site | null>(null);
const sites = ref<Site[]>([]);

const selectedMun = ref<Municipality>();
const supabase = useSupabaseClient();

const introModal = ref(true);

const selectMunicipality = (munId: number) => {
  selectedMun.value = municipalities.find((mun) => mun.id == munId);
};

const onLoadSites = async () => {
  sites.value = [];
  if (selectedMun.value) {
    const { data, error } = await supabase
      .from("sites")
      .select()
      .eq("municipality_id", selectedMun.value?.id);

    if (error) console.error(error);

    sites.value = data as Site[];
  } else {
    const { data, error } = await supabase.from("sites").select();

    if (error) console.error(error);

    sites.value = data as Site[];
  }
};

const onSelectCity = (id: number) => {
  selectMunicipality(id);
  selectedSite.value = null;
};

const onSelectSite = async (site_id: number) => {
  const site = sites.value.find((site) => site.id == site_id);
  console.log(site_id);
  if (site) {
    selectedSite.value = site;
    selectMunicipality(site.municipality_id);
    await onLoadSites();
  }
};

const zoomInSite = (site: Site) => {
  selectedSite.value = site;
};

onMounted(() => {
  selectMunicipality(0);
  onLoadSites();
});

watch(selectedMun, (val) => {
  onLoadSites();
});
</script>

<style>
.albay-font {
  font-family: "Bonheur Royale", cursive;
  font-weight: 400;
  font-style: normal;
}
</style>
