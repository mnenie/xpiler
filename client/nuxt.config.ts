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
    }
  }
});