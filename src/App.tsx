import React from "react";
import Header from "./components/Header";
import AppRouter from "./router/AppRouter";
import { Link } from "raviger";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 items-center">
      <div className="w-3/5 lg:w-2/5 p-4 my-10 mx-auto bg-white shadow-lg rounded-xl flex flex-col">
        <Header currentUser={""}/>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
