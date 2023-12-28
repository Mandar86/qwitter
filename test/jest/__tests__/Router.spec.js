jest.mock("vue-router", () => ({
  useRoute: jest.fn(),
  useRouter: jest.fn(() => ({
    push: () => {},
  })),
}));

import { describe, expect, it, jest } from "@jest/globals";
import { mount } from "@vue/test-utils";
import Component from "./demo/MyButton.vue";
import { useRouter, useRoute } from "vue-router";

describe("MyComponent", () => {
  it("allows authenticated user to edit a post", async () => {
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: 1,
      },
    }));

    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push,
    }));
    const wrapper = mount(Component, {
      props: {
        isAuthenticated: true,
      },
      global: {
        stubs: ["router-link", "router-view"], // Stubs for router-link and router-view in case they're rendered in your template
      },
    });

    await wrapper.find("button").trigger("click");

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/posts/1/edit");
  });

  it("redirect an unauthenticated user to 404", async () => {
    useRoute.mockImplementationOnce(() => ({
      params: {
        id: 1,
      },
    }));

    const push = jest.fn();
    useRouter.mockImplementationOnce(() => ({
      push,
    }));
    const wrapper = mount(Component, {
      props: {
        isAuthenticated: false,
      },
      global: {
        stubs: ["router-link", "router-view"], // Stubs for router-link and router-view in case they're rendered in your template
      },
    });

    await wrapper.find("button").trigger("click");

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith("/404");
  });
});
