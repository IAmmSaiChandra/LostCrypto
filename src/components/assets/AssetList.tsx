"use client";

import React from "react";
import { AssetCard, AssetData } from "./AssetCard";

interface AssetListProps {
  assets: AssetData[];
  selectedTicker: string | null;
  onSelectTicker: (ticker: string | null) => void;
}

export function AssetList({ assets, selectedTicker, onSelectTicker }: AssetListProps) {
  return (
    <div className="space-y-2.5">
      {assets.map((asset) => {
        const isSelected = selectedTicker === asset.ticker;
        const hasSelection = selectedTicker !== null;
        
        return (
          <div 
            key={asset.ticker} 
            onClick={() => onSelectTicker(isSelected ? null : asset.ticker)}
            className="cursor-pointer"
          >
            <AssetCard 
              asset={asset} 
              isSelected={isSelected}
              hasSelection={hasSelection}
            />
          </div>
        );
      })}
    </div>
  );
}
