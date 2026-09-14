"use client";

import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie as RechartsPie, Cell, Sector } from "recharts";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

const Pie = RechartsPie as any;

interface PortfolioDonutChartProps {
  data: Array<{ name: string; value: number; valueInUsd: number; color: string; ticker: string; logo: string }>;
  totalValue: number;
  selectedTicker: string | null;
  onSelectTicker: (ticker: string | null) => void;
}

export function PortfolioDonutChart({ data, totalValue, selectedTicker, onSelectTicker }: PortfolioDonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeIndex = selectedTicker ? data.findIndex(d => d.ticker === selectedTicker) : null;
  const activeItem = activeIndex !== null && activeIndex !== -1 ? data[activeIndex] : null;

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, index } = props;
    const isSelected = index === activeIndex;
    const isHovered = index === hoveredIndex;
    
    const offset = isSelected ? 8 : isHovered ? 4 : 0;
    const midAngle = (startAngle + endAngle) / 2;
    const radian = Math.PI / 180;
    const dx = offset * Math.cos(-midAngle * radian);
    const dy = offset * Math.sin(-midAngle * radian);

    return (
      <g style={{ outline: "none" }}>
        <Sector
          cx={cx + dx}
          cy={cy + dy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + (isSelected ? 3 : 0)}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{ outline: "none" }}
        />
      </g>
    );
  };

  const handleSliceClick = (_: any, index: number) => {
    const targetTicker = data[index].ticker;
    if (selectedTicker === targetTicker) {
      onSelectTicker(null);
    } else {
      onSelectTicker(targetTicker);
    }
  };

  return (
    <div className="w-full bg-[#111a2e] rounded-xl border border-[#1e2e4a] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.25)] flex flex-col items-center gap-6">
      {/* Chart Canvas */}
      <div className="relative w-[220px] h-[220px] shrink-0 outline-none select-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={{ outline: "none" }}>
            <Pie
              activeIndex={activeIndex !== null ? activeIndex : (hoveredIndex !== null ? hoveredIndex : undefined)}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={88}
              dataKey="value"
              onClick={handleSliceClick}
              onMouseEnter={(_: any, index: number) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              paddingAngle={3}
              stroke="none"
              animationBegin={100}
              animationDuration={500}
              style={{ outline: "none" }}
            >
              {data.map((entry, index) => {
                const isSelected = activeIndex === index;
                const hasSelection = activeIndex !== null;
                const isHovered = hoveredIndex === index;
                
                let opacity = 1;
                if (hasSelection) {
                  opacity = isSelected ? 1 : 0.35;
                } else if (hoveredIndex !== null) {
                  opacity = isHovered ? 1 : 0.6;
                }

                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                    opacity={opacity}
                    style={{ outline: "none" }}
                    className="cursor-pointer"
                  />
                );
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Dynamic Center HUD */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <AnimatePresence mode="wait">
            {activeItem ? (
              <div key={activeItem.ticker} className="flex flex-col items-center justify-center text-center px-2">
                <div className="w-6 h-6 rounded-md bg-[#0d1424] border border-[#1e2e4a] flex items-center justify-center mb-1">
                  <Image src={activeItem.logo} alt={activeItem.name} width={16} height={16} />
                </div>
                <span className="text-[11px] font-mono text-[#94a3b8] truncate max-w-[100px]">
                  {activeItem.name}
                </span>
                <span className="text-[17px] font-bold font-mono text-[#f8fafc] leading-tight">
                  ${activeItem.valueInUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[10px] font-mono font-bold text-[#60a5fa] mt-0.5">
                  {activeItem.value}%
                </span>
              </div>
            ) : (
              <div key="default" className="flex flex-col items-center justify-center text-center px-2">
                <span className="text-[11px] font-mono text-[#64748b] uppercase tracking-wider">
                  Valuation
                </span>
                <span className="text-[19px] font-bold font-mono text-[#f8fafc] leading-tight mt-0.5">
                  ${totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[10px] font-mono text-[#3b82f6] mt-0.5 bg-[#2563eb]/10 px-2 py-0.5 rounded border border-[#2563eb]/30">
                  100% Total
                </span>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend Grid Section */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {data.map((item, index) => {
          const isSelected = selectedTicker === item.ticker;
          const hasSelection = selectedTicker !== null;

          return (
            <div
              key={item.name}
              onClick={() => handleSliceClick(null, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex items-center gap-2.5 p-2.5 rounded-lg border transition-all cursor-pointer ${
                isSelected 
                  ? "bg-[#172440] border-[#2563eb] shadow-[0_0_12px_rgba(37,99,235,0.15)]" 
                  : "bg-[#0d1424] border-[#1e2e4a] hover:border-[#2d446e]"
              } ${hasSelection && !isSelected ? "opacity-40" : "opacity-100"}`}
            >
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <div className="min-w-0">
                <p className="text-[12px] font-bold text-[#f8fafc] truncate">{item.name}</p>
                <p className="text-[10px] font-mono text-[#94a3b8]">
                  {item.ticker} • {item.value}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
