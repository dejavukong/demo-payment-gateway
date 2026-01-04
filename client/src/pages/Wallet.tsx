import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ExternalLink, Send, QrCode, History, Wallet2, TrendingUp, Shield, Filter, Download } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const wallets = [
  {
    id: 1,
    coin: "Bitcoin",
    symbol: "BTC",
    network: "Bitcoin",
    balance: "1.24500000",
    usdValue: "$82,145.20",
    addresses: 15,
    type: "hot",
    icon: "₿"
  },
  {
    id: 2,
    coin: "Ethereum",
    symbol: "ETH",
    network: "Ethereum",
    balance: "15.40000000",
    usdValue: "$48,230.10",
    addresses: 28,
    type: "hot",
    icon: "Ξ"
  },
  {
    id: 3,
    coin: "Tether",
    symbol: "USDT",
    network: "TRON",
    balance: "25,400.00",
    usdValue: "$25,400.00",
    addresses: 42,
    type: "hot",
    icon: "₮"
  },
  {
    id: 4,
    coin: "USD Coin",
    symbol: "USDC",
    network: "Ethereum",
    balance: "12,100.00",
    usdValue: "$12,100.00",
    addresses: 18,
    type: "cold",
    icon: "$"
  }
];

const depositAddresses = [
  { id: 1, address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", label: "Main Hot Wallet", type: "hot", coin: "BTC", balance: "0.5 BTC", createdAt: "2024-01-15" },
  { id: 2, address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", label: "Primary ETH", type: "hot", coin: "ETH", balance: "8.2 ETH", createdAt: "2024-01-10" },
  { id: 3, address: "TJDENsfBJs4RFETt1X1W8wMDc8M5XnJhCe", label: "USDT Collection", type: "hot", coin: "USDT", balance: "15,200 USDT", createdAt: "2024-01-05" },
  { id: 4, address: "bc1q7cyrfmck2ffu2ud3rn5l5a8yv6f0chkp0zpemf", label: "Cold Storage", type: "cold", coin: "BTC", balance: "0.745 BTC", createdAt: "2023-12-20" },
];

const transactions = [
  { id: 1, type: "deposit", coin: "BTC", amount: "+0.05", usd: "+$3,250", from: "External", to: "Hot Wallet", time: "2024-03-15 14:30", txHash: "0x3a...1b2c", status: "Completed" },
  { id: 2, type: "transfer", coin: "ETH", amount: "-2.0", usd: "-$6,240", from: "Hot Wallet", to: "Cold Storage", time: "2024-03-15 10:15", txHash: "0x5f...3d4e", status: "Completed" },
  { id: 3, type: "withdrawal", coin: "USDT", amount: "-5,000", usd: "-$5,000", from: "Hot Wallet", to: "External", time: "2024-03-14 18:45", txHash: "0x8b...6a7c", status: "Processing" },
  { id: 4, type: "deposit", coin: "USDC", amount: "+1,500", usd: "+$1,500", from: "External", to: "Hot Wallet", time: "2024-03-14 09:20", txHash: "0x2c...9f1a", status: "Completed" },
];

export default function Wallet() {
  const [selectedWallet, setSelectedWallet] = useState<typeof wallets[0] | null>(null);
  const [showDepositDialog, setShowDepositDialog] = useState(false);
  const [showTransferDialog, setShowTransferDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const { t } = useLanguage();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
              <Wallet2 className="w-8 h-8" />
              Wallet Management
            </h1>
            <p className="text-muted-foreground mt-2">Manage your multi-currency wallets and addresses</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 font-medium">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
            <Button className="gap-2 font-medium shadow-lg shadow-primary/20">
              <Send className="w-4 h-4" />
              New Transfer
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-panel border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Balance (USD)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">$167,875.30</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                <span className="text-green-600 font-medium">+12.5%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card className="glass-panel border-l-4 border-l-cyan-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hot Wallets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">$155,775.30</div>
              <p className="text-xs text-muted-foreground mt-1">73 active addresses</p>
            </CardContent>
          </Card>
          <Card className="glass-panel border-l-4 border-l-purple-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Cold Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">$12,100.00</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Shield className="w-3 h-3 text-purple-600" />
                Secure offline storage
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-panel">
            <TabsTrigger value="overview">Wallets</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>

          {/* Wallets Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="glass-panel overflow-hidden">
              <CardHeader className="border-b border-border/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Asset Wallets</CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px] bg-background/50">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Wallets</SelectItem>
                        <SelectItem value="hot">Hot Wallets</SelectItem>
                        <SelectItem value="cold">Cold Storage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">Asset</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">Network</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-right">Balance</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-center">Type</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-center">Addresses</TableHead>
                    <TableHead className="text-right font-semibold text-xs uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wallets.map((wallet) => (
                    <TableRow key={wallet.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-lg">
                            {wallet.icon}
                          </div>
                          <div>
                            <div className="font-semibold">{wallet.coin}</div>
                            <div className="text-xs text-muted-foreground">{wallet.symbol}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full border-border/40 bg-muted/30 font-medium">
                          {wallet.network}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="font-semibold font-mono">{wallet.balance}</div>
                        <div className="text-xs text-muted-foreground">{wallet.usdValue}</div>
                      </TableCell>
                      <TableCell className="text-center">
                        {wallet.type === "hot" ? (
                          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full font-bold">
                            Hot
                          </Badge>
                        ) : (
                          <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full font-bold">
                            Cold
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center font-mono text-sm">{wallet.addresses}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 font-medium"
                            onClick={() => {
                              setSelectedWallet(wallet);
                              setShowDepositDialog(true);
                            }}
                          >
                            Deposit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 font-medium"
                            onClick={() => {
                              setSelectedWallet(wallet);
                              setShowTransferDialog(true);
                            }}
                          >
                            Transfer
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-6">
            <Card className="glass-panel overflow-hidden">
              <CardHeader className="border-b border-border/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold">Deposit Addresses</CardTitle>
                  <Button className="gap-2 font-medium">
                    Generate New Address
                  </Button>
                </div>
              </CardHeader>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">Label</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">Address</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">Coin</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-right">Balance</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-center">Type</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">Created</TableHead>
                    <TableHead className="text-right font-semibold text-xs uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {depositAddresses.map((addr) => (
                    <TableRow key={addr.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{addr.label}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground max-w-xs truncate">
                        {addr.address}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full font-medium">
                          {addr.coin}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm">{addr.balance}</TableCell>
                      <TableCell className="text-center">
                        {addr.type === "hot" ? (
                          <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full font-bold text-xs">
                            Hot
                          </Badge>
                        ) : (
                          <Badge className="bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-full font-bold text-xs">
                            Cold
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{addr.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => copyToClipboard(addr.address)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <QrCode className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Transaction History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card className="glass-panel overflow-hidden">
              <CardHeader className="border-b border-border/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <History className="w-5 h-5" />
                    Transaction History
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px] bg-background/50">
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="deposit">Deposits</SelectItem>
                        <SelectItem value="withdrawal">Withdrawals</SelectItem>
                        <SelectItem value="transfer">Transfers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">Type</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">Coin</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-right">Amount</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">From → To</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">Time</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-center">Status</TableHead>
                    <TableHead className="text-right font-semibold text-xs uppercase tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`rounded-full font-bold ${
                            tx.type === 'deposit' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                            tx.type === 'withdrawal' ? 'bg-red-500/10 text-red-600 dark:text-red-400' :
                            'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full font-medium">
                          {tx.coin}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={`font-mono font-bold ${tx.amount.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                          {tx.amount}
                        </div>
                        <div className="text-xs text-muted-foreground">{tx.usd}</div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="flex items-center gap-1">
                          <span className="text-muted-foreground">{tx.from}</span>
                          <span>→</span>
                          <span className="font-medium">{tx.to}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{tx.time}</TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={`rounded-full font-bold ${
                            tx.status === 'Completed' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                            'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => copyToClipboard(tx.txHash)}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Deposit Dialog */}
        <Dialog open={showDepositDialog} onOpenChange={setShowDepositDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Deposit {selectedWallet?.coin}
              </DialogTitle>
              <DialogDescription>
                Send {selectedWallet?.symbol} to the address below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-center p-8 bg-muted/50 rounded-2xl">
                <div className="text-center space-y-4">
                  <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">Scan QR code to deposit</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Deposit Address</label>
                <div className="flex gap-2">
                  <Input
                    value="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
                    readOnly
                    className="font-mono text-sm bg-background/50"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard("bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  ⚠️ Only send {selectedWallet?.symbol} to this address. Sending other coins may result in permanent loss.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Transfer Dialog */}
        <Dialog open={showTransferDialog} onOpenChange={setShowTransferDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Transfer {selectedWallet?.coin}
              </DialogTitle>
              <DialogDescription>
                Transfer between your wallets
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From Wallet</label>
                <Select>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select source wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hot1">Hot Wallet 1 (15.4 ETH)</SelectItem>
                    <SelectItem value="hot2">Hot Wallet 2 (8.2 ETH)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To Wallet</label>
                <Select>
                  <SelectTrigger className="bg-background/50">
                    <SelectValue placeholder="Select destination wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cold1">Cold Storage 1</SelectItem>
                    <SelectItem value="cold2">Cold Storage 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <div className="relative">
                  <Input
                    placeholder="0.00"
                    className="bg-background/50 font-mono pr-20"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 text-xs font-bold text-primary"
                  >
                    MAX
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Available: {selectedWallet?.balance} {selectedWallet?.symbol}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span className="font-mono">0.0001 {selectedWallet?.symbol}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span>Total</span>
                  <span className="font-mono">0.0001 {selectedWallet?.symbol}</span>
                </div>
              </div>
              <Button className="w-full h-12 font-bold text-lg shadow-lg shadow-primary/20">
                Confirm Transfer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
