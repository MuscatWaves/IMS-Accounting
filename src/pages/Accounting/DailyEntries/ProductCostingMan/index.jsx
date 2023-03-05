import React, { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import Header from "../../../../components/Header";
import Cookies from "universal-cookie";
import BreadCrumb from "../../../../components/BreadCrumb";
import { container, item } from "../../AccountingDashBoard/constants";
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
import ProductCostingManFormCreate from "./ProductCostingManCreate";
import ProductCostingManFilter from "./ProductCostingManFilter";
import dayjs from "dayjs";
import { removeUnderScore, string } from "../../../../utilities";
import { useParams } from "react-router-dom";
import "./productcostingman.css";

const ProductCostingMan = () => {
  const params = useParams();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [moreInfoModal, toggleMoreInfoModal] = useState(false);
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
    document.title = "Accounting - Product cost sheet for Manufacturing";
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
      name: `Entries`,
      url: `/accounting/entries/${params.id}/${params.name}`,
    },
    {
      id: 2,
      name: "Product cost sheet for Manufacturing",
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
        `/api/pcsfm?search=${values.search}&page=${page}`,
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
      title: "Time Period",
      render: (record) => <div>{record.timeDatePeriod}</div>,
    },
    {
      title: "Product Name",
      render: (record) => <div>{record.productName}</div>,
    },
    {
      title: "Opening Stock",
      render: (record) => (
        <div className="text-grey">{record.openingStock}</div>
      ),
    },
    {
      title: "Closing Stock",
      render: (record) => (
        <div className="text-grey">{record.closingStock}</div>
      ),
    },
    {
      title: "Total Revenue",
      render: (record) => <div className="text-grey">{record.revenue}</div>,
    },
    {
      title: "Gross Profit",
      render: (record) => <div className="text-grey">{record.grossProfit}</div>,
    },
    {
      title: "Net Profit",
      render: (record) => <div className="text-grey">{record.netProfit}</div>,
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
      url: `/api/pcsfm/${deletionData.id}`,
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
      label: "Opening Stock",
      value: editData?.openingStock,
    },
    {
      id: 2,
      label: "Closing Stock",
      value: editData?.closingStock,
    },
    {
      id: 3,
      label: "Total Revenue",
      value: editData?.revenue,
    },
    {
      id: 4,
      label: "Total VAT",
      value: editData?.vat,
    },
  ];

  const showDetailData2 = [
    {
      id: 1,
      label: "Direct Expenses",
      value: editData?.directExpenses,
    },
    {
      id: 2,
      label: "Total Material Cost",
      value: editData?.materialCost,
    },
    {
      id: 3,
      label: "Total Labor Cost",
      value: editData?.laborCost,
    },
    {
      id: 4,
      label: "Total Fixed Expenses",
      value: editData?.fixedExpenses,
    },
    {
      id: 5,
      label: "Total Variable Expenses",
      value: editData?.variableExpenses,
    },
    {
      id: 6,
      label: "Administration Cost",
      value: editData?.administrationCost,
    },
    {
      id: 7,
      label: "Total Selling cost",
      value: editData?.sellingCost,
    },
    {
      id: 8,
      label: "Depreciation",
      value: editData?.depreciation,
    },
  ];

  const showDetailData3 = [
    {
      id: 1,
      label: "Total Number of units produce",
      value: editData?.numberOfUnitsProduce,
    },
    {
      id: 2,
      label: "Rate per units",
      value: editData?.ratePerUnits,
    },
    {
      id: 3,
      label: "Total Cost of Product",
      value: editData?.CostOfProduct,
    },
    {
      id: 4,
      label: "Total sales of Product",
      value: editData?.SalesOfProduct,
    },
    {
      id: 5,
      label: "Gross Profit",
      value: editData?.grossProfit,
    },
    {
      id: 6,
      label: "Net Profit",
      value: editData?.netProfit,
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
        <ProductCostingManFormCreate
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
          <div className="title-text">{editData?.productName}</div>
          <div className="medium-text bold">{editData?.timeDatePeriod}</div>
          <Divider />
          <div className="flex-between">
            {showDetailData1.map((data) => (
              <div key={data.id}>
                <div className="bolder text-black">{data.label}</div>
                <div className="bold text-grey">{data.value}</div>
              </div>
            ))}
          </div>
          <div>
            {showDetailData2.map((data) => (
              <div key={data.id}>
                <Divider orientation="left" orientationMargin="0">
                  <div className="bolder text-black small-text">
                    {data.label}
                  </div>
                </Divider>
                <div
                  className="bold text-grey text-padding-left"
                  style={{ textAlign: "justify" }}
                >
                  {data.value && string(data.value, "loaded")}
                </div>
              </div>
            ))}
          </div>
          <Divider />
          <div className="cards-main">
            {showDetailData3.map((data) => (
              <div key={data.id}>
                <div className="bolder text-black">{data.label}</div>
                <div className="bold text-grey">{data.value}</div>
              </div>
            ))}
          </div>
          <div></div>
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
          Product cost sheet for Manufacturing
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
            <ProductCostingManFilter
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

export default ProductCostingMan;
