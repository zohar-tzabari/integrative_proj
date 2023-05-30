import React, { useEffect, useState } from "react";
import {
  Switch,
  Layout,
  DatePicker,
  Table,
  Button,
  List,
  Popconfirm,
} from "antd";
import { GetObjectByType } from "../api/objectsApi";
import { useSelector } from "react-redux";

const { Header, Sider, Content, Footer } = Layout;

const SupplierPage = () => {
  const [busyDates, setBusyDates] = useState([
    "2023-05-15",
    "2023-05-20",
    "2023-05-22",
  ]);
  const [latestClients, setLatestClients] = useState([
    { id: 1, name: "Client A", date: "2023-05-25", approval: "No" },
    { id: 2, name: "Client B", date: "2023-05-27", approval: "No" },
    { id: 3, name: "Client C", date: "2023-05-28", approval: "No" },
  ]);
  const [supplierObject, setSupplierObject] = useState();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // Function to execute
    const fetchData = async () => {
      const supObject = await GetObjectByType(
        "Supplier",
        user.user.userId.email
      );
      setSupplierObject(supObject);
      console.log(supObject);
    };
    // Call the function
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const disabledDate = (current) => {
    // Disable dates that are already busy
    const formattedDate = current.format("YYYY-MM-DD");
    return busyDates.includes(formattedDate);
  };

  const handleDateChange = (date, dateString) => {
    const formattedDate = date.format("YYYY-MM-DD");
    if (busyDates.includes(formattedDate)) {
      // Remove date if it already exists in the array
      setBusyDates(busyDates.filter((date) => date !== formattedDate));
    } else {
      // Add date if it doesn't exist in the array
      setBusyDates([...busyDates, formattedDate]);
    }
  };

  const handleApprovalChange = (clientId, checked) => {
    const updatedClients = latestClients.map((client) => {
      if (client.id === clientId) {
        return { ...client, approval: checked ? "Yes" : "No" };
      }
      return client;
    });
    console.log(updatedClients);
    setLatestClients(updatedClients);
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Client Name", dataIndex: "name", key: "name" },
    { title: "Request Date", dataIndex: "date", key: "date" },
    {
      title: "Approval",
      dataIndex: "approval",
      key: "approval",
      render: (_, record) => (
        
        <Switch
          checked={record.approval === "Yes"}
          onChange={(checked) => handleApprovalChange(record.id, checked)}
        />
      ),
    },
  ];

  const handleRemoveDate = (dateToRemove) => {
    setBusyDates(busyDates.filter((date) => date !== dateToRemove));
  };

  return (
    <Layout>
      <Sider style={{ background: "#fff" }}></Sider>
      <Layout>
        <Content>
          <h2>Select Busy Dates</h2>
          <DatePicker disabledDate={disabledDate} onChange={handleDateChange} />
          <h2>Busy Dates</h2>
          <List
            dataSource={busyDates}
            renderItem={(date) => (
              <List.Item
                actions={[
                  <Popconfirm
                    title="Delete the date"
                    description="Are you sure to delete this date?"
                    onConfirm={() => handleRemoveDate(date)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button>Delete</Button>
                  </Popconfirm>,
                ]}
              >
                {date}
              </List.Item>
            )}
          />

          <h2>Customers Requests Table</h2>
          <Table dataSource={latestClients} columns={columns} />
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default SupplierPage;
