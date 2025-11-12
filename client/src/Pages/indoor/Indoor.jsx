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

const productsData = [
  {
    id: 1,
    name: "Snake Plant",
    img: "https://images.squarespace-cdn.com/content/v1/54fbb611e4b0d7c1e151d22a/1610074066643-OP8HDJUWUH8T5MHN879K/Snake+Plant.jpg?format=1000w",
    price: 95,
    category: "Indoor",
    description:
      "The Snake Plant is known for its tall, sword-like green leaves edged in yellow. It's one of the easiest indoor plants to care for, perfect for beginners and busy people.",
    careInfo: {
      watering:
        "Water lightly every 2–3 weeks, allowing soil to dry between waterings.",
      light: "Low to bright indirect light (very adaptable).",
      humidity: "Average room humidity (40–50%).",
      temperature: "60–85°F (15–29°C).",
      fertilizer: "Feed twice per year with cactus or succulent fertilizer.",
    },
    features: [
      "Air-purifying qualities",
      "Low light tolerant",
      "Extremely hardy",
      "Ideal for beginners",
    ],
  },
  {
    id: 2,
    name: "Peace Lily",
    img: "https://www.mydomaine.com/thmb/N3StDx3PyGbF0Pwafv-P9-qiNZU=/900x0/filters:no_upscale():strip_icc()/1566417254329_20190821-1566417255317-b9314f1d9f7a4668a466c5ffb1913a8f.jpg",
    price: 48,
    category: "Indoor",
    description:
      "The Peace Lily features shiny green leaves and elegant white blooms that symbolize purity and tranquility. It thrives in indoor environments with moderate care.",
    careInfo: {
      watering: "Keep soil consistently moist, water about once a week.",
      light: "Medium, indirect sunlight.",
      humidity: "High humidity preferred (60–70%).",
      temperature: "65–80°F (18–27°C).",
      fertilizer: "Feed every 6 weeks during growing season.",
    },
    features: [
      "Air-purifying",
      "Blooms multiple times yearly",
      "Elegant and calming",
      "Pet caution advised",
    ],
  },
  {
    id: 3,
    name: "Ficus",
    img: "https://nurserylive.com/cdn/shop/products/nurserylive-g-ficus-benjamina-weeping-fig-plant-204240_512x512.jpg?v=1679750033",
    price: 80,
    category: "Indoor",
    description:
      "Ficus is a small indoor tree with glossy green leaves that bring a fresh, natural vibe to your space. It's ideal for bright corners and home offices.",
    careInfo: {
      watering: "Water weekly, allowing the top inch of soil to dry first.",
      light: "Bright, indirect light.",
      humidity: "Moderate humidity (50–60%).",
      temperature: "65–75°F (18–24°C).",
      fertilizer: "Feed monthly during growing season.",
    },
    features: [
      "Mini indoor tree look",
      "Improves air quality",
      "Great for home décor",
      "Requires moderate care",
    ],
  },
  {
    id: 4,
    name: "Pothos",
    img: "https://media.houseandgarden.co.uk/photos/64bff5f4d6a55acd0397054e/1:1/w_1342,h_1342,c_limit/Screenshot%202023-07-25%20at%2017.17.10.png",
    price: 32,
    category: "Indoor",
    description:
      "Pothos is a beautiful trailing vine with heart-shaped green leaves and yellow or white variegation. Perfect for hanging baskets or shelves.",
    careInfo: {
      watering: "Water every 1–2 weeks, letting soil dry between waterings.",
      light: "Low to bright indirect light.",
      humidity: "Average humidity (40–60%).",
      temperature: "60–85°F (15–29°C).",
      fertilizer: "Feed monthly during spring and summer.",
    },
    features: [
      "Fast-growing vine",
      "Tolerates low light",
      "Air-purifying",
      "Great for decorative displays",
    ],
  },
  {
    id: 5,
    name: "Aloe Vera",
    img: "https://cdn.shopify.com/s/files/1/0004/2654/1108/files/acheter-plante-aloe-vera-barbadensis-517144.jpg?v=1718903952",
    price: 64,
    category: "Indoor",
    description:
      "Aloe Vera is a hardy succulent known for its healing gel. Its thick green leaves make it a stylish and practical plant for sunny spots.",
    careInfo: {
      watering: "Water every 2–3 weeks; let soil dry completely.",
      light: "Bright, direct sunlight (at least 6 hours daily).",
      humidity: "Low humidity tolerant.",
      temperature: "60–80°F (16–27°C).",
      fertilizer: "Feed 2–3 times a year with succulent fertilizer.",
    },
    features: [
      "Medicinal gel inside leaves",
      "Drought tolerant",
      "Air-purifying",
      "Easy to care for",
    ],
  },
  {
    id: 6,
    name: "ZZ Plant",
    img: "https://shopaltmanplants.com/cdn/shop/files/6IN_Foliage_Zamia_ZZ_Plant_Lifestyle_final_4.jpg?v=1741815498",
    price: 110,
    category: "Indoor",
    description:
      "The ZZ Plant features shiny dark green leaves and thrives on neglect. It’s one of the toughest indoor plants, perfect for any lighting conditions.",
    careInfo: {
      watering: "Water every 2–3 weeks, allowing soil to dry out fully.",
      light: "Low to medium indirect light.",
      humidity: "Average indoor humidity (30–50%).",
      temperature: "60–75°F (15–24°C).",
      fertilizer: "Feed lightly twice a year.",
    },
    features: [
      "Low maintenance",
      "Thrives in low light",
      "Air-purifying",
      "Perfect for beginners",
    ],
  },
];

// Helper component for product card
const ProductCard = ({ product }) => (
  <Card className="overflow-hidden transition-all duration-300 bg-white shadow-sm group rounded-2xl hover:shadow-xl hover:-translate-y-1 focus-within:shadow-xl focus-within:-translate-y-1">
    <CardHeader className="relative p-0 overflow-hidden bg-gray-50">
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={product.img}
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
        <Link to={`/plantdetails/${product.id}`}>View Details</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function Indoor() {
  const [maxPrice, setMaxPrice] = useState(150);
  const [sortOrder, setSortOrder] = useState("asc");

  const sortOptions = useMemo(
    () => [
      { label: "Price: Low to High", value: "asc" },
      { label: "Price: High to Low", value: "desc" },
    ],
    []
  );

  // Filter only indoor plants
  const filteredProducts = useMemo(
    () =>
      productsData
        .filter((product) => product.price <= maxPrice)
        .sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        ),
    [maxPrice, sortOrder]
  );

  const inputStyles = `w-full px-3 py-2.5 text-sm font-medium rounded-xl border transition-all duration-200 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-lime-100">
      <div className="absolute inset-0 pointer-events-none opacity-40" />

      <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-16">
        {/* Header Section */}
        <header className="mb-10 text-center lg:text-left">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between lg:items-start">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-secondary/80">
                <Sprout className="w-4 h-4" aria-hidden="true" />
                Indoor Collection
              </p>
              <h1 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl text-secondary">
                Indoor Plants for Modern Spaces
              </h1>
              <p className="text-base leading-relaxed sm:text-lg text-secondary/70">
                Handpicked indoor greens to bring serenity and life to your
                home. Adjust your budget or sorting preference to find the
                perfect one.
              </p>
            </div>
            <div className="hidden px-5 py-4 shadow-md rounded-2xl backdrop-blur-sm lg:block bg-primary/10">
              <p className="text-sm font-medium text-secondary/70">
                Showing{" "}
                <span className="font-bold text-secondary">
                  {filteredProducts.length}
                </span>{" "}
                indoor plants
              </p>
            </div>
          </div>
        </header>

        {/* Filters Section */}
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
              className="w-full h-2 rounded-full appearance-none cursor-pointer bg-primary/20 "
              style={{
                accentColor: "oklch(45.3% 0.124 130.933)",
              }}
              aria-label="Filter plants by maximum price"
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
              aria-label="Sort plants by price"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters Summary */}
          <div className="flex flex-col justify-between gap-3 px-4 py-3 rounded-xl bg-primary/12">
            <div>
              <p className="mb-1 text-xs font-semibold tracking-wider uppercase text-secondary/60">
                Active Filters
              </p>
              <p className="text-sm font-semibold text-secondary">
                Indoor · Up to ${maxPrice}
              </p>
            </div>
            <span className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-bold uppercase rounded-full bg-secondary text-primary">
              {filteredProducts.length} items
            </span>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center rounded-2xl bg-secondary/2">
            <p className="text-lg font-medium text-secondary/70">
              No indoor plants found within this budget.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
