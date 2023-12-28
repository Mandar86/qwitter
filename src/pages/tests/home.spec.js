jest.mock("firebase/firestore", () => {
  const mockFirebase = require("boot/firebase-mock");
  return {
    ...jest.requireActual("firebase/firestore"),
    onSnapshot: mockFirebase.mockOnSnapshot,
  };
});

import { mount } from "@vue/test-utils";
import HomePage from "../HomePage.vue";
import { describe, it, expect, beforeEach } from "@jest/globals";
import { onSnapshot } from "firebase/firestore";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";

installQuasarPlugin();
describe("HomePage", () => {
  beforeEach(() => {});
  it("renders qweets", async () => {
    const qweets = [
      { id: "1", text: "Qweet 1" },
      { id: "2", text: "Qweet 2" },
    ];

    onSnapshot.mockImplementationOnce((query, callback) => {
      const snapshot = {
        docChanges: jest.fn(() =>
          qweets.map((qweet) => ({
            type: "added",
            doc: { data: () => qweet, id: qweet.id },
          }))
        ),
      };
      callback(snapshot);
    });

    const wrapper = mount(HomePage);
    await wrapper.vm.$nextTick();
    // Your assertions based on the rendered qweets go here
    expect(wrapper.vm.qweets.length).toBe(2);
  });
});
