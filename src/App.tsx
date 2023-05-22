import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import AppRouter from "./router/AppRouter";
import { Link } from "raviger";
import { me } from "./utils/apiUtils";
import { User } from "./types/User";

const getCurrentUser = async (setCurrentUser: (value: User) => void) => {
  const currentUser = await me();
  setCurrentUser(currentUser);
};
function App() {
  const [currentUser, setCurrentUser] = useState<User>(null);
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-gray-200 items-center">
      <div className="w-3/5 lg:w-2/5 p-4 my-10 mx-auto bg-white shadow-lg rounded-xl flex flex-col">
        <Header currentUser={currentUser} />
        <div className="flex justify-between items-center">
          { currentUser && currentUser.username?.length > 0 ? <h1 className="text-xl capitalize pl-4 pt-4 text-sky-700 font-semibold">User: {currentUser.username}</h1>: "" }
        </div>
        <AppRouter currentUser={currentUser}/>
      </div>
    </div>
  );
}

export default App;
