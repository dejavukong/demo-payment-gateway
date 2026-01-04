import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, CheckCircle2, Clock, Download, ExternalLink, Filter, Search, Wallet, AlertCircle, ArrowUpRight, ChevronLeft, BookmarkPlus, Edit, Trash2, Copy, Users, XCircle, Settings, TrendingUp, RotateCw, Calendar } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const withdrawals = [
  { id: "WTH-8821-001", date: "2024-03-15 10:00", amount: "2.5 ETH", address: "0x71...92A", status: "Completed", txHash: "0x3a...1b2c", network: "Ethereum", approvalStatus: "Approved" },
  { id: "WTH-8821-002", date: "2024-03-14 18:30", amount: "5,000 USDC", address: "0x8b...3c4d", status: "Failed", txHash: "-", network: "Polygon", approvalStatus: "Rejected", failureReason: "Insufficient gas" },
  { id: "WTH-8821-003", date: "2024-03-13 09:15", amount: "0.15 BTC", address: "bc1q...5xyz", status: "Completed", txHash: "a1b2...c3d4", network: "Bitcoin", approvalStatus: "Approved" },
  { id: "WTH-8821-006", date: "2024-03-12 16:45", amount: "1,200 USDT", address: "0x5f...7e8", status: "Completed", txHash: "0xab...cd9f", network: "Ethereum", approvalStatus: "Approved" },
];

const pendingWithdrawals = [
  { id: "WTH-8821-007", amount: "3.5 ETH", status: "under_review", submittedDate: "2024-03-16 14:30", estimatedCompletion: "2024-03-17 10:00", network: "Ethereum" },
  { id: "WTH-8821-008", amount: "8,000 USDC", status: "not_triggered", nextTriggerDate: "2024-03-18", triggerConditionKey: "minAmountCondition", triggerAmount: "$10,000", network: "Polygon" },
];

const savedAddresses = [
  { id: 1, label: "Main Exchange Wallet", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F", network: "Ethereum", verified: true, lastUsed: "2024-03-15" },
  { id: 2, label: "Cold Storage", address: "0x8b3c4d9e8a7f1b2c3d4e5f6a7b8c9d0e1f2a3b4c", network: "Ethereum", verified: true, lastUsed: "2024-03-10" },
  { id: 3, label: "Partner Wallet", address: "0x5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b", network: "Polygon", verified: false, lastUsed: "2024-03-08" },
  { id: 4, label: "BTC Cold Wallet", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", network: "Bitcoin", verified: true, lastUsed: "2024-03-05" },
];

const pendingApprovals = [
  { id: "WTH-8821-004", date: "2024-03-16 14:22", amount: "10 ETH", address: "0x5a...4b", requester: "John Doe", status: "Pending Level 1", level: 1 },
  { id: "WTH-8821-005", date: "2024-03-16 11:15", amount: "25,000 USDC", address: "0x9c...8d", requester: "Jane Smith", status: "Pending Level 2", level: 2 },
];

export default function Withdraw() {
  const [view, setView] = useState<'overview' | 'create' | 'details'>('overview');
  const [selectedTx, setSelectedTx] = useState<typeof withdrawals[0] | null>(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [isLimitSettingsOpen, setIsLimitSettingsOpen] = useState(false);
  const { t } = useLanguage();

  const handleViewDetails = (tx: typeof withdrawals[0]) => {
    setSelectedTx(tx);
    setView('details');
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 p-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              {view !== 'overview' && (
                <Button variant="ghost" size="icon" onClick={() => setView('overview')} className="mr-2">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              )}
              <h1 className="text-3xl font-bold tracking-tight text-primary">
                {view === 'overview' ? t('withdraw.title') : view === 'create' ? t('withdraw.newWithdrawal') : t('withdraw.transactionDetails')}
              </h1>
            </div>
            <p className="text-muted-foreground mt-2">
              {view === 'overview' ? t('withdraw.subtitle') : 
               view === 'create' ? t('withdraw.createSubtitle') : 
               `${t('withdraw.viewingDetails')} ${selectedTx?.id}`}
            </p>
          </div>
          {view === 'overview' && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setIsLimitSettingsOpen(true)} className="h-10 w-10">
                <Settings className="w-4 h-4" />
              </Button>
              <Button onClick={() => setView('create')} className="gap-2 font-medium shadow-lg shadow-primary/20">
                <Wallet className="w-4 h-4" />
                {t('withdraw.newWithdrawal')}
              </Button>
            </div>
          )}
        </div>

        {view === 'overview' && (
          <>
            {/* Balance Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="glass-panel border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('assets.totalBalance')} (USD)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">$70,630.00</div>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <span className="text-green-600 font-medium">+12.5%</span> {t('dashboard.fromLastMonth')}
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-panel border-l-4 border-l-cyan-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('withdraw.availableForWithdrawal')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">$68,200.00</div>
                  <p className="text-xs text-muted-foreground mt-1">2 {t('status.pending')} {t('dashboard.transactions')}</p>
                </CardContent>
              </Card>
              <Card className="glass-panel border-l-4 border-l-purple-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{t('withdraw.totalWithdrawn')} (30d)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">$145,200.00</div>
                  <p className="text-xs text-muted-foreground mt-1">45 {t('status.completed')} {t('dashboard.transactions')}</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for different sections */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full justify-start bg-transparent p-1 h-auto gap-2 flex-wrap">
                <TabsTrigger value="pending" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-2xl px-6 py-3">
                  <Clock className="w-4 h-4 mr-2" />
                  {t('withdraw.pendingWithdrawals')}
                  {pendingWithdrawals.length > 0 && (
                    <Badge className="ml-2 bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30 rounded-full">
                      {pendingWithdrawals.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="history" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-2xl px-6 py-3">
                  {t('withdraw.withdrawalHistory')}
                </TabsTrigger>
                <TabsTrigger value="addressbook" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-2xl px-6 py-3">
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  {t('withdraw.addressBook')}
                </TabsTrigger>
                <TabsTrigger value="approval" className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-2xl px-6 py-3">
                  <Users className="w-4 h-4 mr-2" />
                  {t('withdraw.approvalProcess')}
                  {pendingApprovals.length > 0 && (
                    <Badge className="ml-2 bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 rounded-full">
                      {pendingApprovals.length}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              {/* Pending Withdrawals Tab */}
              <TabsContent value="pending" className="mt-6 space-y-6">
                <Card className="glass-panel">
                  <CardHeader className="border-b border-border/50">
                    <CardTitle className="text-lg font-semibold">{t('withdraw.pendingWithdrawals')}</CardTitle>
                    <CardDescription>{t('withdraw.pendingAmount')}: $12,850.00</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {pendingWithdrawals.map((pending) => (
                      <div key={pending.id} className="p-4 rounded-xl bg-primary/15 border border-primary/30">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-mono font-bold text-lg">{pending.id}</h4>
                              <Badge className={`rounded-full ${
                                pending.status === 'under_review'
                                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                              }`}>
                                {pending.status === 'under_review' ? (
                                  <>
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {t('withdraw.underReview')}
                                  </>
                                ) : (
                                  <>
                                    <Clock className="w-3 h-3 mr-1" />
                                    {t('withdraw.notTriggered')}
                                  </>
                                )}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {pending.status === 'under_review' ? t('withdraw.riskControl') : t('withdraw.autoTrigger')}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-foreground">{pending.amount}</div>
                            <p className="text-xs text-muted-foreground">{pending.network}</p>
                          </div>
                        </div>

                        {pending.status === 'under_review' ? (
                          <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <span className="text-muted-foreground">
                                {t('withdraw.scheduledFor')}: <span className="font-semibold text-foreground">{pending.estimatedCompletion}</span>
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                            <div className="flex items-start gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5" />
                              <div>
                                <div className="font-semibold text-foreground mb-1">
                                  {t('withdraw.nextWithdrawal')}: {pending.nextTriggerDate}
                                </div>
                                <div className="text-muted-foreground text-xs">
                                  {t('withdraw.triggerCondition')}: {t(`withdraw.${pending.triggerConditionKey}`)} {pending.triggerAmount}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="mt-6">
                <Card className="glass-panel overflow-hidden rounded-2xl">
                  <CardHeader className="border-b border-border/50">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <CardTitle className="text-lg font-semibold">{t('dashboard.transactionHistory')}</CardTitle>
                      <div className="flex gap-2">
                        <div className="relative w-full md:w-64">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input placeholder={t('action.search')} className="pl-9 bg-background/50 h-9" />
                        </div>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Filter className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('orders.orderId')}</TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('orders.date')}</TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('orders.amount')}</TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('assets.chain')}</TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('withdraw.destination')}</TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('assets.status')}</TableHead>
                        <TableHead className="text-right font-semibold text-xs uppercase tracking-wider">{t('assets.action')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {withdrawals.map((tx) => (
                        <TableRow key={tx.id} className="hover:bg-primary/15 transition-colors cursor-pointer rounded-xl" onClick={() => handleViewDetails(tx)}>
                          <TableCell className="font-mono font-medium text-primary">{tx.id}</TableCell>
                          <TableCell className="text-muted-foreground text-sm">{tx.date}</TableCell>
                          <TableCell className="font-mono font-bold">{tx.amount}</TableCell>
                          <TableCell className="text-sm">{tx.network}</TableCell>
                          <TableCell className="font-mono text-xs text-muted-foreground">{tx.address}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              tx.status === 'Completed' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                              'bg-red-500/10 text-red-600 dark:text-red-400'
                            }`}>
                              {tx.status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                              {tx.status === 'Completed' ? t('status.completed') : t('status.failed')}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                              {tx.status === 'Failed' && (
                                <Button size="sm" variant="outline" className="gap-2 h-8 text-xs">
                                  <RotateCw className="w-3 h-3" />
                                  {t('withdraw.retry')}
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleViewDetails(tx)}>
                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              </TabsContent>

              {/* Address Book Tab */}
              <TabsContent value="addressbook" className="mt-6">
                <Card className="glass-panel overflow-hidden rounded-2xl">
                  <CardHeader className="border-b border-border/50">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-lg font-semibold">{t('withdraw.savedAddresses')}</CardTitle>
                        <CardDescription className="mt-1">{t('withdraw.manageAddresses')}</CardDescription>
                      </div>
                      <Button className="gap-2">
                        <BookmarkPlus className="w-4 h-4" />
                        {t('withdraw.addAddress')}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader className="bg-muted/50">
                        <TableRow>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('withdraw.label')}</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('withdraw.address')}</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('withdraw.network')}</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('assets.status')}</TableHead>
                          <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('withdraw.lastUsed')}</TableHead>
                          <TableHead className="text-right font-semibold text-xs uppercase tracking-wider">{t('withdraw.actions')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {savedAddresses.map((addr) => (
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
                            <TableCell>{addr.network}</TableCell>
                            <TableCell>
                              {addr.verified ? (
                                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30 rounded-full">
                                  <CheckCircle2 className="w-3 h-3 mr-1" /> {t('withdraw.verified')}
                                </Badge>
                              ) : (
                                <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 rounded-full">
                                  <AlertCircle className="w-3 h-3 mr-1" /> {t('withdraw.unverified')}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">{addr.lastUsed}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600 dark:text-red-400">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Approval Process Tab */}
              <TabsContent value="approval" className="mt-6 space-y-6">
                <Card className="glass-panel">
                  <CardHeader className="border-b border-border/50">
                    <CardTitle className="text-lg font-semibold">{t('withdraw.pendingApprovals')}</CardTitle>
                    <CardDescription>{t('withdraw.withdrawalsAwaitingApproval')}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    {pendingApprovals.map((approval) => (
                      <div key={approval.id} className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-mono font-bold text-lg">{approval.id}</h4>
                              <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 rounded-full">
                                {approval.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {t('withdraw.requestedBy')} <span className="font-semibold text-foreground">{approval.requester}</span> {t('withdraw.on')} {approval.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-primary">{approval.amount}</div>
                            <p className="text-xs text-muted-foreground font-mono">{approval.address}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            approval.level >= 1 ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-muted text-muted-foreground'
                          }`}>
                            1
                          </div>
                          <div className={`flex-1 h-1 rounded ${approval.level >= 2 ? 'bg-green-500' : 'bg-muted'}`}></div>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            approval.level >= 2 ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-muted text-muted-foreground'
                          }`}>
                            2
                          </div>
                          <div className={`flex-1 h-1 rounded ${approval.level >= 3 ? 'bg-green-500' : 'bg-muted'}`}></div>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                            approval.level >= 3 ? 'bg-green-500/20 text-green-600 dark:text-green-400' : 'bg-muted text-muted-foreground'
                          }`}>
                            3
                          </div>
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="gap-2 text-red-600 dark:text-red-400 hover:bg-red-500/10">
                            <XCircle className="w-4 h-4" /> {t('withdraw.reject')}
                          </Button>
                          <Button size="sm" className="gap-2">
                            <CheckCircle2 className="w-4 h-4" /> {t('withdraw.approve')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="glass-panel">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">{t('withdraw.approvalWorkflow')}</CardTitle>
                    <CardDescription>{t('withdraw.multiLevelApproval')}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                            1
                          </div>
                          <h5 className="font-semibold">{t('withdraw.level')} 1</h5>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t('withdraw.level1Desc')}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                            2
                          </div>
                          <h5 className="font-semibold">{t('withdraw.level')} 2</h5>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t('withdraw.level2Desc')}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">
                            3
                          </div>
                          <h5 className="font-semibold">{t('withdraw.level')} 3</h5>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {t('withdraw.level3Desc')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

            </Tabs>
          </>
        )}

        {view === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Withdrawal Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">{t('withdraw.transferDetails')}</CardTitle>
                  <CardDescription>{t('withdraw.enterDetails')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('withdraw.selectAsset')}</label>
                    <Select>
                      <SelectTrigger className="bg-background/50 h-12">
                        <SelectValue placeholder={t('withdraw.selectAsset')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                      <span>{t('assets.chain')}: Ethereum Mainnet</span>
                      <span>{t('withdraw.available')}: 14.52 ETH</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('withdraw.destinationAddress')}</label>
                    <Input placeholder="0x..." className="bg-background/50 font-mono h-12" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t('orders.amount')}</label>
                    <div className="relative">
                      <Input placeholder="0.00" className="bg-background/50 font-mono h-12 pr-16" />
                      <Button variant="ghost" size="sm" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 text-xs font-bold text-primary">
                        MAX
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">≈ $0.00 USD</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('withdraw.networkFee')}</span>
                      <span className="font-mono">0.0021 ETH</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold">
                      <span>{t('withdraw.totalDeduction')}</span>
                      <span className="font-mono">0.0021 ETH</span>
                    </div>
                  </div>

                  <Button className="w-full h-12 font-bold text-lg shadow-lg shadow-primary/20">
                    {t('withdraw.confirmWithdrawal')}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <Card className="bg-amber-500/5 border-amber-500/20">
                <CardContent className="p-6 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="font-bold text-amber-500 text-sm">{t('withdraw.securityNotice')}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t('withdraw.securityText')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {view === 'details' && selectedTx && (
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="glass-panel">
              <CardHeader className="border-b border-border/50 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2">
                      {selectedTx.amount}
                      <span className="text-muted-foreground font-normal text-base">{t('withdraw.sentTo')}</span>
                      <span className="font-mono text-base">{selectedTx.address}</span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{selectedTx.date}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                    selectedTx.status === 'Completed' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                    'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}>
                    {selectedTx.status === 'Completed' ? t('status.completed') : t('status.processing')}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('withdraw.transactionHash')}</label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">{selectedTx.txHash}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground cursor-pointer hover:text-primary" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('assets.chain')}</label>
                    <div className="font-medium">{selectedTx.network}</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('withdraw.networkFee')}</label>
                    <div className="font-mono text-sm">0.0015 ETH</div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('withdraw.confirmations')}</label>
                    <div className="font-mono text-sm">128 Blocks</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50 flex justify-end gap-3">
                  <Button variant="outline">{t('action.download')} {t('withdraw.receipt')}</Button>
                  <Button variant="outline">{t('action.view')} {t('withdraw.onExplorer')}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Withdrawal Limits Settings Dialog */}
        <Dialog open={isLimitSettingsOpen} onOpenChange={setIsLimitSettingsOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Settings className="w-5 h-5" />
                {t('withdraw.limitSettings')}
              </DialogTitle>
              <DialogDescription>
                {t('withdraw.manageLimits')}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Daily Limit */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold">{t('withdraw.dailyLimit')}</h4>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-bold text-primary text-lg">$18,500</span> / <span>$50,000</span>
                  </div>
                </div>
                <Progress value={37} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  $31,500 {t('withdraw.remaining')} {t('withdraw.today')} · {t('withdraw.resetsIn')} 8 hours
                </p>
              </div>

              {/* Weekly Limit */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold">{t('withdraw.weeklyLimit')}</h4>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-bold text-primary text-lg">$125,200</span> / <span>$250,000</span>
                  </div>
                </div>
                <Progress value={50} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  $124,800 {t('withdraw.remaining')} {t('withdraw.thisWeek')} · {t('withdraw.resetsOn')} Monday
                </p>
              </div>

              {/* Monthly Limit */}
              <div className="space-y-3">
                <div className="flex justify-between items-baseline">
                  <h4 className="font-semibold">{t('withdraw.monthlyLimit')}</h4>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-bold text-primary text-lg">$485,000</span> / <span>$1,000,000</span>
                  </div>
                </div>
                <Progress value={48.5} className="h-3" />
                <p className="text-xs text-muted-foreground">
                  $515,000 {t('withdraw.remaining')} {t('withdraw.thisMonth')} · {t('withdraw.resetsOn')} April 1st
                </p>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-sm mb-1">{t('withdraw.needHigherLimits')}</h5>
                      <p className="text-xs text-muted-foreground mb-3">
                        {t('withdraw.contactManager')}
                      </p>
                      <Button size="sm" variant="outline" className="gap-2">
                        <TrendingUp className="w-3 h-3" />
                        {t('withdraw.requestLimitIncrease')}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
