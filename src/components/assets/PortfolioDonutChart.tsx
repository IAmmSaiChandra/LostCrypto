"use client";

import React, { useState } from "react";
import { ResponsiveContainer, PieChart, Pie as RechartsPie, Cell, Sector } from "recharts";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

const Pie = RechartsPie as any;

interface PortfolioDonutChartProps {
  data: Array<{ name: string; value: number; valueInUsd: number; color: string; ticker: string; logo: string }>;
  totalValue: number;
  selectedTicker: string | null;
  onSelectTicker: (ticker: string | null) => void;
}

export function PortfolioDonutChart({ data, totalValue, selectedTicker, onSelectTicker }: PortfolioDonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Active indices mapping
  const activeIndex = selectedTicker ? data.findIndex(d => d.ticker === selectedTicker) : null;
  const activeItem = activeIndex !== null && activeIndex !== -1 ? data[activeIndex] : null;

  // Custom shape rendering for expanding the selected/hovered slice
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, index } = props;
    const isSelected = index === activeIndex;
    const isHovered = index === hoveredIndex;
    
    // Offset outwards
    const offset = isSelected ? 10 : isHovered ? 4 : 0;
    const midAngle = (startAngle + endAngle) / 2;
    const radian = Math.PI / 180;
    const dx = offset * Math.cos(-midAngle * radian);
    const dy = offset * Math.sin(-midAngle * radian);

    return (
      <g style={{ outline: "none", border: "none" }}>
        <Sector
          cx={cx + dx}
          cy={cy + dy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + (isSelected ? 4 : 0)}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          style={{ outline: "none", border: "none" }}
        />
      </g>
    );
  };

  const handleSliceClick = (_: any, index: number) => {
    const targetTicker = data[index].ticker;
    if (selectedTicker === targetTicker) {
      // Tap again to deselect
      onSelectTicker(null);
    } else {
      onSelectTicker(targetTicker);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-[24px] border border-[#E5E7EB] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.02)] flex flex-col items-center gap-8 focus:ring-2 focus:ring-[#FFF4B8]/50 focus:outline-none"
      tabIndex={0}
      aria-label="Portfolio distribution chart"
    >
      {/* Chart Canvas */}
      <div className="relative w-[240px] h-[240px] shrink-0 outline-none select-none">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart style={{ outline: "none" }}>
            <Pie
              activeIndex={activeIndex !== null ? activeIndex : (hoveredIndex !== null ? hoveredIndex : undefined)}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={76}
              outerRadius={94}
              dataKey="value"
              onClick={handleSliceClick}
              onMouseEnter={(_: any, index: number) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              paddingAngle={3}
              stroke="none"
              animationBegin={100}
              animationDuration={500}
              style={{ outline: "none", border: "none", boxShadow: "none" }}
            >
              {data.map((entry, index) => {
                const isSelected = activeIndex === index;
                const hasSelection = activeIndex !== null;
                const isHovered = hoveredIndex === index;
                
                // Determine opacity: 35% if other is selected, 100% if selected/hovered/no selection
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
                    style={{
                      outline: "none",
                      border: "none",
                      filter: isSelected ? `drop-shadow(0 8px 16px ${entry.color}35)` : "none",
                      transition: "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1), filter 300ms cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                    className="cursor-pointer outline-none focus:outline-none"
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
              <motion.div
                key={activeItem.ticker}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center"
              >
                <div className="w-7 h-7 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-center mb-1">
                  <Image src={activeItem.logo} alt={activeItem.name} width={18} height={18} />
                </div>
                <span className="text-[12px] text-[#6B7280] font-bold tracking-wide">
                  {activeItem.name}
                </span>
                <span className="text-[20px] font-extrabold text-black mt-0.5 tracking-tight leading-none">
                  ${activeItem.valueInUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[11px] text-emerald-600 font-bold mt-1">
                  {activeItem.value}% of portfolio
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center"
              >
                <span className="text-[12px] text-[#9CA3AF] font-bold uppercase tracking-wider">
                  Total Assets
                </span>
                <span className="text-[24px] font-extrabold text-black mt-1 leading-none tracking-tight">
                  ${totalValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </span>
                <span className="text-[11px] text-emerald-600 font-bold mt-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100/50">
                  100%
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend Grid Section */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {data.map((item, index) => {
          const isSelected = selectedTicker === item.ticker;
          const hasSelection = selectedTicker !== null;

          return (
            <div
              key={item.name}
              onClick={() => handleSliceClick(null, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                isSelected 
                  ? "bg-neutral-50 border-[#E5E7EB] scale-[1.02] shadow-[0_4px_12px_rgba(0,0,0,0.02)]" 
                  : "border-transparent hover:bg-neutral-50/50"
              } ${hasSelection && !isSelected ? "opacity-50" : "opacity-100"}`}
            >
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <div className="min-w-0">
                <p className="text-[13px] font-bold text-black truncate">{item.name}</p>
                <p className="text-[11px] text-[#6B7280] font-semibold">
                  {item.ticker} • {item.value}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
