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
import { PaginationSub } from "../components/common/PaginationSub";


export default function AppRouter(props: {currentUser: User}) {

  const routes = {
    "/": () => <PaginationUI currentUser={props.currentUser}/>,
    "/login": () => <Login />,
    "/about": () => <About />,
    "/form/:id": ({ id }: { id: string }) => <FormUI id={Number(id)} currentUser={props.currentUser} />,
    "/preview/:formId": ({ formId }: { formId: string }) => (
      <Preview formId={Number(formId)} />
    ),
    "/submission/:formId": ({ formId }: { formId: string }) => <PaginationSub form_pk={Number(formId)} currentUser={props.currentUser} />,
    "/success": () => <div className="w-full text-center text-3xl p-10 font-bold text-green-500">Submitted Successfully</div>,
    "*": () => <NotFound />,
  };


  const routeResult = useRoutes(routes);
  return routeResult || <NotFound />;
}
