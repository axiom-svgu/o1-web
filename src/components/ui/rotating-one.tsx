"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const RotatingOne = () => {
  const { theme } = useTheme();
  const [rotation, setRotation] = useState(0);
  const oneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!oneRef.current) return;

      const rect = oneRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const angle =
        Math.atan2(mouseY - centerY, mouseX - centerX) * (180 / Math.PI);
      setRotation(angle + 90);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={oneRef}
      className={`w-6 h-6 rounded-full flex items-center justify-center ${
        theme === "dark" ? "bg-white" : "bg-black"
      }`}
    >
      <span
        className="font-bold text-lg text-orange-500"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        1
      </span>
    </div>
  );
};

export default RotatingOne;
