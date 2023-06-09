// Desc: API Utils for making API calls
import { UserLogin } from "../types/User";
import { PaginationParams } from "../types/common";
import { Form, FormItem, Submission } from "../types/data";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type requestType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type payloadType =
  | UserLogin
  | Form
  | FormItem
  | Submission
  | PaginationParams
  | {};

export const request = async (
  endpoint: string,
  method: requestType = "GET",
  data: payloadType = {}
) => {
  let url;
  let payload: string;
  if (method === "GET") {
    const requestParams = data
      ? `${Object.keys(data)
          .map((key) => `${key}=${data[key as keyof payloadType]}`)
          .join("&")}`
      : "";

    url = `${API_BASE_URL}${endpoint}?${requestParams}`;
    payload = "";
  } else {
    url = `${API_BASE_URL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // basic auth
  // const auth = "Basic " + window.btoa("kshitij:7beva5FyGaUwyQh");

  // Token auth
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + token : "";
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: method !== "GET" ? payload : undefined,
  });
  if (response.ok) {
    try {
      const data = await response.json();
      return data;
    } catch (err) {
      return {};
    }
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
};

export const createForm = (form: Form) => {
  return request("forms/", "POST", form);
};

export const login = (username: string, password: string) => {
  return request("auth-token/", "POST", { username, password });
};

export const me = () => {
  return request("users/me/", "GET");
};

export const listForms = async (params: PaginationParams) => {
  return await request("forms/", "GET", params);
};

export const getForm = async (id: number) => {
  return await request(`forms/${id}/`, "GET");
};

export const updateForm = async (form: Form, id: number) => {
  return await request(`forms/${id}/`, "PUT", form);
};

export const deleteForm = async (id: number) => {
  return await request(`forms/${id}/`, "DELETE");
};

export const getFormFields = async (form_pk: number) => {
  return await request(`forms/${form_pk}/fields/`, "GET");
};

export const createFormFields = async (form_pk: number, fields: FormItem) => {
  return await request(`forms/${form_pk}/fields/`, "POST", fields);
};

export const updateFormFields = async (
  form_pk: number,
  fields: FormItem,
  id: number
) => {
  return await request(`forms/${form_pk}/fields/${id}/`, "PATCH", fields);
};

export const deleteFormFields = async (form_pk: number, id: number) => {
  return await request(`forms/${form_pk}/fields/${id}/`, "DELETE");
};

export const submitSubmission = async (
  form_pk: number,
  submission: Submission
) => {
  return await request(`forms/${form_pk}/submission/`, "POST", submission);
};

export const listSubmissions = async (
  form_pk: number,
  params: PaginationParams
) => {
  return await request(`forms/${form_pk}/submission/`, "GET", params);
};

export const getField = async (form_pk: number, field_pk: number) => {
  return await request(`forms/${form_pk}/fields/${field_pk}/`, "GET");
};
