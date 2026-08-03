"use client";

import React from "react";
import { motion } from "motion/react";
import { AssetCard, AssetData } from "./AssetCard";

interface AssetListProps {
  assets: AssetData[];
  selectedTicker: string | null;
  onSelectTicker: (ticker: string | null) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function AssetList({ assets, selectedTicker, onSelectTicker }: AssetListProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {assets.map((asset) => {
        const isSelected = selectedTicker === asset.ticker;
        const hasSelection = selectedTicker !== null;
        
        return (
          <motion.div 
            key={asset.ticker} 
            variants={itemVariants}
            onClick={() => onSelectTicker(isSelected ? null : asset.ticker)}
            className="cursor-pointer"
          >
            <AssetCard 
              asset={asset} 
              isSelected={isSelected}
              hasSelection={hasSelection}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
