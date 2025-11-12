import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, CheckCircle2, X } from "lucide-react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import { useCart } from "@/Components/Common/Cart/useCart";

// Success Modal Component with Framer Motion
const SuccessModal = ({ isOpen, onClose, orderNumber }) => (
  <AnimatePresence>
    {isOpen && (
      <Motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Motion.div
          className="relative w-full max-w-md p-8 shadow-2xl rounded-2xl bg-lime-100"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
        >
          <button
            onClick={onClose}
            className="absolute flex items-center justify-center w-8 h-8 transition-all duration-200 rounded-full top-4 right-4 bg-secondary/5 text-secondary hover:bg-secondary/10"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/15">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="mb-2 text-2xl font-bold text-secondary">
              Order Placed Successfully!
            </h3>
            <p className="mb-4 text-sm text-secondary">
              Your order #{orderNumber} has been confirmed.
            </p>
            <p className="mb-6 text-sm text-secondary/70">
              We'll send you a confirmation email shortly.
            </p>
            <Button
              onClick={onClose}
              className="w-full px-6 py-3 font-semibold transition-all duration-200 rounded-full bg-primary text-secondary hover:bg-primary/90"
            >
              Continue Shopping
            </Button>
          </div>
        </Motion.div>
      </Motion.div>
    )}
  </AnimatePresence>
);

const FormInput = ({
  id,
  label,
  type = "text",
  required = false,
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="block text-sm font-semibold text-secondary">
      {label} {required && <span className="ml-1 text-primary">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`w-full px-4 py-3 text-sm rounded-xl border transition-all duration-200 bg-white ${
        error ? "border-red-500" : "border-primary/30"
      }`}
      style={{ color: "oklch(14.1% 0.005 285.823)" }}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const PaymentOption = (
  // eslint-disable-next-line no-unused-vars
  { value, selected, onChange, label, Icon: _IconComponent }
) => {
  // Icon is passed but we use inline lucide icons in the parent based on payment method
  return (
  <button
    type="button"
    onClick={() => onChange(value)}
    className={`flex items-center gap-3 w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
      selected ? "shadow-md" : "hover:shadow-sm"
    }`}
    style={{
      borderColor: selected
        ? "oklch(45.3% 0.124 130.933)"
        : "oklch(45.3% 0.124 130.933)/20",
      backgroundColor: selected ? "oklch(45.3% 0.124 130.933)/5" : "white",
    }}
  >
    {/* Render the passed Icon component */}
    <_IconComponent
      className="w-5 h-5 shrink-0"
      style={{
        color: selected
          ? "oklch(45.3% 0.124 130.933)"
          : "oklch(45.3% 0.124 130.933)/60",
      }}
    />
    <span
      className={`font-medium ${
        selected ? "text-secondary" : "text-secondary/80"
      }`}
    >
      {label}
    </span>
    {selected && (
      <CheckCircle2 className="w-5 h-5 ml-auto shrink-0 text-primary" />
    )}
  </button>
  );
};

export default function Checkout() {
  const navigate = useNavigate();
  const {
    cartItems = [],
  } = useCart() || {};
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber] = useState(
    () => `ORD-${Date.now().toString().slice(-6)}`
  );

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    postalCode: "",
    country: "United States",
    paymentMethod: "credit",
    cardNumber: "",
    expiration: "",
    cvc: "",
  });

  const [errors, setErrors] = useState({});

  const orderSummary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shipping = subtotal >= 150 ? 0 : 15;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "address1",
      "city",
      "postalCode",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) newErrors[field] = "This field is required";
    });
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email";
    if (formData.paymentMethod === "credit") {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = "Required";
      if (!formData.expiration.trim()) newErrors.expiration = "Required";
      if (!formData.cvc.trim()) newErrors.cvc = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) setShowSuccess(true);
  };

  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-lime-100">
        <div className="relative px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-12">
          <button
            onClick={() => navigate("/cart")}
            className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-secondary/80 hover:gap-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </button>
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold sm:text-4xl text-secondary">
              Checkout
            </h1>
            <p className="text-base text-secondary/70">
              Complete your order to bring nature home
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* Left - Form */}
            <Motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <Card className="bg-white shadow-lg rounded-2xl border-primary/15">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-secondary">
                    Billing Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <FormInput
                          id="fullName"
                          label="Full Name"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          error={errors.fullName}
                          placeholder="John Doe"
                        />
                      </div>
                      <FormInput
                        id="email"
                        label="Email Address"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        error={errors.email}
                        placeholder="john@example.com"
                      />
                      <FormInput
                        id="phone"
                        label="Phone Number"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        error={errors.phone}
                        placeholder="+1 (555) 123-4567"
                      />
                      <div className="sm:col-span-2">
                        <FormInput
                          id="address1"
                          label="Address Line 1"
                          required
                          value={formData.address1}
                          onChange={handleInputChange}
                          error={errors.address1}
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <FormInput
                          id="address2"
                          label="Address Line 2 (Optional)"
                          value={formData.address2}
                          onChange={handleInputChange}
                          placeholder="Apartment, suite, etc."
                        />
                      </div>
                      <FormInput
                        id="city"
                        label="City"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        error={errors.city}
                        placeholder="New York"
                      />
                      <FormInput
                        id="postalCode"
                        label="Postal Code"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        error={errors.postalCode}
                        placeholder="10001"
                      />
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="country"
                          className="block mb-2 text-sm font-semibold text-secondary"
                        >
                          Country <span className="ml-1 text-primary">*</span>
                        </label>
                        <select
                          id="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 text-sm transition-all duration-200 bg-white border rounded-xl border-primary/30 text-secondary focus:border-primary focus:outline-primary focus-visible:outline-offset-2"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                          <option>Germany</option>
                          <option>France</option>
                        </select>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="pt-6 mt-6 border-t border-primary/15">
                      <h3 className="mb-4 text-lg font-bold text-secondary">
                        Payment Method
                      </h3>
                      <div className="space-y-3">
                        <PaymentOption
                          value="credit"
                          selected={formData.paymentMethod === "credit"}
                          onChange={(v) =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: v,
                            }))
                          }
                          Icon={CreditCard}
                          label="Credit Card"
                        />
                        <PaymentOption
                          value="paypal"
                          selected={formData.paymentMethod === "paypal"}
                          onChange={(v) =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: v,
                            }))
                          }
                          Icon={CreditCard}
                          label="PayPal"
                        />
                        <PaymentOption
                          value="cod"
                          selected={formData.paymentMethod === "cod"}
                          onChange={(v) =>
                            setFormData((prev) => ({
                              ...prev,
                              paymentMethod: v,
                            }))
                          }
                          Icon={Truck}
                          label="Cash on Delivery"
                        />
                      </div>
                      {formData.paymentMethod === "credit" && (
                        <div className="p-4 mt-4 space-y-4 rounded-xl bg-secondary/2">
                          <FormInput
                            id="cardNumber"
                            label="Card Number"
                            type="text"
                            required
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            error={errors.cardNumber}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                          />
                          <div className="grid gap-4 sm:grid-cols-2">
                            <FormInput
                              id="expiration"
                              label="Expiration Date"
                              type="text"
                              required
                              value={formData.expiration}
                              onChange={handleInputChange}
                              error={errors.expiration}
                              placeholder="MM/YY"
                              maxLength="5"
                            />
                            <FormInput
                              id="cvc"
                              label="CVC"
                              type="text"
                              required
                              value={formData.cvc}
                              onChange={handleInputChange}
                              error={errors.cvc}
                              placeholder="123"
                              maxLength="4"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <Motion.div whileTap={{ scale: 0.95 }}>
                      <Button
                        type="submit"
                        className="w-full px-6 py-4 mt-6 text-base font-semibold transition-all duration-200 rounded-full hover:shadow-lg bg-primary text-secondary hover:bg-primary/90"
                      >
                        Place Order
                      </Button>
                    </Motion.div>
                  </form>
                </CardContent>
              </Card>
            </Motion.div>

            {/* Right - Order Summary */}
            <Motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:sticky lg:top-8 lg:h-fit"
            >
              <Card className="bg-white shadow-lg rounded-2xl border-primary/15">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-secondary">
                    Your Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-16 h-16 overflow-hidden rounded-lg bg-gray-50 shrink-0">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate text-secondary">
                          {item.name}
                        </p>
                        <p className="text-xs text-secondary/60">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="pt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary/80">
                        Subtotal
                      </span>
                      <span className="text-base font-semibold text-secondary">
                        ${orderSummary.subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary/80">
                        Shipping
                      </span>
                      <span className="text-base font-semibold text-secondary">
                        {orderSummary.shipping === 0 ? (
                          <span className="text-primary">Free</span>
                        ) : (
                          `$${orderSummary.shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-secondary/80">
                        Tax
                      </span>
                      <span className="text-base font-semibold text-secondary">
                        ${orderSummary.tax.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <span className="text-lg font-bold text-secondary">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        ${orderSummary.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  {orderSummary.subtotal < 150 && (
                    <div className="p-3 mt-4 text-xs rounded-xl bg-primary/8 text-secondary/80">
                      💚 Free shipping for orders above $150
                    </div>
                  )}
                </CardContent>
              </Card>
            </Motion.div>
          </div>
        </div>
      </section>
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate("/indoor");
        }}
        orderNumber={orderNumber}
      />
    </>
  );
}
