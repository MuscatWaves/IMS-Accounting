import React, { lazy, Suspense } from "react";
import { LazyMotion, domAnimation, AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "../components/Loader";
import ScrollToTop from "./ScrollToTop";

// Clients
const ClientLogin = lazy(() => import("../pages/Clients/ClientLogin"));
// const ClientRegister = lazy(() => import("../pages/Clients/ClientRegister"));
const ClientDashBoard = lazy(() => import("../pages/Clients/ClientsDashBoard"));

// Recruitment
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
                {/* Recruitment */}
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
