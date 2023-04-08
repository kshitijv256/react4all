import React from "react";
import Logo from "./Logo";

export default function Header(props: { title: string }) {
  return (
    <div className="flex flex-row justify-between items-center py-2">
      <Logo animation="spin infinite 5s linear reverse" />
      <h1 className="text-2xl font-semibold w-full text-center">
        {props.title}
      </h1>
      <Logo animation="spin infinite 5s linear" />
    </div>
  );
}
