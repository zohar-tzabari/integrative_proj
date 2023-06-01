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
import { UserUpdateApi, UserLoginApi } from "../api/usersApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { searchObjectsByUserEmail } from "../api/commandApi";

const { Header, Sider, Content, Footer } = Layout;

const SupplierPage = () => {
  const user = useSelector((state) => state.user);
  const objectM = useSelector((state) => state.objectManager);
  const miniApp = useSelector((state) => state.miniApp);

  const [supplierObject, setSupplierObject] = useState();
  const [busyDates, setBusyDates] = useState();
  const [serviceRequest,setServiceRequest] = useState();
  const [latestClients, setLatestClients] = useState([
  
    { id: 1, name: "Client A", date: "2023-05-25", approval: "Yes" },
    { id: 2, name: "Client B", date: "2023-05-27", approval: "No" },
    { id: 3, name: "Client C", date: "2023-05-28", approval: "No" },
  ]);
  const dispatch = useDispatch();
 
  useEffect(() => {
    // Function to execute
    const fetchData = async () => {
      try {
        await ChangeToMiniAppUser();
        const current = await searchObjectsByUserEmail(
          "suppliers",
          objectM.objectManager.objectId,
          user.user.userId.email,
          user.user.userId,
        );
        setSupplierObject(current);
        setBusyDates(current.objectDetails.busyDates);
        await ChangeToSuperAppUser();
      } catch (error) {
        await ChangeToSuperAppUser();
      }
    };

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

  const ChangeToMiniAppUser = async () => {
    let tempUser = JSON.parse(JSON.stringify(user));
    tempUser["user"]["role"] = "MINIAPP_USER";
    await UserUpdateApi(user.user.userId.email, tempUser.user);
    const newUser = await UserLoginApi(user.user.userId.email);
    if (newUser) {
      dispatch(setUser(newUser));
    }
  };

  const ChangeToSuperAppUser = async () => {
    let tempUser = JSON.parse(JSON.stringify(user));
    tempUser["user"]["role"] = "SUPERAPP_USER";
    await UserUpdateApi(user.user.userId.email, tempUser.user);
    const newUser = await UserLoginApi(user.user.userId.email);
    if (newUser) {
      dispatch(setUser(newUser));
    }
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
