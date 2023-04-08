import React from "react";
import logo from "../logo.svg";

export default function Header(props: { title: string }) {
  return (
    <div className="flex flex-row justify-between items-center">
      <img
        src={logo}
        className="w-28"
        alt="logo"
        style={{ animation: "spin infinite 5s linear" }}
      />
      <h1 className="text-2xl font-semibold w-full text-center">
        {props.title}
      </h1>
    </div>
  );
}
