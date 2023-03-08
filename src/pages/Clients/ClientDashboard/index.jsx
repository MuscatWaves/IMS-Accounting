import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import { useQuery } from "react-query";
import { cards, container, item } from "./constants";
import axios from "axios";
import Loader from "../../../components/Loader";
import "./DashBoard.css";

const AccountingDashBoard = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  const user = token && jwtDecode(token);

  useEffect(() => {
    document.title = "Dashboard - Client";
    if (token) {
      try {
        var user = token && jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {}
    }
  }, [token]);

  const { data: clientsList, isFetching } = useQuery(
    ["clients"],
    () =>
      axios.get("/api/clientselfaccess", {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const editData = data.data.data[0];

        const entries = [
          { id: 1, label: "grv", value: editData?.grv },
          { id: 6, label: "attendance", value: editData?.attendance },
          {
            id: 9,
            label: "inventoryStockInOutLedger",
            value: editData?.inventoryStockInOutLedger,
          },
          { id: 10, label: "itemExpiry", value: editData?.itemExpiry },
          {
            id: 11,
            label: "closingStockwithvalues",
            value: editData?.closingStockwithvalues,
          },
          {
            id: 12,
            label: "excelCashBankPayments",
            value: editData?.excelCashBankPayments,
          },
          {
            id: 13,
            label: "merchantSummary",
            value: editData?.merchantSummary,
          },
          {
            id: 14,
            label: "outstandingStatementSupplier",
            value: editData?.outstandingStatementSupplier,
          },
          {
            id: 16,
            label: "paymentVoucherScan",
            value: editData?.paymentVoucherScan,
          },
          {
            id: 17,
            label: "ooredooOmantelSalesPaymentBalance",
            value: editData?.ooredooOmantelSalesPaymentBalance,
          },
          { id: 18, label: "bankStatement", value: editData?.bankStatement },
          {
            id: 20,
            label: "productCostSheetForManufacturing",
            value: editData?.productCostSheetForManufacturing,
          },
          {
            id: 21,
            label: "productCostSheetForServices",
            value: editData?.productCostSheetForServices,
          },
          {
            id: 22,
            label: "monthlyDiscount",
            value: editData?.monthlyDiscount,
          },
          {
            id: 23,
            label: "monthlyOffers",
            value: editData?.monthlyOffers,
          },
        ];

        const purchase = [
          { id: 2, label: "purchase", value: editData?.purchase },
          {
            id: 3,
            label: "purchaseReturn",
            value: editData?.purchaseReturn,
          },
          {
            id: 4,
            label: "purchaseFromOtherBranches",
            value: editData?.purchaseFromOtherBranches,
          },
          {
            id: 5,
            label: "purchaseInvoiceScan",
            value: editData?.purchaseInvoiceScan,
          },
        ];

        const sales = [
          { id: 7, label: "salesReport", value: editData?.salesReport },
          {
            id: 8,
            label: "salesQuantitativeSummary",
            value: editData?.salesQuantitativeSummary,
          },
          {
            id: 15,
            label: "salesToOtherStoreIfAny",
            value: editData?.salesToOtherStoreIfAny,
          },
          { id: 19, label: "creditSales", value: editData?.creditSales },
        ];

        const financialStatements = [
          {
            id: 1,
            label: "balanceSheetColumns",
            value: editData?.balanceSheetColumns,
          },
          {
            id: 2,
            label: "incomeStatementsColumns",
            value: editData?.incomeStatementsColumns,
          },
          {
            id: 3,
            label: "vatReportColumns",
            value: editData?.vatReportColumns,
          },
          {
            id: 4,
            label: "vatReturnColumns",
            value: editData?.vatReturnColumns,
          },
          {
            id: 5,
            label: "taxReportColumns",
            value: editData?.taxReportColumns,
          },
          {
            id: 6,
            label: "vatReturnTracker",
            value: editData?.vatReturnTracker,
          },
          { id: 7, label: "invoiceDetails", value: editData?.invoiceDetails },
          {
            id: 8,
            label: "paymentsReceivedInvoice",
            value: editData?.paymentsReceivedInvoice,
          },
        ];

        localStorage.setItem(
          "access",
          JSON.stringify({
            entries: entries,
            purchase: purchase,
            sales: sales,
            financialStatements: financialStatements,
          })
        );

        return {
          entries: entries,
          purchase: purchase,
          sales: sales,
          financialStatements: financialStatements,
        };
      },
    }
  );

  return (
    <m.div
      className="accounting-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header home={"/client/dashboard"} logOut={"/client"} />
      <m.span className="welcome-message">
        <h1 className="text-orange bold">Welcome</h1>
        <h1 className="text-grey">{user?.name}!</h1>
      </m.span>
      <AnimatePresence>
        {isFetching ? (
          <div className="flex-gap-column flex-center">
            <Loader minHeight={"40vh"} />
            <div className="bold">Getting your Dashboard ready!</div>
          </div>
        ) : (
          <m.div
            className="ds-cards-main"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {cards(user, clientsList).map(
              (card) =>
                !card.disabled && (
                  <m.div
                    className="cards-main__each"
                    key={card.id}
                    onClick={() => navigateTo(card.path)}
                    variants={item}
                  >
                    <div className="dash-card-icon">
                      <card.icon style={{ fontSize: "40px" }} />
                    </div>
                    <div>
                      <h2>{card.title}</h2>
                      <p className="small-text">{card.description}</p>
                    </div>
                    <div className="go-corner" href="#">
                      <div className="go-arrow">→</div>
                    </div>
                  </m.div>
                )
            )}
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
};

export default AccountingDashBoard;
