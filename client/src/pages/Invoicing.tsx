import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus, Copy, Send, Download, Eye, Calendar, DollarSign, Clock, CheckCircle2, XCircle, Filter, Search, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const invoices = [
  { id: "INV-2024-001", customer: "Acme Corp", email: "billing@acme.com", amount: "1,500 USDC", usd: "$1,500.00", status: "Paid", dueDate: "2024-03-20", paidDate: "2024-03-18", createdDate: "2024-03-10" },
  { id: "INV-2024-002", customer: "TechStart Inc", email: "finance@techstart.io", amount: "0.5 BTC", usd: "$32,500.00", status: "Unpaid", dueDate: "2024-03-25", paidDate: null, createdDate: "2024-03-15" },
  { id: "INV-2024-003", customer: "Global Traders", email: "accounts@globaltraders.com", amount: "2.5 ETH", usd: "$7,800.00", status: "Paid", dueDate: "2024-03-15", paidDate: "2024-03-14", createdDate: "2024-03-05" },
  { id: "INV-2024-004", customer: "Crypto Solutions", email: "pay@cryptosol.net", amount: "5,000 USDT", usd: "$5,000.00", status: "Expired", dueDate: "2024-03-10", paidDate: null, createdDate: "2024-03-01" },
  { id: "INV-2024-005", customer: "Digital Ventures", email: "billing@digitalv.com", amount: "1.2 ETH", usd: "$3,744.00", status: "Unpaid", dueDate: "2024-03-28", paidDate: null, createdDate: "2024-03-18" },
];

const templates = [
  { id: 1, name: "Standard Invoice", description: "Basic invoice with payment terms", lastUsed: "2024-03-15", useCount: 42 },
  { id: 2, name: "Recurring Subscription", description: "Monthly subscription billing", lastUsed: "2024-03-10", useCount: 18 },
  { id: 3, name: "Project Milestone", description: "Project-based milestone payment", lastUsed: "2024-03-05", useCount: 8 },
];

export default function Invoicing() {
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoices[0] | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const { t } = useLanguage();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleViewInvoice = (invoice: typeof invoices[0]) => {
    setSelectedInvoice(invoice);
    setView('detail');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'Unpaid':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'Expired':
        return 'bg-red-500/10 text-red-600 dark:text-red-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  const filteredInvoices = activeTab === 'all'
    ? invoices
    : invoices.filter(inv => inv.status.toLowerCase() === activeTab);

  return (
    <DashboardLayout>
      <div className="space-y-8 p-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              {view !== 'list' && (
                <Button variant="ghost" size="icon" onClick={() => setView('list')} className="mr-2">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
              )}
              <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
                <FileText className="w-8 h-8" />
                {view === 'list' ? 'Invoices' : view === 'create' ? 'Create Invoice' : 'Invoice Details'}
              </h1>
            </div>
            <p className="text-muted-foreground mt-2">
              {view === 'list' ? 'Manage and track your invoices' :
               view === 'create' ? 'Generate a new invoice for your customer' :
               `Viewing invoice ${selectedInvoice?.id}`}
            </p>
          </div>
          {view === 'list' && (
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2 font-medium">
                <Download className="w-4 h-4" />
                Export
              </Button>
              <Button className="gap-2 font-medium shadow-lg shadow-primary/20" onClick={() => setView('create')}>
                <Plus className="w-4 h-4" />
                New Invoice
              </Button>
            </div>
          )}
        </div>

        {view === 'list' && (
          <>
            {/* Stats Cards */}
            <div className="grid gap-6 md:grid-cols-4">
              <Card className="glass-panel border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Total Invoiced
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">$50,544.00</div>
                  <p className="text-xs text-muted-foreground mt-1">5 invoices this month</p>
                </CardContent>
              </Card>
              <Card className="glass-panel border-l-4 border-l-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Paid
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">$41,800.00</div>
                  <p className="text-xs text-muted-foreground mt-1">2 invoices paid</p>
                </CardContent>
              </Card>
              <Card className="glass-panel border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">$3,744.00</div>
                  <p className="text-xs text-muted-foreground mt-1">2 invoices pending</p>
                </CardContent>
              </Card>
              <Card className="glass-panel border-l-4 border-l-red-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Overdue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">$5,000.00</div>
                  <p className="text-xs text-muted-foreground mt-1">1 invoice overdue</p>
                </CardContent>
              </Card>
            </div>

            {/* Invoices Table */}
            <Card className="glass-panel overflow-hidden">
              <CardHeader className="border-b border-border/50">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                    <TabsList className="glass-panel">
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="paid">Paid</TabsTrigger>
                      <TabsTrigger value="unpaid">Unpaid</TabsTrigger>
                      <TabsTrigger value="expired">Expired</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <div className="flex gap-2">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Search invoices..." className="pl-9 bg-background/50 h-9" />
                    </div>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('common.invoiceId')}</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('orders.customer')}</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-right">{t('orders.amount')}</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider">{t('common.dueDate')}</TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wider text-center">{t('assets.status')}</TableHead>
                    <TableHead className="text-right font-semibold text-xs uppercase tracking-wider">{t('withdraw.actions')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="hover:bg-muted/30 transition-colors cursor-pointer" onClick={() => handleViewInvoice(invoice)}>
                      <TableCell className="font-mono font-medium text-primary">{invoice.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{invoice.customer}</div>
                          <div className="text-xs text-muted-foreground">{invoice.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="font-mono font-bold">{invoice.amount}</div>
                        <div className="text-xs text-muted-foreground">{invoice.usd}</div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {invoice.dueDate}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={`rounded-full font-bold ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm" className="h-8">
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </>
        )}

        {view === 'create' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Create Invoice Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Invoice Details</CardTitle>
                  <CardDescription>Fill in the invoice information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Customer Name *</label>
                      <Input placeholder="Acme Corporation" className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Customer Email *</label>
                      <Input placeholder="billing@acme.com" type="email" className="bg-background/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Currency *</label>
                    <Select>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Choose cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                        <SelectItem value="usdt">Tether (USDT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount *</label>
                      <Input placeholder="0.00" className="bg-background/50 font-mono" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Due Date *</label>
                      <Input type="date" className="bg-background/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Invoice description or notes..."
                      className="bg-background/50 min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Invoice Template</label>
                    <Select>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select template (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id.toString()}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1 h-12 font-bold text-lg shadow-lg shadow-primary/20">
                      Create & Send Invoice
                    </Button>
                    <Button variant="outline" className="h-12 px-8 font-bold">
                      Save as Draft
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Templates Sidebar */}
            <div className="space-y-6">
              <Card className="glass-panel">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Invoice Templates</CardTitle>
                  <CardDescription>Select a template to get started faster</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="p-4 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted/70 transition-colors cursor-pointer"
                    >
                      <div className="font-medium text-sm">{template.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{template.description}</div>
                      <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                        <span>Used {template.useCount} times</span>
                        <span>{template.lastUsed}</span>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Manage Templates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {view === 'detail' && selectedInvoice && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Invoice Header */}
            <Card className="glass-panel">
              <CardHeader className="border-b border-border/50 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold">{selectedInvoice.id}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Created on {selectedInvoice.createdDate}
                    </p>
                  </div>
                  <Badge className={`rounded-full font-bold text-sm px-4 py-1 ${getStatusColor(selectedInvoice.status)}`}>
                    {selectedInvoice.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Customer & Amount Info */}
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bill To</label>
                      <div className="mt-2">
                        <div className="font-semibold text-lg">{selectedInvoice.customer}</div>
                        <div className="text-sm text-muted-foreground">{selectedInvoice.email}</div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Due Date</label>
                      <div className="mt-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{selectedInvoice.dueDate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount Due</label>
                      <div className="mt-2">
                        <div className="text-3xl font-bold">{selectedInvoice.amount}</div>
                        <div className="text-lg text-muted-foreground">{selectedInvoice.usd}</div>
                      </div>
                    </div>
                    {selectedInvoice.paidDate && (
                      <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Paid On</label>
                        <div className="mt-2 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="font-medium">{selectedInvoice.paidDate}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Link */}
                {selectedInvoice.status === 'Unpaid' && (
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Payment Link</label>
                    <div className="flex gap-2">
                      <Input
                        value={`https://pay.merchant.com/invoice/${selectedInvoice.id}`}
                        readOnly
                        className="font-mono text-sm bg-background/50"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(`https://pay.merchant.com/invoice/${selectedInvoice.id}`)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-6 border-t border-border/50 flex justify-between gap-3">
                  <div className="flex gap-3">
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button variant="outline">
                      <Send className="w-4 h-4 mr-2" />
                      Resend Email
                    </Button>
                  </div>
                  {selectedInvoice.status === 'Unpaid' && (
                    <Button className="shadow-lg shadow-primary/20">
                      Mark as Paid
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
