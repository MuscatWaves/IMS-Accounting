import React, { lazy, Suspense } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import ScrollToTop from "./ScrollToTop";

// Clients
const ClientLogin = lazy(() => import("../pages/Clients/ClientLogin"));
const ClientDashBoard = lazy(() => import("../pages/Clients/ClientDashboard"));
// Client Daily Entries
const ClientDailyEntries = lazy(() =>
  import("../pages/Clients/ClientDailyEntries")
);
const ClientGRVReport = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/GRVReport")
);
const ClientPurchaseReport = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/PurchaseReport")
);
const ClientPurchaseReturnReport = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/PurchaseReturnReport")
);
const ClientPurchaseFromOtherBranches = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/PurchaseFromOtherBranchesReport")
);
const ClientPurchaseInvoiceScan = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/PurchaseInvoiceScan")
);
const ClientAttendanceReport = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/AttendanceReport")
);
const ClientSalesReport = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/SalesReport")
);
const ClientSalesQuantativeSummary = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/SalesQuantativeSummary")
);
const ClientInventoryStockLedger = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/InventoryStockLedger")
);
const ClientItemExpiry = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/ItemExpiry")
);
const ClientClosingStock = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/ClosingStock")
);
const ClientCashBankStatement = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/CashBankStatement")
);
const ClientMerchantSummary = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/MerchantSummary")
);
const ClientOutstandingStatement = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/OutstandingStatement")
);
const ClientSalesToOtherBranch = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/SalesToOtherBranch")
);
const ClientPaymentVoucherScan = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/PaymentVoucherScan")
);
const ClientOredooOmantel = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/OredooOmantel")
);
const ClientBankStatement = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/BankStatement")
);
const ClientCreditSales = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/CreditSales")
);
const ClientProductCostingMan = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/ProductCostingMan")
);
const ClientProductCostingServices = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/ProductCostingServices")
);
const ClientMonthlyDiscount = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/MonthlyDiscount")
);
const ClientMonthlyOffers = lazy(() =>
  import("../pages/Clients/ClientDailyEntries/MonthlyOffers")
);
const ClientPurchases = lazy(() => import("../pages/Clients/ClientPurchases"));
const ClientSales = lazy(() => import("../pages/Clients/ClientSales"));
// const ClientRegister = lazy(() => import("../pages/Clients/ClientRegister"));

// Accounting
const AccountingLogin = lazy(() =>
  import("../pages/Accounting/AccountingLogin")
);
const AccountingDashboard = lazy(() =>
  import("../pages/Accounting/AccountingDashBoard")
);
const ManageAccountant = lazy(() =>
  import("../pages/Accounting/ManageAccountant")
);
const AccountingClients = lazy(() =>
  import("../pages/Accounting/AccountingClients")
);
const AccountingClientInformation = lazy(() =>
  import("../pages/Accounting/AccountingClientInformation")
);
const AccountingClientAttachments = lazy(() =>
  import("../pages/Accounting/AccountingClientAttachments")
);
const PreAccountData = lazy(() => import("../pages/Accounting/PreAccountData"));
const AccountingData = lazy(() => import("../pages/Accounting/AccountingData"));
// Accounting Entries - Accountant
const Entries = lazy(() => import("../pages/Accounting/DailyEntries"));
const GRVReport = lazy(() =>
  import("../pages/Accounting/DailyEntries/GRVReport")
);
const PurchaseReport = lazy(() =>
  import("../pages/Accounting/DailyEntries/PurchaseReport")
);
const PurchaseReturnReport = lazy(() =>
  import("../pages/Accounting/DailyEntries/PurchaseReturnReport")
);
const PurchaseFromOtherBranches = lazy(() =>
  import("../pages/Accounting/DailyEntries/PurchaseFromOtherBranchesReport")
);
const PurchaseInvoiceScan = lazy(() =>
  import("../pages/Accounting/DailyEntries/PurchaseInvoiceScan")
);
const AttendanceReport = lazy(() =>
  import("../pages/Accounting/DailyEntries/AttendanceReport")
);
const SalesReport = lazy(() =>
  import("../pages/Accounting/DailyEntries/SalesReport")
);
const SalesQuantativeSummary = lazy(() =>
  import("../pages/Accounting/DailyEntries/SalesQuantativeSummary")
);
const InventoryStockLedger = lazy(() =>
  import("../pages/Accounting/DailyEntries/InventoryStockLedger")
);
const ItemExpiry = lazy(() =>
  import("../pages/Accounting/DailyEntries/ItemExpiry")
);
const ClosingStock = lazy(() =>
  import("../pages/Accounting/DailyEntries/ClosingStock")
);
const CashBankStatement = lazy(() =>
  import("../pages/Accounting/DailyEntries/CashBankStatement")
);
const MerchantSummary = lazy(() =>
  import("../pages/Accounting/DailyEntries/MerchantSummary")
);
const OutstandingStatement = lazy(() =>
  import("../pages/Accounting/DailyEntries/OutstandingStatement")
);
const SalesToOtherBranch = lazy(() =>
  import("../pages/Accounting/DailyEntries/SalesToOtherBranch")
);
const PaymentVoucherScan = lazy(() =>
  import("../pages/Accounting/DailyEntries/PaymentVoucherScan")
);
const OredooOmantel = lazy(() =>
  import("../pages/Accounting/DailyEntries/OredooOmantel")
);
const BankStatement = lazy(() =>
  import("../pages/Accounting/DailyEntries/BankStatement")
);
const CreditSales = lazy(() =>
  import("../pages/Accounting/DailyEntries/CreditSales")
);
const ProductCostingMan = lazy(() =>
  import("../pages/Accounting/DailyEntries/ProductCostingMan")
);
const ProductCostingServices = lazy(() =>
  import("../pages/Accounting/DailyEntries/ProductCostingServices")
);
const MonthlyDiscount = lazy(() =>
  import("../pages/Accounting/DailyEntries/MonthlyDiscount")
);
const MonthlyOffers = lazy(() =>
  import("../pages/Accounting/DailyEntries/MonthlyOffers")
);
const Purchases = lazy(() => import("../pages/Accounting/Purchases"));
const Sales = lazy(() => import("../pages/Accounting/Sales"));
//  Accounting Financial Statements
const FinancialStatements = lazy(() =>
  import("../pages/Accounting/FinancialStatements")
);
const BalanceSheet = lazy(() =>
  import("../pages/Accounting/FinancialStatements/BalanceSheet")
);
const IncomeStatement = lazy(() =>
  import("../pages/Accounting/FinancialStatements/IncomeStatement")
);
const VATReport = lazy(() =>
  import("../pages/Accounting/FinancialStatements/VATReport")
);
const VATReturn = lazy(() =>
  import("../pages/Accounting/FinancialStatements/VATReturn")
);
const TaxReport = lazy(() =>
  import("../pages/Accounting/FinancialStatements/TaxReport")
);
const VATReturnTracker = lazy(() =>
  import("../pages/Accounting/FinancialStatements/VATReturnTracker")
);
const Invoices = lazy(() => import("../pages/Accounting/Invoice"));
const PRInvoices = lazy(() => import("../pages/Accounting/PRInvoice"));

// Misc
const PageNotFound = lazy(() => import("../components/NoPageFound"));
const NotAuthorize = lazy(() => import("../components/NotAuthorize"));

const Routing = () => {
  return (
    <div>
      <Suspense fallback={<Loader minHeight={"80vh"} />}>
        <Router>
          <AnimatePresence>
            <LazyMotion features={domAnimation}>
              <ScrollToTop />
              <Routes>
                {/* Clients */}
                <Route path="/client" element={<ClientLogin />}></Route>
                {/* <Route
                  path="/client/register"
                  element={<ClientRegister />}
                ></Route> */}
                {/* <Route
                    path="/client/contacts"
                    element={<ClientContacts />}
                  ></Route> */}
                <Route
                  path="/client/dashboard"
                  element={<ClientDashBoard />}
                ></Route>
                {/* Client Daily Entries */}
                <Route
                  path="/accounting/client/dailyentries/:id/:name"
                  element={<ClientDailyEntries />}
                ></Route>
                <Route
                  path="/accounting/client/entries/grvReport/:id/:name"
                  element={<ClientGRVReport />}
                ></Route>
                <Route
                  path="/accounting/client/entries/purchaseReport/:id/:name"
                  element={<ClientPurchaseReport />}
                ></Route>
                <Route
                  path="/accounting/client/entries/purchaseReturnReport/:id/:name"
                  element={<ClientPurchaseReturnReport />}
                ></Route>
                <Route
                  path="/accounting/client/entries/purchaseFromOtherBranchesReport/:id/:name"
                  element={<ClientPurchaseFromOtherBranches />}
                ></Route>
                <Route
                  path="/accounting/client/entries/purchaseInvoiceScan/:id/:name"
                  element={<ClientPurchaseInvoiceScan />}
                ></Route>
                <Route
                  path="/accounting/client/entries/attendanceReport/:id/:name"
                  element={<ClientAttendanceReport />}
                ></Route>
                <Route
                  path="/accounting/client/entries/salesReport/:id/:name"
                  element={<ClientSalesReport />}
                ></Route>
                <Route
                  path="/accounting/client/entries/salesQSummary/:id/:name"
                  element={<ClientSalesQuantativeSummary />}
                ></Route>
                <Route
                  path="/accounting/client/entries/inventoryStockLedger/:id/:name"
                  element={<ClientInventoryStockLedger />}
                ></Route>
                <Route
                  path="/accounting/client/entries/itemExpiry/:id/:name"
                  element={<ClientItemExpiry />}
                ></Route>
                <Route
                  path="/accounting/client/entries/closingStock/:id/:name"
                  element={<ClientClosingStock />}
                ></Route>
                <Route
                  path="/accounting/client/entries/cashBankStatement/:id/:name"
                  element={<ClientCashBankStatement />}
                ></Route>
                <Route
                  path="/accounting/client/entries/merchantSummary/:id/:name"
                  element={<ClientMerchantSummary />}
                ></Route>
                <Route
                  path="/accounting/client/entries/outstandingStatement/:id/:name"
                  element={<ClientOutstandingStatement />}
                ></Route>
                <Route
                  path="/accounting/client/entries/salesToOtherBranch/:id/:name"
                  element={<ClientSalesToOtherBranch />}
                ></Route>
                <Route
                  path="/accounting/client/entries/paymentVoucherScan/:id/:name"
                  element={<ClientPaymentVoucherScan />}
                ></Route>
                <Route
                  path="/accounting/client/entries/ooPayment/:id/:name"
                  element={<ClientOredooOmantel />}
                ></Route>
                <Route
                  path="/accounting/client/entries/bs/:id/:name"
                  element={<ClientBankStatement />}
                ></Route>
                <Route
                  path="/accounting/client/entries/creditSales/:id/:name"
                  element={<ClientCreditSales />}
                ></Route>
                <Route
                  path="/accounting/client/entries/pcm/:id/:name"
                  element={<ClientProductCostingMan />}
                ></Route>
                <Route
                  path="/accounting/client/entries/pcs/:id/:name"
                  element={<ClientProductCostingServices />}
                ></Route>
                <Route
                  path="/accounting/client/entries/monthlyDiscount/:id/:name"
                  element={<ClientMonthlyDiscount />}
                ></Route>
                <Route
                  path="/accounting/client/entries/monthlyOffers/:id/:name"
                  element={<ClientMonthlyOffers />}
                ></Route>
                <Route
                  path="/accounting/client/dailentries/purchases/:id/:name"
                  element={<ClientPurchases />}
                ></Route>
                <Route
                  path="/accounting/client/dailentries/sales/:id/:name"
                  element={<ClientSales />}
                ></Route>
                {/* Accounting - Accountant & AH */}
                <Route path="/accounting" element={<AccountingLogin />}></Route>
                <Route
                  path="/accounting/dashboard"
                  element={<AccountingDashboard />}
                ></Route>
                <Route
                  path="/accounting/manageAccountant"
                  element={<ManageAccountant />}
                ></Route>
                <Route
                  path="/accounting/clients"
                  element={<AccountingClients />}
                ></Route>
                <Route
                  path="/accounting/clientInformation"
                  element={<AccountingClientInformation />}
                ></Route>
                <Route
                  path="/accounting/clientAttachments"
                  element={<AccountingClientAttachments />}
                ></Route>
                <Route
                  path="/accounting/preselectiondata"
                  element={<PreAccountData />}
                ></Route>
                <Route
                  path="/accounting/data/:id/:name"
                  element={<AccountingData />}
                ></Route>
                {/* Accounting Entries */}
                <Route
                  path="/accounting/entries/:id/:name"
                  element={<Entries />}
                ></Route>
                <Route
                  path="/accounting/entries/grvReport/:id/:name"
                  element={<GRVReport />}
                ></Route>
                <Route
                  path="/accounting/entries/purchaseReport/:id/:name"
                  element={<PurchaseReport />}
                ></Route>
                <Route
                  path="/accounting/entries/purchaseReturnReport/:id/:name"
                  element={<PurchaseReturnReport />}
                ></Route>
                <Route
                  path="/accounting/entries/purchaseFromOtherBranchesReport/:id/:name"
                  element={<PurchaseFromOtherBranches />}
                ></Route>
                <Route
                  path="/accounting/entries/purchaseInvoiceScan/:id/:name"
                  element={<PurchaseInvoiceScan />}
                ></Route>
                <Route
                  path="/accounting/entries/attendanceReport/:id/:name"
                  element={<AttendanceReport />}
                ></Route>
                <Route
                  path="/accounting/entries/salesReport/:id/:name"
                  element={<SalesReport />}
                ></Route>
                <Route
                  path="/accounting/entries/salesQSummary/:id/:name"
                  element={<SalesQuantativeSummary />}
                ></Route>
                <Route
                  path="/accounting/entries/inventoryStockLedger/:id/:name"
                  element={<InventoryStockLedger />}
                ></Route>
                <Route
                  path="/accounting/entries/itemExpiry/:id/:name"
                  element={<ItemExpiry />}
                ></Route>
                <Route
                  path="/accounting/entries/closingStock/:id/:name"
                  element={<ClosingStock />}
                ></Route>
                <Route
                  path="/accounting/entries/cashBankStatement/:id/:name"
                  element={<CashBankStatement />}
                ></Route>
                <Route
                  path="/accounting/entries/merchantSummary/:id/:name"
                  element={<MerchantSummary />}
                ></Route>
                <Route
                  path="/accounting/entries/outstandingStatement/:id/:name"
                  element={<OutstandingStatement />}
                ></Route>
                <Route
                  path="/accounting/entries/salesToOtherBranch/:id/:name"
                  element={<SalesToOtherBranch />}
                ></Route>
                <Route
                  path="/accounting/entries/paymentVoucherScan/:id/:name"
                  element={<PaymentVoucherScan />}
                ></Route>
                <Route
                  path="/accounting/entries/ooPayment/:id/:name"
                  element={<OredooOmantel />}
                ></Route>
                <Route
                  path="/accounting/entries/bs/:id/:name"
                  element={<BankStatement />}
                ></Route>
                <Route
                  path="/accounting/entries/creditSales/:id/:name"
                  element={<CreditSales />}
                ></Route>
                <Route
                  path="/accounting/entries/pcm/:id/:name"
                  element={<ProductCostingMan />}
                ></Route>
                <Route
                  path="/accounting/entries/pcs/:id/:name"
                  element={<ProductCostingServices />}
                ></Route>
                <Route
                  path="/accounting/entries/monthlyDiscount/:id/:name"
                  element={<MonthlyDiscount />}
                ></Route>
                <Route
                  path="/accounting/entries/monthlyOffers/:id/:name"
                  element={<MonthlyOffers />}
                ></Route>
                <Route
                  path="/accounting/fs/:id/:name"
                  element={<FinancialStatements />}
                ></Route>
                <Route
                  path="/accounting/fs/balancesheet/:id/:name"
                  element={<BalanceSheet />}
                ></Route>
                <Route
                  path="/accounting/fs/incomestatement/:id/:name"
                  element={<IncomeStatement />}
                ></Route>
                <Route
                  path="/accounting/fs/vatreport/:id/:name"
                  element={<VATReport />}
                ></Route>
                <Route
                  path="/accounting/fs/vatreturn/:id/:name"
                  element={<VATReturn />}
                ></Route>
                <Route
                  path="/accounting/fs/taxreport/:id/:name"
                  element={<TaxReport />}
                ></Route>
                <Route
                  path="/accounting/fs/vatreturntracker/:id/:name"
                  element={<VATReturnTracker />}
                ></Route>
                <Route
                  path="/accounting/invoice/:id/:name"
                  element={<Invoices />}
                ></Route>
                <Route
                  path="/accounting/prinvoice/:id/:name"
                  element={<PRInvoices />}
                ></Route>
                <Route
                  path="/accounting/dailentries/purchases/:id/:name"
                  element={<Purchases />}
                ></Route>
                <Route
                  path="/accounting/dailentries/sales/:id/:name"
                  element={<Sales />}
                ></Route>
                {/* Misc */}
                <Route path="/notAuthorized" element={<NotAuthorize />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
            </LazyMotion>
          </AnimatePresence>
        </Router>
      </Suspense>
    </div>
  );
};

export default Routing;
