import React from "react";

export default function ShippingAddress({
  address = {},
  title = "Shipping Address",
  className = "",
}) {
  if (!address || Object.keys(address).length === 0) {
    return (
      <div className={`p-3 bg-gray-50 rounded ${className}`}>
        <h4 className="mb-2 text-sm font-semibold">{title}</h4>
        <div className="text-sm text-gray-600">No address provided</div>
      </div>
    );
  }

  const {
    address: addr = "",
    city = "",
    postalCode = "",
    country = "",
  } = address;

  return (
    <div className={`p-3 bg-gray-50 rounded ${className}`}>
      {title ? <h4 className="mb-2 text-sm font-semibold">{title}</h4> : null}
      <div className="text-sm text-gray-700 space-y-1">
        <div>
          <span className="font-medium">• Address:</span>{" "}
          <span className="text-gray-600">{addr || "-"}</span>
        </div>
        <div>
          <span className="font-medium">• City:</span>{" "}
          <span className="text-gray-600">{city || "-"}</span>
        </div>
        <div>
          <span className="font-medium">• Postal Code:</span>{" "}
          <span className="text-gray-600">{postalCode || "-"}</span>
        </div>
        <div>
          <span className="font-medium">• Country:</span>{" "}
          <span className="text-gray-600">{country || "-"}</span>
        </div>
      </div>
    </div>
  );
}
