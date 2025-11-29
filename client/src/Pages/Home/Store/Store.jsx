import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../../Components/ui/card";
import { Button } from "../../../Components/ui/button";
import { Link } from "react-router";

function Store() {
  // Get products from Redux
  const products = useSelector((state) => state.products.items.products);

  // Stable array to avoid undefined errors
  const stableProducts = useMemo(() => products || [], [products]);

  // Pick exactly 4 random plants
  const randomProducts = useMemo(() => {
    const shuffled = [...stableProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [stableProducts]);

  return (
    <section className="px-4 py-16 md:px-6 lg:px-8 bg-lightText">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-secondary">
            Explore Our Greenfiy Collection
          </h2>
          <p className="max-w-2xl mx-auto text-base leading-relaxed md:text-lg text-secondary/70">
            Discover our handpicked collection of plants and organic products.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {randomProducts.map((product, index) => (
            <Card
              key={index}
              className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-transparent group rounded-2xl hover:shadow-xl hover:border-primary/10"
            >
              {/* Image */}
              <CardHeader className="relative p-0 overflow-hidden bg-lightText/50">
                <div className="relative w-full overflow-hidden aspect-square">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </CardHeader>

              {/* Content */}
              <CardContent className="flex flex-col flex-1 p-5 md:p-6">
                <div className="flex-1 mb-4">
                  <CardTitle className="mb-2 text-lg font-semibold leading-tight md:text-xl text-secondary">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-secondary/60 line-clamp-2">
                    {product.description}
                  </CardDescription>
                </div>

                <div className="flex items-baseline gap-2 mb-5">
                  {product.oldPrice && (
                    <span className="text-sm line-through text-secondary/50">
                      ${product.oldPrice}
                    </span>
                  )}
                  <span className="text-xl font-bold text-secondary">
                    ${product.price}
                  </span>
                </div>

                <CardFooter className="p-0">
                  <Button className="w-full font-medium text-white bg-primary hover:bg-lime-700 transition-colors duration-200 rounded-lg py-2.5 shadow-sm hover:shadow-md">
                    <Link to={`/plantdetails/${product._id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8">
          <Button className="px-8 py-3 text-base font-medium text-white bg-secondary hover:bg-primary rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <Link to="/indoor">View All Indoor Plants</Link>
          </Button>

          <Button className="px-8 py-3 text-base font-medium text-white bg-secondary hover:bg-primary rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
            <Link to="/outdoor">View All Outdoor Plants</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Store;
