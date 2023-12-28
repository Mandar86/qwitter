jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"),
  database: {
    // Mocked firestore functions
    doc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
  },
}));

import { mount } from "@vue/test-utils";
import QweetItem from "../QweetsComponent.vue";
// import { jest } from "@jest/globals";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";

installQuasarPlugin();
describe("QweetItem.vue", () => {
  it("renders liked tweet", async () => {
    const qweet = {
      content: "Whtatata",
      date: 1702019152176,
      id: "Gc9WYv3yjxABEqGygRIi",
      liked: true,
    };

    const wrapper = mount(QweetItem, {
      propsData: { qweet },
      global: {
        mocks: {
          toggleLiked: jest.fn(),
          deleteQweet: jest.fn(),
        },
      },
    });
    expect(wrapper.find(".fa-heart").classes().includes("fa-solid"));
  });
  it("renders unliked tweet", async () => {
    const qweet = {
      content: "Whtatata",
      date: 1702019152176,
      id: "Gc9WYv3yjxABEqGygRIi",
      liked: false,
    };

    const wrapper = mount(QweetItem, {
      propsData: { qweet },
      global: {
        mocks: {
          toggleLiked: jest.fn(),
          deleteQweet: jest.fn(),
        },
      },
    });
    expect(wrapper.find(".fa-heart").classes().includes("fa-regular"));
  });

  it("renders Qweet item with correct content and actions", async () => {
    const qweet = {
      content: "Whtatata",
      date: 1702019152176,
      id: "Gc9WYv3yjxABEqGygRIi",
      liked: true,
    };

    const wrapper = mount(QweetItem, {
      propsData: { qweet },
      global: {
        mocks: {
          toggleLiked: jest.fn(),
          deleteQweet: jest.fn(),
        },
      },
    });

    // Ensure Qweet content is rendered
    expect(wrapper.find(".qweet-content").text()).toBe("Whtatata");
    // Trigger the like button click event
    await wrapper.find(".fa-heart").trigger("click");

    // Ensure the like button toggles the liked state
    expect(wrapper.vm.toggleLiked).toHaveBeenCalled();

    // Trigger the delete button click event
    await wrapper.find(".fa-trash").trigger("click");

    // You may need to wait for any async operations to complete
    // await wrapper.vm.$nextTick();

    // Ensure the delete function is called
    // You might need to mock the delete function and check if it's called
    expect(wrapper.vm.deleteQweet).toHaveBeenCalled();
  });
});
