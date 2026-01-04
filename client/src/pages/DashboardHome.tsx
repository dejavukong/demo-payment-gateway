import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Wallet, Activity, ShieldCheck, AlertCircle, FileText, CreditCard, Code2, Settings } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

const data = [
  { name: 'Mon', value: 4000 },
  { name: 'Tue', value: 3000 },
  { name: 'Wed', value: 2000 },
  { name: 'Thu', value: 2780 },
  { name: 'Fri', value: 1890 },
  { name: 'Sat', value: 2390 },
  { name: 'Sun', value: 3490 },
];

export default function DashboardHome() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="space-y-8 p-2">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-pixel">{t('nav.dashboard')}</h1>
            <p className="text-muted-foreground mt-2">{t('dashboard.welcome')}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-sm font-bold">{t('status.kybVerified')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400">
              <Activity className="w-4 h-4" />
              <span className="text-sm font-bold">{t('status.systemActive')}</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="glass-panel card-interactive overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">{t('dashboard.revenue')}</CardTitle>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">$</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">$45,231.89</div>
              <p className="text-xs text-green-600 dark:text-green-400 flex items-center mt-2 font-medium">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +20.1% {t('dashboard.fromLastMonth')}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-panel card-interactive overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">{t('dashboard.activeOrders')}</CardTitle>
              <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center">
                <Activity className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">+2350</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                +180 {t('dashboard.sinceLastHour')}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-panel card-interactive overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">{t('dashboard.pendingPayouts')}</CardTitle>
              <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">$12,234</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                {t('dashboard.scheduledTonight')}
              </p>
            </CardContent>
          </Card>

          <Card className="glass-panel card-interactive overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-muted-foreground">{t('dashboard.accountStatus')}</CardTitle>
              <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">{t('status.active')}</div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">
                {t('status.verified')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart Section */}
        <div className="grid gap-6 md:grid-cols-7">
          <Card className="col-span-4 glass-panel">
            <CardHeader>
              <CardTitle className="font-pixel text-lg">{t('dashboard.revenueOverview')}</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis dataKey="name" className="text-xs text-muted-foreground" tickLine={false} axisLine={false} />
                    <YAxis className="text-xs text-muted-foreground" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--foreground)' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity / Quick Actions */}
          <Card className="col-span-3 glass-panel">
            <CardHeader>
              <CardTitle className="font-pixel text-lg">{t('dashboard.quickActions')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/40 to-white/20 dark:from-black/40 dark:to-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                  onClick={() => setLocation('/invoices/new')}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">{t('action.createInvoice')}</span>
                  </div>
                </button>

                <button
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/40 to-white/20 dark:from-black/40 dark:to-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                  onClick={() => setLocation('/withdraw')}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">{t('action.withdraw')}</span>
                  </div>
                </button>

                <button
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/40 to-white/20 dark:from-black/40 dark:to-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                  onClick={() => setLocation('/integration')}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Code2 className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">{t('action.apiKeys')}</span>
                  </div>
                </button>

                <button
                  className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/40 to-white/20 dark:from-black/40 dark:to-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                  onClick={() => setLocation('/settings')}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Settings className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-semibold text-sm text-foreground">{t('action.settings')}</span>
                  </div>
                </button>
              </div>
              
              <div className="mt-6 p-5 rounded-2xl backdrop-blur-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 transition-all hover:bg-amber-500/15">
                <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 text-sm mb-1">{t('dashboard.completeProfile')}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t('dashboard.completeProfileDesc')}
                  </p>
                  <Button
                    variant="link"
                    className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 p-0 h-auto text-xs mt-2 font-semibold"
                    onClick={() => setLocation('/settings')}
                  >
                    {t('dashboard.goToSettings')} &rarr;
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
