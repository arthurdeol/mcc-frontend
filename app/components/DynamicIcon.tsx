import * as Icons from "react-icons/lu";

interface DynamicIconProps {
  name: keyof typeof Icons;
  size: number;
  color: string;
}

export default function DynamicIcon({ name, size, color }: DynamicIconProps) {
  const IconComponent = Icons[name];

  if (!IconComponent) {
    return "";
  }

  return <IconComponent size={size} color={color} />;
}
