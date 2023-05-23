// Desc: API Utils for making API calls

import { get } from "http";
import { PaginationParams } from "../types/common";
import { Form } from "../types/data";

const API_BASE_URL = "https://tsapi.coronasafe.live/api/";

type requestType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const request = async (
    endpoint: string,
    method: requestType = "GET",
    data: any = {}
) => {
    let url;
    let payload: string;
    if (method === "GET") {
        const requestParams = data
            ? `${Object.keys(data)
                .map((key) => `${key}=${data[key]}`)
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
    const auth = token ?  "Token " + token : "";
    const response = await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth,
        },
        body: method !== "GET" ? payload : undefined,
    });
    if (response.ok) {
        return await response.json();
    } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
};

export const createForm = (form:Form) => {
    return request("forms/", "POST", form);
}

export const login = (username: string, password: string) => {
    return request("auth-token/", "POST", { username, password });
}

export const me = () => {
    return request("users/me/", "GET");
}

export const listForms = async (params: PaginationParams) => {
    return await request("forms/", "GET", params);
}

export const getForm = async (id: number) => {
    return await request(`forms/${id}/`, "GET");
}

export const getFormFields = async (form_pk: number) => {
    return await request(`forms/${form_pk}/fields/`, "GET");
}