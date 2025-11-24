// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  // routeRules: {
  //   "/": { prerender: true },
  //   "/a/**": { ssr: false },
  // },
  ssr: true,
  nitro: { prerender: { crawlLinks: true } },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/supabase",
    "@nuxt/fonts",
    "@nuxtjs/leaflet",
  ],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
  supabase: {
    redirectOptions: {
      login: "/a/login",
      callback: "/a/confirm",
      include: undefined,
      exclude: ["/", "/map", "/explore", "/contact", "/about"],
      saveRedirectToCookie: false,
    },
  },
  fonts: {
    provider: "google",
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
});