import React, { ReactNode, Suspense } from "react";
import { useRoutes } from "raviger";
import { User } from "../types/User";
const Preview = React.lazy(() => import("../components/Preview"));
const About = React.lazy(() => import("../components/About"));
const Login = React.lazy(() => import("../components/Login"));
const PaginationUI = React.lazy(
  () => import("../components/common/PaginationUI")
);
const FormUI = React.lazy(() => import("../components/FormUI"));
const NotFound = React.lazy(() => import("../components/404page"));
const PaginationSub = React.lazy(
  () => import("../components/common/PaginationSub")
);
const ShareForm = React.lazy(() => import("../components/common/ShareForm"));
// import About from "../components/About";
// import NotFound from "../components/404page";
// import Login from "../components/Login";

// import { PaginationUI } from "../components/common/PaginationUI";
// import FormUI from "../components/FormUI";
// import { PaginationSub } from "../components/common/PaginationSub";
// import ShareForm from "../components/common/ShareForm";

const SuspenseLoad = (component: ReactNode) => (
  <Suspense fallback={<div>Loading...</div>}>{component}</Suspense>
);

export default function AppRouter(props: { currentUser: User }) {
  const routes = {
    "/": () => SuspenseLoad(<PaginationUI currentUser={props.currentUser} />),
    "/login": () => SuspenseLoad(<Login />),
    "/about": () => SuspenseLoad(<About />),
    "/form/:id": ({ id }: { id: string }) =>
      SuspenseLoad(<FormUI id={Number(id)} currentUser={props.currentUser} />),
    "/preview/:formId": ({ formId }: { formId: string }) =>
      SuspenseLoad(<Preview formId={Number(formId)} />),
    "/submission/:formId": ({ formId }: { formId: string }) =>
      SuspenseLoad(
        <PaginationSub
          form_pk={Number(formId)}
          currentUser={props.currentUser}
        />
      ),
    "/success": () => (
      <div className="w-full text-center text-3xl p-10 font-bold text-green-500">
        Submitted Successfully
      </div>
    ),
    "/share/:formId": ({ formId }: { formId: string }) =>
      SuspenseLoad(<ShareForm formID={Number(formId)} />),
    "*": () => <NotFound />,
  };

  const routeResult = useRoutes(routes);
  return routeResult || <NotFound />;
}
