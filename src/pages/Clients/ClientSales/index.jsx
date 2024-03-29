import React, { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Divider } from "antd";
import { predashoptions } from "./constant";
import { HiOutlineDocumentReport } from "react-icons/hi";
import "./dailyentries.css";
import Header from "../../../components/Header";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../../../utilities";

const ClientSales = () => {
  const entries = {};
  const access = JSON.parse(localStorage.getItem("access"));
  const params = useParams();
  const navigateTo = useNavigate();
  useEffect(() => {
    document.title = "Accounting - Sales";
  }, []);

  const navigation = [
    { id: 0, name: "Dashboard", url: "/client/dashboard" },
    {
      id: 1,
      name: `Entries`,
      url: `/accounting/client/dailyentries/${params.id}/${params.name}`,
    },
    {
      id: 2,
      name: "Sales",
      active: true,
    },
  ];

  access.sales.forEach((elem, i) => {
    entries[access.sales[i].label] = elem.value;
  });

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header home={"/client/dashboard"} logOut={"/client"} />
      <div className="main-body">
        <m.div className="title-text primary-color" variants={item}>
          Entries - Sales
        </m.div>
        <BreadCrumb items={navigation} />
        <Divider orientation="center" orientationMargin="0">
          <div className="bolder text-black">Please select your report</div>
        </Divider>
        <AnimatePresence>
          <m.div
            className="cards-main-rec"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {predashoptions(params, entries).map(
              (card) =>
                !card.disabled && (
                  <m.div
                    className="cards-main-rec__each"
                    key={card.id}
                    onClick={() => navigateTo(card.path)}
                    variants={item}
                  >
                    <div className="dash-card-icon">
                      <HiOutlineDocumentReport style={{ fontSize: "40px" }} />
                    </div>
                    <div className="flex-small-gap-column">
                      <h2>{card.title}</h2>
                    </div>
                    <div className="go-corner" href="#">
                      <div className="go-arrow">→</div>
                    </div>
                  </m.div>
                )
            )}
          </m.div>
        </AnimatePresence>
      </div>
    </m.div>
  );
};

export default ClientSales;
