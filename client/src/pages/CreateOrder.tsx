import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CheckCircle2, Copy, Loader2, QrCode } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CreateOrder() {
  const { t } = useLanguage();
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'waiting' | 'detecting' | 'confirmed'>('waiting');

  const [formData, setFormData] = useState({
    amount: "",
    currency: "USDT",
    network: "TRON"
  });

  const handleCreate = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep('payment');
    }, 1500);
  };

  const simulatePayment = () => {
    setPaymentStatus('detecting');
    setTimeout(() => {
      setPaymentStatus('confirmed');
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="outline" className="border-2 border-black rounded-none aspect-square p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tight">{t('createOrder.title')}</h2>
            <p className="text-muted-foreground font-mono">{t('createOrder.subtitle')}</p>
          </div>
        </div>

        {step === 'form' ? (
          <Card className="brutal-card">
            <CardHeader className="border-b-2 border-black">
              <CardTitle className="font-black uppercase">{t('createOrder.orderDetails')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label className="font-bold font-mono">{t('createOrder.amount')}</Label>
                <Input 
                  placeholder="0.00" 
                  className="font-mono border-2 border-black rounded-none text-lg"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-bold font-mono">{t('createOrder.currency')}</Label>
                  <Select 
                    value={formData.currency}
                    onValueChange={(v) => setFormData({...formData, currency: v})}
                  >
                    <SelectTrigger className="font-mono border-2 border-black rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="font-mono border-2 border-black rounded-none">
                      <SelectItem value="USDT">USDT</SelectItem>
                      <SelectItem value="USDC">USDC</SelectItem>
                      <SelectItem value="BTC">BTC</SelectItem>
                      <SelectItem value="ETH">ETH</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold font-mono">{t('createOrder.network')}</Label>
                  <Select 
                    value={formData.network}
                    onValueChange={(v) => setFormData({...formData, network: v})}
                  >
                    <SelectTrigger className="font-mono border-2 border-black rounded-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="font-mono border-2 border-black rounded-none">
                      <SelectItem value="TRON">{t('network.tronTrc20')}</SelectItem>
                      <SelectItem value="ETH">{t('network.ethereumErc20')}</SelectItem>
                      <SelectItem value="BSC">{t('network.bscBep20')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold font-mono">{t('createOrder.customerEmailOptional')}</Label>
                <Input 
                  placeholder="customer@example.com" 
                  className="font-mono border-2 border-black rounded-none"
                />
              </div>

              <Button
                className="w-full brutal-btn bg-primary text-white hover:bg-primary/90 h-12 text-lg font-bold uppercase"
                onClick={handleCreate}
                disabled={loading || !formData.amount}
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : t('createOrder.generateLink')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="brutal-card border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="border-b-2 border-black bg-accent text-center py-6">
              <CardTitle className="font-black uppercase text-2xl">
                {paymentStatus === 'confirmed' ? t('createOrder.paymentSuccessful') : t('createOrder.awaitingPayment')}
              </CardTitle>
              <p className="font-mono font-bold mt-2">Order #ORD-2024-005</p>
            </CardHeader>
            <CardContent className="pt-8 pb-8 space-y-8">
              {paymentStatus === 'confirmed' ? (
                <div className="text-center space-y-6 animate-in zoom-in duration-300">
                  <div className="mx-auto h-24 w-24 bg-green-500 rounded-full flex items-center justify-center border-4 border-black">
                    <CheckCircle2 className="h-12 w-12 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase">{t('createOrder.paid')} {formData.amount} {formData.currency}</h3>
                    <p className="font-mono text-muted-foreground mt-2">{t('createOrder.transactionConfirmed')}</p>
                  </div>
                  <Button
                    className="brutal-btn bg-black text-white hover:bg-gray-800"
                    onClick={() => setStep('form')}
                  >
                    {t('createOrder.createAnother')}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative group cursor-pointer">
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-white p-4 border-2 border-black">
                        <QrCode className="h-48 w-48" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-mono text-sm text-muted-foreground mb-1">{t('createOrder.scanToPay')}</p>
                      <div className="text-3xl font-black">{formData.amount} {formData.currency}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold font-mono text-xs uppercase text-muted-foreground">{t('createOrder.paymentAddress')} ({formData.network})</Label>
                    <div className="flex gap-2">
                      <Input 
                        readOnly 
                        value="T9yD14Nj9j7xAB4dbGeiX9h8unkce85rwn" 
                        className="font-mono bg-muted border-2 border-black rounded-none text-center font-bold"
                      />
                      <Button variant="outline" className="border-2 border-black rounded-none aspect-square p-0 hover:bg-accent">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="bg-yellow-100 border-2 border-black p-4 text-center">
                    {paymentStatus === 'detecting' ? (
                      <div className="flex items-center justify-center gap-2 font-bold font-mono text-yellow-800">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t('createOrder.detectingPayment')}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="font-bold font-mono text-sm">{t('createOrder.timeRemaining')}: 14:59</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs underline"
                          onClick={simulatePayment}
                        >
                          {t('createOrder.simulatePayment')}
                        </Button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
