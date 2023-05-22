import React from "react";
import Logo from "./Logo";
import { ActiveLink, navigate } from "raviger";
import { User } from "../types/User";

// export default function Header(props: { title: string }) {
//   return (
//     <div className="flex flex-row justify-between items-center py-2">
//       <Logo animation="spin infinite 5s linear reverse" />
//       <h1 className="text-2xl font-semibold w-full text-center">
//         {props.title}
//       </h1>
//       <Logo animation="spin infinite 5s linear" />
//     </div>
//   );
// }

export default function Header(props: { currentUser: User }) {
  return (
    <div className="flex gap-2 items-center">
      <Logo animation="spin infinite 5s linear reverse" />
      <div className="flex gap-5 items-center">
        {[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          ...(props.currentUser && props.currentUser?.username?.length > 0
            ? [
                {
                  name: "Logout",
                  onClick: () => {
                    localStorage.removeItem("token");
                    navigate("/login");
                    window.location.reload();
                  },
                },
              ]
            : [{ name: "Login", href: "/login" }]),
        ].map((item) =>
          item.href ? (
            <ActiveLink
              key={item.name}
              href={item.href}
              className="text-xl"
              exactActiveClass="text-blue-600"
            >
              {item.name}
            </ActiveLink>
          ) : (
            <button key={item.name} onClick={item.onClick} className="text-xl">
              {item.name}
            </button>
          )
        )}
        {/* {props.currentUser?.username?.length > 0 ? (
          <button
            className="text-xl"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
              window.location.reload();
            }}
          >
            Logout
          </button>
        ) : (
          <ActiveLink
            href="/login"
            className="text-xl"
            exactActiveClass="text-blue-600"
          >
            Login
          </ActiveLink>
        )
        } */}
      </div>
      {/* <Logo animation='spin infinite 5s linear' /> */}
    </div>
  );
}
