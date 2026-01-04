import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Download,
  Copy,
  QrCode,
  Clock,
  Check,
  Loader2,
  Circle,
  FileText,
  Eye
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface OrderDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: {
    id: string;
    date: string;
    amount: string;
    value: string;
    status: string;
    customer: string;
  };
}

export default function OrderDetailDialog({ open, onOpenChange, order }: OrderDetailDialogProps) {
  const { t } = useLanguage();

  const getStatusBadge = (status: string) => {
    if (status === 'Completed') {
      return (
        <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30 rounded-full flex items-center gap-1.5 px-3 py-1">
          <span className="block w-2 h-2 rounded-full bg-green-500"></span>
          {t('status.completed')}
        </Badge>
      );
    }
    if (status === 'Processing') {
      return (
        <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30 rounded-full flex items-center gap-1.5 px-3 py-1">
          <span className="block w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
          {t('status.processing')}
        </Badge>
      );
    }
    return (
      <Badge className="bg-red-500/20 text-red-600 dark:text-red-400 border-red-500/30 rounded-full flex items-center gap-1.5 px-3 py-1">
        <span className="block w-2 h-2 rounded-full bg-red-500"></span>
        {t('status.failed')}
      </Badge>
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1800px] sm:max-w-[1800px] md:max-w-[1800px] lg:max-w-[1800px] xl:max-w-[1800px] w-[98vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle className="text-2xl font-bold">{order.id}</DialogTitle>
              {getStatusBadge(order.status)}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-xl gap-2">
                <ExternalLink className="w-4 h-4" />
                {t('common.explorer')}
              </Button>
              <Button size="sm" className="rounded-xl bg-primary hover:bg-primary/90 gap-2">
                <Download className="w-4 h-4" />
                {t('action.export')}
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{t('orders.createdOn')} {order.date}</p>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Stats */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{t('orders.totalAmount')}</p>
                  <div className="text-3xl font-bold">{order.amount}</div>
                  <p className="text-sm text-muted-foreground mt-1">≈ {order.value}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{t('orders.fiatEquivalent')}</p>
                  <div className="text-3xl font-bold">{order.value}</div>
                  <p className="text-sm text-muted-foreground mt-1">{t('common.rate')}: $3,380 / ETH</p>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{t('orders.timeRemaining')}</p>
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted/30 rounded-xl font-mono font-bold">
                    <Clock className="w-4 h-4" />
                    14:02
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="glass-panel rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-border/30">
                <h3 className="font-semibold">{t('orders.paymentDetails')}</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{t('orders.network')}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-lg">Ξ</span>
                      </div>
                      <div>
                        <p className="font-semibold">{t('network.ethereumMainnet')}</p>
                        <p className="text-sm text-muted-foreground">{t('network.erc20Token')}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{t('orders.destination')}</p>
                    <div className="flex items-center gap-2 p-3 bg-muted/30 border border-border/30 rounded-xl">
                      <span className="font-mono text-xs truncate">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
                      <Button size="icon" variant="ghost" className="shrink-0 h-7 w-7" onClick={() => copyToClipboard('0x71C7656EC7ab88b098defB751B7401B5f6d8976F')}>
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                      <Button size="icon" variant="ghost" className="shrink-0 h-7 w-7">
                        <QrCode className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{t('orders.customer')}</p>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                        JD
                      </div>
                      <div>
                        <p className="font-semibold">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                        <p className="text-xs text-muted-foreground mt-1">ID: cust_992831</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">{t('orders.txHash')}</p>
                    <div className="flex items-center gap-2">
                      <a className="font-mono text-sm text-primary hover:underline truncate" href="#">0x3a1b...9f2c</a>
                      <Button size="icon" variant="ghost" className="h-7 w-7">
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground text-xs block mb-1">{t('orders.blockHeight')}</span>
                        <span className="font-mono">18,239,102</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs block mb-1">{t('orders.confirmations')}</span>
                        <span className="font-mono">8 / 12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Timeline & Logs */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="font-semibold mb-6">{t('orders.timeline')}</h3>
              <div className="relative pl-2">
                <div className="absolute left-[11px] top-2 bottom-4 w-0.5 bg-border"></div>

                <div className="relative flex gap-4 mb-8">
                  <div className="mt-1 relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white shrink-0 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t('orders.orderCreated')}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>

                <div className="relative flex gap-4 mb-8">
                  <div className="mt-1 relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white shrink-0 shadow-[0_0_0_4px_rgba(34,197,94,0.2)]">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t('orders.paymentDetected')}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>

                <div className="relative flex gap-4 mb-8">
                  <div className="mt-1 relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-white shrink-0 animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t('orders.confirming')}</p>
                    <p className="text-xs text-muted-foreground">{t('orders.inProgress')} (8/12)</p>
                    <div className="w-full h-1.5 bg-muted/30 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{width: '66%'}}></div>
                    </div>
                  </div>
                </div>

                <div className="relative flex gap-4">
                  <div className="mt-1 relative z-10 flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground shrink-0">
                    <Circle className="w-3.5 h-3.5" />
                  </div>
                  <div className="opacity-50">
                    <p className="text-sm font-semibold">{t('status.completed')}</p>
                    <p className="text-xs text-muted-foreground">{t('orders.pendingConfirmation')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Overview */}
            <div className="glass-panel p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {t('invoice.overview')}
                </h3>
              </div>

              <div className="space-y-4">
                {/* Invoice Number */}
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{t('invoice.invoiceNumber')}</p>
                      <p className="font-mono font-semibold text-sm">INV-{order.id.replace('ORD-', '')}</p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copyToClipboard(`INV-${order.id.replace('ORD-', '')}`)}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Invoice Status & Amount */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/30 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">{t('invoice.invoiceStatus')}</p>
                    <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30 rounded-full">
                      <Check className="w-3 h-3 mr-1" /> {t('invoice.paid')}
                    </Badge>
                  </div>
                  <div className="p-3 bg-muted/30 rounded-xl">
                    <p className="text-xs text-muted-foreground mb-1">{t('invoice.total')}</p>
                    <p className="font-bold text-sm">{order.value}</p>
                  </div>
                </div>

                {/* Issue Date */}
                <div className="p-3 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-1">{t('invoice.issueDate')}</p>
                  <p className="text-sm font-medium">{order.date}</p>
                </div>

                {/* Customer Info */}
                <div className="p-3 bg-muted/30 rounded-xl">
                  <p className="text-xs text-muted-foreground mb-2">{t('invoice.generatedFor')}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                      {order.customer.substring(0, 2).toUpperCase()}
                    </div>
                    <p className="text-sm font-medium">{order.customer}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="w-3.5 h-3.5" />
                    {t('invoice.viewInvoice')}
                  </Button>
                  <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
                    <Download className="w-3.5 h-3.5" />
                    {t('invoice.downloadInvoice')}
                  </Button>
                </div>
              </div>
            </div>

            {/* Technical Logs */}
            <div className="glass-panel rounded-2xl overflow-hidden flex flex-col max-h-96">
              <div className="px-6 py-4 border-b border-border/30">
                <h3 className="font-semibold">{t('orders.technicalLogs')}</h3>
              </div>
              <div className="p-4 overflow-y-auto flex-1 space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap mt-0.5">14:35:12</span>
                  <p className="text-xs font-mono"><span className="text-green-500">INFO</span> Block 18239102 mined.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap mt-0.5">14:32:05</span>
                  <p className="text-xs font-mono"><span className="text-green-500">INFO</span> Webhook sent. Status: 200 OK.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap mt-0.5">14:32:01</span>
                  <p className="text-xs font-mono"><span className="text-blue-500">DEBUG</span> Transaction in mempool.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap mt-0.5">14:30:00</span>
                  <p className="text-xs font-mono"><span className="text-green-500">INFO</span> Order {order.id} initialized.</p>
                </div>
              </div>
              <div className="p-3 border-t border-border/30 bg-muted/30">
                <Button variant="ghost" size="sm" className="w-full text-xs gap-1">
                  {t('orders.downloadFullLog')} <Download className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
