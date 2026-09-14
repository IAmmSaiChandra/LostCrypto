"use client";

import React from "react";
import { NETWORKS } from "@/src/lib/blockchain/networks";
import { BlockchainCard } from "./blockchain-card";

interface BlockchainGridProps {
  selectedIds: string[];
  allowedIds: string[];
  onToggle: (id: string) => void;
}

export function BlockchainGrid({ selectedIds, allowedIds, onToggle }: BlockchainGridProps) {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      {NETWORKS.map((network) => {
        const isLocked = allowedIds.length > 0 && !allowedIds.includes(network.id);
        return (
          <BlockchainCard
            key={network.id}
            network={network}
            isSelected={selectedIds.includes(network.id)}
            isLocked={isLocked}
            onToggle={() => onToggle(network.id)}
          />
        );
      })}
    </div>
  );
}
