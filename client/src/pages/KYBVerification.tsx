import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Upload, ArrowRight, Shield, Info } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function KYBVerification() {
  const [step, setStep] = useState(1);
  const { t } = useLanguage();

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 p-2">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-pixel">{t('kyb.title')}</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {t('kyb.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium border border-green-500/20">
            <CheckCircle className="w-4 h-4" />
            <span>{t('kyb.draftSaved')}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-bold">{t('kyb.step')} {step} {t('kyb.of')} 3: {step === 1 ? t('kyb.step1') : step === 2 ? t('kyb.step2') : t('kyb.step3')}</span>
            <span className="text-muted-foreground">{t('kyb.next')}: {step === 1 ? t('kyb.step2') : step === 2 ? t('kyb.step3') : t('kyb.review')}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Business Identity */}
            <Card className={`glass-panel transition-all duration-300 ${step === 1 ? 'ring-2 ring-primary' : 'opacity-60'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-pixel text-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">1</div>
                  {t('kyb.step1')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{t('settings.legalName')}</Label>
                    <Input placeholder="e.g. Acme Corp LLC" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('kyb.dba')}</Label>
                    <Input placeholder={t('kyb.optional')} className="bg-background/50" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>{t('kyb.regNumber')}</Label>
                    <Input placeholder="e.g. 123456789" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('settings.taxId')}</Label>
                    <Input placeholder="e.g. US-99-999999" className="bg-background/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>{t('kyb.website')}</Label>
                  <Input placeholder="https://www.example.com" className="bg-background/50" />
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Location */}
            <Card className={`glass-panel transition-all duration-300 ${step === 2 ? 'ring-2 ring-primary' : 'opacity-60'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-pixel text-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">2</div>
                  {t('kyb.step2')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>{t('kyb.countryInc')}</Label>
                  <Select>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder={t('kyb.selectCountry')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('settings.streetAddress')}</Label>
                  <Input placeholder="123 Business Rd, Suite 100" className="bg-background/50" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label>{t('settings.city')}</Label>
                    <Input placeholder="New York" className="bg-background/50" />
                  </div>
                  <div className="space-y-2">
                    <Label>{t('kyb.state')}</Label>
                    <Input placeholder="NY" className="bg-background/50" />
                  </div>
                  <div className="space-y-2 col-span-2 md:col-span-1">
                    <Label>{t('settings.postalCode')}</Label>
                    <Input placeholder="10001" className="bg-background/50" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Documents */}
            <Card className={`glass-panel transition-all duration-300 ${step === 3 ? 'ring-2 ring-primary' : 'opacity-60'}`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 font-pixel text-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold border border-primary/20">3</div>
                  {t('kyb.step3')}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>{t('kyb.certInc')}</Label>
                  <div className="border-2 border-dashed border-muted hover:border-primary/50 rounded-xl bg-background/30 p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-primary text-sm font-bold">{t('kyb.clickUpload')}</p>
                      <p className="text-xs text-muted-foreground">{t('kyb.dragDrop')}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>{t('kyb.proofAddress')}</Label>
                  <div className="border-2 border-dashed border-muted hover:border-primary/50 rounded-xl bg-background/30 p-8 flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Upload className="w-6 h-6 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-primary text-sm font-bold">{t('kyb.clickUpload')}</p>
                      <p className="text-xs text-muted-foreground">{t('kyb.dragDrop')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-4">
              <Button variant="outline" className="w-full sm:w-auto h-12 font-bold">
                {t('kyb.saveDraft')}
              </Button>
              <Button 
                className="w-full sm:w-auto h-12 font-bold gap-2 shadow-lg shadow-primary/20"
                onClick={() => setStep(prev => Math.min(prev + 1, 3))}
              >
                {t('action.continue')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar Help */}
          <div className="hidden lg:flex flex-col gap-6">
            <Card className="bg-blue-500/5 border-blue-500/20 sticky top-6">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <h3 className="font-bold">{t('kyb.whyNeed')}</h3>
                </div>
                <div className="text-sm text-muted-foreground space-y-4">
                  <p>
                    {t('kyb.whyNeedDesc')} <strong className="text-foreground">{t('kyb.aml')}</strong> {t('kyb.regulations')}.
                  </p>
                  <div className="h-px bg-border w-full" />
                  <div>
                    <p className="font-bold text-foreground mb-2">{t('kyb.docGuidelines')}:</p>
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                      <li>{t('kyb.guide1')}</li>
                      <li>{t('kyb.guide2')}</li>
                      <li>{t('kyb.guide3')}</li>
                      <li>{t('kyb.guide4')}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-panel">
              <CardContent className="p-6">
                <h3 className="font-bold mb-2">{t('kyb.needHelp')}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t('kyb.contactSupportDesc')}</p>
                <Button variant="link" className="p-0 h-auto font-bold gap-2">
                  <Shield className="w-4 h-4" />
                  {t('kyb.contactSupport')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
