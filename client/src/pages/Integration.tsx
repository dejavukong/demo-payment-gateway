import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Copy, Eye, Key, Plus, RefreshCw, Terminal, Webhook, Code2, Download, Package, BookOpen, ExternalLink, Plug, Monitor, QrCode, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";

export default function Integration() {
  const [showSecret, setShowSecret] = useState(false);
  const [buttonConfig, setButtonConfig] = useState({
    amount: "100.00",
    token: "USDC",
    network: "Ethereum",
    item: "Premium Subscription",
    buttonColor: "#C9F25A",
    textColor: "#000000"
  });
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'confirming' | 'completed'>('pending');
  const [timeRemaining, setTimeRemaining] = useState(1200); // 20 minutes in seconds
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const { t } = useLanguage();

  // Countdown timer effect
  useEffect(() => {
    if (paymentStatus === 'pending' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [paymentStatus, timeRemaining]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success(t('action.copied'));
  };

  const generateButtonCode = () => {
    return `<a href="https://paygate.io/pay?amt=${buttonConfig.amount}&token=${buttonConfig.token}&network=${buttonConfig.network}&item=${encodeURIComponent(buttonConfig.item)}"
   class="paygate-button"
   data-merchant="MERCHANT_ID"
   style="background-color: ${buttonConfig.buttonColor}; color: ${buttonConfig.textColor}; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; display: inline-block;">
  ${t('integration.payWithCrypto')}
</a>
<script src="https://paygate.io/sdk.js"></script>`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('integration.title')}</h1>
            <p className="text-muted-foreground mt-2">{t('integration.subtitle')}</p>
          </div>
          <Button variant="outline" className="gap-2 font-medium">
            <Terminal className="w-4 h-4" />
            {t('integration.apiDocs')}
          </Button>
        </div>

        <Tabs defaultValue="api" className="w-full">
          <TabsList className="w-full justify-start bg-transparent p-1 h-auto gap-2 flex-wrap">
            <TabsTrigger value="api" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all border-none">
              {t('integration.apiKeys')}
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all border-none">
              {t('integration.webhooks')}
            </TabsTrigger>
            <TabsTrigger value="buttons" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all border-none">
              {t('integration.paymentButtons')}
            </TabsTrigger>
            <TabsTrigger value="plugins" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all border-none">
              <Plug className="w-4 h-4 mr-2" /> Plugins
            </TabsTrigger>
            <TabsTrigger value="sdks" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all border-none">
              <Package className="w-4 h-4 mr-2" /> SDKs
            </TabsTrigger>
            <TabsTrigger value="docs" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all border-none">
              <BookOpen className="w-4 h-4 mr-2" /> API Docs
            </TabsTrigger>
          </TabsList>

          {/* API Keys Tab */}
          <TabsContent value="api" className="mt-6 space-y-6">
            {/* Security Alert */}
            <div className="flex gap-4 p-4 rounded-xl border border-orange-500/30 bg-orange-500/10">
              <div className="bg-orange-500/20 shrink-0 size-10 flex items-center justify-center rounded-full text-orange-500">
                <Key className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-bold">Security Alert</p>
                  <span className="bg-orange-500/20 text-orange-400 text-xs px-2 py-0.5 rounded font-medium">Important</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Never share your Secret Key. Keep it safe and secure. We will never ask for your private keys via email or support chats.
                </p>
              </div>
            </div>

            {/* API Credentials Table */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[22px] font-bold">API Credentials</h3>
                <Button className="gap-2 shadow-lg shadow-primary/20">
                  <Plus className="h-5 w-5" />
                  Generate New Key
                </Button>
              </div>
              <Card className="glass-panel overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="font-bold">Key Name</TableHead>
                      <TableHead className="font-bold">Key Prefix</TableHead>
                      <TableHead className="font-bold">Created</TableHead>
                      <TableHead className="font-bold">Scope</TableHead>
                      <TableHead className="text-right font-bold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="font-medium">Production Key</TableCell>
                      <TableCell className="font-mono text-muted-foreground text-sm">pk_live_...4a91</TableCell>
                      <TableCell className="text-muted-foreground text-sm">Oct 12, 2023</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase">
                          Read/Write
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard("pk_live_...4a91")}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-muted/30">
                      <TableCell className="font-medium">Test Key</TableCell>
                      <TableCell className="font-mono text-muted-foreground text-sm">pk_test_...8b22</TableCell>
                      <TableCell className="text-muted-foreground text-sm">Oct 10, 2023</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase">
                          Read Only
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => copyToClipboard("pk_test_...8b22")}>
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Card>
            </div>

            {/* IP Whitelisting & Webhooks Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* IP Whitelisting */}
              <div className="space-y-4">
                <h3 className="text-[20px] font-bold px-2">IP Whitelisting</h3>
                <Card className="glass-panel">
                  <CardContent className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <p className="text-sm font-bold">Enforce IP Whitelisting</p>
                        <p className="text-xs text-muted-foreground">Only allow requests from trusted IPs</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <hr className="border-border" />
                    <div className="flex gap-2">
                      <Input
                        className="flex-1 font-mono bg-background/50"
                        placeholder="Enter IP address (e.g. 192.168.1.1)"
                      />
                      <Button>Add</Button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Active IPs</p>
                      <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-2 bg-muted/30 border border-border rounded-lg pl-3 pr-2 py-1.5">
                          <span className="text-sm font-mono">203.0.113.42</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-destructive">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2 bg-muted/30 border border-border rounded-lg pl-3 pr-2 py-1.5">
                          <span className="text-sm font-mono">198.51.100.12</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 hover:text-destructive">
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Webhooks */}
              <div className="space-y-4">
                <h3 className="text-[20px] font-bold px-2">Webhooks</h3>
                <Card className="glass-panel">
                  <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold">Endpoint URL</Label>
                      <Input
                        className="font-mono bg-background/50"
                        defaultValue="https://api.merchant.com/webhooks/crypto"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold">Signing Secret</Label>
                      <div className="flex items-center gap-2 bg-background/50 border border-border rounded-lg px-4 py-2.5">
                        <Input
                          className="bg-transparent border-none p-0 text-sm text-muted-foreground font-mono focus-visible:ring-0 focus-visible:ring-offset-0"
                          readOnly
                          type={showSecret ? "text" : "password"}
                          defaultValue="whsec_klj234klj234klj234"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:underline whitespace-nowrap h-auto p-0"
                          onClick={() => setShowSecret(!showSecret)}
                        >
                          {showSecret ? "Hide" : "Reveal"}
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm font-bold">Event Subscriptions</p>
                      <div className="grid grid-cols-2 gap-3">
                        {['payment.success', 'payment.failed', 'payout.processed', 'refund.completed'].map((event) => (
                          <div key={event} className="flex items-center gap-2">
                            <Switch defaultChecked={event !== 'payment.failed'} />
                            <Label className="text-sm text-muted-foreground cursor-pointer">{event}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 flex gap-3">
                      <Button variant="outline" className="flex-1">Test Event</Button>
                      <Button className="flex-1 shadow-lg shadow-primary/20">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Webhook Deliveries */}
            <div className="space-y-4 pb-10">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-[20px] font-bold">Webhook Deliveries</h3>
                <Button variant="link" className="text-primary hover:underline">View All Logs</Button>
              </div>
              <Card className="glass-panel overflow-hidden">
                <div className="divide-y divide-border">
                  {/* Log Item */}
                  <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold font-mono">payment.success</p>
                        <p className="text-xs text-muted-foreground">ID: evt_1O42jL...</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold font-mono">200 OK</span>
                      <p className="text-xs text-muted-foreground w-20 text-right">Just now</p>
                      <Copy className="h-5 w-5 text-muted-foreground cursor-pointer" />
                    </div>
                  </div>
                  {/* Log Item */}
                  <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="size-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold font-mono">payout.failed</p>
                        <p className="text-xs text-muted-foreground">ID: evt_1O42iK...</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold font-mono">500 ERR</span>
                      <p className="text-xs text-muted-foreground w-20 text-right">2m ago</p>
                      <Copy className="h-5 w-5 text-muted-foreground cursor-pointer" />
                    </div>
                  </div>
                  {/* Log Item */}
                  <div className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold font-mono">payment.success</p>
                        <p className="text-xs text-muted-foreground">ID: evt_1O42hJ...</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold font-mono">200 OK</span>
                      <p className="text-xs text-muted-foreground w-20 text-right">15m ago</p>
                      <Copy className="h-5 w-5 text-muted-foreground cursor-pointer" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Webhook className="h-5 w-5 text-cyan-600" /> {t('integration.webhookConfig')}
                </CardTitle>
                <CardDescription>{t('integration.webhookDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background/30">
                  <div className="space-y-1">
                    <Label className="font-medium">{t('integration.endpointUrl')}</Label>
                    <div className="text-sm font-mono text-muted-foreground">https://api.yourdomain.com/webhooks/paygate</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">{t('status.active').toUpperCase()}</span>
                    <Switch checked={true} />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="font-medium">{t('integration.events')}</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {['payment.created', 'payment.succeeded', 'payment.failed', 'payout.completed'].map((event) => (
                      <div key={event} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/30">
                        <Label htmlFor={event} className="font-mono cursor-pointer text-sm">{event}</Label>
                        <Switch id={event} checked={true} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button className="gap-2 shadow-lg shadow-primary/20">
                    <Plus className="h-4 w-4" /> {t('integration.addEndpoint')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Buttons Tab */}
          <TabsContent value="buttons" className="mt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{t('integration.buttonConfig')}</CardTitle>
                  <CardDescription>{t('integration.buttonDesc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>{t('integration.itemName')}</Label>
                    <Input
                      value={buttonConfig.item}
                      onChange={(e) => setButtonConfig({...buttonConfig, item: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('orders.amount')}</Label>
                    <Input
                      value={buttonConfig.amount}
                      onChange={(e) => setButtonConfig({...buttonConfig, amount: e.target.value})}
                      className="bg-background/50"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>{t('integration.token')}</Label>
                      <Select
                        value={buttonConfig.token}
                        onValueChange={(v) => setButtonConfig({...buttonConfig, token: v})}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USDC">USDC</SelectItem>
                          <SelectItem value="USDT">USDT</SelectItem>
                          <SelectItem value="ETH">ETH</SelectItem>
                          <SelectItem value="BTC">BTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>{t('integration.network')}</Label>
                      <Select
                        value={buttonConfig.network}
                        onValueChange={(v) => setButtonConfig({...buttonConfig, network: v})}
                      >
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ethereum">Ethereum</SelectItem>
                          <SelectItem value="Polygon">Polygon</SelectItem>
                          <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                          <SelectItem value="Optimism">Optimism</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Button Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={buttonConfig.buttonColor}
                          onChange={(e) => setButtonConfig({...buttonConfig, buttonColor: e.target.value})}
                          className="w-16 h-10 p-1 bg-background/50"
                        />
                        <Input
                          value={buttonConfig.buttonColor}
                          onChange={(e) => setButtonConfig({...buttonConfig, buttonColor: e.target.value})}
                          className="flex-1 font-mono bg-background/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Text Color</Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={buttonConfig.textColor}
                          onChange={(e) => setButtonConfig({...buttonConfig, textColor: e.target.value})}
                          className="w-16 h-10 p-1 bg-background/50"
                        />
                        <Input
                          value={buttonConfig.textColor}
                          onChange={(e) => setButtonConfig({...buttonConfig, textColor: e.target.value})}
                          className="flex-1 font-mono bg-background/50"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 text-white border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Code2 className="h-5 w-5" /> {t('integration.generatedCode')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-black/50 p-4 rounded-lg border border-white/10 font-mono text-xs overflow-x-auto">
                    <pre>{generateButtonCode()}</pre>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-slate-400">{t('integration.preview')}:</div>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="gap-2"
                      onClick={() => copyToClipboard(generateButtonCode())}
                    >
                      <Copy className="h-4 w-4" /> {t('integration.copyCode')}
                    </Button>
                  </div>
                  <div className="p-6 rounded-lg bg-white/5 border border-white/10 flex justify-center items-center">
                    <button
                      className="px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg hover:scale-105"
                      style={{
                        backgroundColor: buttonConfig.buttonColor,
                        color: buttonConfig.textColor,
                      }}
                      onClick={() => setPaymentDialogOpen(true)}
                    >
                      {t('integration.payWithCrypto')}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Plugins Tab */}
          <TabsContent value="plugins" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Plug className="h-5 w-5 text-primary" /> E-commerce Platform Plugins
                </CardTitle>
                <CardDescription>Official plugins for popular e-commerce platforms</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "WooCommerce", platform: "WordPress", version: "v2.4.1", downloads: "15.2K", icon: "🛒", desc: "Accept crypto payments in your WooCommerce store" },
                  { name: "Shopify", platform: "Shopify", version: "v1.8.0", downloads: "12.8K", icon: "🛍️", desc: "Seamless crypto checkout for Shopify merchants" },
                  { name: "Magento 2", platform: "Adobe Commerce", version: "v3.1.2", downloads: "8.5K", icon: "🏪", desc: "Enterprise-grade crypto payment for Magento" },
                  { name: "PrestaShop", platform: "PrestaShop", version: "v1.6.3", downloads: "5.2K", icon: "🏬", desc: "Cryptocurrency module for PrestaShop stores" },
                  { name: "OpenCart", platform: "OpenCart", version: "v2.0.1", downloads: "3.7K", icon: "🛒", desc: "Crypto payment extension for OpenCart" },
                  { name: "BigCommerce", platform: "BigCommerce", version: "v1.4.0", downloads: "4.1K", icon: "💼", desc: "Accept crypto on BigCommerce platform" },
                ].map((plugin) => (
                  <Card key={plugin.name} className="bg-muted/30 border-border/50 hover:bg-muted/50 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{plugin.icon}</div>
                          <div>
                            <CardTitle className="text-base font-bold">{plugin.name}</CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">{plugin.platform}</p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{plugin.desc}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{plugin.version}</span>
                        <span>{plugin.downloads} downloads</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Download className="w-3 h-3 mr-1" /> Download
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <BookOpen className="w-3 h-3 mr-1" /> Docs
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-panel bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-6 flex gap-3">
                <div className="bg-blue-500/20 shrink-0 size-10 flex items-center justify-center rounded-full text-blue-500">
                  <Code2 className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400">Need a Custom Integration?</h4>
                  <p className="text-xs text-muted-foreground">
                    Our team can help you build custom integrations for your platform. Contact our developer support team for assistance.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Contact Developer Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SDKs Tab */}
          <TabsContent value="sdks" className="mt-6 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" /> Official SDKs & Libraries
                </CardTitle>
                <CardDescription>Download SDKs for your preferred programming language</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Node.js SDK", lang: "JavaScript/TypeScript", version: "v4.2.1", package: "npm install @paygate/node-sdk", icon: "📦", desc: "Official Node.js SDK with TypeScript support", downloads: "125K/week" },
                  { name: "Python SDK", lang: "Python", version: "v3.8.0", package: "pip install paygate-python", icon: "🐍", desc: "Python SDK compatible with Python 3.7+", downloads: "82K/week" },
                  { name: "PHP SDK", lang: "PHP", version: "v2.5.3", package: "composer require paygate/php-sdk", icon: "🐘", desc: "PHP SDK for Laravel, Symfony, and vanilla PHP", downloads: "45K/week" },
                  { name: "Ruby SDK", lang: "Ruby", version: "v1.9.2", package: "gem install paygate-ruby", icon: "💎", desc: "Ruby SDK for Rails and Sinatra applications", downloads: "28K/week" },
                  { name: "Java SDK", lang: "Java", version: "v2.1.0", package: "com.paygate:paygate-java:2.1.0", icon: "☕", desc: "Java SDK for Spring Boot and Java 11+", downloads: "35K/week" },
                  { name: "Go SDK", lang: "Go", version: "v1.4.5", package: "go get github.com/paygate/go-sdk", icon: "🔷", desc: "Lightweight Go SDK with zero dependencies", downloads: "22K/week" },
                ].map((sdk) => (
                  <div key={sdk.name} className="p-6 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{sdk.icon}</span>
                          <div>
                            <h4 className="font-bold">{sdk.name}</h4>
                            <p className="text-xs text-muted-foreground">{sdk.lang}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{sdk.desc}</p>
                        <div className="flex items-center gap-6 text-xs text-muted-foreground mb-4">
                          <span className="font-mono">{sdk.version}</span>
                          <span>{sdk.downloads}</span>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50 border border-border/50 font-mono text-xs mb-3">
                          {sdk.package}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="w-3 h-3 mr-1" /> Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <BookOpen className="w-3 h-3 mr-1" /> Documentation
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-3 h-3 mr-1" /> GitHub
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Docs Tab */}
          <TabsContent value="docs" className="mt-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <Card className="glass-panel lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Quick Navigation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {[
                    { title: "Getting Started", href: "#" },
                    { title: "Authentication", href: "#" },
                    { title: "Payments API", href: "#" },
                    { title: "Webhooks", href: "#" },
                    { title: "Errors & Codes", href: "#" },
                    { title: "Rate Limits", href: "#" },
                    { title: "Testing", href: "#" },
                  ].map((item) => (
                    <a
                      key={item.title}
                      href={item.href}
                      className="block px-3 py-2 text-sm rounded-lg hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {item.title}
                    </a>
                  ))}
                </CardContent>
              </Card>

              {/* Main Documentation */}
              <div className="lg:col-span-3 space-y-6">
                {/* Getting Started */}
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-primary" /> Getting Started
                    </CardTitle>
                    <CardDescription>Learn how to integrate our payment API in minutes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-bold mb-2">1. Get Your API Keys</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Navigate to the API Keys tab to generate your production and test keys.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">2. Install SDK (Optional)</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Choose your preferred programming language from the SDKs tab.
                      </p>
                      <div className="p-4 rounded-lg bg-background/50 border border-border/50">
                        <code className="text-xs font-mono">npm install @paygate/node-sdk</code>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">3. Create Your First Payment</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Use our REST API to create a payment request:
                      </p>
                      <div className="p-4 rounded-lg bg-background/50 border border-border/50 space-y-2">
                        <code className="text-xs font-mono block">
                          POST https://api.paygate.io/v1/payments
                        </code>
                        <code className="text-xs font-mono block text-muted-foreground">
                          {JSON.stringify({
                            amount: "100.00",
                            currency: "USDC",
                            network: "Ethereum",
                            description: "Premium Subscription"
                          }, null, 2)}
                        </code>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* API Endpoints */}
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Core API Endpoints</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { method: "POST", endpoint: "/v1/payments", desc: "Create a new payment" },
                      { method: "GET", endpoint: "/v1/payments/:id", desc: "Retrieve payment details" },
                      { method: "GET", endpoint: "/v1/payments", desc: "List all payments" },
                      { method: "POST", endpoint: "/v1/refunds", desc: "Create a refund" },
                      { method: "GET", endpoint: "/v1/balances", desc: "Get account balances" },
                      { method: "POST", endpoint: "/v1/withdrawals", desc: "Create a withdrawal" },
                    ].map((endpoint) => (
                      <div key={endpoint.endpoint} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            endpoint.method === 'POST' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                            'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          }`}>
                            {endpoint.method}
                          </span>
                          <code className="text-sm font-mono">{endpoint.endpoint}</code>
                        </div>
                        <p className="text-sm text-muted-foreground">{endpoint.desc}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Resources */}
                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="text-lg font-bold">Additional Resources</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "API Reference", desc: "Complete API documentation", icon: "📚" },
                      { title: "Code Examples", desc: "Sample code in multiple languages", icon: "💻" },
                      { title: "Postman Collection", desc: "Import our API collection", icon: "📮" },
                      { title: "Changelog", desc: "Latest updates and changes", icon: "📝" },
                    ].map((resource) => (
                      <div key={resource.title} className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{resource.icon}</span>
                          <h4 className="font-bold text-sm">{resource.title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{resource.desc}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="space-y-4 pb-4 border-b border-border/50">
            <div className="text-center">
              <h2 className="text-2xl font-bold">Merchant Name</h2>
              <p className="text-sm text-muted-foreground mt-1">#{`ORD-${Date.now().toString().slice(-8)}`}</p>
            </div>
          </DialogHeader>

          <div className="space-y-6 py-6">
            {/* Countdown Timer */}
            {paymentStatus === 'pending' && (
              <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl">
                <Clock className="w-5 h-5 text-orange-500" />
                <div className="text-center">
                  <div className="text-2xl font-bold font-mono text-orange-600 dark:text-orange-400">
                    {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                  </div>
                  <p className="text-xs text-muted-foreground">Address expires</p>
                </div>
              </div>
            )}

            {/* Payment Address & QR Code - Centered */}
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-border/30">
                <QrCode className="w-32 h-32 text-muted-foreground" />
              </div>
              <div className="w-full">
                <p className="text-xs text-muted-foreground text-center mb-2">Payment Address</p>
                <div className="flex items-center gap-2 p-3 bg-muted/30 border border-border/30 rounded-xl">
                  <span className="font-mono text-xs truncate flex-1 text-center">
                    0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                  </span>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 shrink-0"
                    onClick={() => copyToClipboard('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-muted/30 border border-border/30 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="text-sm font-bold">{buttonConfig.amount} {buttonConfig.token}</p>
              </div>
              <div className="text-center p-3 bg-muted/30 border border-border/30 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">Network</p>
                <p className="text-sm font-bold">{buttonConfig.network}</p>
              </div>
              <div className="text-center p-3 bg-muted/30 border border-border/30 rounded-xl">
                <p className="text-xs text-muted-foreground mb-1">Token</p>
                <p className="text-sm font-bold">{buttonConfig.token}</p>
              </div>
            </div>

            {/* Action Buttons & States */}
            {paymentStatus === 'pending' && (
              <Button
                className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20"
                onClick={() => {
                  setPaymentStatus('confirming');
                  setTimeout(() => setPaymentStatus('completed'), 2500);
                }}
              >
                Confirm Payment
              </Button>
            )}

            {paymentStatus === 'confirming' && (
              <div className="flex flex-col items-center gap-4 py-6">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="text-center">
                  <h3 className="text-lg font-bold mb-1">Confirming Transaction...</h3>
                  <p className="text-sm text-muted-foreground">Please wait</p>
                </div>
              </div>
            )}

            {paymentStatus === 'completed' && (
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1 text-green-600 dark:text-green-400">Payment Successful!</h3>
                  <p className="text-sm text-muted-foreground mb-4">Transaction confirmed</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setPaymentStatus('pending');
                      setTimeRemaining(1200);
                      setPaymentDialogOpen(false);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
