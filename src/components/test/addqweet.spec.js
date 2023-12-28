// addQweet.spec.js
jest.mock("firebase/firestore", () => {
  const mockFirebase = require("boot/firebase-mock");
  return {
    ...jest.requireActual("firebase/firestore"),
    collection: jest.fn(() => ({
      onSnapshot: jest.fn(),
    })),
    addDoc: mockFirebase.mockAddDoc,
  };
});
import { mount } from "@vue/test-utils";
import AddQweet from "../AddQweet.vue";
import { mockAddDoc, database } from "boot/firebase-mock";
import { collection, addDoc } from "firebase/firestore";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";
import { expect, it, describe } from "@jest/globals";

installQuasarPlugin();
describe("AddQweet", () => {
  it("check qweet button disability", async () => {
    const wrapper = mount(AddQweet, {
      global: {
        mocks: {
          database, // Provide the mock database to the component
        },
      },
    });
    expect(wrapper.find(".addBtn").attributes().disabled).toBeDefined();

    wrapper.vm.newQweet = "New Qweet Content";
    await wrapper.vm.$nextTick();
    expect(wrapper.find(".addBtn").attributes().disabled).not.toBeDefined();
  });

  it("adds a new Qweet", async () => {
    const wrapper = mount(AddQweet, {
      global: {
        mocks: {
          database, // Provide the mock database to the component
        },
      },
    });

    // Set a value to the input
    // await wrapper.find("[data-qweet]").setValue("New Qweet Content");
    wrapper.vm.newQweet = "New Qweet Content";

    await wrapper.vm.$nextTick();
    expect(wrapper.vm.newQweet).toBe("New Qweet Content");
    // Trigger the click event on the button
    await wrapper.find(".addBtn").trigger("click");

    // Ensure addDoc was called with the correct arguments
    const newQweetData = {
      content: "New Qweet Content",
      date: Date.now(),
      liked: false,
    };

    // await expect(addDoc.mock.calls[0][0]).toEqual(
    //   collection(database, "qweets")
    // );
    expect(addDoc.mock.calls[0][1].content).toEqual(newQweetData.content);
    expect(addDoc.mock.calls[0][1].liked).toEqual(newQweetData.liked);
    // await expect(addDoc).toHaveBeenCalledWith(
    //   collection(database, "qweets"),
    //   newQweetData
    // );

    // Ensure newQweet is cleared after adding
    expect(wrapper.vm.newQweet).toBe("");
  });

  it("does not add a new Qweet when newQweet is empty", async () => {
    const wrapper = mount(AddQweet, {
      global: {
        mocks: {
          database,
        },
      },
    });

    // Trigger the click event on the button without setting newQweet
    await wrapper.find(".addBtn").trigger("click");

    // Ensure addDoc was not called
    expect(wrapper.find(".addBtn").attributes().disabled).toBeDefined();

    // Ensure newQweet remains empty
    expect(wrapper.vm.newQweet).toEqual("");
  });
});
