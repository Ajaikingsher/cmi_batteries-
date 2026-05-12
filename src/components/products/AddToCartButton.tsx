"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import DevelopmentModal from "@/components/shared/DevelopmentModal";

interface AddToCartButtonProps {
  inStock: boolean;
  product: any;
}

export default function AddToCartButton({ inStock, product }: AddToCartButtonProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        disabled={!inStock}
        onClick={() => setShowModal(true)}
        className="flex-1 flex items-center justify-center gap-2 bg-primary text-black font-heading font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>

      <DevelopmentModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
}
