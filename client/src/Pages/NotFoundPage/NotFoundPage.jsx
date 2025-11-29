import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "../../Components/ui/button";

export default function NotFound() {
  const navigate = useNavigate();
  const goHome = () => navigate("/");

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className="flex items-center justify-center min-h-screen p-6 bg-lime-100"
      role="main"
    >
      <section className="w-full max-w-xl p-8 text-center bg-white shadow-sm rounded-2xl border-primary/10">
        <div className="flex flex-col items-center gap-4">
          <ShoppingBag
            className="w-16 h-16 text-primary/30"
            aria-hidden="true"
          />
          <h1 className="text-3xl font-bold text-secondary">
            404 – Page Not Found
          </h1>
          <p className="text-sm text-secondary/70">
            The page you are looking for does not exist or has been moved.
          </p>

          <div className="flex gap-3 mt-4">
            <Button
              onClick={goHome}
              aria-label="Go to home"
              className="px-6 py-3 font-semibold transition-all duration-200 rounded-full bg-primary text-secondary hover:bg-primary/90"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </section>
    </motion.main>
  );
}
