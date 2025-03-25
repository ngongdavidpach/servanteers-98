
import { ReactNode } from "react";
import BottomNav from "./BottomNav";
import { Card } from "@/components/ui/card";

interface AppLayoutProps {
  children: ReactNode;
  hideNav?: boolean;
}

const AppLayout = ({ children, hideNav = false }: AppLayoutProps) => {
  return (
    <div className="min-h-screen max-w-md mx-auto bg-wallet-gray relative">
      <div className="absolute inset-0 bg-gradient-to-b from-wallet-blue/10 to-transparent h-[30vh] z-0" />
      
      <main className="relative z-10 px-4 pt-6 pb-24 animate-fade-in min-h-screen">
        <Card className="glass-card overflow-hidden shadow-lg border-t border-white/50">
          <div className="p-4">
            {children}
          </div>
        </Card>
      </main>
      
      {!hideNav && <BottomNav />}
    </div>
  );
};

export default AppLayout;
