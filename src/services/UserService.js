// src/services/UserService.js

export const registerUser = async (userData) => {
  console.log("Mock register:", userData);
  return Promise.resolve({ message: "Mock register success" });
};

export const loginUser = async (credentials) => {
  console.log("Mock login:", credentials);
  // Simulate a fake token
  return Promise.resolve({ data: { token: "mock-token-12345" } });
};
