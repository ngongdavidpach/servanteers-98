
import { useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const contacts = [
  { id: "1", name: "Emma Johnson", avatar: "EJ", recent: true },
  { id: "2", name: "Alex Chen", avatar: "AC", recent: true },
  { id: "3", name: "Michael Brown", avatar: "MB", recent: true },
  { id: "4", name: "Sarah Davis", avatar: "SD", recent: false },
  { id: "5", name: "James Wilson", avatar: "JW", recent: false },
];

const TransferForm = () => {
  const [amount, setAmount] = useState("");
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [note, setNote] = useState("");
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimals
    const val = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(val);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would process the transfer
    console.log("Transfer submitted:", { amount, selectedContact, note });
  };
  
  return (
    <div className="animate-fade-in">
      <div className="relative mb-6">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <Search className="h-4 w-4 text-wallet-darkGray/40" />
        </div>
        <Input 
          type="text" 
          className="ps-10 bg-white shadow-sm" 
          placeholder="Search for a contact"
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-wallet-darkGray/60 mb-3">Recent</h3>
        <div className="flex space-x-4 overflow-x-auto pb-2 no-scrollbar">
          {contacts.filter(c => c.recent).map((contact) => (
            <div 
              key={contact.id}
              onClick={() => setSelectedContact(contact.id)}
              className={`flex flex-col items-center space-y-2 transition-all ${
                selectedContact === contact.id 
                  ? "scale-110" 
                  : "opacity-70"
              }`}
            >
              <div className={`w-14 h-14 rounded-full bg-white flex items-center justify-center text-lg font-medium shadow-md ${
                selectedContact === contact.id 
                  ? "ring-2 ring-wallet-blue" 
                  : "ring-1 ring-wallet-lightGray"
              }`}>
                {contact.avatar}
              </div>
              <span className="text-xs font-medium whitespace-nowrap">{contact.name.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="amount" className="text-sm font-medium text-wallet-darkGray/60">Amount</Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <span className="text-wallet-darkGray font-medium">$</span>
            </div>
            <Input 
              id="amount"
              type="text" 
              inputMode="decimal"
              value={amount}
              onChange={handleAmountChange}
              className="ps-7 text-lg font-bold"
              placeholder="0.00"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="note" className="text-sm font-medium text-wallet-darkGray/60">Note (optional)</Label>
          <Input 
            id="note"
            type="text" 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="mt-1"
            placeholder="What's this for?"
          />
        </div>
        
        <Button 
          type="submit"
          disabled={!amount || !selectedContact}
          className="w-full rounded-xl bg-wallet-blue hover:bg-wallet-blue/90 transition-all shadow-lg shadow-wallet-blue/20 h-14 mt-6"
        >
          <span>Send Money</span>
          <ArrowRight className="ml-2" size={18} />
        </Button>
      </form>
    </div>
  );
};

export default TransferForm;
