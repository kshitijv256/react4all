import React from "react";
import notFound from "../assets/404.svg";

export default function NotFound() {
  return (
    <div className="w-full flex flex-col items-center">
      <img src={notFound} alt="404" className="w-32" />
      <span className="text-red-400 text-xl font-semibold">Error: 404</span>
      <div className="text-2xl">Page not found</div>
    </div>
  );
}
