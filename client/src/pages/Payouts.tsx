import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, ArrowRight, FileUp, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Payouts() {
  const [loading, setLoading] = useState(false);
  const [payoutData, setPayoutData] = useState({
    address: "",
    amount: "",
    currency: "USDT",
    network: "TRON"
  });

  const handlePayout = () => {
    if (!payoutData.address || !payoutData.amount) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Successfully sent ${payoutData.amount} ${payoutData.currency} to ${payoutData.address.slice(0, 6)}...`);
      setPayoutData({ ...payoutData, address: "", amount: "" });
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tight">Payouts</h2>
          <p className="text-muted-foreground font-mono mt-2">Send crypto to external wallets</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Payout Form */}
          <div className="md:col-span-2">
            <Tabs defaultValue="single" className="w-full">
              <TabsList className="w-full justify-start bg-transparent p-1 h-auto gap-2">
                <TabsTrigger
                  value="single"
                  className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all border-none"
                >
                  Single Payout
                </TabsTrigger>
                <TabsTrigger
                  value="batch"
                  className="backdrop-blur-lg bg-white/30 dark:bg-black/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg data-[state=active]:shadow-primary/30 rounded-2xl px-6 py-3 font-medium text-muted-foreground transition-all border-none"
                >
                  Batch Payout
                </TabsTrigger>
              </TabsList>

              <TabsContent value="single" className="mt-6">
                <Card className="brutal-card">
                  <CardHeader className="border-b-2 border-black">
                    <CardTitle className="font-black uppercase flex items-center gap-2">
                      <Send className="h-5 w-5" /> Send Funds
                    </CardTitle>
                    <CardDescription className="font-mono">Initiate a single transfer to any address.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-bold font-mono">Currency</Label>
                        <Select 
                          value={payoutData.currency}
                          onValueChange={(v) => setPayoutData({...payoutData, currency: v})}
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
                        <Label className="font-bold font-mono">Network</Label>
                        <Select 
                          value={payoutData.network}
                          onValueChange={(v) => setPayoutData({...payoutData, network: v})}
                        >
                          <SelectTrigger className="font-mono border-2 border-black rounded-none">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="font-mono border-2 border-black rounded-none">
                            <SelectItem value="TRON">TRON (TRC20)</SelectItem>
                            <SelectItem value="ETH">Ethereum (ERC20)</SelectItem>
                            <SelectItem value="BSC">BSC (BEP20)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold font-mono">Recipient Address</Label>
                      <Input 
                        placeholder="Enter wallet address" 
                        className="font-mono border-2 border-black rounded-none"
                        value={payoutData.address}
                        onChange={(e) => setPayoutData({...payoutData, address: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="font-bold font-mono">Amount</Label>
                      <div className="relative">
                        <Input 
                          placeholder="0.00" 
                          className="font-mono border-2 border-black rounded-none pr-16"
                          value={payoutData.amount}
                          onChange={(e) => setPayoutData({...payoutData, amount: e.target.value})}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 font-mono font-bold text-muted-foreground">
                          {payoutData.currency}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs font-mono text-muted-foreground">
                        <span>Available: 25,400.00 {payoutData.currency}</span>
                        <span>Fee: ≈ 1.00 {payoutData.currency}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-black">
                      <Button 
                        className="w-full brutal-btn bg-black text-white hover:bg-primary h-12 text-lg font-bold uppercase"
                        onClick={handlePayout}
                        disabled={loading}
                      >
                        {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Confirm Payout"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="batch" className="mt-6">
                <Card className="brutal-card">
                  <CardHeader className="border-b-2 border-black">
                    <CardTitle className="font-black uppercase flex items-center gap-2">
                      <FileUp className="h-5 w-5" /> Batch Upload
                    </CardTitle>
                    <CardDescription className="font-mono">Upload a CSV file to send to multiple addresses at once.</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-6">
                    <div className="border-2 border-dashed border-black p-8 text-center hover:bg-accent cursor-pointer transition-colors">
                      <FileUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-bold font-mono text-lg">Drop CSV file here</h3>
                      <p className="text-sm text-muted-foreground font-mono mt-2">or click to browse</p>
                    </div>
                    
                    <div className="bg-blue-50 border-2 border-blue-200 p-4 text-sm font-mono text-blue-800">
                      <p className="font-bold mb-2">CSV Format Required:</p>
                      <code>address,amount,currency,network</code>
                    </div>

                    <Button className="w-full brutal-btn bg-white text-black hover:bg-accent" disabled>
                      Upload & Validate
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="brutal-card bg-yellow-50">
              <CardHeader className="border-b-2 border-black pb-2">
                <CardTitle className="font-black uppercase text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> Security Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 text-sm font-mono">
                <p className="mb-4">
                  For security reasons, large withdrawals may require manual approval and 2FA verification.
                </p>
                <p className="font-bold">
                  Daily Limit: $50,000.00
                </p>
                <p>
                  Remaining: $48,200.00
                </p>
              </CardContent>
            </Card>

            <Card className="brutal-card">
              <CardHeader className="border-b-2 border-black pb-2">
                <CardTitle className="font-black uppercase text-sm">Recent Payouts</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 p-0">
                <div className="divide-y-2 divide-black">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 hover:bg-accent flex justify-between items-center">
                      <div>
                        <div className="font-bold font-mono text-sm">Vendor Payment</div>
                        <div className="text-xs text-muted-foreground font-mono">2 hours ago</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold font-mono">-500.00 USDT</div>
                        <div className="text-xs text-green-600 font-bold flex items-center justify-end gap-1">
                          Completed <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" className="w-full font-mono text-xs border-t-2 border-black rounded-none h-10 hover:bg-black hover:text-white">
                  View All History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
