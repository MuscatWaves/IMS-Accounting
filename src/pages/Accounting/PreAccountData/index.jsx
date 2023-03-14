import React from "react";
import { m } from "framer-motion";
import Header from "../../../components/Header";
import BreadCrumb from "../../../components/BreadCrumb";
import axios from "axios";
import Cookies from "universal-cookie";
import { useQuery } from "react-query";
import { MdWorkOutline } from "react-icons/md";
import Spinner from "../../../components/Spinner";
import { container, item } from "../AccountingDashBoard/constants";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "./preaccountdata.css";

const PreAccountData = () => {
  const navigateTo = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const cookies = new Cookies();
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const token = cookies.get("token");
  const navigation = [
    { id: 0, name: "Dashboard", url: "/accounting/dashboard" },
    {
      id: 1,
      name: "Accounting Data - Client Selection",
      active: true,
    },
  ];

  const { data: clientsList, isFetching: jobFetching } = useQuery(
    ["aclients"],
    () =>
      axios.get(
        `/api/accountantaccess?accountantId=${user.accountantId}&clientId`,
        {
          headers: {
            Authorization: token,
          },
        }
      ),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          name: item.name,
          email: item.email,
          isActive: item.access,
          id: item.id,
        }));
        return newData;
      },
    }
  );

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Header home={"/accounting/dashboard"} logOut={"/accounting"} />
      <div className="client-batch">
        <div>
          <m.div className="title-text primary-color">
            Accounting Data - Client Selection
          </m.div>
        </div>
        <m.div className="client-filter-nav-header">
          <BreadCrumb items={navigation} />
        </m.div>
        {!jobFetching ? (
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            className="ds-cards-main-pre"
          >
            {clientsList.map((client) => (
              <m.div
                variants={item}
                key={client.id}
                className="client-each-card"
                onClick={() => {
                  const clientName = `${client.name.replace("/", "-")}`
                    .replace(/\s+/g, "_")
                    .replace(/\./g, "");
                  navigateTo(`/accounting/data/${client.id}/${clientName}`);
                }}
              >
                <div className="dash-card-icon">
                  <MdWorkOutline style={{ fontSize: "40px" }} />
                </div>
                <div className="client-inside-column">
                  <div className="bold medium-text">{client.name}</div>
                  <div className="bold small-text text-light-grey">
                    {client.email}
                  </div>
                  <div className="bold">
                    {client.isActive ? (
                      <div className="text-green">Active</div>
                    ) : (
                      <div className="text-red">Inactive</div>
                    )}
                  </div>
                  <div className="very-small-text">{client.createdAt}</div>
                </div>
              </m.div>
            ))}
          </m.div>
        ) : (
          <div
            className="flex-center"
            style={{ minHeight: "40vh", alignItems: "center" }}
          >
            <Spinner />
          </div>
        )}
      </div>
    </m.div>
  );
};

export default PreAccountData;
