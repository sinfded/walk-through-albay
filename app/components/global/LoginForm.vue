<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { LoaderCircleIcon } from "lucide-vue-next";

const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");
const loading = ref(false);

const signIn = async () => {
  loading.value = true;
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) console.error(error);

  useRouter().push("/a/sites");
};

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <form @submit.prevent="signIn">
      <FieldGroup>
        <div class="flex flex-col items-center gap-2 text-center">
          <a href="/" class="flex flex-col items-center gap-2 font-medium">
            <div class="flex items-center justify-center">
              <img src="/logo.png" class="w-20 h-20" />
            </div>
          </a>
          <h1 class="text-2xl font-bold">Welcome</h1>
        </div>
        <Field>
          <FieldLabel for="email"> Email </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            v-model="email"
            required
          />
        </Field>
        <Field>
          <div class="flex items-center">
            <FieldLabel for="password"> Password </FieldLabel>
            <a
              href="#"
              class="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" v-model="password" required />
        </Field>
        <Field>
          <Button type="submit" :disabled="loading">
            <LoaderCircleIcon class="animate-spin" v-if="loading" /> Login
          </Button>
        </Field>
      </FieldGroup>
    </form>
  </div>
</template>
