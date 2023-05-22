// Desc: API Utils for making API calls

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
    const auth = "Basic " + window.btoa("kshitij:7beva5FyGaUwyQh");
    const response = await fetch(API_BASE_URL + endpoint, {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: auth,
        },
        body: payload,
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