import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/solid";

const Dropdown = ({ label, items }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleItemClick = (item) => {
    setOpen(false);

    if (item.href) {
      navigate(item.href);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
        <UserIcon
            onClick={() => setOpen(!open)}
            className="h-10 w-10 p-2 text-white rounded-full border-2 border-white cursor-pointer hover:scale-105 transition"
        />  

      {open && (
        <div className="absolute top-full mt-2 right-0 w-48 bg-white rounded-md shadow-lg z-50">
          <ul className="py-1">
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleItemClick(item)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
