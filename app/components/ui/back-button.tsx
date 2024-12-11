import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BackButtonProps {
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label = "", className = "" }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <button onClick={handleBack} className={`flex items-center text-base font-medium text-gray-400 duration-300 hover:text-[#254a96] ${className}`}>
      <ArrowLeftIcon className="mr-2 w-4 h-4" />
      {label}
    </button>
  );
};

export default BackButton;
