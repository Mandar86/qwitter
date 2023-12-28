<script setup>
import { addDoc, collection } from "firebase/firestore";
import { database } from "src/boot/firebase";
import { ref } from "vue";

const newQweet = ref("");

const addNewQweet = async () => {
  if (newQweet.value == "") {
    return;
  }
  const newQweetData = {
    content: newQweet.value,
    date: Date.now(),
    liked: false,
  };

  try {
    await addDoc(collection(database, "qweets"), newQweetData);

    newQweet.value = "";
  } catch (error) {}
};
</script>

<template>
  <div class="q-py-lg q-px-md">
    <div class="row items-end q-gutter-md">
      <div class="col">
        <q-input
          bottom-slots
          v-model="newQweet"
          placeholder="What's happening?"
          counter
          maxlength="280"
          autogrow
          class="text-"
          data-qweet
        >
          <template v-slot:before>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
            </q-avatar>
          </template>
        </q-input>
      </div>
      <div class="col col-shrink">
        <q-btn
          unelevated
          rounded
          class="q-mb-lg addBtn"
          color="primary"
          no-caps
          label="Qweet"
          :disabled="!Boolean(newQweet)"
          @click="addNewQweet"
        />
      </div>
    </div>
  </div>
</template>
