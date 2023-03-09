import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../components/Header";
import Cookies from "universal-cookie";
import BreadCrumb from "../../../components/BreadCrumb";
import { container, item } from "../../../utilities";
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
import InvoiceFormCreate from "./invoicecreate";
import InvoiceFilter from "./invoiceFilter";
import { string } from "../../../utilities";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import "./invoice.css";

const ClientInvoice = () => {
  const params = useParams();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [moreInfoModal, toggleMoreInfoModal] = useState(false);
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
    document.title = "Accounting - Invoice Details";
    refetch(filter);
    // eslint-disable-next-line
  }, []);

  const refetch = (values) => {
    getData(values, page);
  };

  // const { data: clientInformation, isFetching: dataFetching } = useQuery(
  //   ["clientInformation"],
  //   () =>
  //     axios.get(`/api/client/${params.id}`, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }),
  //   {
  //     refetchOnWindowFocus: false,
  //     select: (data) => {
  //       const newData = data.data.data;
  //       return newData[0];
  //     },
  //   }
  // );

  const navigation = [
    { id: 0, name: "Dashboard", url: "/client/dashboard" },
    {
      id: 3,
      name: "Invoice Details",
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
        `/api/clientincdt?search=${values.search}&page=${page}`,
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
      title: "Invoice Type",
      render: (record) => <div className="text-grey">{record.invoiceType}</div>,
    },
    {
      title: "Invoice Number",
      render: (record) => (
        <div className="text-grey">{record.invoiceNumber}</div>
      ),
    },
    {
      title: "Total Amount of Invoice (Net payable)",
      render: (record) => <div className="text-grey">{record.netPayable}</div>,
    },
    {
      title: "PO/WO numbers",
      render: (record) => <div className="text-grey">{record.POWONumbers}</div>,
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
      title: "VAT No",
      render: (record) => <div className="text-grey">{record.VATNumber}</div>,
    },
    {
      title: "Tax No",
      render: (record) => <div className="text-grey">{record.TaxNumber}</div>,
    },
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
            <div className="bold">View More Information</div>
          </Button>
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
          <div className="hidden">
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
        </div>
      ),
      // width: "300px",
    },
  ];

  const deleteData = async () => {
    setDeleteLoading(true);
    await axios({
      method: "delete",
      url: `/api/incdt/${deletionData.id}`,
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

  const showDetailData1 = [
    {
      id: 1,
      label: "VAT Number",
      value: editData?.VATNumber,
    },
    {
      id: 2,
      label: "Tax Number",
      value: editData?.TaxNumber,
    },
    {
      id: 3,
      label: "Invoice Type",
      value: editData?.invoiceType,
    },
    {
      id: 4,
      label: "Invoice Number",
      value: editData?.invoiceNumber,
    },
    {
      id: 5,
      label: "Total Amount of Invoice (Net payable)",
      value: editData?.netPayable,
    },
    {
      id: 6,
      label: "PO/WO numbers",
      value: editData?.POWONumbers,
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
        <InvoiceFormCreate
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
          <div className="title-text">{editData?.clientName}</div>
          <div className="medium-text bold" style={{ textAlign: "justify" }}>
            {editData?.clientAddress &&
              string(editData?.clientAddress, "loaded")}
          </div>
          <Divider />
          <div className="cards-main">
            {showDetailData1.map((data) => (
              <div key={data.id}>
                <div className="bolder text-black">{data.label}</div>
                <div className="bold text-grey">{data.value}</div>
              </div>
            ))}
          </div>
          <Divider orientation="left" orientationMargin="0">
            <div className="bolder text-black small-text">Summary</div>
          </Divider>
          <div
            className="bold text-grey text-padding-left"
            style={{ textAlign: "justify" }}
          >
            {editData?.summary && string(editData?.summary, "loaded")}
          </div>
        </div>
      </Modal>
      <Header home={"/client/dashboard"} logOut={"/client"} />
      <m.div
        className="accounting-contacts"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <m.div className="title-text primary-color" variants={item}>
          Invoice Details
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
              className="hidden"
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
            <InvoiceFilter
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

export default ClientInvoice;
