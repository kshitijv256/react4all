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


export default function AppRouter(props: {currentUser: User}) {

  const routes = {
    "/": () => <PaginationUI currentUser={props.currentUser}/>,
    "/login": () => <Login />,
    "/about": () => <About />,
    "/form/:id": ({ id }: { id: string }) => <FormUI id={Number(id)} currentUser={props.currentUser} />,
    "/preview/:formId": ({ formId }: { formId: string }) => (
      <Preview formId={Number(formId)} />
    ),
    "/success": () => <div>Success</div>,
    "*": () => <NotFound />,
  };


  const routeResult = useRoutes(routes);
  return routeResult || <NotFound />;
}
