
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface LearningCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  link: string;
}

const LearningCard = ({ title, description, icon, color, link }: LearningCardProps) => {
  return (
    <div 
      className="relative overflow-hidden rounded-xl p-6 mb-4 border animate-scale-in hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      style={{ backgroundColor: `${color}10` }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10" style={{ backgroundColor: color }}></div>
      
      <div className="flex items-start">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          {icon}
        </div>
        
        <div className="flex-1">
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-wallet-darkGray/70 mb-3">{description}</p>
          
          <a 
            href={link}
            className="inline-flex items-center text-sm font-medium"
            style={{ color }}
          >
            Learn more <ArrowRight size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default LearningCard;
