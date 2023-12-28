// firebase-mock.js
import { onSnapshot } from "firebase/firestore";

export const mockDatabase = {
  collection: jest.fn(() => ({
    onSnapshot: jest.fn(),
  })),
};

export const mockOnSnapshot = jest.fn((query, callback) => {
  const snapshot = {
    docChanges: jest.fn(() => []),
  };
  callback(snapshot);
});

export const mockAddDoc = jest.fn((collectionRef, data) => {
  return Promise.resolve({ id: "mocked-id" });
});

export { mockDatabase as database };
