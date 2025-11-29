import React, { useMemo, useState } from "react";
import { Sprout } from "lucide-react";
import { Button } from "../../Components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../../Components/ui/card";
import { Link } from "react-router";
import { useSelector } from "react-redux";

// Product Card Component
const ProductCard = ({ product }) => (
  <Card className="overflow-hidden transition-all duration-300 bg-white shadow-sm group rounded-2xl hover:shadow-xl hover:-translate-y-1 focus-within:shadow-xl focus-within:-translate-y-1">
    <CardHeader className="relative p-0 overflow-hidden bg-gray-50">
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={product.images?.[0]?.url || "/fallback-image.png"}
          alt={product.name}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-linear-to-t from-black/5 to-transparent group-hover:opacity-100" />
      </div>

      <span className="absolute inline-flex items-center px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full left-4 top-4 backdrop-blur-sm bg-secondary/10 text-secondary/80">
        {product.category}
      </span>
    </CardHeader>

    <CardContent className="p-5">
      <CardTitle className="mb-2 text-lg font-semibold text-secondary">
        {product.name}
      </CardTitle>
      <p className="text-sm leading-relaxed text-secondary/70">
        {product.description}
      </p>
    </CardContent>

    <CardFooter className="flex items-center justify-between gap-4 px-5 pb-5">
      <span className="text-xl font-bold text-primary">${product.price}</span>
      <Button className="px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full hover:shadow-lg bg-primary text-secondary hover:bg-primary/90">
        <Link to={`/plantdetails/${product._id}`}>View Details</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function Outdoor() {
  const [maxPrice, setMaxPrice] = useState(150);
  const [sortOrder, setSortOrder] = useState("asc");

  const products = useSelector((state) => state.products.items.products);

  const stableProducts = useMemo(() => products || [], [products]);
  console.log(products);

  const sortOptions = useMemo(
    () => [
      { label: "Price: Low to High", value: "asc" },
      { label: "Price: High to Low", value: "desc" },
    ],
    []
  );

  // Filter indoor plants, apply budget and sorting
  const filteredProducts = useMemo(() => {
    return stableProducts
      .filter((product) => product.category === "Outdoor")
      .filter((product) => product.price <= maxPrice)
      .sort((a, b) =>
        sortOrder === "asc" ? a.price - b.price : b.price - a.price
      );
  }, [stableProducts, maxPrice, sortOrder]);

  console.log(filteredProducts);

  const inputStyles = `w-full px-3 py-2.5 text-sm font-medium rounded-xl border transition-all duration-200 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-lime-100">
      <div className="absolute inset-0 pointer-events-none opacity-40" />

      <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <header className="mb-10 text-center lg:text-left">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between lg:items-start">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-secondary/80">
                <Sprout className="w-4 h-4" />
                Outdoor Collection
              </p>

              <h1 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl text-secondary">
                Beautify Your Garden Space
              </h1>

              <p className="text-base leading-relaxed sm:text-lg text-secondary/70">
                Explore our sunlight-loving outdoor plants — perfect for gardens
                and balconies.
              </p>
            </div>

            <div className="hidden px-5 py-4 shadow-md rounded-2xl backdrop-blur-sm lg:block bg-primary/10">
              <p className="text-sm font-medium text-secondary/70">
                Showing{" "}
                <span className="font-bold text-secondary">
                  {filteredProducts.length}
                </span>{" "}
                items
              </p>
            </div>
          </div>
        </header>

        {/* Filters */}
        <div className="grid gap-4 p-5 mb-12 border-2 shadow-lg rounded-2xl backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-3 lg:p-6 bg-secondary/3 border-primary/20">
          {/* Budget Filter */}
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-xs font-semibold tracking-wider uppercase text-secondary/60"
            >
              Budget
            </label>

            <input
              id="price"
              type="range"
              min="0"
              max="150"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-primary/20"
              style={{ accentColor: "oklch(45.3% 0.124 130.933)" }}
            />

            <p className="mt-2 text-sm font-medium text-secondary/75">
              Up to <span className="text-primary">${maxPrice}</span>
            </p>
          </div>

          {/* Sort Filter */}
          <div>
            <label
              htmlFor="sort"
              className="block mb-2 text-xs font-semibold tracking-wider uppercase text-secondary/60"
            >
              Sort by
            </label>

            <select
              id="sort"
              className={inputStyles}
              style={{
                borderColor: "oklch(45.3% 0.124 130.933) /0.3",
                color: "oklch(14.1% 0.005 285.823)",
              }}
              onFocus={(e) => {
                e.currentTarget.style.outlineColor =
                  "oklch(45.3% 0.124 130.933)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.outlineColor = "";
              }}
              onChange={(e) => setSortOrder(e.target.value)}
              value={sortOrder}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          <div className="flex flex-col justify-between gap-3 px-4 py-3 rounded-xl bg-primary/12">
            <p className="mb-1 text-xs font-semibold tracking-wider uppercase text-secondary/60">
              Active Filters
            </p>
            <p className="text-sm font-semibold text-secondary">
              Outdoor · Up to ${maxPrice}
            </p>

            <span className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase rounded-full bg-secondary text-primary">
              {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl bg-secondary/2">
            <p className="text-lg font-medium text-secondary/70">
              No outdoor plants found within this budget.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
