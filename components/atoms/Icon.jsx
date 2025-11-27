import { icons } from 'lucide-react';

export default function Icon({ name, size = 24, ...props }) {
  const LucideIcon = icons[name];
  
  if (!LucideIcon) return null;
  
  return <LucideIcon size={size} {...props} />;
}