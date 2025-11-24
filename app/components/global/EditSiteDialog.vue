<template>
  <Dialog :modal="true" :open="modal">
    <form>
      <DialogContent
        class="overflow-hidden p-0 max-h-[600px] md:max-w-[800px] lg:max-w-[900px]"
        :show-close-button="false"
      >
        <SidebarProvider class="items-start">
          <Sidebar collapsible="none" class="hidden md:flex">
            <SidebarContent
              class="p-4 flex flex-col justify-between max-h-[600px]"
            >
              <FieldSet>
                <FieldLegend>Edit Site</FieldLegend>
                <FieldDescription
                  >Edit the information of this site.</FieldDescription
                >
                <FieldGroup>
                  <Field>
                    <FieldLabel for="name"> Municipality </FieldLabel>
                    <Select
                      v-model:model-value="siteData.municipality_id"
                      @update:model-value="selectMunicipality"
                    >
                      <SelectTrigger class="bg-white">
                        <SelectValue placeholder="Select a municipality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="(mun, idm) in municipalities"
                          :key="idm"
                          :value="mun.id"
                        >
                          {{ mun.properties.adm3_en }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel for="name"> Category </FieldLabel>
                    <Select v-model:model-value="siteData.category">
                      <SelectTrigger class="bg-white">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          v-for="(cat, idc) in categories"
                          :key="idc"
                          :value="cat.value"
                        >
                          {{ cat.text }}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field>
                    <FieldLabel for="name"> Name </FieldLabel>
                    <Input
                      v-model:model-value="siteData.name"
                      id="name"
                      autocomplete="off"
                      class="bg-white"
                      placeholder="Name of the site"
                    />
                  </Field>

                  <Field>
                    <FieldLabel for="coordinates"> Coordinates </FieldLabel>
                    <div class="flex gap-2">
                      <Input
                        id="coordinates"
                        autocomplete="off"
                        placeholder="Latitude"
                        class="bg-white"
                        v-model:model-value="siteData.coordinates.latitude"
                        @update:model-value="cleanCoordinates('latitude')"
                      />
                      <Input
                        id="coordinates"
                        autocomplete="off"
                        placeholder="Longtitude"
                        class="bg-white"
                        v-model:model-value="siteData.coordinates.longitude"
                        @update:model-value="cleanCoordinates('longitude')"
                      />
                    </div>
                  </Field>
                </FieldGroup>
              </FieldSet>

              <DialogFooter>
                <DialogClose as-child>
                  <Button variant="outline" @click="clearData"> Cancel </Button>
                </DialogClose>

                <Button @click="saveSiteData" type="submit" :disabled="loading">
                  <LoaderCircleIcon class="animate-spin" v-if="loading" />
                  Save changes
                </Button>
              </DialogFooter>
            </SidebarContent>
          </Sidebar>
          <main class="flex h-[580px] flex-1 flex-col overflow-hidden">
            <header
              class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
            >
              <div class="flex items-center gap-2 px-4">
                <span>Site Images</span>
              </div>
            </header>
            <div class="grid grid-cols-3 gap-4 p-4 pt-0">
              <div
                v-if="siteData.site_images.front"
                class="aspect-square max-w-[200px] max-h-[200px] rounded-xl bg-muted"
              >
                <img
                  :src="siteData.site_images.front"
                  alt="Front Site Image"
                  class="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div
                v-if="siteData.site_images.left"
                class="aspect-square max-w-[200px] max-h-[200px] rounded-xl bg-muted"
              >
                <img
                  :src="siteData.site_images.left"
                  alt="Left Site Image"
                  class="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div
                v-if="siteData.site_images.right"
                class="aspect-square max-w-[200px] max-h-[200px] rounded-xl bg-muted"
              >
                <img
                  :src="siteData.site_images.right"
                  alt="Right Site Image"
                  class="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div
                v-if="siteData.site_images.rear"
                class="aspect-square max-w-[200px] max-h-[200px] rounded-xl bg-muted"
              >
                <img
                  :src="siteData.site_images.rear"
                  alt="Rear Site Image"
                  class="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div
                v-if="siteData.site_images.interior"
                class="aspect-square max-w-[200px] max-h-[200px] rounded-xl bg-muted"
              >
                <img
                  :src="siteData.site_images.interior"
                  alt="Interior Site Image"
                  class="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div
                class="aspect-square max-w-[200px] max-h-[200px] rounded-xl bg-muted"
              >
                <div
                  @click="openFilePicker"
                  class="flex flex-col p-2 h-full hover:cursor-pointer"
                >
                  <Select
                    class="w-full"
                    v-model:model-value="selectedElevation"
                  >
                    <SelectTrigger class="bg-white w-full">
                      <SelectValue placeholder="Select a view" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        v-for="(elev, ide) in elevations"
                        :key="ide"
                        :value="elev.value"
                      >
                        {{ elev.text }}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <div class="flex justify-center items-center grow">
                    <ImageUpIcon class="w-20 h-20 text-gray-300" />
                  </div>
                </div>

                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileChange"
                />
              </div>
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </form>
  </Dialog>
</template>

<script lang="ts" setup>
import {
  ImageIcon,
  ImageUpIcon,
  LoaderIcon,
  LoaderCircleIcon,
  Settings2Icon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";
import { municipalities } from "~/data/albay_municipalities.json";
import type { Database } from "~/types/database.types";

const props = defineProps(["site", "modal"]);

const emit = defineEmits(["closeModal"]);

type Site = {
  name: string;
  municipality_id: number;
  municipality_name: string;
  category: string;
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

const elevations = [
  {
    text: "Front Elevation",
    value: "front",
  },
  {
    text: "Left Elevation",
    value: "left",
  },
  {
    text: "Right Elevation",
    value: "right",
  },
  {
    text: "Rear Elevation",
    value: "rear",
  },
  {
    text: "Interior",
    value: "interior",
  },
];

const siteData = ref<Site>({
  name: "",
  municipality_id: 0,
  municipality_name: "",
  category: "",
  site_images: {
    front: "",
    left: "",
    right: "",
    rear: "",
    interior: "",
  },
  coordinates: {
    latitude: 0,
    longitude: 0,
  },
  id: 0,
  created_at: "",
});

const fileInput = ref<HTMLInputElement | null>(null);
const selectedElevation = ref("");
const supabase = useSupabaseClient<Database>();
const loading = ref(false);
const editSiteModal = ref(false);

const openFilePicker = () => {
  if (selectedElevation.value == "") toast.info("Select a view first.");
  else if (siteData.value.municipality_name == "")
    toast.info("Select a municipality first.");
  else if (siteData.value.name == "") toast.info("Fill up site name first.");
  else {
    fileInput.value?.click();
  }
};

const handleFileChange = async (e: any) => {
  let view: string = selectedElevation.value;
  const file = e.target.files?.[0];
  if (!file) return;

  const fileName = `${siteData.value.municipality_name} ${siteData.value.name}-${selectedElevation.value}`;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(fileName, file, { cacheControl: "3600", upsert: true });

  if (error) {
    alert(error.message);
    return;
  }

  const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
    .data.publicUrl;

  siteData.value.site_images[view as keyof typeof siteData.value.site_images] =
    publicUrl;
};

const selectMunicipality = () => {
  const selectedMun = municipalities.find(
    (mun) => mun.id == siteData.value.municipality_id
  );
  if (selectedMun)
    siteData.value.municipality_name = selectedMun.properties.adm3_en;
};

const cleanCoordinates = (direction: string) => {
  if (direction == "latitude")
    siteData.value.coordinates.latitude = parseFloat(
      `${siteData.value.coordinates.latitude}`
    );
  else if (direction == "longitude")
    siteData.value.coordinates.longitude = parseFloat(
      `${siteData.value.coordinates.longitude}`
    );
};

const clearData = () => {
  editSiteModal.value = false;
  emit("closeModal");
};

const saveSiteData = async () => {
  console.log(siteData.value);
  loading.value = true;
  const { data, error } = await supabase
    .from("sites")
    .upsert(siteData.value)
    .select();

  if (error) console.error(error);

  loading.value = false;
  clearData();
};

onMounted(() => {
  siteData.value = props.site;
  console.log(siteData.value);
});
</script>

<style></style>
