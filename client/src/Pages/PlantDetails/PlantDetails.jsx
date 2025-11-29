import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingCart,
  Droplet,
  Sun,
  Wind,
  Leaf,
  CheckCircle2,
} from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/ui/card";
import { useCart } from "../../Components/Common/Cart/useCart";
import { getProductById } from "@/lib/api/api";
import { useDispatch } from "react-redux";
import { addToCartThunk } from "../../redux/cartSlice";

// We'll fetch product data from the API instead of using a local mock database

// Care Info Card Component
const CareInfoCard = ({ careInfo }) => (
  <Card className="shadow-sm rounded-2xl bg-secondary/2 border-primary/15">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg font-semibold text-primary">
        Care Instructions
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-start gap-3">
        <Droplet className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
        <div>
          <p className="mb-1 text-sm font-semibold text-secondary">Watering</p>
          <p className="text-sm leading-relaxed text-secondary/70">
            {careInfo.watering}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Sun className="w-5 h-5 shrink-0 mt-0.5 text-pri" />
        <div>
          <p className="mb-1 text-sm font-semibold text-secondary">Light</p>
          <p className="text-sm leading-relaxed text-secondary/70">
            {careInfo.light}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Wind className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
        <div>
          <p className="mb-1 text-sm font-semibold text-secondary">
            Humidity & Temperature
          </p>
          <p className="text-sm leading-relaxed text-secondary/70">
            {careInfo.humidity}. Temperature: {careInfo.temperature}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <Leaf className="w-5 h-5 shrink-0 mt-0.5 text-primary" />
        <div>
          <p className="mb-1 text-sm font-semibold text-secondary">
            Fertilizer
          </p>
          <p className="text-sm leading-relaxed text-secondary/70">
            {careInfo.fertilizer}
          </p>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Features List Component
const FeaturesList = ({ features }) => (
  <div className="space-y-2">
    <h3 className="mb-3 text-sm font-semibold tracking-wider uppercase text-secondary/80">
      Key Features
    </h3>
    <ul className="space-y-2">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0 text-primary" />
          <span className="text-sm text-secondary/80">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function PlantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, openCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getProductById(id);
        if (!mounted) return;
        setProduct(res.data || null);
      } catch (err) {
        const status = err?.response?.status;
        if (status === 404) {
          // Redirect to shop when the product doesn't exist (stale link)
          navigate('/indoor', { replace: true });
          return;
        }
        const msg = err?.response?.data?.message || err.message || "Product not found";
        if (mounted) setError(msg);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    if (id) fetchProduct();
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-lime-100">
        <div className="text-center text-secondary/70">Loading product...</div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-lime-100">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-secondary">
            Product Not Found
          </h2>
          <Link
            to="/indoor"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold transition-all duration-200 rounded-full bg-primary text-secondary"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </section>
    );
  }

  const handleAddToCart = () => {
    const prod = product;
    addToCart({
      id: prod._id || prod.id,
      name: prod.name,
      img:
        prod.images && prod.images[0]
          ? prod.images[0].url
          : prod.image || "/placeholder.jpg",
      price: prod.price || prod.basePrice || 0,
    });
    openCart();
    dispatch(addToCartThunk({ productId: product._id, quantity: 1 }));
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-lime-100">
      {/* Subtle background gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at top, oklch(45.3% 0.124 130.933)/12 0%, transparent 60%)`,
        }}
      />

      <div className="relative px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-12">
        {/* Back Button */}
        <Link
          to="/indoor"
          className="inline-flex items-center gap-2 mb-6 text-sm font-medium transition-all duration-200 hover:gap-3 text-secondary/80"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Main Content Grid */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative overflow-hidden shadow-lg rounded-2xl bg-gray-50">
              <div className="overflow-hidden aspect-square">
                <img
                  src={(() => {
                    const url = product.images && product.images[0] ? product.images[0].url : product.image || "/placeholder.jpg";
                    if (!url || typeof url !== 'string') return '/placeholder.jpg';
                    if (url.includes('/api/products')) return '/placeholder.jpg';
                    if (url.startsWith('data:') || /^(https?:)?\/\//i.test(url)) return url;
                    return `${API_ROOT.replace(/\/$/, '')}${url.startsWith('/') ? url : '/' + url}`;
                  })()}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>
            {/* Optional: Thumbnail gallery could go here */}
          </div>

          {/* Details Section */}
          <div className="flex flex-col space-y-6">
            {/* Category Badge */}
            <div>
              <span className="inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/15 text-primary">
                {product.category?.name || product.category || "Uncategorized"}
              </span>
            </div>

            {/* Plant Name */}
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl text-secondary">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 text-primary">
              <span className="text-4xl font-bold">
                ${product.price || product.basePrice || 0}
              </span>
            </div>

            {/* Description */}
            <div>
              <p className="text-base leading-relaxed sm:text-lg text-secondary/80">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <FeaturesList features={product.tags || product.features || []} />

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <Button
                onClick={handleAddToCart}
                className="flex-1 px-6 py-3 text-base font-semibold transition-all duration-200 rounded-full hover:shadow-lg bg-primary text-secondary hover:bg-primary/90"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={() => navigate("/indoor")}
                variant="outline"
                className="flex-1 px-6 py-3 text-base font-semibold transition-all duration-200 bg-transparent border-2 rounded-full hover:shadow-md border-primary/30 text-secondary hover:bg-primary/10 hover:border-primary"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </div>

            {/* Care Info Card */}
            <div className="pt-4">
              <CareInfoCard careInfo={product.careInfo || product.tags || []} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
