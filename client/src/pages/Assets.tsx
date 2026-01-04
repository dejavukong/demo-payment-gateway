import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRightLeft, Download, RefreshCw, Wallet, Settings, Clock, MapPin, Play, Pause, Plus, Copy } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const assets = [
  {
    coin: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin",
    balance: "1.24500000",
    value: "$82,145.20",
    swept: "1.20000000",
    unswept: "0.04500000",
    status: "Sweeping",
    icon: "₿"
  },
  {
    coin: "Ethereum",
    symbol: "ETH",
    network: "Ethereum",
    balance: "15.40000000",
    value: "$48,230.10",
    swept: "15.00000000",
    unswept: "0.40000000",
    status: "Idle",
    icon: "Ξ"
  },
  {
    coin: "Tether",
    symbol: "USDT",
    network: "TRON",
    balance: "25,400.00",
    value: "$25,400.00",
    swept: "20,000.00",
    unswept: "5,400.00",
    status: "Pending",
    icon: "₮"
  },
  {
    coin: "USD Coin",
    symbol: "USDC",
    network: "Ethereum",
    balance: "12,100.00",
    value: "$12,100.00",
    swept: "12,100.00",
    unswept: "0.00",
    status: "Idle",
    icon: "$"
  }
];

const depositAddresses = [
  { id: 1, address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", asset: "BTC", balance: "0.04500000", label: "Main BTC Deposit", lastActivity: "2024-03-15 14:30", txCount: 142 },
  { id: 2, address: "bc1q5r6m3xjw8c9d4e5f6g7h8i9j0k1l2m3n4o5p6", asset: "BTC", balance: "0.00000000", label: "Secondary BTC", lastActivity: "2024-03-10 08:15", txCount: 23 },
  { id: 3, address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", asset: "ETH", balance: "0.40000000", label: "Primary ETH Wallet", lastActivity: "2024-03-15 12:45", txCount: 89 },
  { id: 4, address: "0x8b3c4d9e8a7f1b2c3d4e5f6a7b8c9d0e1f2a3b4c", asset: "ETH", balance: "0.00000000", label: "ETH Vault", lastActivity: "2024-03-08 16:20", txCount: 45 },
  { id: 5, address: "TYASr5UV6HEcXatwdFQfmLVUqQQQMUxHLS", asset: "USDT", balance: "5,400.00", label: "USDT Receiving", lastActivity: "2024-03-16 09:30", txCount: 312 },
];

export default function Assets() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [sweepEnabled, setSweepEnabled] = useState(true);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{t('assets.title')}</h2>
            <p className="text-muted-foreground mt-2">{t('assets.subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="rounded-xl border-border/40 hover:bg-muted/30">
              <RefreshCw className="mr-2 h-4 w-4" /> {t('action.regenerate')}
            </Button>
            <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
              <Download className="mr-2 h-4 w-4" /> {t('action.withdraw')}
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-transparent p-1 h-auto gap-2 flex-wrap">
            <TabsTrigger value="overview" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-2xl px-6 py-3">
              <Wallet className="w-4 h-4 mr-2" />
              {t('assets.overview')}
            </TabsTrigger>
            <TabsTrigger value="sweep" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-2xl px-6 py-3">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              {t('assets.sweepStrategy')}
            </TabsTrigger>
            <TabsTrigger value="addresses" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-2xl px-6 py-3">
              <MapPin className="w-4 h-4 mr-2" />
              {t('assets.addressManagement')}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6 space-y-6">

        {/* Asset Overview Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="glass-panel overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('assets.totalBalance')} (USD)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                $167,875.30
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t('assets.swept')}</span>
                  <span className="font-semibold">92%</span>
                </div>
                <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-green-400 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-panel overflow-hidden group hover:shadow-xl hover:shadow-primary/20 transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{t('assets.autoSweep')} {t('assets.status')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
                  <ArrowRightLeft className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg">{t('status.active')} & {t('status.processing')}</div>
                  <p className="text-sm text-muted-foreground mt-1">{t('assets.nextBatch')}: 02:00 AM UTC</p>
                </div>
              </div>
              <div className="pt-3 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{t('assets.lastSweep')}:</span> 4 {t('assets.hoursAgo')} • 124 {t('assets.addressesProcessed')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets Table */}
        <Card className="glass-panel overflow-hidden rounded-2xl">
          <CardHeader className="border-b border-border/30">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Wallet className="h-5 w-5 text-primary" /> {t('assets.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-border/30 hover:bg-transparent">
                  <TableHead className="font-semibold text-foreground text-sm">{t('assets.asset')}</TableHead>
                  <TableHead className="font-semibold text-foreground text-sm">{t('assets.chain')}</TableHead>
                  <TableHead className="font-semibold text-foreground text-sm text-right">{t('assets.totalBalance')}</TableHead>
                  <TableHead className="font-semibold text-foreground text-sm text-right">{t('assets.swept')} / {t('assets.unswept')}</TableHead>
                  <TableHead className="font-semibold text-foreground text-sm text-center">{t('assets.status')}</TableHead>
                  <TableHead className="font-semibold text-foreground text-sm text-right">{t('assets.action')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assets.map((asset) => (
                  <TableRow key={asset.symbol} className="border-b border-border/20 hover:bg-primary/15 transition-colors rounded-xl">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-lg">
                          {asset.icon}
                        </div>
                        <div>
                          <div className="font-semibold">{asset.coin}</div>
                          <div className="text-xs text-muted-foreground">{asset.symbol}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="rounded-full border-border/40 bg-muted/30 font-medium">
                        {asset.network}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-semibold">{asset.balance}</div>
                      <div className="text-xs text-muted-foreground">{asset.value}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="text-sm space-y-1">
                        <div className="text-green-600 dark:text-green-400 font-medium">↑ {asset.swept}</div>
                        <div className="text-muted-foreground">↓ {asset.unswept}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {asset.status === "Sweeping" && (
                        <Badge className="bg-primary/20 text-foreground rounded-full font-bold">
                          {t('status.processing')}
                        </Badge>
                      )}
                      {asset.status === "Pending" && (
                        <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full font-bold">
                          {t('status.pending')}
                        </Badge>
                      )}
                      {asset.status === "Idle" && (
                        <Badge variant="outline" className="rounded-full border-border/40 bg-muted/30">
                          {t('status.idle')}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" className="hover:bg-primary/10 hover:text-primary rounded-xl font-medium">
                        {t('action.view')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
          </TabsContent>

          {/* Sweep Strategy Tab */}
          <TabsContent value="sweep" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-panel">
                  <CardHeader className="border-b border-border/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg font-semibold">{t('assets.autoSweepConfig')}</CardTitle>
                        <CardDescription className="mt-1">{t('assets.autoSweepConfigDesc')}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{t('assets.autoSweep')}</span>
                        <Switch checked={sweepEnabled} onCheckedChange={setSweepEnabled} />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">{t('assets.sweepThreshold')}</label>
                        <Input type="number" placeholder="0.01" className="bg-background/50" />
                        <p className="text-xs text-muted-foreground">{t('assets.sweepThresholdDesc')}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-semibold">{t('assets.schedule')}</label>
                        <Select defaultValue="daily">
                          <SelectTrigger className="bg-background/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">{t('assets.everyHour')}</SelectItem>
                            <SelectItem value="4hours">{t('assets.every4Hours')}</SelectItem>
                            <SelectItem value="daily">{t('assets.dailyAt2AM')}</SelectItem>
                            <SelectItem value="manual">{t('assets.manualOnly')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">{t('assets.scheduleDesc')}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{t('assets.targetSweepAddress')}</label>
                      <div className="flex gap-2">
                        <Input placeholder="0x..." className="bg-background/50 font-mono" defaultValue="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" />
                        <Button variant="outline" size="icon">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">{t('assets.targetSweepAddressDesc')}</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold">{t('assets.gasPriceStrategy')}</label>
                      <Select defaultValue="standard">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">{t('assets.slow')}</SelectItem>
                          <SelectItem value="standard">{t('assets.standard')}</SelectItem>
                          <SelectItem value="fast">{t('assets.fast')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                      <Button variant="outline">{t('assets.testSweep')}</Button>
                      <Button>{t('action.save')}</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel">
                  <CardHeader className="border-b border-border/50">
                    <CardTitle className="text-lg font-semibold">{t('assets.recentSweepHistory')}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('assets.time')}</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('assets.asset')}</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider text-right">{t('orders.amount')}</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider text-right">{t('assets.addresses')}</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('assets.status')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {[
                          { time: "2024-03-16 02:00", asset: "BTC", amount: "1.20 BTC", addresses: 28, status: "Completed" },
                          { time: "2024-03-15 02:00", asset: "ETH", amount: "15.00 ETH", addresses: 45, status: "Completed" },
                          { time: "2024-03-14 02:00", asset: "USDT", amount: "20,000 USDT", addresses: 124, status: "Completed" },
                        ].map((sweep, index) => (
                          <TableRow key={index} className="hover:bg-primary/15 transition-colors rounded-xl">
                            <TableCell className="text-sm text-muted-foreground">{sweep.time}</TableCell>
                            <TableCell className="font-semibold">{sweep.asset}</TableCell>
                            <TableCell className="text-right font-mono">{sweep.amount}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{sweep.addresses}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30 rounded-full">
                                {t('status.completed')}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="glass-panel">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <ArrowRightLeft className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="font-bold text-lg">{t('assets.manualSweep')}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{t('assets.manualSweepDesc')}</p>
                    </div>
                    <Button className="w-full gap-2" size="lg">
                      <Play className="w-4 h-4" />
                      {t('assets.startSweepNow')}
                    </Button>
                  </CardContent>
                </Card>

                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">{t('assets.sweepStatistics')}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('assets.totalSwept30d')}</p>
                      <p className="text-2xl font-bold">$145,230.00</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('assets.addressesProcessed')}</p>
                      <p className="text-2xl font-bold">1,247</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{t('assets.gasFeesSpent')}</p>
                      <p className="text-2xl font-bold">$245.80</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Address Management Tab */}
          <TabsContent value="addresses" className="mt-6">
            <Card className="glass-panel">
              <CardHeader className="border-b border-border/50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg font-semibold">{t('assets.depositAddresses')}</CardTitle>
                    <CardDescription className="mt-1">{t('assets.depositAddressesDesc')}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{t('assets.allAssets')}</SelectItem>
                        <SelectItem value="btc">BTC</SelectItem>
                        <SelectItem value="eth">ETH</SelectItem>
                        <SelectItem value="usdt">USDT</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      {t('assets.generateAddress')}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('assets.label')}</TableHead>
                      <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('assets.address')}</TableHead>
                      <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('assets.asset')}</TableHead>
                      <TableHead className="font-semibold text-xs uppercase tracking-wider text-right">{t('assets.balance')}</TableHead>
                      <TableHead className="font-semibold text-xs uppercase tracking-wider text-right">{t('assets.transactions')}</TableHead>
                      <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('assets.lastActivity')}</TableHead>
                      <TableHead className="text-right font-semibold text-xs uppercase tracking-wider">{t('assets.action')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {depositAddresses.map((addr) => (
                      <TableRow key={addr.id} className="hover:bg-primary/15 transition-colors rounded-xl">
                        <TableCell className="font-semibold">{addr.label}</TableCell>
                        <TableCell className="font-mono text-xs">
                          <div className="flex items-center gap-2">
                            {addr.address.substring(0, 12)}...{addr.address.substring(addr.address.length - 6)}
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="rounded-full border-border/40 bg-muted/30 font-medium">
                            {addr.asset}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-mono">{addr.balance}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{addr.txCount}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{addr.lastActivity}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            {t('action.view')}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
