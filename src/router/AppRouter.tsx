import React from "react";
import Home from "../components/Home";
import Form from "../components/Form";
import { useRoutes } from "raviger";

const routes = {
  "/": () => <Home />,
  "/form/:id": ({ id }: { id: string }) => <Form id={Number(id)} />,
};

export default function AppRouter() {
  const routeResult = useRoutes(routes);
  return routeResult || <div className="h-screen flex items-center"> </div>;
}
