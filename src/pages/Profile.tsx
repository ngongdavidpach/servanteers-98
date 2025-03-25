
import AppLayout from "@/components/layout/AppLayout";
import ProfileCard from "@/components/profile/ProfileCard";
import { CreditCard, Lock, Bell, HelpCircle, LogOut, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const handleNotImplemented = () => {
  toast.info("This feature is not implemented yet");
};

const Profile = () => {
  return (
    <AppLayout>
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-20 h-20 mb-3 border-4 border-white shadow-md">
          <AvatarFallback className="bg-wallet-blue text-white text-xl">AW</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold">Alex Wilson</h1>
        <p className="text-wallet-darkGray/60">alex.wilson@example.com</p>
      </div>
      
      <div className="space-y-3 mb-6">
        <h2 className="text-sm font-medium text-wallet-darkGray/60 px-1">Account</h2>
        <ProfileCard 
          icon={<UserIcon size={20} />} 
          title="Personal Information" 
          description="Update your personal details"
          onClick={handleNotImplemented}
        />
        <ProfileCard 
          icon={<CreditCard size={20} />} 
          title="Payment Methods" 
          description="Add or remove payment methods"
          onClick={handleNotImplemented}
        />
        <ProfileCard 
          icon={<Lock size={20} />} 
          title="Security & Privacy" 
          description="Manage your account security"
          onClick={handleNotImplemented}
        />
      </div>
      
      <div className="space-y-3 mb-6">
        <h2 className="text-sm font-medium text-wallet-darkGray/60 px-1">Preferences</h2>
        <ProfileCard 
          icon={<Bell size={20} />} 
          title="Notifications" 
          description="Manage notification settings"
          onClick={handleNotImplemented}
        />
        <ProfileCard 
          icon={<HelpCircle size={20} />} 
          title="Help Center" 
          description="Get help with using the app"
          onClick={handleNotImplemented}
        />
      </div>
      
      <div className="pt-4">
        <ProfileCard 
          icon={<LogOut size={20} />} 
          title="Sign Out" 
          onClick={handleNotImplemented}
        />
      </div>
    </AppLayout>
  );
};

export default Profile;
