import React from "react";
import { useRoutes } from "raviger";
import Preview from "../components/Preview";
import About from "../components/About";
import NotFound from "../components/404page";
import { Form, MyForm } from "../types/data";
import Login from "../components/Login";
import { User } from "../types/User";
import { PaginationUI } from "../components/common/PaginationUI";
import FormUI from "../components/FormUI";

const routes = {
  "/": () => <PaginationUI />,
  "/login": () => <Login />,
  "/about": () => <About />,
  "/form/:id": ({ id }: { id: string }) => <FormUI id={Number(id)} />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <Preview formId={Number(formId)} />
  ),
  "/success": () => <div>Success</div>,
  "*": () => <NotFound />,
};

export default function AppRouter(currentuser: User) {
  const routeResult = useRoutes(routes);
  return routeResult || <div className="h-screen flex items-center"> </div>;
}
