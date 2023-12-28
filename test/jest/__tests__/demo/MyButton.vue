<template><button @click="redirect">Click to Edit</button></template>
<script>
import { useRoute, useRouter } from "vue-router";

export default {
  props: ["isAuthenticated"],
  name: "MockComponent",
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const redirect = () => {
      if (props.isAuthenticated) {
        router.push(`/posts/${route.params.id}/edit`);
      } else {
        router.push("/404");
      }
    };
    return { redirect };
  },
};
</script>
