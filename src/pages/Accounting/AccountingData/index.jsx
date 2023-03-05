import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Cookies from "universal-cookie";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import { cards, container, item } from "./constants";
import BreadCrumb from "../../../components/BreadCrumb";
import { Divider } from "antd";
import { removeUnderScore } from "../../../utilities";
import "./DashBoard.css";

const AccountingData = () => {
  const param = useParams();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };
  const user = token && jwtDecode(token);

  const navigation = [
    { id: 0, name: "Dashboard", url: "/accounting/dashboard" },
    {
      id: 1,
      name: "Pre Selection",
      url: "/accounting/preselectiondata",
    },
    {
      id: 2,
      name: `Accounting Data for ${removeUnderScore(param.name)}`,
      active: true,
    },
  ];

  useEffect(() => {
    document.title = "Dashboard - Accounting Data";
    if (token) {
      try {
        var user = token && jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {}
    }
  }, [token]);

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header home={"/accounting/dashboard"} logOut={"/accounting"} />
      <div className="accounting-contacts">
        <m.div className="title-text primary-color" variants={item}>
          {`Accounting Data for ${removeUnderScore(param.name)}`}
        </m.div>
        <m.div className="accounting-filter-nav-header-without" variants={item}>
          <BreadCrumb items={navigation} />
        </m.div>
        <Divider />
        <AnimatePresence>
          <m.div
            className="ds-cards-main"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {cards(user, param).map(
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
        </AnimatePresence>
      </div>
    </m.div>
  );
};

export default AccountingData;
