"use client";

import React from "react";
import { motion } from "motion/react";
import { NETWORKS } from "@/src/lib/blockchain/networks";
import { BlockchainCard } from "./blockchain-card";

interface BlockchainGridProps {
  selectedIds: string[];
  allowedIds: string[];
  onToggle: (id: string) => void;
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
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 15 } },
};

export function BlockchainGrid({ selectedIds, allowedIds, onToggle }: BlockchainGridProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-4 w-full"
    >
      {NETWORKS.map((network) => {
        const isLocked = allowedIds.length > 0 && !allowedIds.includes(network.id);
        return (
          <motion.div key={network.id} variants={itemVariants} className="w-full">
            <BlockchainCard
              network={network}
              isSelected={selectedIds.includes(network.id)}
              isLocked={isLocked}
              onToggle={() => onToggle(network.id)}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
