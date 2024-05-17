import type { AxiosResponse } from "axios";
import type { UserAuth, UserType } from "~/types/user.inteface";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import type { Auth } from "firebase/auth";

export default function useUserAuth() {
  const { $api, $auth } = useNuxtApp();

  const onLogin = async (loginData: {
    email: string;
    Gitid: string;
    photoURL: string;
  }): Promise<AxiosResponse<UserAuth>> => {
    const resp = await $api.post("/auth/login", loginData);
    return resp;
  };

  const getUser = async (): Promise<AxiosResponse<UserType>> => {
    const resp = await $api.get("/auth/me", {
      headers: { Authorization: `Bearer ${useCookie("token").value}` },
    });
    return resp;
  };

  const provider = new GithubAuthProvider();
  const onGithubLogin = async () => {
    const creds = await signInWithPopup($auth as Auth, provider);
    return creds;
  };
  return {
    onLogin,
    getUser,
    onGithubLogin
  };
}
