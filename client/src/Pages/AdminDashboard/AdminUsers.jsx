import React, { useEffect, useState } from "react";
import { Edit2, Trash2, User, Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../redux/adminUsersSlice";

const statusStyles = {
  Active: "bg-lightGreen/20 text-lightGreen",
  Inactive: "bg-primary/20 text-primary",
};

export default function AdminUsers() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.adminUsers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "Active",
    password: "",
  });

  const [modalError, setModalError] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const openAddModal = () => {
    setEditUser(null);
    setFormData({
      name: "",
      email: "",
      role: "user",
      status: "Active",
      password: "",
    });
    setModalError("");
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "user",
      status: user.status || "Active",
      password: "",
    });
    setModalError("");
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await dispatch(deleteUser(id));
    dispatch(fetchUsers());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalError("");
    if (!formData.email || !formData.name) {
      setModalError("Name and email are required.");
      return;
    }
    if (!["admin", "user"].includes(formData.role)) {
      setModalError("Role must be 'admin' or 'user'.");
      return;
    }
    if (!["Active", "Inactive"].includes(formData.status)) {
      setModalError("Status must be 'Active' or 'Inactive'.");
      return;
    }
    let result;
    if (editUser) {
      result = await dispatch(updateUser({ id: editUser._id, user: formData }));
    } else {
      result = await dispatch(createUser(formData));
    }
    if (result.error) {
      setModalError(result.error.message || result.error);
      return;
    }
    setIsModalOpen(false);
    dispatch(fetchUsers());
  };

  return (
    <div className="min-h-screen p-5 bg-transparent">
      <div className="flex flex-col items-start justify-between gap-3 mb-6 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-primary">Users</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 transition bg-primary text-primary-foreground rounded-xl hover:opacity-90 w-fit"
        >
          <Plus size={18} /> Add User
        </button>
      </div>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="hidden overflow-hidden shadow-lg md:block rounded-xl bg-primary/10">
        <table className="w-full text-left">
          <thead className="bg-primary/20 text-primary">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className={`border-t border-primary/10 ${
                  idx % 2 === 0 ? "bg-white/40" : "bg-white/20"
                }`}
              >
                <td className="p-4 font-semibold text-primary">{user.name}</td>
                <td className="p-4 text-primary">{user.email}</td>
                <td className="p-4 font-medium text-primary">{user.role}</td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      statusStyles[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="flex justify-center gap-2 p-4 text-center">
                  <button
                    onClick={() => openEditModal(user)}
                    className="inline-flex p-2 transition rounded-lg bg-primary/10 hover:bg-primary/20"
                  >
                    <Edit2 size={18} className="text-primary" />
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="inline-flex p-2 transition rounded-lg bg-red-500/10 hover:bg-red-500/20"
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex flex-col items-start justify-between gap-3 p-4 shadow sm:flex-row sm:items-center bg-primary/10 rounded-xl"
          >
            <div className="flex flex-col flex-1 gap-1">
              <div className="font-semibold text-primary">{user.name}</div>
              <div className="text-primary">{user.email}</div>
              <div className="font-medium text-primary">{user.role}</div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  statusStyles[user.status]
                }`}
              >
                {user.status}
              </span>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => openEditModal(user)}
                className="p-2 transition rounded-lg bg-primary/10 hover:bg-primary/20"
              >
                <Edit2 size={18} className="text-primary" />
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="p-2 transition rounded-lg bg-red-500/10 hover:bg-red-500/20"
              >
                <Trash2 size={18} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="relative w-full max-w-xl p-6 bg-white rounded-xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute p-2 transition rounded-full top-4 right-4 hover:bg-gray-200"
            >
              <X size={20} />
            </button>
            <h2 className="mb-4 text-xl font-bold text-primary">
              {editUser ? "Edit User" : "Add User"}
            </h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              {!editUser && (
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  required
                />
              )}
              {modalError && (
                <div className="text-red-500 text-sm mb-2">{modalError}</div>
              )}
              <button
                type="submit"
                className="px-4 py-2 mt-4 font-bold text-white transition bg-primary rounded-xl hover:opacity-90"
              >
                {editUser ? "Update User" : "Add User"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
