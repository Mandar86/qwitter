<template>
  <q-page class="relatie-position">
    <q-scroll-area class="absolute fit">
      <add-qweet></add-qweet>
      <q-separator size="10px" color="grey-2" class="divider"></q-separator>

      <q-list separator>
        <transition-group
          appear
          enter-active-class="animated fadeIn slower"
          leave-active-class="animated fadeOut slow"
        >
          <qweets-component
            v-for="qweet in qweets"
            :key="qweet.id"
            :qweet="qweet"
          ></qweets-component>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

import { database } from "boot/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import QweetsComponent from "src/components/QweetsComponent.vue";
import AddQweet from "src/components/AddQweet.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    AddQweet,
    QweetsComponent,
  },
  setup() {
    const newQweet = ref("");
    const qweets = ref([]);

    onMounted(() => {
      const q = query(collection(database, "qweets"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let qweetChange = change.doc.data();
          qweetChange.id = change.doc.id;
          if (change.type === "added") {
            qweets.value.unshift(qweetChange);
          }
          if (change.type === "modified") {
            let index = qweets.value.findIndex(
              (qweet) => qweet.id === qweetChange.id
            );
            Object.assign(qweets.value[index], qweetChange);
          }
          if (change.type === "removed") {
            let index = qweets.value.findIndex(
              (qweet) => qweet.id === qweetChange.id
            );
            qweets.value.splice(index, 1);
          }
        });
      });
    });

    return {
      newQweet,
      qweets,
    };
  },
});
</script>
<style scoped lang="sass">
.divider
  border-top: 1px solid
  border-bottom: 1px solid
  border-color: $grey-4
.qweet-content
  white-space: pre-line
</style>
