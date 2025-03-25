
import AppLayout from "@/components/layout/AppLayout";
import TransferForm from "@/components/transfers/TransferForm";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout>
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-2 h-9 w-9"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
        </Button>
        <h1 className="text-2xl font-bold">Send Money</h1>
      </div>
      
      <TransferForm />
    </AppLayout>
  );
};

export default Transfer;
