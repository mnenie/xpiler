// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@pinia/nuxt"],
  shadcn: {
    prefix: "Ui",
    componentDir: "./components/ui",
  },
  runtimeConfig: {
    public: {
      API_CODE: process.env.API_CODE
    },
    YANDEX_API_KEY: process.env.YANDEX_API_KEY,
    YANDEX_FOLDER_ID: process.env.YANDEX_FOLDER_ID,
    YANDEX_OAUTH: process.env.YANDEX_OAUTH
  }
});