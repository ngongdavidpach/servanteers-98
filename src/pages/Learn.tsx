
import AppLayout from "@/components/layout/AppLayout";
import LearningCard from "@/components/education/LearningCard";
import { Coins, LineChart, PiggyBank, Wallet } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const learningSections = [
  {
    title: "Investing Basics",
    description: "Learn how to start investing with minimal risk.",
    icon: <LineChart size={24} />,
    color: "#0EA5E9",
    link: "#investing-basics"
  },
  {
    title: "Saving Strategies",
    description: "Effective methods to save more of your income.",
    icon: <PiggyBank size={24} />,
    color: "#10B981",
    link: "#saving-strategies"
  },
  {
    title: "Building Wealth",
    description: "Long-term strategies for financial independence.",
    icon: <Coins size={24} />,
    color: "#8B5CF6",
    link: "#building-wealth"
  },
  {
    title: "Money Management",
    description: "Master your personal finances with these tips.",
    icon: <Wallet size={24} />,
    color: "#F59E0B",
    link: "#money-management"
  }
];

const Learn = () => {
  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-6">Financial Education</h1>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="h-4 w-4 text-wallet-darkGray/40" />
        </div>
        <Input 
          type="text" 
          className="ps-10 bg-white shadow-sm" 
          placeholder="Search for topics"
        />
      </div>
      
      <div className="space-y-4">
        {learningSections.map((section, index) => (
          <LearningCard
            key={index}
            title={section.title}
            description={section.description}
            icon={section.icon}
            color={section.color}
            link={section.link}
          />
        ))}
      </div>
    </AppLayout>
  );
};

export default Learn;
