import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import Cookies from "universal-cookie";
import BreadCrumb from "../../../components/BreadCrumb";
import {
  Button,
  Divider,
  Input,
  message,
  Modal,
  Pagination,
  Table,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { useQuery } from "react-query";
import AcaFormCreate from "./acacreate";
import AcaFilter from "./acaFilter";
import { container, item } from "../../../utilities";
import { BsCheckCircleFill } from "react-icons/bs";
import dayjs from "dayjs";
import "./aca.css";

const AccountingClientAccess = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [isModalOpen, toggleModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deletionData, setDeletionData] = useState(null);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [moreInfoModal, toggleMoreInfoModal] = useState(false);
  var localizedFormat = require("dayjs/plugin/localizedFormat");
  dayjs.extend(localizedFormat);
  const [filter, setFilter] = useState({
    search: "",
    clientName: "",
    crNumber: "",
    clientEmail: "",
  });
  const [isFilterModal, toggleFilterModal] = useState(false);

  useEffect(() => {
    document.title = "Accounting - Manage Client Access";
    refetch(filter);
    // eslint-disable-next-line
  }, []);

  const refetch = (values) => {
    getData(values, page);
  };

  const navigation = [
    { id: 0, name: "Dashboard", url: "/accounting/dashboard" },
    {
      id: 4,
      name: "Manage Client Access",
      active: true,
    },
  ];

  const onChange = (page) => {
    setPage(page);
    getData(filter, page);
  };

  const { data: clientsList } = useQuery(
    ["clients"],
    () =>
      axios.get("/api/client", {
        headers: {
          Authorization: token,
        },
      }),
    {
      refetchOnWindowFocus: false,
      select: (data) => {
        const newData = data.data.data.map((item) => ({
          label: item.name,
          value: item.id,
        }));
        return newData;
      },
    }
  );

  const getData = async (values, page) => {
    setLoading(true);
    setData([]);
    let config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const Data = await axios.get(
        `/api/clientaccess?search=${values.search}&page=${page}`,
        config
      );
      if (Data.status === 200) {
        setLoading(false);
        setData(Data.data.data);
        setTotal(Data.data.TotalDisplay);
      } else {
        if (Data.status === 201) {
          message.error(Data.data.error);
          setLoading(false);
        } else {
          message.error("Ouch, Something Went Terribly Wrong!");
          setLoading(false);
        }
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Client",
      render: (record) => (
        <div>
          <div className="text-black bold">{record.name}</div>
          <div className="very-small-text text-grey bold">{record.email}</div>
        </div>
      ),
    },
    {
      title: "Created Date",
      render: (record) => <div>{dayjs(record.createdAt).format("llll")}</div>,
    },
    // {
    //   title: "Access Provided",
    //   render: (record) => <div>{record.accessmap()}</div>
    // },
    {
      title: "Actions",
      render: (record) => (
        <div className="flex-small-gap">
          <Button
            type="primary"
            onClick={() => {
              setEditData(record);
              toggleMoreInfoModal(true);
            }}
            ghost
          >
            <div className="bold">View Access Information</div>
          </Button>
          <Button
            type="primary"
            shape="round"
            icon={<EditOutlined />}
            onClick={() => {
              setEditData(record);
              toggleModal(true);
            }}
          />
          <Button
            type="primary"
            shape="round"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeletionData(record);
              toggleDeleteModal(true);
            }}
          />
        </div>
      ),
      width: "300px",
    },
  ];

  const deleteData = async () => {
    setDeleteLoading(true);
    await axios({
      method: "delete",
      url: `/api/clientaccess/${deletionData.id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    })
      .then(function (response) {
        message.success("The data has been sucessfully deleted");
        toggleDeleteModal(false);
        setDeletionData("");
        refetch(filter);
        setDeleteLoading(false);
      })
      .catch(function (response) {
        message.error("Something Went Wrong!", "error");
        setDeleteLoading(false);
        setData([]);
      });
  };

  const handleCancel = () => {
    toggleDeleteModal(false);
    setDeleteLoading(false);
    setDeletionData(null);
  };

  const entries = [
    { id: 1, label: "GRV Report", value: editData?.grv },
    { id: 6, label: "Attendance", value: editData?.attendance },
    {
      id: 9,
      label: "Inventory Stock in-out Ledger",
      value: editData?.inventoryStockInOutLedger,
    },
    { id: 10, label: "Item Expiry", value: editData?.itemExpiry },
    {
      id: 11,
      label: "Closing Stock with values",
      value: editData?.closingStockwithvalues,
    },
    {
      id: 12,
      label: "Excel Cash & Bank Payments",
      value: editData?.excelCashBankPayments,
    },
    { id: 13, label: "Merchant Summary", value: editData?.merchantSummary },
    {
      id: 14,
      label: "Outstanding Statement Supplier",
      value: editData?.outstandingStatementSupplier,
    },
    {
      id: 16,
      label: "Payment Voucher Scan",
      value: editData?.paymentVoucherScan,
    },
    {
      id: 17,
      label: "Ooredoo & Omantel Sales & Payment Balance",
      value: editData?.ooredooOmantelSalesPaymentBalance,
    },
    { id: 18, label: "Bank Statement", value: editData?.bankStatement },
    {
      id: 20,
      label: "Product cost sheet for Manufacturing",
      value: editData?.productCostSheetForManufacturing,
    },
    {
      id: 21,
      label: "Product cost sheet for Services",
      value: editData?.productCostSheetForServices,
    },
    {
      id: 22,
      label: "Monthly Discounts",
      value: editData?.monthlyDiscount,
    },
    {
      id: 23,
      label: "Monthly Offers",
      value: editData?.monthlyOffers,
    },
  ];

  const purchase = [
    { id: 2, label: "Purchase Report", value: editData?.purchase },
    { id: 3, label: "Purchase Return Report", value: editData?.purchaseReturn },
    {
      id: 4,
      label: "Purchase from Other Branches",
      value: editData?.purchaseFromOtherBranches,
    },
    {
      id: 5,
      label: "Purchase Invoice Scan",
      value: editData?.purchaseInvoiceScan,
    },
  ];

  const sales = [
    { id: 7, label: "Sales Report", value: editData?.salesReport },
    {
      id: 8,
      label: "Sales Quantitative Summary",
      value: editData?.salesQuantitativeSummary,
    },
    {
      id: 15,
      label: "Sales to other store",
      value: editData?.salesToOtherStoreIfAny,
    },
    { id: 19, label: "Credit Sales", value: editData?.creditSales },
  ];

  const financialStatements = [
    { id: 1, label: "Balance Sheet", value: editData?.balanceSheetColumns },
    {
      id: 2,
      label: "Income Statements",
      value: editData?.incomeStatementsColumns,
    },
    { id: 3, label: "VAT Report", value: editData?.vatReportColumns },
    { id: 4, label: "VAT Return", value: editData?.vatReturnColumns },
    { id: 5, label: "Tax Report", value: editData?.taxReportColumns },
    { id: 6, label: "VAT Return Tracker", value: editData?.vatReturnTracker },
  ];

  const invoices = [
    { id: 7, label: "Invoice Details", value: editData?.invoiceDetails },
    {
      id: 8,
      label: "Payments Received Invoice",
      value: editData?.paymentsReceivedInvoice,
    },
  ];

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {isModalOpen && (
        <AcaFormCreate
          isModalOpen={isModalOpen}
          setModal={toggleModal}
          editData={editData}
          setEditData={setEditData}
          getData={refetch}
          filterValues={filter}
          clientsList={clientsList}
        />
      )}
      <Modal
        title="Delete Confirmation"
        open={deleteModal}
        onOk={deleteData}
        onCancel={handleCancel}
        okText={"Delete"}
        okType={"danger"}
        confirmLoading={deleteLoading}
      >
        <p>{`Are you sure you want to delete the entry created at "${dayjs(
          deletionData?.createdAt
        ).format("llll")}" from data?`}</p>
      </Modal>
      <Modal
        title={
          <div className="large-text bold text-light-grey">
            More information
          </div>
        }
        open={moreInfoModal}
        onCancel={() => {
          setEditData(null);
          toggleMoreInfoModal(false);
        }}
        footer={false}
        centered
      >
        <div className="very-small-padding">
          <div className="title-text">{editData?.name}</div>
          <div className="medium-text bold">{editData?.email}</div>
          {entries.filter((entry) => entry.value).length > 0 && (
            <div>
              <Divider orientation="left" orientationMargin="0">
                <div className="bolder text-black small-text">
                  Daily entries
                </div>
              </Divider>
              <div className="client-access-card">
                {entries
                  .filter((entry) => entry.value)
                  .map((data) => (
                    <div className="flex-small-gap" key={data.id}>
                      <BsCheckCircleFill className="text-green" />
                      <div>{data.label}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {purchase.filter((entry) => entry.value).length > 0 && (
            <div>
              <Divider orientation="left" orientationMargin="0">
                <div className="bolder text-black small-text">Purchases</div>
              </Divider>
              <div className="client-access-card">
                {purchase
                  .filter((entry) => entry.value)
                  .map((data) => (
                    <div className="flex-small-gap" key={data.id}>
                      <BsCheckCircleFill className="text-green" />
                      <div>{data.label}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {sales.filter((entry) => entry.value).length > 0 && (
            <div>
              <Divider orientation="left" orientationMargin="0">
                <div className="bolder text-black small-text">Sales</div>
              </Divider>
              <div className="client-access-card">
                {sales
                  .filter((entry) => entry.value)
                  .map((data) => (
                    <div className="flex-small-gap" key={data.id}>
                      <BsCheckCircleFill className="text-green" />
                      <div>{data.label}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {financialStatements.filter((entry) => entry.value).length > 0 && (
            <div>
              <Divider orientation="left" orientationMargin="0">
                <div className="bolder text-black small-text">
                  Financial Statements
                </div>
              </Divider>
              <div className="client-access-card">
                {financialStatements
                  .filter((entry) => entry.value)
                  .map((data) => (
                    <div className="flex-small-gap" key={data.id}>
                      <BsCheckCircleFill className="text-green" />
                      <div>{data.label}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {invoices.filter((entry) => entry.value).length > 0 && (
            <div>
              <Divider orientation="left" orientationMargin="0">
                <div className="bolder text-black small-text">Invoices</div>
              </Divider>
              <div className="client-access-card">
                {invoices
                  .filter((entry) => entry.value)
                  .map((data) => (
                    <div className="flex-small-gap" key={data.id}>
                      <BsCheckCircleFill className="text-green" />
                      <div>{data.label}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
      <Header home={"/accounting/dashboard"} logOut={"/accounting"} />
      <m.div
        className="accounting-contacts"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="title-text primary-color" variants={item}>
          Manage Client Access
        </m.div>
        <m.div className="accounting-filter-nav-header-without" variants={item}>
          <BreadCrumb items={navigation} />
          <div className="flex-small-gap">
            <form
              className="hidden"
              onSubmit={(e) => {
                e.preventDefault();
                setFilter({
                  ...filter,
                  search: name,
                });
                refetch({
                  search: name,
                  clientName: filter?.clientName,
                  crNumber: filter?.crNumber,
                  clientEmail: filter?.clientEmail,
                });
              }}
            >
              <Input
                placeholder="Search"
                prefix={<AiOutlineSearch className="large-text" />}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button className="hidden" htmlType="submit">
                Search
              </Button>
            </form>
            <Button
              type="primary"
              onClick={() => {
                toggleFilterModal(true);
              }}
              className="hidden"
              // className={checkFilterActive(filter) && "filter-button--active"}
            >
              <FaFilter className="small-text" />
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setEditData(null);
                toggleModal(true);
              }}
            >
              + Create
            </Button>
          </div>
        </m.div>
        <AnimatePresence>
          {isFilterModal && (
            <AcaFilter
              isFilterModal={isFilterModal}
              toggleFilterModal={toggleFilterModal}
              filterData={filter}
              setFilterData={setFilter}
              getData={refetch}
              loading={isLoading}
              clientsList={clientsList}
            />
          )}
        </AnimatePresence>
        <m.div variants={item}>
          <Table
            dataSource={data}
            columns={columns}
            loading={isLoading}
            pagination={false}
            rowKey={"id"}
          />
          <div className="pagination">
            <div className="pagination-total">{`Showing ${
              page === 1 ? 1 : page * 10 - 10 + 1
            } to ${page * 10 > total ? total : page * 10} of ${total}`}</div>
            <Pagination
              current={page}
              onChange={onChange}
              total={total}
              showSizeChanger={false}
            />
          </div>
        </m.div>
      </m.div>
    </m.div>
  );
};

export default AccountingClientAccess;
