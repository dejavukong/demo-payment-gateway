import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, Download, Eye, FileText, Filter, Search, MoreHorizontal, Trash2, CheckCircle2, X, ChevronDown, ChevronUp, Calendar, DollarSign, Network } from "lucide-react";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";
import OrderDetailDialog from "@/components/OrderDetailDialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "ORD-8821-001", date: "2024-03-15 14:30", amount: "0.45 ETH", value: "$1,520.00", status: "Completed", type: "Payment", customer: "alice.eth" },
  { id: "ORD-8821-002", date: "2024-03-15 12:15", amount: "1,200 USDC", value: "$1,200.00", status: "Processing", type: "Payment", customer: "0x71...92A" },
  { id: "ORD-8821-003", date: "2024-03-14 09:45", amount: "0.05 BTC", value: "$3,450.00", status: "Completed", type: "Payment", customer: "bob.lens" },
  { id: "ORD-8821-004", date: "2024-03-13 16:20", amount: "500 USDT", value: "$500.00", status: "Failed", type: "Payment", customer: "Unknown" },
  { id: "ORD-8821-005", date: "2024-03-12 11:10", amount: "2.5 ETH", value: "$8,200.00", status: "Completed", type: "Payout", customer: "Vendor A" },
];

export default function Orders() {
  const [filter, setFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showStatusFlow, setShowStatusFlow] = useState(false);
  const { t } = useLanguage();

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [amountMin, setAmountMin] = useState("");
  const [amountMax, setAmountMax] = useState("");
  const [networkFilter, setNetworkFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("");
  const [currencyFilter, setCurrencyFilter] = useState("all");

  const handleViewOrder = (order: typeof orders[0]) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map(o => o.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId]);
    } else {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    }
  };

  const handleBatchExport = () => {
    console.log('Exporting orders:', selectedOrders);
    // Export logic here
  };

  const handleBatchComplete = () => {
    console.log('Marking as completed:', selectedOrders);
    // Batch complete logic here
  };

  const handleBatchDelete = () => {
    console.log('Deleting orders:', selectedOrders);
    // Batch delete logic here
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setTypeFilter("all");
    setDateFrom("");
    setDateTo("");
    setAmountMin("");
    setAmountMax("");
    setNetworkFilter("all");
    setCustomerFilter("");
    setCurrencyFilter("all");
  };

  // Filter orders based on all active filters
  const filteredOrders = orders.filter((order) => {
    // Search filter (ID, customer, amount)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.amount.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (statusFilter !== "all") {
      if (order.status.toLowerCase() !== statusFilter.toLowerCase()) return false;
    }

    // Type filter
    if (typeFilter !== "all") {
      if (order.type.toLowerCase() !== typeFilter.toLowerCase()) return false;
    }

    // Customer filter
    if (customerFilter) {
      const query = customerFilter.toLowerCase();
      if (!order.customer.toLowerCase().includes(query)) return false;
    }

    // Date range filter
    if (dateFrom || dateTo) {
      const orderDate = new Date(order.date);
      if (dateFrom && orderDate < new Date(dateFrom)) return false;
      if (dateTo && orderDate > new Date(dateTo + " 23:59:59")) return false;
    }

    // Amount range filter
    if (amountMin || amountMax) {
      // Extract numeric value from amount string (e.g., "0.45 ETH" -> 0.45)
      const numericAmount = parseFloat(order.amount.split(' ')[0].replace(',', ''));
      if (amountMin && numericAmount < parseFloat(amountMin)) return false;
      if (amountMax && numericAmount > parseFloat(amountMax)) return false;
    }

    // Currency filter
    if (currencyFilter !== "all") {
      const currency = order.amount.split(' ')[1]; // Extract currency from "0.45 ETH"
      if (currency.toLowerCase() !== currencyFilter.toLowerCase()) return false;
    }

    // Network filter - this would need actual network data in the order object
    // For now, we'll skip this as the sample data doesn't include network info
    // In a real implementation, you'd check: if (networkFilter !== "all") { ... }

    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 p-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-pixel">{t('orders.title')}</h1>
            <p className="text-muted-foreground mt-2">{t('orders.subtitle')}</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="gap-2 font-bold"
              onClick={() => setShowStatusFlow(!showStatusFlow)}
            >
              <Network className="w-4 h-4" />
              {t('orderFlow.statusFlow')}
            </Button>
            <Button variant="outline" className="gap-2 font-bold">
              <Download className="w-4 h-4" />
              {t('action.export')} {t('orders.csv')}
            </Button>
            <Button className="gap-2 font-bold shadow-lg shadow-primary/20">
              <FileText className="w-4 h-4" />
              {t('action.createInvoice')}
            </Button>
          </div>
        </div>

        {/* Status Flow Diagram */}
        {showStatusFlow && (
          <Card className="glass-panel">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold">{t('orderFlow.title')}</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowStatusFlow(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4 py-6">
                {/* Created */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center mb-3">
                    <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{t('orderFlow.created')}</h4>
                  <p className="text-xs text-muted-foreground text-center">{t('orderFlow.orderInitialized')}</p>
                </div>

                <div className="flex-shrink-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-yellow-500 relative">
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-yellow-500"></div>
                </div>

                {/* Payment Detected */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center mb-3">
                    <DollarSign className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{t('orderFlow.paymentDetected')}</h4>
                  <p className="text-xs text-muted-foreground text-center">{t('orderFlow.transactionFound')}</p>
                </div>

                <div className="flex-shrink-0 w-12 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 relative">
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-amber-500"></div>
                </div>

                {/* Confirming */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center mb-3 animate-pulse">
                    <Network className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{t('orderFlow.confirming')}</h4>
                  <p className="text-xs text-muted-foreground text-center">{t('orderFlow.awaitingConfirmations')}</p>
                </div>

                <div className="flex-shrink-0 w-12 h-0.5 bg-gradient-to-r from-amber-500 to-green-500 relative">
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-500"></div>
                </div>

                {/* Completed */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{t('orderFlow.completed')}</h4>
                  <p className="text-xs text-muted-foreground text-center">{t('orderFlow.orderFinalized')}</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/50">
                <h5 className="font-semibold text-sm mb-2">{t('orderFlow.failedState')}</h5>
                <p className="text-xs text-muted-foreground">{t('orderFlow.failedDescription')}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Batch Operations Toolbar */}
        {selectedOrders.length > 0 && (
          <Card className="glass-panel border-primary/50">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/20 text-primary border-primary/30 rounded-full font-bold">
                  {selectedOrders.length} {t('common.selected')}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrders([])}
                  className="gap-2"
                >
                  <X className="w-4 h-4" /> {t('common.clear')}
                </Button>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleBatchExport}
                >
                  <Download className="w-4 h-4" /> {t('common.exportSelected')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleBatchComplete}
                >
                  <CheckCircle2 className="w-4 h-4" /> {t('common.markComplete')}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 dark:text-red-400 hover:bg-red-500/10"
                  onClick={handleBatchDelete}
                >
                  <Trash2 className="w-4 h-4" /> {t('action.delete')}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="glass-panel">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t('action.search')}
                  className="pl-9 bg-background/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px] bg-background/50">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder={t('assets.status')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('orders.allStatus')}</SelectItem>
                    <SelectItem value="completed">{t('status.completed')}</SelectItem>
                    <SelectItem value="processing">{t('status.processing')}</SelectItem>
                    <SelectItem value="failed">{t('status.failed')}</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[150px] bg-background/50">
                    <SelectValue placeholder={t('orders.type')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('orders.allTypes')}</SelectItem>
                    <SelectItem value="payment">{t('orders.payment')}</SelectItem>
                    <SelectItem value="payout">{t('orders.payout')}</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="gap-2"
                >
                  <Filter className="w-4 h-4" />
                  {t('common.advancedFilters')}
                  {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="pt-4 border-t border-border/30 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {t('common.dateRange')}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="date"
                      className="bg-background/50 text-sm"
                      placeholder={t('common.from')}
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                    <Input
                      type="date"
                      className="bg-background/50 text-sm"
                      placeholder={t('common.to')}
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <DollarSign className="w-3 h-3 inline mr-1" />
                    {t('common.amountRange')}
                  </label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      className="bg-background/50 text-sm"
                      placeholder={t('common.min')}
                      value={amountMin}
                      onChange={(e) => setAmountMin(e.target.value)}
                    />
                    <Input
                      type="number"
                      className="bg-background/50 text-sm"
                      placeholder={t('common.max')}
                      value={amountMax}
                      onChange={(e) => setAmountMax(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Network className="w-3 h-3 inline mr-1" />
                    {t('createOrder.network')}
                  </label>
                  <Select value={networkFilter} onValueChange={setNetworkFilter}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder={t('common.allNetworks')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('common.allNetworks')}</SelectItem>
                      <SelectItem value="ethereum">{t('network.ethereum')}</SelectItem>
                      <SelectItem value="polygon">{t('network.polygon')}</SelectItem>
                      <SelectItem value="bsc">{t('network.bsc')}</SelectItem>
                      <SelectItem value="arbitrum">{t('network.arbitrum')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('orders.customer')}
                  </label>
                  <Input
                    className="bg-background/50"
                    placeholder={`${t('common.searchBy')} ${t('orders.customer').toLowerCase()}...`}
                    value={customerFilter}
                    onChange={(e) => setCustomerFilter(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {t('common.cryptocurrency')}
                  </label>
                  <Select value={currencyFilter} onValueChange={setCurrencyFilter}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder={t('common.allCurrencies')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('common.allCurrencies')}</SelectItem>
                      <SelectItem value="eth">ETH</SelectItem>
                      <SelectItem value="btc">BTC</SelectItem>
                      <SelectItem value="usdc">USDC</SelectItem>
                      <SelectItem value="usdt">USDT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end gap-2">
                  <Button variant="outline" className="flex-1" size="sm" onClick={handleClearFilters}>
                    {t('common.clearFilters')}
                  </Button>
                  <Button className="flex-1" size="sm" onClick={() => setShowAdvancedFilters(false)}>
                    {t('common.applyFilters')}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="glass overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={filteredOrders.length > 0 && selectedOrders.length === filteredOrders.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="font-bold font-pixel text-xs uppercase tracking-wider">{t('orders.orderId')}</TableHead>
                <TableHead className="font-bold font-pixel text-xs uppercase tracking-wider">{t('orders.date')}</TableHead>
                <TableHead className="font-bold font-pixel text-xs uppercase tracking-wider">{t('orders.customer')}</TableHead>
                <TableHead className="font-bold font-pixel text-xs uppercase tracking-wider">{t('orders.amount')}</TableHead>
                <TableHead className="font-bold font-pixel text-xs uppercase tracking-wider">{t('assets.value')}</TableHead>
                <TableHead className="font-bold font-pixel text-xs uppercase tracking-wider">{t('assets.status')}</TableHead>
                <TableHead className="text-right font-bold font-pixel text-xs uppercase tracking-wider">{t('assets.action')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-12 h-12 text-muted-foreground/50" />
                      <p className="text-lg font-semibold text-muted-foreground">{t('common.noResultsFound')}</p>
                      <p className="text-sm text-muted-foreground">{t('common.tryAdjusting')}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={handleClearFilters}
                      >
                        {t('common.clearFilters')}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <Checkbox
                        checked={selectedOrders.includes(order.id)}
                        onCheckedChange={(checked) => handleSelectOrder(order.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-mono font-medium text-primary">{order.id}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{order.date}</TableCell>
                    <TableCell className="font-medium">{order.customer}</TableCell>
                    <TableCell className="font-mono">{order.amount}</TableCell>
                    <TableCell className="font-mono text-muted-foreground">{order.value}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        order.status === 'Completed' ? 'bg-green-500/10 text-green-600 dark:text-green-400' :
                        order.status === 'Processing' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' :
                        'bg-red-500/10 text-red-600 dark:text-red-400'
                      }`}>
                        {order.status === 'Completed' ? t('status.completed') :
                         order.status === 'Processing' ? t('status.processing') :
                         t('status.failed')}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="glass-panel">
                          <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => handleViewOrder(order)}>
                            <Eye className="w-4 h-4" /> {t('action.view')}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <FileText className="w-4 h-4" /> {t('action.download')} {t('orders.invoice')}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 cursor-pointer">
                            <ArrowUpRight className="w-4 h-4" /> {t('action.view')} {t('orders.onExplorer')}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <OrderDetailDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          order={selectedOrder}
        />
      )}
    </DashboardLayout>
  );
}
