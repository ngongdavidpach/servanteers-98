
import { Home, SendHorizontal, BookOpen, User, ShoppingBag, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/",
      active: path === "/"
    },
    {
      name: "Transfer",
      icon: SendHorizontal,
      path: "/transfer",
      active: path === "/transfer"
    },
    {
      name: "Products",
      icon: ShoppingBag,
      path: "/products",
      active: path === "/products"
    },
    {
      name: "Orders",
      icon: Package,
      path: "/orders",
      active: path === "/orders" || path.startsWith("/orders/")
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
      active: path === "/profile"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 safe-bottom animate-slide-up animation-delay-300">
      <div className="glass-card border-t border-r border-l border-white/50 rounded-t-xl">
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center w-1/5 transition-all duration-200 ${
                item.active 
                  ? "text-wallet-blue scale-110" 
                  : "text-wallet-darkGray/60"
              }`}
            >
              <item.icon size={20} className={`mb-1 ${item.active ? "stroke-[2.5px]" : ""}`} />
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BottomNav;
