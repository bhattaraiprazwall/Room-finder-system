import React from "react";

export const Card = ({ children, className, onClick }) => (
  <div
    className={`rounded-lg shadow-md p-4 bg-white cursor-pointer ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);
