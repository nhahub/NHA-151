import React from "react";
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

const products = [
  {
    name: "Lemon Bonsai",
    img: "https://m.media-amazon.com/images/I/61ZUt3tCU+L.jpg",
    description:
      "A stunning miniature citrus tree perfect for indoor spaces, featuring glossy green leaves and fragrant white flowers.",
    oldPrice: 120,
    price: 99,
    sale: true,
  },
  {
    name: "Rubber Indoor Plant",
    img: "https://bloomscape.com/wp-content/uploads/2022/08/bloomscape_burgundy-rubber-tree_lg_charcoal.jpg?ver=927090",
    description:
      "Low-maintenance tropical plant with large, glossy burgundy leaves that add a bold statement to any room.",
    price: 45,
  },
  {
    name: "Boncellensis Succulent",
    img: "https://secretgarden.ro/cdn/shop/files/E36D13A7-4753-4C71-BD94-D727385D6D76.jpg?v=1753722507",
    description:
      "Unique geometric succulent with mesmerizing patterns, ideal for modern minimalist decor and beginner gardeners.",
    price: 22,
  },
  {
    name: "Old Lady Cactus",
    img: "https://planetdesert.com/cdn/shop/products/Mammillariahahniaia_1.jpg?v=1659436279",
    description:
      "Charming spherical cactus covered in white spines, requiring minimal water and perfect for sunny windowsills.",
    price: 28,
  },
];

function Store() {
  return (
    <section className="px-4 py-16 md:px-6 lg:px-8 bg-lightText">
      <div className="mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl text-secondary">
            Explore Our Greenfiy Collection
          </h2>
          <p className="max-w-2xl mx-auto text-base leading-relaxed md:text-lg text-secondary/70">
            Discover our handpicked collection of plants and organic products —
            grown with love, care, and sustainability in mind. Perfect for your
            home, workspace, or gifting a touch of nature.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {products.map((product, index) => (
            <Card
              key={index}
              className="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-transparent group rounded-2xl hover:shadow-xl hover:border-primary/10"
            >
              {/* Image Container */}
              <CardHeader className="relative p-0 overflow-hidden bg-lightText/50">
                <div className="relative w-full overflow-hidden aspect-square">
                  <img
                    src={product.img || "/placeholder.jpg"}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {product.sale && (
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold text-white bg-primary/90 backdrop-blur-sm rounded-full shadow-sm">
                        On Sale
                      </span>
                    </div>
                  )}
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

                {/* Price */}
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

                {/* Button */}
                <CardFooter className="p-0">
                  <Button className="w-full font-medium text-white bg-primary hover:bg-lime-700 transition-colors duration-200 rounded-lg py-2.5 shadow-sm hover:shadow-md">
                    Learn More
                  </Button>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-center gap-8">
          {/* View All Button */}
          <div className="text-center">
            <Button className="px-8 py-3 text-base font-medium text-white bg-secondary hover:bg-primary rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <Link to="/indoor">View All Indoor Plants</Link>
            </Button>
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button className="px-8 py-3 text-base font-medium text-white bg-secondary hover:bg-primary rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
              <Link to="/indoor">View All Outdoor Plants</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Store;
