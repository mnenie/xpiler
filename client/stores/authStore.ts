import type { UserAuth, UserType } from "~/types/user.inteface";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<null | UserType>(null);
  const token = useCookie("token");
  const isLoading = ref(true);

  const { onGithubLogin, onLogin, getUser } = useAuth();

  const oAuth2Github = async () => {
    try {
      const response = await onGithubLogin();
      user.value = {
        Gitid: response?.user.uid!,
        email: response?.user.email!,
        photoURL: response?.user.photoURL!,
      };
      //@ts-ignore
      const creds = await onLogin({
        Gitid: user.value.Gitid,
        email: user.value.email,
        photoURL: user.value.photoURL!,
      });
      token.value = creds.data.token;
      console.log(token.value);
    } catch (err: any) {
      console.log(err);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await getUser();
      user.value = response.data;
    } catch (err) {
      console.log(err);
    }
  };

  setTimeout(() => {
    isLoading.value = false;
  }, 2000)

  const logout = () => {
    user.value = null;
    token.value = "";
  };

  return {
    user,
    token,
    isLoading,
    oAuth2Github,
    getCurrentUser,
    logout
  };
});
