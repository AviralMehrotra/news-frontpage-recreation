export default function Tag({ children, variant = "primary", className = "" }) {
  const variants = {
    primary: "bg-red-600 text-white",
    secondary: "bg-gray-200 text-gray-800",
    success: "bg-green-600 text-white",
    warning: "bg-yellow-600 text-white",
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}