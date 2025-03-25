
import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

const Balance = () => {
  const [hideBalance, setHideBalance] = useState(false);
  
  return (
    <div className="mb-8 animate-fade-in">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-wallet-darkGray/60">Current Balance</h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={() => setHideBalance(!hideBalance)}
        >
          {hideBalance ? <Eye size={16} /> : <EyeOff size={16} />}
        </Button>
      </div>
      
      <div className="flex items-baseline">
        <h1 className="text-4xl font-bold tracking-tight">
          {hideBalance ? "••••••" : "$3,452.65"}
        </h1>
        <span className="ml-2 px-2 py-1 bg-wallet-green/10 text-wallet-green text-xs rounded-full font-medium">
          +2.4%
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Button 
          className="rounded-xl bg-wallet-blue hover:bg-wallet-blue/90 transition-all shadow-lg shadow-wallet-blue/20 h-14"
        >
          <ArrowUpRight className="mr-2" size={18} />
          <span>Send</span>
        </Button>
        
        <Button 
          className="rounded-xl bg-wallet-gray border border-wallet-darkGray/10 text-wallet-darkGray hover:bg-wallet-lightGray transition-all h-14"
          variant="outline"
        >
          <ArrowDownRight className="mr-2" size={18} />
          <span>Receive</span>
        </Button>
      </div>
    </div>
  );
};

export default Balance;
