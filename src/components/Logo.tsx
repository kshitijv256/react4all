import React from "react";
import logo from "../logo.svg";

export default function Logo(props: { animation: string }) {
  return (
    <img
      src={logo}
      className="w-28 animate-spin"
      alt="logo"
      style={{ animation: props.animation }}
    />
  );
}
