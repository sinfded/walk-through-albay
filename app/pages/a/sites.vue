<template>
  <div class="w-screen h-screen bg-muted flex flex-col">
    <div class="w-full p-4 flex justify-between items-center gap-2">
      <div class="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" class="h-10 w-10" />
      </div>
      <div class="flex gap-2 items-center">
        <Select
          class="w-[200px]"
          v-model:model-value="selectedMunicipality"
          @update:model-value="onMunicipalityChange"
        >
          <SelectTrigger class="w-[200px] bg-white">
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
        <AddSiteDialog />

        <Button @click="signOut" size="icon" variant="outline">
          <LogOutIcon />
        </Button>
      </div>
    </div>
    <div class="grow p-4 pt-0 overflow-auto">
      <Card class="w-full h-full overflow-auto p-0">
        <div v-for="(sites, category) in groupedSites" :key="category">
          <!-- Separator -->
          <hr class="opacity-60" />
          <h2 class="text-xl font-bold my-4 ml-6 capitalize">{{ category }}</h2>
          <hr class="opacity-60" />

          <!-- List -->
          <div class="grid lg:grid-cols-4 xl:grid-cols-5 gap-6 p-6">
            <div
              v-for="site in sites"
              :key="site.name"
              class="min-h-[450px] bg-muted rounded-2xl bg-cover bg-center bg-no-repeat relative"
              :style="{ backgroundImage: `url(${site.site_images.front})` }"
            >
              <div
                class="backdrop-blur-sm text-white bg-black/40 rounded-b-2xl absolute bottom-0 left-0 right-0 p-2 font-bold uppercase text-center text-lg"
              >
                {{ site.name }}
              </div>
              <div class="absolute top-0 right-0 p-2 flex gap-2">
                <Button
                  @click="editSiteData(site)"
                  variant="outline"
                  size="icon"
                  ><Settings2Icon class="w-8 h-8"
                /></Button>
                <AlertDialog>
                  <AlertDialogTrigger as-child>
                    <Button variant="outline" size="icon" class="text-red-500"
                      ><Trash2Icon class="w-8 h-8" /></Button
                  ></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle
                        >Are you absolutely sure?</AlertDialogTitle
                      >
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this site's data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction @click="deleteSiteData(site.id)"
                        >Continue</AlertDialogAction
                      >
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
    <EditSiteDialog
      v-if="editSiteModal"
      @close-modal="editSiteModal = false"
      :modal="editSiteModal"
      :site="selectedSite"
    />
  </div>
</template>

<script lang="ts" setup>
import { municipalities } from "~/data/albay_municipalities.json";
import {
  LogOutIcon,
  Settings2Icon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-vue-next";

definePageMeta({
  middleware: "auth",
});

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

const supabase = useSupabaseClient();

const selectedMunicipality = ref("");
const selectedSite = ref<Site>();
const sites = ref<Site[]>([]);
const editSiteModal = ref(false);

const groupedSites = computed(() => {
  const grouped = sites.value.reduce((acc, item) => {
    if (item.category) {
      const key = item.category;
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
    }
    return acc;
  }, {} as Record<string, Site[]>);

  return grouped;
});

const onMunicipalityChange = async () => {
  const { data, error } = await supabase
    .from("sites")
    .select()
    .eq("municipality_id", parseInt(selectedMunicipality.value));
  if (error) console.error(error);

  sites.value = data as Site[];
};

const editSiteData = (site: Site) => {
  editSiteModal.value = true;
  selectedSite.value = site;
};

const deleteSiteData = async (siteId: number) => {
  const { error } = await supabase.from("sites").delete().eq("id", siteId);

  if (error) console.error(error);
  onMunicipalityChange();
};

const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) console.error(error);

  useRouter().push("/a/login");
};

onMounted(() => {
  selectedMunicipality.value = "500501000";
  onMunicipalityChange();
});
</script>

<style></style>
