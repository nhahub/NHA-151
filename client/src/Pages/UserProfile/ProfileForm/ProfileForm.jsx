import React, { useState, useEffect } from "react";

const ProfileForm = ({ user, onUpdate }) => {
  // Local state initialized from Redux user
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // Keep formData in sync if Redux user changes
  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData); // Send updated data to handleUpdateProfile
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-secondary">
          Full Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary">
          Email
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 font-medium text-white shadow rounded-xl bg-primary hover:bg-primary/90"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileForm;
