<script setup>
import { formatDistance } from "date-fns";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { database } from "src/boot/firebase";
import { onMounted } from "vue";

const props = defineProps(["qweet"]);
const qweet = props.qweet;

const relativeDate = (value) => {
  return formatDistance(value, new Date());
};

const toggleLiked = async (id, isLiked) => {
  try {
    const qweetRef = doc(database, "qweets", id);

    await updateDoc(qweetRef, {
      liked: !isLiked,
    });
  } catch (error) {
    console.log("🚀 ~ file: HomePage.vue:162 ~ deleteQweet ~ error:", error);
  }
};

const deleteQweet = async (id) => {
  try {
    await deleteDoc(doc(database, "qweets", id));
  } catch (error) {
    console.log("🚀 ~ file: HomePage.vue:162 ~ deleteQweet ~ error:", error);
  }
};
// onMounted(() => {
//   console.log(
//     "🚀 ~ file: QweetsComponent.vue:36 ~ onMounted ~ props.qweet:",
//     props.qweet
//   );
// });
</script>

<template>
  <q-item class="q-py-md">
    <q-item-section avatar top>
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
      </q-avatar>
    </q-item-section>

    <q-item-section class="text-subtitle1">
      <q-item-label>
        <strong> Radnam </strong>
        <span class="text-grey-7"
          >@radnam86
          <br class="lt-md" />
          &bull;
          {{ qweet.date && relativeDate(qweet.date) }} ago</span
        >
      </q-item-label>
      <q-item-label class="qweet-content text-body1">
        {{ qweet.content }}
      </q-item-label>
      <div class="row justify-between q-mt-sm" style="margin-left: -5px">
        <q-btn
          :icon="qweet.liked ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"
          :color="qweet.liked ? 'red' : 'grey'"
          flat
          round
          size="sm"
          @click="toggleLiked(qweet.id, qweet.liked)"
        >
        </q-btn>
        <q-btn icon="fa-solid fa-retweet" color="grey" flat round size="sm">
        </q-btn>
        <q-btn icon="fa-regular fa-comment" color="grey" flat round size="sm">
        </q-btn>
        <q-btn
          icon="fa-solid fa-trash"
          color="grey"
          flat
          round
          size="sm"
          @click="deleteQweet(qweet.id)"
        >
        </q-btn>
      </div>
    </q-item-section>
  </q-item>
</template>
