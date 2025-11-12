"use client";

import React, { useState } from "react";
import ProfileCard from "./ProfileCard/ProfileCard";
import AccountTabs from "./AccountTabs/AccountTabs";

const UserAccount = () => {
  const [user, setUser] = useState({
    avatar: "https://i.pravatar.cc/150?img=32",
    fullName: "AsMa Ahmed",
    email: "asma@example.com",
  });

  const handleUpdateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <div className="p-4 md:p-8 bg-[#f7f7f7] min-h-screen">
      <div className="flex flex-col gap-6 mx-auto max-w-7xl lg:flex-row">
        {/* Left: Profile Card */}
        <ProfileCard user={user} onUpdate={handleUpdateProfile} />

        {/* Right: Tabs */}
        <div className="flex-1">
          <AccountTabs user={user} onUpdate={handleUpdateProfile} />
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
