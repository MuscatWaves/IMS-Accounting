import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import Cookies from "universal-cookie";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../AccountingDashBoard/constants";
import { Button, Input, message, Modal, Pagination, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import PRFormCreate from "./prcreate";
import PRFilter from "./prFilter";
import { removeUnderScore } from "../../../utilities";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import "./pr.css";

const PRInvoice = () => {
  const params = useParams();
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
    document.title = "Accounting - Payments Received Invoice";
    refetch(filter);
    // eslint-disable-next-line
  }, []);

  const refetch = (values) => {
    getData(values, page);
  };

  const navigation = [
    { id: 0, name: "Dashboard", url: "/accounting/dashboard" },
    {
      id: 1,
      name: "Pre Selection",
      url: "/accounting/preselectiondata",
    },
    {
      id: 2,
      name: `Accounting Data for ${removeUnderScore(params.name)}`,
      url: `/accounting/data/${params.id}/${params.name}`,
    },
    {
      id: 3,
      name: "Payments Received Invoice",
      active: true,
    },
  ];

  const onChange = (page) => {
    setPage(page);
    getData(filter, page);
  };

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
        `/api/prict?search=${values.search}&page=${page}`,
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
      title: "Entry Date",
      render: (record) => <div>{dayjs(record.entryDate).format("llll")}</div>,
    },
    {
      title: "Invoice number",
      render: (record) => (
        <div className="text-grey">{record.invoiceNumber}</div>
      ),
    },
    {
      title: "PO/WO number",
      render: (record) => <div className="text-grey">{record.POWONumber}</div>,
    },
    {
      title: "Total Invoice Amount",
      render: (record) => (
        <div className="text-grey">{record.invoiceAmount}</div>
      ),
    },
    {
      title: "Total Amount Received",
      render: (record) => (
        <div className="text-grey">{record.amountReceived}</div>
      ),
    },
    {
      title: "Total Pending balance",
      render: (record) => (
        <div className="text-grey">{record.pendingBalance}</div>
      ),
    },
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
      title: "Actions",
      render: (record) => (
        <div className="flex-small-gap">
          <Button
            type="primary"
            onClick={() => {
              window.open(
                `https://cvparse.fra1.cdn.digitaloceanspaces.com/accounts/${record.attachment}`
              );
            }}
            ghost
          >
            <div className="bold">View File</div>
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
      url: `/api/prict/${deletionData.id}`,
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

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {isModalOpen && (
        <PRFormCreate
          isModalOpen={isModalOpen}
          setModal={toggleModal}
          editData={editData}
          setEditData={setEditData}
          getData={refetch}
          filterValues={filter}
          params={params}
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
        <p>{`Are you sure you want to delete ${deletionData?.type} of "${deletionData?.name}" from file data?`}</p>
      </Modal>
      <Header home={"/accounting/dashboard"} logOut={"/accounting"} />
      <m.div
        className="accounting-contacts"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="title-text primary-color" variants={item}>
          Payments Received Invoice
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
            <PRFilter
              isFilterModal={isFilterModal}
              toggleFilterModal={toggleFilterModal}
              filterData={filter}
              setFilterData={setFilter}
              getData={refetch}
              loading={isLoading}
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

export default PRInvoice;
