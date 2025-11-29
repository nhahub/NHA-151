"use client";

import React from "react";
import { Mail, User } from "lucide-react";

const ProfileCard = ({ user }) => {
  // الصورة الافتراضية لو مفيش avatar
  const avatarUrl =
    user.avatar ||
    "https://icon-library.com/images/user-accounts-icon/user-accounts-icon-15.jpg";

  return (
    <div className="flex flex-col items-center w-full max-w-sm p-6 mx-auto text-center bg-white shadow-lg rounded-2xl">
      <div className="relative w-32 h-32 mb-4">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="object-cover w-full h-full rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
            <User size={48} className="text-gray-400" />
          </div>
        )}
      </div>

      <h2 className="mb-1 text-xl font-semibold text-primary">{user.name}</h2>
      <p className="flex items-center justify-center gap-2 text-sm text-secondary">
        <Mail size={16} /> {user.email}
      </p>
    </div>
  );
};

export default ProfileCard;
