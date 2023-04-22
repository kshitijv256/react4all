import React from "react";
import Home from "../components/Home";
import Form from "../components/Form";
import { useRoutes } from "raviger";
import Preview from "../components/Preview";
import About from "../components/About";
import NotFound from "../components/404page";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Preview formId={Number(formId)} />
  ),
  "*": () => <NotFound />,
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return routeResult || <div className="h-screen flex items-center"> </div>;
}
