import React, { useState } from "react";
import Publication from "../components/Publication";
import { useActiveProfile, useWalletLogin, useFeed } from "@lens-protocol/react";
import { useAccount } from "wagmi";
import LoginButton from "../components/LoginButton";
import ProfileSwitcher from "../components/ProfileSwitcher";
import { SiSpringCreators } from "react-icons/si";

const ContentFeedPage = () => {
  const { data: activeProfile, loading: profileLoading } = useActiveProfile();
  const { login, error: loginError, isPending: isLoginPending } = useWalletLogin();
  const { isConnected } = useAccount();
  const { data: feed, loading, hasMore, next } = useFeed({
    profileId: activeProfile?.id,
    limit: 10,
  });

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
        <div className="font-main object-center self-center mt-[5%] text-xl ml-5">
          you don't have an active profile, please{" "}
          <a href="/edit-profile" className="underline">
            create one
          </a>
        </div>
      )}
      {isConnected && activeProfile && (
        <div>
          <ProfileSwitcher showCreateNew={false} />

          {!feed || (feed.length === 0 && (
            <div className="font-main object-center self-center mt-[5%] text-xl ml-5">
              your feed appears to be empty, try following more accounts
            </div>
          ))}
          {feed &&
            feed.map((publication, id) => {
              return (
                <Publication
                  key={publication.root.id}
                  content={publication.root.metadata?.content}
                  description={publication.root.metadata?.description}
                  media={publication.root.metadata?.media}
                  publisher={publication.root.profile}
                />
              );
            })}
        </div>
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

export default ContentFeedPage;
