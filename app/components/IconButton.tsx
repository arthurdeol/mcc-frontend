import Link from "next/link";
import DynamicIcon from "./DynamicIcon";

interface IconButtonProps {
  hasFile: string;
  iconName: any;
  size: number;
  href: string;
  id: string;
}

export default function IconButton({
  hasFile,
  iconName,
  size = 16,
  href,
  id,
}: IconButtonProps) {
  return (
    <button onClick={() => console.log("clicou" + iconName)} className="ml-1">
      <Link href={{ pathname: href, query: { id: id, activeTab: iconName } }}>
        <div className="ml-1">
          <DynamicIcon
            name={iconName}
            size={size}
            color={hasFile ? "black" : "#9ca3af"}
          />
        </div>
      </Link>
    </button>
  );
}
