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
                {/* Accounting Entries */}
                <Route path="/accounting/entries" element={<Entries />}></Route>
                <Route
                  path="/accounting/entries/grvReport"
                  element={<GRVReport />}
                ></Route>
                <Route
                  path="/accounting/entries/purchaseReport"
                  element={<PurchaseReport />}
                ></Route>
                <Route
                  path="/accounting/entries/purchaseReturnReport"
                  element={<PurchaseReturnReport />}
                ></Route>
                <Route
                  path="/accounting/entries/purchaseFromOtherBranchesReport"
                  element={<PurchaseFromOtherBranches />}
                ></Route>
                <Route
                  path="/accounting/entries/purchaseInvoiceScan"
                  element={<PurchaseInvoiceScan />}
                ></Route>
                <Route
                  path="/accounting/entries/attendanceReport"
                  element={<AttendanceReport />}
                ></Route>
                <Route
                  path="/accounting/entries/salesReport"
                  element={<SalesReport />}
                ></Route>
                <Route
                  path="/accounting/entries/salesQSummary"
                  element={<SalesQuantativeSummary />}
                ></Route>
                <Route
                  path="/accounting/entries/inventoryStockLedger"
                  element={<InventoryStockLedger />}
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
