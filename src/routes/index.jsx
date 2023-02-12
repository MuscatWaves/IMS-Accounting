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
