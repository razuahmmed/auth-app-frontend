import type RegisterData from "../../models/RegisterData";
import apiClient from "../apiClient";
import type LoginData from "../../models/LoginData";
import type LoginResponseData from "../../models/LoginResponseData";
import type User from "../../models/User";
import type Gender from "../../models/Gender";

//=== register function
export const registerUser = async (signupData: RegisterData) => {
  const response = await apiClient.post(`/auth/register`, signupData);
  return response.data;
};

//=== login
export const loginUser = async (loginData: LoginData) => {
  const response = await apiClient.post<LoginResponseData>(`/auth/login`, loginData);
  return response.data;
};

//=== logout
export const logoutUser = async () => {
  const response = await apiClient.post(`/auth/logout`);
  return response.data;
};

//=== get current login user
export const getCurrentUser = async (emailId: string | undefined) => {
  const response = await apiClient.get<User>(`/users/email/${emailId}`);
  return response.data;
};

//=== refresh token
export const refreshToken = async () => {
  const response = await apiClient.post<LoginResponseData>(`/auth/refresh`);
  return response.data;
};

//=== get gender
export const getGender = async () => {
  const response = await apiClient.get<Gender[]>(`/users/genders`);
  return response.data;
};
