"use client";

import React, { useState } from "react";
import { User, Mail, Edit } from "lucide-react";

const ProfileCard = ({ user, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user.fullName);
  const [tempEmail, setTempEmail] = useState(user.email);

  const handleSave = () => {
    onUpdate({ fullName: tempName, email: tempEmail });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center p-6 text-center bg-white shadow-lg rounded-2xl">
      <div className="relative w-32 h-32 mb-4">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="object-cover w-full h-full rounded-full"
        />
        <button
          className="absolute bottom-0 right-0 p-2 text-white rounded-full bg-primary hover:bg-primary/80"
          onClick={() => setIsEditing(true)}
        >
          <Edit size={16} />
        </button>
      </div>

      {isEditing ? (
        <div className="w-full space-y-3">
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            className="w-full p-2 text-center border rounded-xl"
          />
          <input
            type="email"
            value={tempEmail}
            onChange={(e) => setTempEmail(e.target.value)}
            className="w-full p-2 text-center border rounded-xl"
          />
          <div className="flex justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="px-4 py-2 font-medium text-white rounded-xl bg-primary"
            >
              Save
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 font-medium bg-gray-200 rounded-xl"
            >
              Cancel
            </motion.button>
          </div>
        </div>
      ) : (
        <>
          <h2 className="mb-1 text-xl font-semibold text-primary">
            {user.fullName}
          </h2>
          <p className="flex items-center justify-center gap-2 text-sm text-secondary">
            <Mail size={16} /> {user.email}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 mt-4 font-medium text-white shadow rounded-xl bg-primary hover:bg-primary/90"
          >
            Edit Profile
          </motion.button>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
