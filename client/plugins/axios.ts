import axios from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  //api code
  const api_code = axios.create();
  api_code.defaults.baseURL = config.public.API_CODE as string;

  //api main
  const api = axios.create();
  api.defaults.baseURL = config.public.API_XPILER_BACK as string;

  return {
    provide: {
      apiCode: api_code,
      api: api,
    },
  };
});
