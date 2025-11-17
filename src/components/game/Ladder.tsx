import React from 'react';
interface LadderProps {
  start: { x: number; y: number };
  end: { x: number; y: number };
}
export function Ladder({ start, end }: LadderProps) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const numRungs = Math.floor(distance / 10);
  const ladderWidth = 4;
  const perpDx = -dy / distance;
  const perpDy = dx / distance;
  const rail1StartX = start.x - (perpDx * ladderWidth) / 2;
  const rail1StartY = start.y - (perpDy * ladderWidth) / 2;
  const rail1EndX = end.x - (perpDx * ladderWidth) / 2;
  const rail1EndY = end.y - (perpDy * ladderWidth) / 2;
  const rail2StartX = start.x + (perpDx * ladderWidth) / 2;
  const rail2StartY = start.y + (perpDy * ladderWidth) / 2;
  const rail2EndX = end.x + (perpDx * ladderWidth) / 2;
  const rail2EndY = end.y + (perpDy * ladderWidth) / 2;
  const rungs = Array.from({ length: numRungs }, (_, i) => {
    const ratio = (i + 1) / (numRungs + 1);
    const rungStartX = rail1StartX + dx * ratio;
    const rungStartY = rail1StartY + dy * ratio;
    const rungEndX = rail2StartX + dx * ratio;
    const rungEndY = rail2StartY + dy * ratio;
    return { x1: rungStartX, y1: rungStartY, x2: rungEndX, y2: rungEndY };
  });
  return (
    <g className="stroke-yellow-700 dark:stroke-yellow-500" strokeWidth="1.5" strokeLinecap="round">
      <line x1={`${rail1StartX}%`} y1={`${rail1StartY}%`} x2={`${rail1EndX}%`} y2={`${rail1EndY}%`} />
      <line x1={`${rail2StartX}%`} y1={`${rail2StartY}%`} x2={`${rail2EndX}%`} y2={`${rail2EndY}%`} />
      {rungs.map((rung, i) => (
        <line key={i} x1={`${rung.x1}%`} y1={`${rung.y1}%`} x2={`${rung.x2}%`} y2={`${rung.y2}%`} />
      ))}
    </g>
  );
}