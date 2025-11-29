"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../lib/api/api";
import { loginSuccess } from "../../redux/authSlice";
import ProfileCard from "./ProfileCard/ProfileCard";
import AccountTabs from "./AccountTabs/AccountTabs";

const UserAccount = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  console.log(user);

  // 🔹 تحديث بيانات البروفايل
  const handleUpdateProfile = async (updatedData) => {
    try {
      const res = await updateUserProfile(updatedData);

      // دمج البيانات القديمة مع الجديدة لتجنب فقد أي حقل
      const updatedUser = { ...user, ...res.data };
      dispatch(
        loginSuccess({
          user: updatedUser,
          token,
        })
      );
      
      // Save updated user to localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ Profile update failed:", err);
      alert("Failed to update profile");
    }
  };

  if (!user) return <p className="p-6 text-center">Loading profile...</p>;

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
