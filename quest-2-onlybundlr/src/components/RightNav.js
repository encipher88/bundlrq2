import React, { useState, useEffect } from "react";
import SuggestedProfile from "../components/SuggestedProfile";
import { useExploreProfiles } from "@lens-protocol/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { SiSpringCreators } from "react-icons/si";

const RightNav = () => {
  const [suggestedProfileHandles, setSuggestedProfileHandles] = useState([]);
  const { isConnected } = useAccount();
  const [nightMode, setNightMode] = useState(false);

  useEffect(() => {
    // Hardcoded list of profiles to follow
    const profiles = [
      "llamakahlo.test",
      "llamaanime.test",
      "llamablackandwhite.test",
      "llamafigurine.test",
      "llamabasquiat.test",
    ];
    // Shuffle the order
    for (let i = profiles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [profiles[i], profiles[j]] = [profiles[j], profiles[i]];
    }
    // Pick just 4
    setSuggestedProfileHandles(profiles.slice(0, 4));
  }, []);

  const toggleNightMode = () => {
    setNightMode((prevNightMode) => !prevNightMode);
  };

  return (
    <div className={`w-3/6 h-screen sticky top-0 pt-5 bg-background px-4 ${nightMode ? "night-mode" : ""}`}>
      {isConnected && (
        <>
          <div className="flex flex-row justify-center font-logo text-6xl mb-3">
            <SiSpringCreators /> OnlyBundlr
          </div>

          <h1 className="font-main bg-primary rounded-xl pl-1">Suggested Profiles</h1>
          <div className="flex flex-col">
            {suggestedProfileHandles.map((suggestedProfileHandle, id) => {
              return <SuggestedProfile key={id} handle={suggestedProfileHandle} />;
            })}
          </div>
        </>
      )}

      <div className="flex items-center justify-end mt-4 mr-4">
        <label htmlFor="night-mode-toggle" className="text-sm text-gray-500 mr-2">
          Night Mode
        </label>
        <input type="checkbox" id="night-mode-toggle" className="hidden" checked={nightMode} onChange={toggleNightMode} />
        <div
          className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 ${nightMode ? "bg-indigo-600" : "bg-gray-400"}`}
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

export default RightNav;