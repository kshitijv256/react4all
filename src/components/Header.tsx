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

const menuItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

export default function Header(props: { currentUser: User }) {
  return (
    <div className="flex gap-2 items-center">
      <Logo animation="spin infinite 5s linear reverse" />
      <ActiveLink href="/"></ActiveLink>

      <div className="flex gap-5 items-center">
        {menuItems.map((item) => (
          <ActiveLink
            key={item.name}
            href={item.href}
            className="text-xl"
            exactActiveClass="text-blue-600"
          >
            {item.name}
          </ActiveLink>
        ))}
        {props.currentUser?.username?.length > 0 ? (
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
        )}
      </div>
      {/* <Logo animation='spin infinite 5s linear' /> */}
    </div>
  );
}
