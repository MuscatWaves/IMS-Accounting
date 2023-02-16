import React, { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { container, item } from "../../Clients/ClientsDashBoard/constants";
import { Divider } from "antd";
import { predashoptions } from "./constant";
import { HiOutlineDocumentReport } from "react-icons/hi";
import "./dailyentries.css";
import Header from "../../../components/Header";
import BreadCrumb from "../../../components/BreadCrumb";

const DailyEntries = () => {
  const navigateTo = useNavigate();
  useEffect(() => {
    document.title = "Accounting - Entries";
  }, []);

  const navigation = [
    { id: 0, name: "Dashboard", url: "/accounting/dashboard" },
    {
      id: 1,
      name: "Entries",
      active: true,
    },
  ];

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header home={"/accounting/dashboard"} logOut={"/accounting"} />
      <div className="main-body">
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
            {predashoptions.map(
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

export default DailyEntries;
