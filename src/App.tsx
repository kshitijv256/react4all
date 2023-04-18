import React from "react";
import Header from "./components/Header";
import AppRouter from "./router/AppRouter";
import { Link } from "raviger";

function App() {
  return (
    <div className="flex flex-col min-h-screen h-full bg-gray-200 items-center">
      <div className="flex bg-gray-200 w-full px-2 justify-end">
        <Link href="/">
          <div className="p-2 hover:bg-cyan-300">Home</div>
        </Link>
        <Link href="/about">
          <div className="p-2 hover:bg-cyan-300">About</div>
        </Link>
      </div>
      <div className="w-3/5 lg:w-2/5 p-4 my-10 mx-auto bg-white shadow-lg rounded-xl flex flex-col">
        <Header title="Level 4 Submission" />
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
