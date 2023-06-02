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
import { ObjectUpdateApi } from "../api/objectsApi";


const { Header, Sider, Content, Footer } = Layout;

const SupplierPage = () => {
  const user = useSelector((state) => state.user);
  const objectM = useSelector((state) => state.objectManager);
  const miniApp = useSelector((state) => state.miniApp);

  const [supplierObject, setSupplierObject] = useState();
  const [busyDates, setBusyDates] = useState([]);
  const [serviceRequest,setServiceRequest] = useState();
  const [latestClients, setLatestClients] = useState([
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

  
    const [services, setServices] = useState([]);
    const [notYetServices, setNotYetServices] = useState([]);


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

    const [mapdData, setMappedData] = useState(null);  
  
    useEffect(() => {
      // Function to execute
      const getDataFromServer = async () => {
        try {
          // const filteredData = services.filter(
          //   item =>
          //     item.objectDetails.supplierMail === supplierObject.objectDetails.mail &&
          //     item.objectDetails.status === "NOT YET"
          // );
    
          const mappedData = services.map(item => ({
            name: item.objectDetails.customerMail,
            date: item.objectDetails.date[1],
            approval: item.objectDetails.status
          }));
    
          setMappedData(mappedData);
        } catch (error) {
          console.log(error);
        }
      };
    
      // Call the function
      getDataFromServer();
    }, []);
      
  const filteredServicesNotYet = (services)=>{
  services.filter(
    service =>
      service.objectDetails.supplierMail === supplierObject.objectDetails.mail &&
      service.objectDetails.status === 'NOT YET'
  
  );
}
  const filteredServicesApproved = (services)=>{
    services.filter(
    service =>
      service.objectDetails.supplierMail === supplierObject.objectDetails.mail &&
      service.objectDetails.status === 'APPROVED'
  );}

  const filteredServicesRejected = (services)=>{
    services.filter(
    service =>
      service.objectDetails.supplierMail === supplierObject.objectDetails.mail&&
      service.objectDetails.status === 'REJECTED'
  );}
  


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
      const  prop = supplierObject.objectId.split('#');
      let tempObject = JSON.parse(JSON.stringify(supplierObject));
      tempObject["objectDetails"]["busyDates"] = [...busyDates, formattedDate] ;
      await ChangeToSuperAppUser();
      await ObjectUpdateApi(supplierObject.objectDetails.mail,prop[1],{objectDetails:tempObject.objectDetails});
      await ChangeToSuperAppUser();
    } catch (error) {
      await ChangeToSuperAppUser();
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

  const waitingColumns = [
    { title: "Customer E-mail",
     dataIndex: "name", 
     key: "name" },
    { title: "Date Requested",
     dataIndex: "date", 
     key: "date" },
    {
      title: "Approval",
      dataIndex: "approval",
      key: "approval",
      render: (_, record) => (
        <Popconfirm
          title="Approve"
          description="Are you sure you want to approve?"
          okText="Approve"
          cancelText="Reject"
        >
          <Button>Approve</Button>
        </Popconfirm>
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
          <Table dataSource={mapdData} columns={waitingColumns} />
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default SupplierPage;
