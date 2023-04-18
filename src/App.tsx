import React from "react";
import Header from "./components/Header";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div className="flex min-h-screen h-full bg-gray-200 items-center">
      <div className="w-3/5 lg:w-2/5 p-4 my-10 mx-auto bg-white shadow-lg rounded-xl flex flex-col">
        <Header title="Level 4 Submission" />
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
