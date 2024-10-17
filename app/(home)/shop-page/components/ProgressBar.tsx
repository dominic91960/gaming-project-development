import { useState, useRef } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(50); // Initial progress value (between 0 and 100)
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const newProgress = Math.min(
        Math.max(((e.clientX - rect.left) / rect.width) * 100, 0),
        100
      );
      setProgress(newProgress);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="w-full h-4 bg-gray-300 rounded-full relative"
      ref={progressBarRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        className="h-full bg-blue-500 rounded-full"
        style={{ width: `${progress}%` }}
      />
      <div
        className="absolute top-0 left-0 h-4 w-4 bg-blue-600 rounded-full cursor-pointer"
        style={{ transform: `translateX(${progress}%)` }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}

export default ProgressBar;
