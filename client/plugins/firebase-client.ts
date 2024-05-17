import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY as string,
    authDomain: "xpiler-f5170.firebaseapp.com",
    projectId: "xpiler-f5170",
    storageBucket: "xpiler-f5170.appspot.com",
    messagingSenderId: "228595166536",
    appId: "1:228595166536:web:57ee96e6e75b7338cfd77d",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  return {
    provide: {
      auth: auth
    },
  };
});
