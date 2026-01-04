import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Assets from "./pages/Assets";
import CreateOrder from "./pages/CreateOrder";
import DashboardHome from "./pages/DashboardHome";
import KYBVerification from "./pages/KYBVerification";
import Integration from "./pages/Integration";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import Orders from "./pages/Orders";
import Withdraw from "./pages/Withdraw";
import Settings from "./pages/Settings";


function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardHome} />
      <Route path="/kyb" component={KYBVerification} />
      <Route path={"/assets"} component={Assets} />
      <Route path={"/integration"} component={Integration} />
      <Route path={"/invoices/new"} component={InvoiceGenerator} />
      <Route path={"/orders"} component={Orders} />
      <Route path={"/withdraw"} component={Withdraw} />
      <Route path={"/settings"} component={Settings} />
      <Route path={"/create-order"} component={CreateOrder} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
