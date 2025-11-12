"use client";

import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import { User, MapPin, ShoppingCart, Lock } from "lucide-react";
import OrdersTable from "../OrdersTable/OrdersTable";

const tabs = [
  { name: "Profile", icon: User },
  { name: "Addresses", icon: MapPin },
  { name: "Orders", icon: ShoppingCart },
  { name: "Security", icon: Lock },
];

const AccountTabs = ({ user, onUpdate }) => {
  const [addresses, setAddresses] = useState([
    { id: 1, label: "Home", address: "123 Main St, Cairo, Egypt" },
    { id: 2, label: "Office", address: "456 Work Ave, Cairo, Egypt" },
  ]);

  const [editingAddress, setEditingAddress] = useState(null);

  const handleSaveAddress = (addr) => {
    if (addr.id) {
      // Update existing
      setAddresses((prev) =>
        prev.map((a) => (a.id === addr.id ? { ...a, ...addr } : a))
      );
    } else {
      // Add new
      setAddresses((prev) => [...prev, { ...addr, id: Date.now() }]);
    }
    setEditingAddress(null);
  };

  return (
    <Tab.Group>
      {/* Tab Navigation */}
      <Tab.List className="flex p-1 mb-4 space-x-1 bg-white shadow rounded-2xl">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              `flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium ${
                selected
                  ? "bg-primary text-white"
                  : "text-secondary hover:bg-gray-100"
              }`
            }
          >
            <tab.icon size={18} />
            {tab.name}
          </Tab>
        ))}
      </Tab.List>

      <Tab.Panels className="space-y-4">
        {/* Profile Tab */}
        <Tab.Panel>
          <div className="p-6 space-y-4 bg-white shadow rounded-2xl">
            <h3 className="text-lg font-semibold text-primary">Profile Info</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.fullName || ""}
                  onChange={(e) => onUpdate({ fullName: e.target.value })}
                  className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  onChange={(e) => onUpdate({ email: e.target.value })}
                  className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="px-4 py-2 font-medium text-white shadow rounded-xl bg-primary hover:bg-primary/90">
                Save Changes
              </button>
            </form>
          </div>
        </Tab.Panel>

        {/* Addresses Tab */}
        <Tab.Panel>
          <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 space-y-4 bg-white shadow rounded-2xl"
          >
            <h3 className="text-lg font-semibold text-primary">Address Book</h3>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className="flex items-center justify-between p-4 border rounded-xl hover:shadow"
              >
                <span>
                  {addr.label}: {addr.address}
                </span>
                <div className="flex gap-2">
                  <button
                    className="font-medium text-primary"
                    onClick={() => setEditingAddress(addr)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => setEditingAddress({ label: "", address: "" })}
              className="px-4 py-2 font-medium text-white shadow rounded-xl bg-primary hover:bg-primary/90"
            >
              Add Address
            </button>

            {/* Address Modal */}
            {editingAddress && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
                  <h4 className="mb-4 text-lg font-semibold text-primary">
                    {editingAddress.id ? "Edit Address" : "Add Address"}
                  </h4>
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveAddress(editingAddress);
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Label"
                      value={editingAddress.label}
                      onChange={(e) =>
                        setEditingAddress((prev) => ({
                          ...prev,
                          label: e.target.value,
                        }))
                      }
                      className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={editingAddress.address}
                      onChange={(e) =>
                        setEditingAddress((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                      className="w-full p-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingAddress(null)}
                        className="px-4 py-2 font-medium bg-gray-200 rounded-xl hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 font-medium text-white rounded-xl bg-primary hover:bg-primary/90"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </Tab.Panel>

        {/* Orders Tab */}
        <Tab.Panel>
          <OrdersTable />
        </Tab.Panel>

        {/* Security Tab */}
        <Tab.Panel>
          <div className="p-6 space-y-4 bg-white shadow rounded-2xl">
            <h3 className="text-lg font-semibold text-primary">
              Change Password
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full p-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button className="px-4 py-2 font-medium text-white shadow rounded-xl bg-primary hover:bg-primary/90">
                Change Password
              </button>
            </form>
          </div>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default AccountTabs;
