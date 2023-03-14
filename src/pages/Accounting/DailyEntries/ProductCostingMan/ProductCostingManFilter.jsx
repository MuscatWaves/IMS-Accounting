import React from "react";
import { Button, DatePicker, Divider, Form, Select } from "antd";
import { m } from "framer-motion";
import { removeUnderScore } from "../../../../utilities";
import dayjs from "dayjs";

const ProductCostingManFilter = ({
  filterData,
  setFilterData,
  getData,
  toggleFilterModal,
  loading,
  params,
}) => {
  const [form] = Form.useForm();

  const item = {
    hidden: {
      opacity: 0,
      y: "100px",
    },
    show: {
      opacity: 1,
      y: "0px",
      delay: 1,
      transition: {
        type: "spring",
        stiffness: 40,
        damping: 9,
      },
    },
  };

  const handleSearching = async (values) => {
    getData({
      search: filterData.search,
      entryDate:
        (values?.entryDate &&
          (
            dayjs(values?.entryDate).isValid() && dayjs(values?.entryDate)
          ).format("YYYY-MM-DD")) ||
        "",
    });
    setFilterData({
      search: filterData.search,
      entryDate:
        (values?.entryDate &&
          (
            dayjs(values?.entryDate).isValid() && dayjs(values?.entryDate)
          ).format("YYYY-MM-DD")) ||
        "",
    });
  };

  return (
    <m.div
      variants={item}
      initial="hidden"
      animate="show"
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
    >
      <Form
        layout="vertical"
        className="filter-box"
        onFinish={handleSearching}
        form={form}
        scrollToFirstError={true}
        initialValues={{
          clientId: params.id,
          entryDate:
            (filterData?.entryDate &&
              (
                dayjs(filterData?.entryDate).isValid() &&
                dayjs(filterData?.entryDate)
              ).format("YYYY-MM-DD")) ||
            "",
        }}
      >
        <div className="filter-box-inner">
          <Form.Item name="entryDate" label={"Date"}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
          <Form.Item name="clientId" label={"Client"}>
            <Select
              options={[
                { label: removeUnderScore(params.name), value: params.id },
              ]}
              placeholder={"Select the client"}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              showSearch
              disabled
            />
          </Form.Item>
        </div>
        <Divider />
        <div className="flex-at-end">
          <Button
            className=""
            type="text"
            onClick={() => {
              toggleFilterModal(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className=""
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            Search
          </Button>
        </div>
      </Form>
    </m.div>
  );
};

export default ProductCostingManFilter;
