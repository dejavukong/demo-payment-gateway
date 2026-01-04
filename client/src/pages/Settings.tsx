import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, CreditCard, FileText, ShieldCheck, User, Wallet, AlertTriangle, CheckCircle2, ArrowUpRight, Bell, Mail, Smartphone, Webhook, Lock, Globe, Eye, EyeOff, DollarSign, Palette, Users, Plus, Shield, Save, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function Settings() {
  const { t } = useLanguage();
  const [show2FACode, setShow2FACode] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-8 p-2">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t('settings.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('settings.subtitle')}</p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="w-full justify-start bg-transparent p-1 h-auto gap-2 overflow-x-auto flex-wrap">
            <TabsTrigger value="general" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all whitespace-nowrap border-none">
              {t('settings.general')}
            </TabsTrigger>
            <TabsTrigger value="kyb" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all whitespace-nowrap border-none">
              {t('settings.verification')}
            </TabsTrigger>
            <TabsTrigger value="notifications" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all whitespace-nowrap border-none">
              <Bell className="w-4 h-4 mr-2" /> {t('settings.notifications')}
            </TabsTrigger>
            <TabsTrigger value="security" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all whitespace-nowrap border-none">
              <Shield className="w-4 h-4 mr-2" /> {t('settings.security')}
            </TabsTrigger>
            <TabsTrigger value="fees" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all whitespace-nowrap border-none">
              <DollarSign className="w-4 h-4 mr-2" /> {t('settings.fees')}
            </TabsTrigger>
            <TabsTrigger value="financial" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all whitespace-nowrap border-none">
              {t('settings.financial')}
            </TabsTrigger>
            <TabsTrigger value="branding" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all whitespace-nowrap border-none">
              <Palette className="w-4 h-4 mr-2" /> {t('settings.branding')}
            </TabsTrigger>
            <TabsTrigger value="team" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all whitespace-nowrap border-none">
              <Users className="w-4 h-4 mr-2" /> {t('settings.team')}
            </TabsTrigger>
            <TabsTrigger value="invoice" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all whitespace-nowrap border-none">
              {t('settings.invoice')}
            </TabsTrigger>
          </TabsList>

          {/* General Tab */}
          <TabsContent value="general" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> {t('settings.profileInfo')}
                </CardTitle>
                <CardDescription>{t('settings.profileDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>{t('settings.fullName')}</Label>
                    <Input defaultValue="John Doe" className="input-glass" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('settings.email')}</Label>
                    <Input defaultValue="john@example.com" className="input-glass" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('settings.phone')}</Label>
                    <Input defaultValue="+1 (555) 000-0000" className="input-glass" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('settings.timezone')}</Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="backdrop-blur-lg bg-white/30 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-2xl transition-all duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">UTC (GMT+0)</SelectItem>
                        <SelectItem value="est">EST (GMT-5)</SelectItem>
                        <SelectItem value="pst">PST (GMT-8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button>{t('action.save')}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KYB Tab */}
          <TabsContent value="kyb" className="mt-6 space-y-6">
            <Card className="glass-panel border-l-4 border-l-amber-500 rounded-3xl">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-amber-500" /> {t('settings.businessVerification')}
                    </CardTitle>
                    <CardDescription>{t('settings.verificationDesc')}</CardDescription>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-bold border border-amber-500/20">
                    {t('settings.level1Verified')}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">{t('settings.dailyLimit')}</div>
                    <div className="text-2xl font-bold">$10,000</div>
                    <div className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {t('status.active')}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2 opacity-50">
                    <div className="text-sm font-medium text-muted-foreground">{t('settings.monthlyLimit')}</div>
                    <div className="text-2xl font-bold">$500,000</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      {t('settings.requiresLevel2')}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border space-y-2 opacity-50">
                    <div className="text-sm font-medium text-muted-foreground">{t('settings.withdrawals')}</div>
                    <div className="text-2xl font-bold">{t('settings.instant')}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      {t('settings.requiresLevel2')}
                    </div>
                  </div>
                </div>

                <div className="bg-amber-500/5 p-4 rounded-2xl border border-amber-500/10 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-amber-600">{t('settings.upgradeLevel2')}</h4>
                    <p className="text-xs text-muted-foreground">
                      {t('settings.upgradeDesc')}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/kyb">
                    <Button className="w-full md:w-auto gap-2 shadow-lg shadow-amber-500/20 bg-amber-600 hover:bg-amber-700 text-white border-none">
                      {t('settings.startVerification')} <ArrowUpRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial & Sweep Tab */}
          <TabsContent value="financial" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" /> {t('settings.autoSweepConfig')}
                </CardTitle>
                <CardDescription>{t('settings.autoSweepDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-background/30">
                  <div className="space-y-1">
                    <Label className="font-medium">{t('settings.enableAutoSweep')}</Label>
                    <p className="text-xs text-muted-foreground">{t('settings.enableAutoSweepDesc')}</p>
                  </div>
                  <Switch />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{t('settings.sweepMode')}</Label>
                    <Select defaultValue="nightly">
                      <SelectTrigger className="backdrop-blur-lg bg-white/30 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-2xl transition-all duration-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="instant">{t('settings.instantMode')}</SelectItem>
                        <SelectItem value="hourly">{t('settings.hourlyMode')}</SelectItem>
                        <SelectItem value="nightly">{t('settings.nightlyMode')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {t('settings.nightlyDesc')}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>{t('settings.minThreshold')}</Label>
                    <Input type="number" defaultValue="1000" className="input-glass" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>{t('settings.targetCurrency')}</Label>
                  <Select defaultValue="usdc">
                    <SelectTrigger className="backdrop-blur-lg bg-white/30 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-2xl transition-all duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usdc">USDC (ERC-20)</SelectItem>
                      <SelectItem value="usdt">USDT (TRC-20)</SelectItem>
                      <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" /> {t('settings.emailNotifications')}
                </CardTitle>
                <CardDescription>{t('settings.emailNotificationsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: t('settings.paymentReceived'), desc: t('settings.paymentReceivedDesc'), enabled: true },
                  { label: t('settings.paymentFailed'), desc: t('settings.paymentFailedDesc'), enabled: true },
                  { label: t('settings.withdrawalCompleted'), desc: t('settings.withdrawalCompletedDesc'), enabled: true },
                  { label: t('settings.weeklySummary'), desc: t('settings.weeklySummaryDesc'), enabled: false },
                  { label: t('settings.apiUsageAlerts'), desc: t('settings.apiUsageAlertsDesc'), enabled: true },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                    </div>
                    <Switch defaultChecked={item.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-primary" /> {t('settings.smsNotifications')}
                </CardTitle>
                <CardDescription>{t('settings.smsNotificationsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('settings.phoneNumber')}</Label>
                  <Input defaultValue="+1 (555) 123-4567" className="input-glass" />
                </div>
                {[
                  { label: t('settings.largeTransactions'), desc: t('settings.largeTransactionsDesc'), enabled: true },
                  { label: t('settings.securityAlerts'), desc: t('settings.securityAlertsDesc'), enabled: true },
                  { label: t('settings.systemMaintenance'), desc: t('settings.systemMaintenanceDesc'), enabled: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground mt-1">{item.desc}</div>
                    </div>
                    <Switch defaultChecked={item.enabled} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Webhook className="h-5 w-5 text-primary" /> {t('settings.webhookNotifications')}
                </CardTitle>
                <CardDescription>{t('settings.webhookNotificationsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex-1">
                    <div className="font-medium">{t('settings.webhookRetries')}</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('settings.webhookRetriesDesc')}</div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="space-y-2">
                  <Label>{t('settings.maxRetryAttempts')}</Label>
                  <Select defaultValue="3">
                    <SelectTrigger className="backdrop-blur-lg bg-white/30 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-2xl transition-all duration-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">{t('settings.attemptCount', { count: 1 })}</SelectItem>
                      <SelectItem value="3">{t('settings.attemptCount', { count: 3 })}</SelectItem>
                      <SelectItem value="5">{t('settings.attemptCount', { count: 5 })}</SelectItem>
                      <SelectItem value="10">{t('settings.attemptCount', { count: 10 })}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" /> {t('settings.twoFactorAuth')}
                </CardTitle>
                <CardDescription>{t('settings.twoFactorAuthDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-green-600 dark:text-green-400">{t('settings.twoFactorEnabled')}</div>
                      <div className="text-sm text-muted-foreground mt-1">{t('settings.lastVerified')}: 2024-03-15 10:30 AM</div>
                    </div>
                  </div>
                  <Button variant="outline">{t('settings.disable2FA')}</Button>
                </div>
                <div className="space-y-2">
                  <Label>{t('settings.backupCodes')}</Label>
                  <div className="relative">
                    <Input
                      type={show2FACode ? "text" : "password"}
                      value="1234-5678-9012-3456"
                      readOnly
                      className="input-glass font-mono pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setShow2FACode(!show2FACode)}
                    >
                      {show2FACode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{t('settings.backupCodesDesc')}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" /> {t('settings.ipWhitelist')}
                </CardTitle>
                <CardDescription>{t('settings.ipWhitelistDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                  <div className="flex-1">
                    <div className="font-medium">{t('settings.enableIpWhitelisting')}</div>
                    <div className="text-sm text-muted-foreground mt-1">{t('settings.enableIpWhitelistingDesc')}</div>
                  </div>
                  <Switch defaultChecked={true} />
                </div>
                <div className="space-y-2">
                  <Label>{t('settings.whitelistedIPs')}</Label>
                  <div className="flex gap-2">
                    <Input placeholder="192.168.1.1" className="input-glass font-mono" />
                    <Button>{t('settings.addIP')}</Button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["192.168.1.100", "10.0.0.50", "172.16.0.25"].map((ip, index) => (
                    <Badge key={index} variant="outline" className="bg-primary/10 text-primary rounded-full font-mono px-3 py-1">
                      {ip}
                      <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{t('settings.loginSessions')}</CardTitle>
                <CardDescription>{t('settings.loginSessionsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { device: "Chrome on MacOS", location: "San Francisco, US", current: true, time: t('settings.activeNow') },
                  { device: "Safari on iPhone", location: "San Francisco, US", current: false, time: t('settings.hoursAgo', { count: 2 }) },
                  { device: "Firefox on Windows", location: "New York, US", current: false, time: t('settings.daysAgo', { count: 1 }) },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {session.device}
                        {session.current && (
                          <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-xs">{t('settings.current')}</Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">{session.location} · {session.time}</div>
                    </div>
                    {!session.current && <Button variant="outline" size="sm">{t('settings.revoke')}</Button>}
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">{t('settings.revokeAllOtherSessions')}</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fees Tab */}
          <TabsContent value="fees" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{t('settings.transactionFeeRates')}</CardTitle>
                <CardDescription>{t('settings.transactionFeeRatesDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-600 dark:text-blue-400">{t('settings.volumeBasedPricing')}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {t('settings.volumeBasedPricingDesc')}
                      </div>
                    </div>
                  </div>
                </div>

                {[
                  { tier: t('settings.standardTier'), volume: "$0 - $50,000", fee: "0.8%", perTx: "$0.30" },
                  { tier: t('settings.growthTier'), volume: "$50,000 - $500,000", fee: "0.6%", perTx: "$0.25", active: true },
                  { tier: t('settings.enterpriseTier'), volume: "$500,000+", fee: "0.4%", perTx: "$0.20" },
                ].map((tier, index) => (
                  <div key={index} className={`p-6 rounded-xl border ${tier.active ? 'bg-primary/5 border-primary/30' : 'bg-muted/30 border-border/50'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-lg">{tier.tier}</div>
                        {tier.active && <Badge className="bg-primary/20 text-foreground rounded-full font-bold">{t('settings.currentTier')}</Badge>}
                      </div>
                      <div className="text-sm text-muted-foreground">{tier.volume}/{t('settings.perMonth')}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">{t('settings.percentageFee')}</div>
                        <div className="text-2xl font-bold mt-1">{tier.fee}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{t('settings.perTransaction')}</div>
                        <div className="text-2xl font-bold mt-1">{tier.perTx}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{t('settings.withdrawalFees')}</CardTitle>
                <CardDescription>{t('settings.withdrawalFeesDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { coin: "Bitcoin (BTC)", network: "Bitcoin", fee: "0.0005 BTC", usd: "~$32.50" },
                    { coin: "Ethereum (ETH)", network: "Ethereum", fee: "0.002 ETH", usd: "~$6.24" },
                    { coin: "USDT", network: "TRON", fee: "1 USDT", usd: "~$1.00" },
                    { coin: "USDC", network: "Ethereum", fee: "2 USDC", usd: "~$2.00" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div>
                        <div className="font-medium">{item.coin}</div>
                        <div className="text-sm text-muted-foreground mt-1">{item.network}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold">{item.fee}</div>
                        <div className="text-sm text-muted-foreground">{item.usd}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Tab */}
          <TabsContent value="branding" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{t('settings.paymentPageCustomization')}</CardTitle>
                <CardDescription>{t('settings.paymentPageCustomizationDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{t('settings.businessLogo')}</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-xl bg-muted/50 border border-border/50 flex items-center justify-center">
                      <Building2 className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">{t('settings.uploadLogo')}</Button>
                      <Button variant="outline">{t('action.remove')}</Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{t('settings.recommendedLogoSize')}</p>
                </div>
                <div className="space-y-2">
                  <Label>{t('settings.brandColor')}</Label>
                  <div className="flex gap-2">
                    <Input defaultValue="#CDF063" className="input-glass font-mono max-w-xs" />
                    <div className="h-10 w-10 rounded-lg border border-border/50" style={{ backgroundColor: '#CDF063' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('settings.supportLink')}</Label>
                  <Input defaultValue="https://acme.com/support" className="input-glass" />
                </div>
                <div className="pt-4">
                  <Button className="gap-2 shadow-lg shadow-primary/20">
                    <Save className="w-4 h-4" /> {t('settings.saveBranding')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold">{t('settings.teamMembers')}</CardTitle>
                    <CardDescription>{t('settings.teamMembersDesc')}</CardDescription>
                  </div>
                  <Button className="gap-2 shadow-lg shadow-primary/20">
                    <Plus className="w-4 h-4" /> {t('settings.inviteMember')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "John Doe", email: "john@acme.com", role: "Owner", status: t('status.active') },
                  { name: "Jane Smith", email: "jane@acme.com", role: "Admin", status: t('status.active') },
                  { name: "Bob Johnson", email: "bob@acme.com", role: "Developer", status: t('status.active') },
                  { name: "Alice Brown", email: "alice@acme.com", role: "Finance", status: t('settings.invited') },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={`rounded-full font-medium ${member.status === t('status.active') ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'}`}>
                        {member.status}
                      </Badge>
                      <Select defaultValue={member.role.toLowerCase()}>
                        <SelectTrigger className="w-[130px] backdrop-blur-lg bg-white/30 dark:bg-black/20 border border-white/30 dark:border-white/15 rounded-2xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="owner">{t('settings.roleOwner')}</SelectItem>
                          <SelectItem value="admin">{t('settings.roleAdmin')}</SelectItem>
                          <SelectItem value="developer">{t('settings.roleDeveloper')}</SelectItem>
                          <SelectItem value="finance">{t('settings.roleFinance')}</SelectItem>
                          <SelectItem value="readonly">{t('settings.roleReadOnly')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {member.role !== 'Owner' && <Button variant="outline" size="sm">{t('action.remove')}</Button>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{t('settings.rolePermissions')}</CardTitle>
                <CardDescription>{t('settings.rolePermissionsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { role: t('settings.roleOwner'), permissions: t('settings.roleOwnerPermissions') },
                  { role: t('settings.roleAdmin'), permissions: t('settings.roleAdminPermissions') },
                  { role: t('settings.roleDeveloper'), permissions: t('settings.roleDeveloperPermissions') },
                  { role: t('settings.roleFinance'), permissions: t('settings.roleFinancePermissions') },
                  { role: t('settings.roleReadOnly'), permissions: t('settings.roleReadOnlyPermissions') },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{item.role}</div>
                      <div className="text-sm text-muted-foreground mt-1">{item.permissions}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoice Settings Tab */}
          <TabsContent value="invoice" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" /> {t('settings.invoiceEntity')}
                </CardTitle>
                <CardDescription>{t('settings.invoiceEntityDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('settings.legalName')}</Label>
                  <Input placeholder="e.g. Acme Corp Ltd." className="input-glass" />
                </div>
                <div className="space-y-2">
                  <Label>{t('settings.taxId')}</Label>
                  <Input placeholder="e.g. US-123456789" className="input-glass" />
                </div>
                <div className="space-y-2">
                  <Label>{t('settings.businessAddress')}</Label>
                  <Input placeholder={t('settings.streetAddress')} className="input-glass mb-2" />
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder={t('settings.city')} className="input-glass" />
                    <Input placeholder={t('settings.postalCode')} className="input-glass" />
                  </div>
                  <Input placeholder={t('settings.country')} className="input-glass mt-2" />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-background/30 mt-4">
                  <div className="space-y-1">
                    <Label className="font-medium">{t('settings.autoGenInvoice')}</Label>
                    <p className="text-xs text-muted-foreground">{t('settings.autoGenInvoiceDesc')}</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button>{t('action.save')}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
