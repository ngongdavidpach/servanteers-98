
import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface ProfileCardProps {
  icon: ReactNode;
  title: string;
  description?: string;
  onClick: () => void;
}

const ProfileCard = ({ icon, title, description, onClick }: ProfileCardProps) => {
  return (
    <div 
      className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-wallet-lightGray hover:bg-wallet-lightGray/30 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-wallet-lightGray flex items-center justify-center mr-3 text-wallet-darkGray">
          {icon}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          {description && (
            <p className="text-xs text-wallet-darkGray/60">{description}</p>
          )}
        </div>
      </div>
      
      <ChevronRight size={18} className="text-wallet-darkGray/40" />
    </div>
  );
};

export default ProfileCard;
