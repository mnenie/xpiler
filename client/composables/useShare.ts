import { toast } from "vue-sonner";

export default function useShare() {
  const isShare = ref<boolean>(false);
  const route = useRoute();

  const toggleShare = () => {
    isShare.value = !isShare.value;
    if (isShare.value) {
      if (document) {
        navigator.clipboard.writeText(
          `http://localhost:3000/compiler/${route.params.id}`
        );
        document.execCommand("copy");
      }
      toast.success("Link has been copied", {
        description: "Share the link with your team for collaborative work!",
      });
    } else {
      toast.error("Session is suspended", {
        description: "You work with code alone rn!",
      });
    }
  };
  return { isShare, toggleShare };
}
