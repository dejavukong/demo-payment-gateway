import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Code2,
  CreditCard,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  Wallet
} from "lucide-react";
import { Link, useLocation } from "wouter";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { href: "/", icon: LayoutDashboard, label: t('nav.dashboard') },
    { href: "/assets", icon: Wallet, label: t('nav.assets') },
    { href: "/orders", icon: History, label: t('nav.orders') },
    { href: "/integration", icon: Code2, label: t('nav.integration') },
    { href: "/withdraw", icon: CreditCard, label: t('nav.withdraw') },
    { href: "/settings", icon: Settings, label: t('nav.settings') },
  ];

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar - Frosted Glass */}
      <aside className="w-64 sidebar-glass fixed h-full z-10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Origami Icon - Geometric Paper Fold */}
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-primary rounded-lg transform rotate-45"></div>
              <div className="absolute top-0 left-0 w-5 h-5 bg-foreground/90 rounded-tl-lg"></div>
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-primary/60 rounded-br-lg"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-background rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-foreground">origami</span><span className="text-primary">pay</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">{t('nav.merchantPortal')}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all cursor-pointer rounded-2xl",
                    isActive
                      ? "bg-primary/10 text-primary backdrop-blur-xl shadow-lg border border-primary/20"
                      : "text-foreground/70 hover:bg-white/40 dark:hover:bg-white/5 hover:text-foreground backdrop-blur-sm"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-2xl hover:bg-destructive/10 hover:text-destructive font-medium transition-all"
          >
            <LogOut className="h-5 w-5" />
            {t('nav.signout')}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-y-auto">
        <header className="h-16 border-b border-white/20 backdrop-blur-2xl bg-white/30 dark:bg-black/20 sticky top-0 z-20 px-8 flex items-center justify-end">
          <LanguageSwitcher />
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
