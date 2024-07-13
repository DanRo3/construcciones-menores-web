"use client";
import Link from "next/link";
import { useState } from "react";
import { MdArrowOutward, MdOutlineArrowForward } from "react-icons/md";

interface SidebarItemProps {
  item: {
    icon: JSX.Element;
    label: string;
    route: string;
  };
  pathname: string;
  pageName: string;
  setPageName: (arg: string) => void;
}

const SidebarItem = ({
  item,
  pathname,
  pageName,
  setPageName,
}: SidebarItemProps) => {
  const isActive = pathname === item.route;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li>
      <Link href={item.route}>
        <div
          className={`flex items-center rounded-3xl gap-3 px-4 py-2 text-base font-medium transition-colors duration-300 ease-in-out cursor-pointer relative ${
            isActive
              ? "bg-primary text-white"
              : "text-dark hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700"
          }`}
          onClick={() => setPageName(item.label)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {item.icon}
          {item.label}
          {isHovered && (
            <div className="absolute text-lg right-4 transform rotate-25">
              {isActive ? <MdOutlineArrowForward /> : <MdArrowOutward />}
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default SidebarItem;
