import React, { useState } from "react";
import Form from "./components/Form";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  const [state, setState] = useState("Home");
  const openForm = () => {
    setState("Form");
  };
  const closeForm = () => {
    setState("Home");
  };
  return (
    <div className="flex min-h-screen h-full bg-gray-200 items-center">
      <div className="w-3/5 lg:w-2/5 p-4 my-10 mx-auto bg-white shadow-lg rounded-xl flex flex-col">
        <Header title="Level 2 Submission" />
        {state === "Home" ? (
          <Home openFormCB={openForm} />
        ) : (
          <Form closeFormCB={closeForm} />
        )}
      </div>
    </div>
  );
}

export default App;
