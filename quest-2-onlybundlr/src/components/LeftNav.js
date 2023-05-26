import React, { useState } from "react";
import { SlHome } from "react-icons/sl";
import { SlUser } from "react-icons/sl";
import { AiOutlinePlus } from "react-icons/ai";

const LeftNav = () => {
  const [nightMode, setNightMode] = useState(false);

  const toggleNightMode = () => {
    setNightMode((prevNightMode) => !prevNightMode);
  };

  return (
    <div className={`flex flex-col w-1/6 h-screen sticky top-0 bg-background ${nightMode ? "night-mode" : ""}`}>
      <a className="mt-5 mb-2 mx-2 self-end" href="/home">
        <SlHome className="hover:h-12 hover:w-12 ease-in-out duration-300 h-10 w-10" />
      </a>
      <a className="my-2 mx-2 self-end" href="/edit-profile">
        <SlUser className="hover:h-12 hover:w-12 ease-in-out duration-300 h-10 w-10" />
      </a>
      <a className="my-2 mx-2 self-end" href="/create-publication">
        <AiOutlinePlus className="hover:h-12 hover:w-12 ease-in-out duration-300 h-10 w-10 rounded-full ring-2 bg-primary hover:bg-secondary" />
      </a>
      <div className="flex items-center justify-end mt-4 mr-4">
        <label htmlFor="night-mode-toggle" className="text-sm text-gray-500 mr-2">
          Night Mode
        </label>
        <input
          type="checkbox"
          id="night-mode-toggle"
          className="hidden"
          checked={nightMode}
          onChange={toggleNightMode}
        />
        <div
          className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 ${
            nightMode ? "bg-indigo-600" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
              nightMode ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;