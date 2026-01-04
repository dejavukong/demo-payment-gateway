import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Download, Send, Share2 } from "lucide-react";

export default function InvoiceGenerator() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 p-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-pixel">Create Invoice</h1>
            <p className="text-muted-foreground mt-2">Generate professional crypto invoices for your clients.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2 font-bold">
              <Download className="w-4 h-4" />
              Save Draft
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invoice Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-panel">
              <CardHeader>
                <CardTitle className="font-pixel text-lg">Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Invoice Number</Label>
                    <Input defaultValue="INV-2024-001" className="bg-background/50 font-mono" />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input type="date" className="bg-background/50" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Client Email</Label>
                  <Input placeholder="client@example.com" className="bg-background/50" />
                </div>

                <div className="space-y-4">
                  <Label>Line Items</Label>
                  <div className="grid grid-cols-12 gap-4 items-end">
                    <div className="col-span-6 space-y-2">
                      <Label className="text-xs text-muted-foreground">Description</Label>
                      <Input placeholder="Service or Product" className="bg-background/50" />
                    </div>
                    <div className="col-span-3 space-y-2">
                      <Label className="text-xs text-muted-foreground">Amount</Label>
                      <Input placeholder="0.00" className="bg-background/50 text-right" />
                    </div>
                    <div className="col-span-3 space-y-2">
                      <Label className="text-xs text-muted-foreground">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger className="bg-background/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                          <SelectItem value="eth">ETH</SelectItem>
                          <SelectItem value="btc">BTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-primary text-sm h-auto p-0 hover:bg-transparent hover:underline">
                    + Add Item
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label>Notes</Label>
                  <Textarea placeholder="Thank you for your business..." className="bg-background/50 min-h-[100px]" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview & Actions */}
          <div className="space-y-6">
            <Card className="glass bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="font-pixel text-lg">Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">$0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (0%)</span>
                  <span className="font-mono">$0.00</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="font-mono text-primary">$0.00</span>
                </div>
                
                <Button className="w-full font-bold gap-2 shadow-lg shadow-primary/20 mt-4">
                  <Send className="w-4 h-4" />
                  Send Invoice
                </Button>
                <Button variant="outline" className="w-full font-bold gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Link
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardContent className="p-4">
                <h4 className="font-bold text-sm mb-2">Payment Link</h4>
                <div className="flex gap-2">
                  <Input value="https://pay.gateway.com/i/..." readOnly className="bg-background/50 font-mono text-xs" />
                  <Button size="icon" variant="outline" className="shrink-0">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
