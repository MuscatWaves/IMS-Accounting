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
import { useQuery } from "react-query";
import AccountingClientInformationForm from "./accountingclientinformationcreate";
import AccountingClientInformationFilter from "./accountingClientInformationFilter";
import { MdOutlineHomeWork } from "react-icons/md";
import "./accountingclientinfo.css";
import { formatInput, removeUnderScore } from "../../../utilities";

const AccountingClientInformation = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDetailsData, setShowDetailsData] = useState({});
  const [isModalOpen, toggleModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deletionData, setDeletionData] = useState(null);
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    clientName: "",
    crNumber: "",
    clientEmail: "",
  });
  const [isFilterModal, toggleFilterModal] = useState(false);

  useEffect(() => {
    document.title = "Accounting - Client Information";
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
      name: "Client Information",
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
        `/api/clientinfo?search=${values.search}&page=${page}`,
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
      title: "Contact No",
      render: (record) => <div className="text-grey">{record.mobile}</div>,
    },
    {
      title: "CR No",
      render: (record) => (
        <div className="text-grey">{record.CommercialRegistrationNumber}</div>
      ),
    },
    {
      title: "VATIN",
      render: (record) => <div className="text-grey">{record.VATIN}</div>,
    },
    {
      title: "Tax No",
      render: (record) => <div className="text-grey">{record.Tax}</div>,
    },
    {
      title: "OCCI No",
      render: (record) => <div className="text-grey">{record.OCCI}</div>,
    },
    {
      title: "Actions",
      render: (record) => (
        <div className="flex-small-gap">
          <Button
            type="primary"
            onClick={() => {
              setShowDetailsData(record);
              setShowDetailsModal(true);
            }}
            ghost
          >
            <div className="bold">View More Info</div>
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
      url: `/api/accounting/contact/${deletionData.id}`,
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
        refetch();
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

  const displayData = {
    postal_code: showDetailsData.postalCode,
    po_box: showDetailsData.poBox,
    cr_no: showDetailsData.CommercialRegistrationNumber,
    VATIN_no: showDetailsData.VATIN,
    Tax_no: showDetailsData.Tax,
    OCCI_no: showDetailsData.OCCI,
    mobile: showDetailsData.mobile,
    landline: showDetailsData.landline,
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {isModalOpen && (
        <AccountingClientInformationForm
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
        <p>{`Are you sure you want to delete "${deletionData?.name}" from contact data?`}</p>
      </Modal>
      <Modal
        title="Client Information"
        open={showDetailsModal}
        footer={false}
        onCancel={() => {
          setShowDetailsModal(false);
          setShowDetailsData({});
        }}
        centered
      >
        <div>
          <div>
            <div className="flex-gap">
              <div className="dash-card-icon">
                <MdOutlineHomeWork style={{ fontSize: "40px" }} />
              </div>
              <div>
                <div className="large-text text-orange bolder">
                  {showDetailsData?.name}
                </div>
                <div className="medium-text text-grey bold">
                  {showDetailsData?.email}
                </div>
              </div>
            </div>
            <div className="small-padding">
              <div className="text-black bolder very-small-text">Address:</div>
              <div className="text-grey">{showDetailsData?.address}</div>
            </div>
            <div className="small-padding client-contact-card">
              {Object.keys(displayData).map((keyName, i) => (
                <div key={keyName} className={"each-box-cv-profile"}>
                  <div className="text-black bolder very-small-text">
                    {removeUnderScore(keyName)}:
                  </div>
                  <div className="text-grey">
                    {(displayData[keyName] &&
                      formatInput(displayData[keyName])) ||
                      "Not Provided"}
                  </div>
                </div>
              ))}
            </div>
          </div>
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
          Client Information
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
            <AccountingClientInformationFilter
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

export default AccountingClientInformation;
