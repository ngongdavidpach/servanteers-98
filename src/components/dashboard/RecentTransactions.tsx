
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Sample transaction data
const transactions = [
  {
    id: "1",
    type: "send",
    name: "Emma Johnson",
    amount: 45.50,
    date: "Today, 2:34 PM"
  },
  {
    id: "2",
    type: "receive",
    name: "Alex Chen",
    amount: 128.00,
    date: "Yesterday, 5:15 PM"
  },
  {
    id: "3",
    type: "send",
    name: "Michael Brown",
    amount: 12.75,
    date: "Oct 21, 9:32 AM"
  }
];

const RecentTransactions = () => {
  return (
    <div className="animate-fade-in animation-delay-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium">Recent Transactions</h2>
        <a href="#" className="text-sm text-wallet-blue font-medium">View All</a>
      </div>
      
      <div className="space-y-3">
        {transactions.map((transaction) => (
          <div 
            key={transaction.id}
            className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-wallet-lightGray animate-scale-in"
          >
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                transaction.type === "send" 
                  ? "bg-wallet-red/10 text-wallet-red" 
                  : "bg-wallet-green/10 text-wallet-green"
              }`}>
                {transaction.type === "send" 
                  ? <ArrowUpRight size={18} /> 
                  : <ArrowDownRight size={18} />
                }
              </div>
              <div>
                <p className="font-medium">{transaction.name}</p>
                <p className="text-xs text-wallet-darkGray/60">{transaction.date}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-medium ${
                transaction.type === "send" 
                  ? "text-wallet-red" 
                  : "text-wallet-green"
              }`}>
                {transaction.type === "send" ? "-" : "+"}${transaction.amount.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
