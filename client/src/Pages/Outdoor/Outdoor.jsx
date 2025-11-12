import React, { useMemo, useState } from "react";
import { SlidersHorizontal, ArrowDownWideNarrow, Sprout } from "lucide-react";
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
    id: 7,
    name: "Bougainvillea",
    img: "https://eureka-farms.com/cdn/shop/files/Barbara_Karst_SSR.jpg?v=1758598426",
    price: 95,
    category: "Outdoor",
    description:
      "Bougainvillea is a vibrant climbing plant that bursts with colorful papery flowers in shades of pink, purple, and orange. Ideal for fences, balconies, or walls.",
    careInfo: {
      watering: "Water deeply once a week after establishment.",
      light: "Full sunlight (6+ hours daily).",
      humidity: "Tolerates dry air.",
      temperature: "65–95°F (18–35°C).",
      fertilizer: "Feed monthly with bloom booster fertilizer.",
    },
    features: [
      "Low water needs",
      "Climbing and decorative",
      "Thrives in full sun",
      "Perfect for outdoor walls",
    ],
  },
  {
    id: 8,
    name: "Jasmine",
    img: "https://florastore.com/cdn/shop/files/1511201_Closeup_03_MJ_SQ.jpg?v=1760145081&width=1080",
    price: 48,
    category: "Outdoor",
    description:
      "Jasmine is loved for its small white fragrant flowers that release a sweet aroma, especially at night. A classic choice for warm sunny gardens.",
    careInfo: {
      watering: "Water 2–3 times weekly during warm months.",
      light: "Full sunlight or partial shade.",
      humidity: "Moderate humidity.",
      temperature: "60–90°F (15–32°C).",
      fertilizer: "Feed monthly during flowering season.",
    },
    features: [
      "Fragrant blooms at night",
      "Attracts pollinators",
      "Can be grown as a climber",
      "Used in perfumes",
    ],
  },
  {
    id: 9,
    name: "Hibiscus",
    img: "https://m.media-amazon.com/images/I/71hNfU7o5kL._AC_UF1000,1000_QL80_.jpg",
    price: 80,
    category: "Outdoor",
    description:
      "The Hibiscus produces large, showy tropical flowers in bright colors like red, pink, and yellow. It adds a tropical feel to any garden.",
    careInfo: {
      watering: "Keep soil moist; water 2–3 times weekly.",
      light: "Full sunlight (at least 6 hours daily).",
      humidity: "High humidity preferred.",
      temperature: "65–90°F (18–32°C).",
      fertilizer: "Feed every 2 weeks during blooming season.",
    },
    features: [
      "Bright tropical flowers",
      "Attracts butterflies",
      "Fast-growing",
      "Adds color to gardens",
    ],
  },
  {
    id: 10,
    name: "Lavender",
    img: "https://theseedcompany.ca/cdn/shop/files/cropLAVE0514Lavender_English.png?v=1701702553&width=1024",
    price: 32,
    category: "Outdoor",
    description:
      "Lavender is a fragrant herb with soothing purple blooms and gray-green foliage. It’s known for its calming scent and mosquito-repelling properties.",
    careInfo: {
      watering: "Water every 1–2 weeks; avoid overwatering.",
      light: "Full sunlight (6–8 hours daily).",
      humidity: "Prefers dry conditions.",
      temperature: "60–85°F (15–29°C).",
      fertilizer: "Feed lightly once in spring.",
    },
    features: [
      "Soothing scent",
      "Repels mosquitoes",
      "Drought-tolerant",
      "Great for aromatherapy",
    ],
  },
  {
    id: 11,
    name: "Oleander",
    img: "https://www.padmamnursery.com/cdn/shop/files/2.webp?v=1750314586&width=3840",
    price: 64,
    category: "Outdoor",
    description:
      "Oleander is a hardy evergreen shrub with clusters of pink, red, or white flowers. It thrives in full sun and is highly drought-tolerant once mature.",
    careInfo: {
      watering: "Water once weekly; drought-tolerant when established.",
      light: "Full sunlight.",
      humidity: "Tolerates dry air.",
      temperature: "65–95°F (18–35°C).",
      fertilizer: "Feed once a month during growing season.",
    },
    features: [
      "Evergreen shrub",
      "Low water needs",
      "Bright flowers",
      "Toxic if ingested",
    ],
  },
  {
    id: 12,
    name: "Rose",
    img: "https://media.istockphoto.com/id/480348072/photo/roses-bush-on-garden-landscape.jpg?s=612x612&w=0&k=20&c=SMKff_uNNuJdWMPY7tK_EWQKcDL-h2QDNXTiQBh6iCk=",
    price: 110,
    category: "Outdoor",
    description:
      "The Rose is the timeless symbol of beauty and love. With countless varieties and colors, roses add elegance and fragrance to any outdoor space.",
    careInfo: {
      watering: "Water 2–3 times weekly; keep soil moist but not soggy.",
      light: "Full sunlight (6+ hours daily).",
      humidity: "Moderate humidity (50–60%).",
      temperature: "60–85°F (15–29°C).",
      fertilizer: "Feed every 4–6 weeks with rose fertilizer.",
    },
    features: [
      "Fragrant flowers",
      "Multiple color varieties",
      "Classic garden favorite",
      "Long blooming season",
    ],
  },
];

// Product card component
const ProductCard = ({ product }) => (
  <Card className="overflow-hidden transition-all duration-300 bg-white shadow-sm group rounded-2xl hover:shadow-xl hover:-translate-y-1">
    <CardHeader className="relative p-0 overflow-hidden bg-gray-50">
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={product.img}
          alt={product.name}
          loading="lazy"
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
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

    <CardFooter className="flex items-center justify-between gap-4 px-5 pb-5 ">
      <span className="text-xl font-bold text-primary">${product.price}</span>
      <Button className="px-4 py-2 text-sm font-semibold transition-all duration-200 rounded-full hover:shadow-lg bg-primary text-secondary hover:bg-primary/90">
        <Link to={`/plantdetails/${product.id}`}>View Details</Link>
      </Button>
    </CardFooter>
  </Card>
);

export default function Outdoor() {
  const [maxPrice, setMaxPrice] = useState(150);
  const [sortOrder, setSortOrder] = useState("asc");

  const sortOptions = useMemo(
    () => [
      { label: "Price: Low to High", value: "asc" },
      { label: "Price: High to Low", value: "desc" },
    ],
    []
  );

  const filteredProducts = useMemo(
    () =>
      productsData
        .filter((product) => product.price <= maxPrice)
        .sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        ),
    [maxPrice, sortOrder]
  );

  return (
    <section className="relative min-h-screen overflow-hidden bg-lime-100">
      <div className="absolute inset-0 pointer-events-none opacity-40" />

      <div className="relative px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-16">
        <header className="mb-10 text-center lg:text-left">
          <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between lg:items-start">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-widest uppercase text-secondary/80">
                <Sprout className="w-4 h-4" aria-hidden="true" />
                Outdoor Collection
              </p>
              <h1 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl text-secondary">
                Beautify Your Garden Space
              </h1>
              <p className="text-base leading-relaxed sm:text-lg text-secondary/70">
                Explore our outdoor plants that love sunlight and open air —
                perfect for balconies and gardens.
              </p>
            </div>
            <div className="hidden px-5 py-4 shadow-md rounded-2xl backdrop-blur-sm lg:block bg-primary/10">
              <p className="text-sm font-medium text-secondary/70">
                Showing{" "}
                <span className="font-bold">{filteredProducts.length}</span>{" "}
                plants
              </p>
            </div>
          </div>
        </header>

        {/* Filters Section */}
        <div className="grid gap-4 p-5 mb-12 border shadow-lg rounded-2xl backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-3 lg:p-6 bg-secondary/3 border-primary/20">
          {/* Budget Filter */}
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-primary/12 text-primary">
              <SlidersHorizontal className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
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
                className="w-full h-2 mt-2 rounded-full appearance-none cursor-pointer bg-primary/20 "
                style={{
                  accentColor: "oklch(45.3% 0.124 130.933)",
                }}
              />
              <p className="mt-2 text-sm font-medium text-secondary/75">
                Up to <span className="text-primary">${maxPrice}</span>
              </p>
            </div>
          </div>

          {/* Sort Filter */}
          <div className="flex items-start gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-full shrink-0 bg-primary/12 text-primary">
              <ArrowDownWideNarrow className="w-5 h-5" />
            </span>
            <div className="flex-1 min-w-0">
              <label
                htmlFor="sort"
                className="block mb-2 text-xs font-semibold tracking-wider uppercase text-secondary/60"
              >
                Sort by
              </label>
              <select
                id="sort"
                className="w-full px-3 py-2.5 text-sm font-medium rounded-xl border transition-all duration-200 bg-white focus-visible:outline focus-visible:outline-offset-2 border-primary/3 text-secondary"
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
          </div>

          {/* Active Filters */}
          <div className="flex flex-col justify-between gap-3 px-4 py-3 rounded-xl bg-primary/12">
            <p className="mb-1 text-xs font-semibold tracking-wider uppercase text-secondary/60">
              Active Filters
            </p>
            <p className="text-sm font-semibold text-secondary">
              Up to ${maxPrice}
            </p>
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
            <p className="text-lg font-medium text-secondary">
              No plants found matching your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
