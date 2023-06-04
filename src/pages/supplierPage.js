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
import { searchObjectsByUserEmail, GetServicesApi } from "../api/commandApi";
import { ObjectUpdateApi } from "../api/objectsApi";
import { JsonTable } from "../sharedComponents/JsonTable";

const { Header, Sider, Content, Footer } = Layout;

const SupplierPage = () => {
  const user = useSelector((state) => state.user);
  const objectM = useSelector((state) => state.objectManager);
  const [supplierObject, setSupplierObject] = useState();
  const [busyDates, setBusyDates] = useState([]);
  const [services, setServices] = useState([]);
  const [notYetServices, setNotYetServices] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to execute
    const fetchData = async () => {
      try {
        await ChangeToMiniAppUser();
        let current = await searchObjectsByUserEmail(
          "suppliers",
          objectM.objectManager.objectId,
          user.user.userId.email,
          user.user.userId
        );
        await ChangeToMiniAppUser();
        current = await searchObjectsByUserEmail(
          "suppliers",
          objectM.objectManager.objectId,
          user.user.userId.email,
          user.user.userId
        );
        await ChangeToMiniAppUser();
        const notYetServicesData = await GetServicesApi(
          "suppliers",
          objectM.objectManager.objectId,
          user.user.userId.email,
          user.user.userId,
          "NOT YET"
        );
        await ChangeToMiniAppUser();
        const approvedServices = await GetServicesApi(
          "suppliers",
          objectM.objectManager.objectId,
          user.user.userId.email,
          user.user.userId,
          "APPROVED"
        );
        setNotYetServices(notYetServicesData);
        setServices(approvedServices);
        setSupplierObject(current);
        setBusyDates(current.objectDetails.busyDates);
        await ChangeToSuperAppUser();
      } catch (error) {
        console.error(error);
        await ChangeToSuperAppUser();
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Function to execute
    const getAllServices = async () => {
      try {
        await ChangeToMiniAppUser();
        const current = await GetObjectByType(
          "service",
          supplierObject.objectDetails.mail
        );
        setServices(current);

        await ChangeToSuperAppUser();
      } catch (error) {
        await ChangeToSuperAppUser();
      }
    };
    getAllServices();
  }, []);

  const disabledDate = (current) => {
    // Disable dates that are already busy
    const formattedDate = current.format("YYYY-MM-DD");
    return busyDates.includes(formattedDate);
  };

  const handleDateChange = async (date, dateString) => {
    const formattedDate = date.format("YYYY-MM-DD");
    setBusyDates([...busyDates, formattedDate]);
    try {
      await ChangeToMiniAppUser();
      const prop = supplierObject.objectId.split("#");
      let tempObject = JSON.parse(JSON.stringify(supplierObject));
      tempObject["objectDetails"]["busyDates"] = [...busyDates, formattedDate];
      await ChangeToSuperAppUser();
      await ObjectUpdateApi(supplierObject.objectDetails.mail, prop[1], {
        objectDetails: tempObject.objectDetails,
      });
      await ChangeToSuperAppUser();
    } catch (error) {
      await ChangeToSuperAppUser();
    }
  };

  async function handleApprovalChange(record, isApproved) {
    const object = notYetServices.find((item) => item.key === record.objectId);
    const prop = object.objectId.split("#");
    if (isApproved) {
      object["objectDetails"]["status"] = "APPROVED";
    } else {
      object["objectDetails"]["status"] = "REJECTED";
    }
    await ObjectUpdateApi(object.objectDetails.supplierMail, prop[1], {
      objectDetails: object.objectDetails,
    });
  }

  const waitingColumns = [
    {
      title: "Customer E-mail",
      dataIndex: "customerMail",
      key: "customerMail",
    },
    { title: "Date Requested", dataIndex: "date", key: "date" },
    {
      title: "Approval",
      dataIndex: "approval",
      key: "approval",
      render: (_, record) => (
        <>
          <Popconfirm
            title="Approve"
            description="Are you sure you want to approve?"
            okText="YES"
            cancelText="NO"
            onConfirm={() => handleApprovalChange(record, true)}
          >
            <Button>Approve</Button>
          </Popconfirm>
          <Popconfirm
            title="Reject"
            description="Are you sure you want to Reject?"
            okText="YES"
            cancelText="NO"
            onConfirm={() => handleApprovalChange(record, true)}
          >
            <Button>Reject</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleRemoveDate = async (dateToRemove) => {
    const newBustDates = busyDates.filter((date) => date !== dateToRemove);
    setBusyDates(newBustDates);
    try {
      await ChangeToMiniAppUser();
      const prop = supplierObject.objectId.split("#");
      let tempObject = JSON.parse(JSON.stringify(supplierObject));
      tempObject["objectDetails"]["busyDates"] = newBustDates;
      await ChangeToSuperAppUser();
      await ObjectUpdateApi(supplierObject.objectDetails.mail, prop[1], {
        objectDetails: tempObject.objectDetails,
      });
      await ChangeToSuperAppUser();
    } catch (error) {
      await ChangeToSuperAppUser();
    }
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
          <Table
            dataSource={notYetServices.map((item) => ({
              key: item.objectId,
              customerMail: item.objectDetails.customerMail,
              date: item.objectDetails.date,
            }))}
            columns={waitingColumns}
          />
          <h2>Customers Aprroved services Table</h2>
          <JsonTable
            data={services.map((item) => ({
              customerMail: item.objectDetails.customerMail,
              date: item.objectDetails.date,
            }))}
          />
        </Content>
        <Footer></Footer>
        <Sider style={{ background: "#fff" }}></Sider>

      </Layout>
    </Layout>
  );
};

export default SupplierPage;
