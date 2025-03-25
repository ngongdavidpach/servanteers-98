
import AppLayout from "@/components/layout/AppLayout";
import Balance from "@/components/dashboard/Balance";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-wallet-darkGray/60">Good Morning</p>
          <h1 className="text-2xl font-bold">Alex</h1>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full w-10 h-10 bg-white shadow-sm border border-wallet-lightGray"
        >
          <Bell size={18} />
        </Button>
      </div>
      
      <Balance />
      
      <RecentTransactions />
    </AppLayout>
  );
};

export default Dashboard;
