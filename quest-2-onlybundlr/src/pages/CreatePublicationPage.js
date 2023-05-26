import React, { useState } from "react";
import { useActiveProfile } from "@lens-protocol/react";
import PublicationComposer from "../components/PublicationComposer";
import { useAccount } from "wagmi";
import LoginButton from "../components/LoginButton";
import { SiSpringCreators } from "react-icons/si";

const CreatePublication = () => {
  const { data: activeProfile, loading: profileLoading } = useActiveProfile();
  const { isConnected } = useAccount();

  const [nightMode, setNightMode] = useState(false);

  const toggleNightMode = () => {
    setNightMode(!nightMode);
  };

  return (
    <div
      className={`flex flex-col w-3/6 bg-background px-5 ${
        nightMode ? "night-mode" : ""
      }`}
    >
      {!isConnected && (
        <div className="object-center self-center mt-5">
          <span className="flex flex-row justify-start font-logo text-2xl mb-3">
            Welcome to:
          </span>
          <div className="flex flex-row justify-center font-logo text-6xl mb-3">
            <SiSpringCreators /> OnlyBundlr
          </div>
          <LoginButton />
        </div>
      )}
      {!activeProfile && (
        <div className="object-center self-center mt-[5%] text-xl ml-5">
          you don't have an active profile, please{" "}
          <a href="/edit-profile" className="underline">
            create one
          </a>
        </div>
      )}
      {isConnected && !profileLoading && activeProfile && (
        <PublicationComposer publisher={activeProfile} />
      )}

      <button className="toggle-night-mode" onClick={toggleNightMode}>
        Toggle Night Mode
      </button>

      <style>
        {`
          .night-mode {
            background-color: #1a202c;
            color: #cbd5e0;
          }

          .toggle-night-mode {
            margin-top: 10px;
            padding: 5px 10px;
            background-color: #cbd5e0;
            color: #1a202c;
            border: none;
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default CreatePublication;
