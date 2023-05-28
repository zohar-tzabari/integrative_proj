import {
  DatePicker,
  Table,
  Button,
  Rate,
  List,
  Badge,
  Avatar,
  Form,
  Input,
  Layout
  , message
} from "antd";
import { InstagramOutlined,FacebookOutlined,MailOutlined  } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchObjectsByType } from "../api/commandApi";
import { useParams } from 'react-router-dom';



const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const { Header, Content, Footer, Sider } = Layout;



const PickDate = () => {
  const [date, setDate] = useState(null);
  const [busyDates, setBusyDates] = useState([
    "2023-03-15",
    "2023-03-23",
    "2023-04-02",
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

  return (
    <DatePicker
      bordered={false}
      value={date}
      onChange={setDate}
      disabledDate={disabledDate}
    />
  );
};

const RatingSup = () => {
  const [price, setPrice] = useState(0);
  const [quality, setQuality] = useState(0);
  const [services, setServices] = useState(0);

  return (
    <div>
      <br />
      price:
      <span>
        <Rate tooltips={desc} onChange={setPrice} value={price} />
        {price ? <span className="ant-rate-text">{desc[price - 1]}</span> : ""}
      </span>
      <br />
      quality:
      <span>
        <Rate tooltips={desc} onChange={setQuality} value={quality} />
        {quality ? (
          <span className="ant-rate-text">{desc[quality - 1]}</span>
        ) : (
          ""
        )}
      </span>
      <br />
      services:
      <span>
        <Rate tooltips={desc} onChange={setServices} value={services} />
        {services ? (
          <span className="ant-rate-text">{desc[services - 1]}</span>
        ) : (
          ""
        )}
      </span>
      <br />
    </div>
  );
};

const Description = ({ text, instgramLink,facebookLink,mailLink }) => {
  return (
    <div>
      {text}
      <br />
      <Button icon={<InstagramOutlined />} size="large" href={instgramLink}>
        {" "}
      </Button>
      <Button icon={<FacebookOutlined  />} size="large" href={facebookLink}>
        {" "}
      </Button>
      {console.log(mailLink)}
      <Button icon={<MailOutlined />} onClick={() => window.open(`mailto:${mailLink}`, '_blank')} size="large" href={mailLink}>
        {" "}
      </Button>
      <RatingSup />
      <PickDate />
    </div>
  );
};



function generateSubTable(key, value, dataIndex, title) {
  const subKeys = Object.keys(value);
  const children = subKeys.map((subKey) => ({
    title: subKey.toUpperCase(),
    dataIndex: `${key}.${subKey}`,
    key: `${key}.${subKey}`,
    render: (text, record) => record[key][subKey],
  }));
  return {
    title,
    dataIndex,
    key,
    children,
  };
}



const cities = [
  {
    text: "New York",
    value: "New York",
  },
  {
    text: "London",
    value: "London",
  },
];

const columns = [
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
        text: "Dj",
        value: "Dj",
      },
      {
        text: "flowers",
        value: "flowers",
      },
      {
        text: "dresses",
        value: "dresses",
      },
    ],
    onFilter: (value, record) => record.supType.indexOf(value) === 0,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    filters: cities,
    onFilter: (value, record) => record.address.includes(value),
  },
  {
    title: "Rate grade",
    dataIndex: "rate_grade",
    key: "rate_grade",
    sorter: (a, b) => a.rate_grade - b.rate_grade,
  },
  {
    title: "Photo",
    dataIndex: "photo",
    key: "photo",
  },
];

const SupTable = () => {
  const [suppliersData, setSuppliersData] = useState(null);
  const [mapdData, setMappedData] = useState(null);

  
  useEffect( () => {
    // Function to execute
    const DataFromServer =  async () => {
      try{
        setSuppliersData(null);
        const suppliers = await searchObjectsByType("liriella71@gmail.com");
        const mappedData = suppliers.map((item) => ({
          name: item.objectDetails.name,
          address: item.objectDetails.address ? item.objectDetails.address + " " + item.objectDetails.city : item.objectDetails.city,
          supType: item.alias,
          rate_grade: 3,
          description: (
            <Description
              text= {item.objectDetails.description}
              instgramLink= {item.objectDetails.instagram}
              facebookLink = {item.objectDetails.facebook}
              mailLink = {item.objectDetails.email}
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
          <SupTable />
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
    <Footer>@all right served to wed portal</Footer>
  </Layout>
);
}



export default AllClientView;
