import React from 'react';
interface SnakeProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
}
export function Snake({ start, end }: SnakeProps) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx);
  const midX = start.x + dx / 2;
  const midY = start.y + dy / 2;
  const amplitude = distance / 6;
  const controlX = midX + amplitude * Math.cos(angle + Math.PI / 2);
  const controlY = midY + amplitude * Math.sin(angle + Math.PI / 2);
  const pathData = `M ${start.x} ${start.y} Q ${controlX} ${controlY} ${end.x} ${end.y}`;
  return (
    <g>
      <path
        d={pathData}
        className="stroke-red-500 dark:stroke-red-400"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx={`${start.x}%`} cy={`${start.y}%`} r="1.5" className="fill-red-600 dark:fill-red-500" />
      <circle cx={`${start.x}%`} cy={`${start.y}%`} r="0.5" className="fill-white" />
    </g>
  );
}