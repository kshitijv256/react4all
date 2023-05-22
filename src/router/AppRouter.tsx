import React from "react";
import Home from "../components/Home";
import Form from "../components/Form";
import { useRoutes } from "raviger";
import Preview from "../components/Preview";
import About from "../components/About";
import NotFound from "../components/404page";
import { MyForm } from "../types/data";
import Login from "../components/Login";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => {
    const forms = JSON.parse(localStorage.getItem("forms") || "[]");
    const isthere = forms.find((form: MyForm) => form.id === Number(id));
    return isthere ? <Form id={Number(id)} /> : <NotFound />;
  },
  "/preview/:formId": ({ formId }: { formId: string }) => {
    const forms = JSON.parse(localStorage.getItem("forms") || "[]");
    const isthere = forms.find((form: MyForm) => form.id === Number(formId));
    return isthere ? <Preview formId={Number(formId)} /> : <NotFound />;
  },
  "*": () => <NotFound />,
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return routeResult || <div className="h-screen flex items-center"> </div>;
}
