// src/features/admin/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash2, Plus, X } from "lucide-react";
import {
  fetchAdminProducts,
  addAdminProduct,
  editAdminProduct,
  deleteAdminProduct,
} from "../../redux/adminProductsSlice";
import { API_ROOT } from "../../lib/api/api";

export default function AdminProducts() {
  const dispatch = useDispatch();

  const {
    products = [],
    loading,
    error,
  } = useSelector((state) => state.adminProducts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    imageUrl: "",
    description: "",
    careInfo: {
      watering: "",
      light: "",
      humidity: "",
      temperature: "",
      fertilizer: "",
    },
    features: [],
  });

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const getImageSrc = (url) => {
    if (!url || typeof url !== 'string') return 'https://via.placeholder.com/60';
    // Reject any url that references the products API (avoid 404s)
    if (url.includes('/api/products')) return 'https://via.placeholder.com/60';
    // data URIs or absolute URLs
    if (url.startsWith('data:') || /^(https?:)?\/\//i.test(url)) return url;
    // If it's a relative path, prefix with API root
    if (url.startsWith('/')) return `${API_ROOT.replace(/\/$/, '')}${url}`;
    // Otherwise return as-is
    return url;
  };

  const openAddModal = () => {
    setEditProduct(null);
    setFormData({
      name: "",
      category: "",
      price: "",
      imageUrl: "",
      imageFile: null,
      description: "",
      careInfo: {
        watering: "",
        light: "",
        humidity: "",
        temperature: "",
        fertilizer: "",
      },
      features: [],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      imageUrl: product.images?.[0]?.url || "",
      description: product.description || "",
      careInfo: { ...product.careInfo },
      features: product.features || [],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await dispatch(deleteAdminProduct(id)).unwrap();
    } catch (err) {
      if (err?.status === 404 || (err?.message && err.message.includes('Not Found'))) {
        // Remove product from UI if not found
        alert('Product not found or already deleted.');
        // Optionally, update local state
        // setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        console.error(err);
        alert(err?.message || "Failed to delete product.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("careInfo.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        careInfo: { ...prev.careInfo, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const addFeatureField = () =>
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  const removeFeatureField = (index) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData((prev) => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.price || isNaN(formData.price)) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      // Create JSON object (NOT FormData)
      const data = {
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        description: formData.description,
        careInfo: formData.careInfo,
        // Filter out empty feature strings
        features: formData.features.filter(f => f && f.trim()),
      };
      
      // Handle images — ensure it's in the correct format for backend
      if (formData.imageUrl) {
        data.images = [{ url: formData.imageUrl }];
      }

      if (editProduct) {
        await dispatch(
          editAdminProduct({ id: editProduct._id, data })
        ).unwrap();
      } else {
        await dispatch(addAdminProduct(data)).unwrap();
      }

      setIsModalOpen(false);

      // Reset form
      setFormData({
        name: "",
        category: "",
        price: "",
        imageUrl: "",
        imageFile: null,
        description: "",
        careInfo: {
          watering: "",
          light: "",
          humidity: "",
          temperature: "",
          fertilizer: "",
        },
        features: [],
      });
    } catch (err) {
      console.error(err);
      alert(err?.message || "Failed to save product.");
    }
  };

  return (
    <div className="min-h-screen p-5 bg-transparent">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-3 mb-6 sm:flex-row sm:items-center">
        <h1 className="text-3xl font-bold text-primary">Products</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 transition bg-primary text-primary-foreground rounded-xl hover:opacity-90 w-fit"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {loading && <p>Loading products...</p>}
      {error && (
        <p className="text-red-500">
          {typeof error === "string"
            ? error
            : error.message || JSON.stringify(error)}
        </p>
      )}

      {/* Table */}
      <div className="hidden overflow-x-auto shadow-lg md:block rounded-xl bg-primary/10">
        <table className="w-full text-left min-w-[600px]">
          <thead className="bg-primary/20 text-primary">
            <tr>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr
                  key={product._id}
                  className={`border-t border-primary/10 ${
                    index % 2 === 0 ? "bg-white/40" : "bg-white/20"
                  }`}
                >
                  <td className="p-4">
                    <img
                      src={
                        product.images?.[0]?.url
                          ? getImageSrc(product.images[0].url)
                          : "https://via.placeholder.com/60"
                      }
                      alt={product.name}
                      className="object-cover w-12 h-12 rounded-lg"
                    />
                  </td>
                  <td className="p-4 font-semibold text-primary">
                    {product.name}
                  </td>
                  <td className="p-4 text-primary">{product.category}</td>
                  <td className="p-4 font-semibold text-primary">
                    ${product.price}
                  </td>
                  <td className="flex justify-center gap-2 p-4 text-center">
                    <button
                      onClick={() => openEditModal(product)}
                      className="inline-flex p-2 transition rounded-lg bg-primary/10 hover:bg-primary/20"
                    >
                      <Edit2 size={18} className="text-primary" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-flex p-2 transition rounded-lg bg-red-500/10 hover:bg-red-500/20"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-4 text-center text-primary">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Cards for small screens */}
      <div className="flex flex-col gap-4 md:hidden">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col items-center justify-between gap-3 p-4 shadow sm:flex-row sm:items-start bg-primary/10 rounded-xl"
            >
              <img
                src={
                  product.images?.[0]?.url
                    ? getImageSrc(product.images[0].url)
                    : "https://via.placeholder.com/60"
                }
                alt={product.name}
                className="object-cover w-20 h-20 rounded-lg"
              />
              <div className="flex flex-col flex-1 gap-1 text-primary">
                <div className="font-semibold text-primary">{product.name}</div>
                <div>Category: {product.category}</div>
                <div className="font-semibold">Price: ${product.price}</div>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button
                  onClick={() => openEditModal(product)}
                  className="p-2 transition rounded-lg bg-primary/10 hover:bg-primary/20"
                >
                  <Edit2 size={18} className="text-primary" />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="p-2 transition rounded-lg bg-red-500/10 hover:bg-red-500/20"
                >
                  <Trash2 size={18} className="text-red-500" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-primary">No products found.</p>
        )}
      </div>

      {/* Modal */}
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
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>

            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              {["name", "category", "price"].map((field) => (
                <input
                  key={field}
                  name={field}
                  type={field === "price" ? "number" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className="p-2 border rounded"
                  required
                />
              ))}

              <input
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="p-2 border rounded"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="p-2 border rounded"
              />

              <h3 className="mt-3 font-semibold">Care Info</h3>
              {Object.keys(formData.careInfo).map((key) => (
                <input
                  key={key}
                  name={`careInfo.${key}`}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  value={formData.careInfo[key] || ""}
                  onChange={handleChange}
                  className="p-2 border rounded"
                />
              ))}

              <h3 className="mt-3 font-semibold">Features</h3>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    value={feature}
                    placeholder="Feature"
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeatureField(index)}
                    className="px-2 text-white bg-red-500 rounded"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFeatureField}
                className="px-3 py-1 mt-1 font-semibold text-white rounded bg-primary w-fit"
              >
                Add Feature
              </button>

              <button
                type="submit"
                className="px-4 py-2 mt-4 font-bold text-white transition bg-primary rounded-xl hover:opacity-90"
              >
                {editProduct ? "Update Product" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
