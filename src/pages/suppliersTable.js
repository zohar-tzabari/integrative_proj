import {
  DatePicker,
  Table,
  Button,
  Rate,
  Layout
  , message
} from "antd";
import { InstagramOutlined,MailOutlined,PhoneOutlined,FacebookFilled} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { CreateNewObject } from "../api/objectsApi";

import { searchObjectsByType } from "../api/commandApi";
import { useSelector, useDispatch } from "react-redux";
import { json } from "react-router-dom";



const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const { Header, Content, Footer, Sider } = Layout;



const PickDate = ({handleDateChange,busyDatesArr}) => {
  const [date, setDate] = useState(null);

  const [busyDates, setBusyDates] = useState([
    busyDatesArr
  ]);

  const disabledDate = (current) => {
    const formattedCurrent = current.format("YYYY-MM-DD");
    const today = new Date(); // get current date
    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ); // remove time part of current date
    const selectedDate = new Date(
      current.year(),
      current.month(),
      current.date()
    ); // remove time part of selected date
    return (
      busyDates.includes(formattedCurrent) ||
      selectedDate.getTime() < currentDate.getTime()
    ); // compare dates
  };
 console.log(date);
  return (
    <DatePicker
      bordered={false}
      onChange={handleDateChange}
      disabledDate={disabledDate}
    />
  );
};

const Description = ({ text, instgramLink,facebookLink,mailLink,phoneNum,busyDates }) => {
  const [dates, setDate] = useState();
  const user = useSelector((state) => state.user);
  const [messageApi, contextHolder] = message.useMessage();


  const successMsg = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };


  const DateReserve =async ()=> {
    try{
      let json_to_server={};
      json_to_server  ["type"] = "service";
      json_to_server  ["alias"] = "service";
      json_to_server  ["createdBy"] = {userId: user.user.userId};
      json_to_server["objectDetails"] = {
      "customerMail": user.user.userId.email,
      "supplierMail": mailLink,
      "date": dates,
      "status": "NOT YET"
      }
      const result = await CreateNewObject(json_to_server);
      successMsg("request sent to the supplier")
      }
      catch (error){ console.log(error);}
      } 
  const handleDateChange = (date, dateString) => {
    const formattedDate = date.format("YYYY-MM-DD");
      setDate([date, formattedDate]);
    };  
    return (
    <div>
      {text}
      <br />
      {instgramLink && (
      <Button
      icon={<InstagramOutlined />} 
      size="large" 
      href={instgramLink}>
      </Button>
      )}
      {"   "}
      {facebookLink && (
      <Button 
      icon={<FacebookFilled   />}
      size="large" 
      href={facebookLink}>
      </Button>)}
      {"   "}
      <Button 
      icon={<MailOutlined />} 
      onClick={() => window.open(`mailto:${mailLink}`, '_blank')} 
      size="large" > 
      </Button>
      <h1><PhoneOutlined />{phoneNum}</h1>
      <div>
        <PickDate  handleDateChange={handleDateChange} busyDates = {busyDates} />
        <Button onClick = {DateReserve}> Reserve date </Button>
        </div>
    </div>
  );
};






function extractUniqueCities(data) {
  const uniqueCities = [];
  if (data && Array.isArray(data)) {
    data.forEach(item => {
      const city = item.objectDetails.city;

      if (city && !uniqueCities.includes(city)) {
        uniqueCities.push(city);
     }
    
  });
  }
  return uniqueCities;
}

const SupTable = () => {
  const [suppliersData, setSuppliersData] = useState(null);
  const [mapdData, setMappedData] = useState(null);  
  
  useEffect( () => {
    // Function to execute
    const DataFromServer =  async () => {
      try{
        setSuppliersData(null);
        const suppliers = await searchObjectsByType("supplier@mail.com"); // TODO change the hardcode <3
        const mappedData = suppliers.map((item) => ({
          name: item.objectDetails.name,
          address: item.objectDetails.address ? item.objectDetails.address + " " + item.objectDetails.city : item.objectDetails.city,
          supType: item.alias,
        
          description: (
            <Description
              text= {item.objectDetails.description}
              instgramLink= {item.objectDetails.instagram}
              facebookLink = {item.objectDetails.facebook}
              mailLink = {item.createdBy.userId.email}
              phoneNum = {item.objectDetails.phone}
              busyDates = {item.objectDetails.busyDates}
            />
          ),
          photo: item.objectDetails.photo? (
            <img
              src={item.objectDetails.photo.thumbUrl}
              alt="My Photo"
              width={100}
              height={100}
            />
          ): ""
          ,
        }));
      
      setMappedData(mappedData)
      setSuppliersData(suppliers)
      } catch (error) {
          console.log(error);
        }
    };
    // Call the function
    DataFromServer();
  }, []); // Empty dependency array to run the effect only once

  const uniqueCities = extractUniqueCities(suppliersData);

  const columns =
  [
  {
   title: "Name",
   dataIndex: "name",
   key: "name",
  },
  {
   title: "Type",
   dataIndex: "supType",
   key: "supType",
   filters: [
     {
       text: "DJs",
       value: "DJ",
     },
     {
       text: "flowers",
       value: "FLOWERS",
     },
     {
       text: "photographers",
       value: "PHOTOGRAPHER",
     },
   ],
   onFilter: (value, record) => record.supType.indexOf(value) === 0,
  },
  {
   title: "Address",
   dataIndex: "address",
   key: "address",
   filters: uniqueCities.map(city => ({
    text: city,
    value: city,
  })),
  onFilter: (value, record) => record.address.includes(value),
  },
  
  {
   title: "Photo",
   dataIndex: "photo",
   key: "photo",
  },
  ]
  
  return (
    <div>
      {
        <Table
          dataSource={mapdData}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable", 
          }}
          columns={columns}
        />
        
      }
    </div>
  );
};


const AllClientView =  () => {
  const [messageApi, contextHolder] = message.useMessage();


  const successMsg = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };

  const errorMsg = (text, duration = 9999) => {
    messageApi.open({
      type: "error",
      content: text,
      duration:duration
    });
  };

  

return (
  <Layout>
      {contextHolder}
    <Header
      style={{
        backgroundColor: "white",
        borderBottom: "none",
        padding: 0,
      }}
    >

    </Header>
    <Layout>
      <Sider
        style={{
          backgroundColor: "gray",
          borderBottom: "none",
          padding: 0,
        }}
      >
        {" "}
      </Sider>
      <Content>
        {" "}
        <div>
          <SupTable  />
        </div>
      </Content>
      <Sider
        style={{
          backgroundColor: "gray",
          borderBottom: "none",
          padding: 0,
        }}
      >
      </Sider>
    </Layout>
    <Footer>©all right served to wed portal</Footer>
  </Layout>
);
}



export default AllClientView;
