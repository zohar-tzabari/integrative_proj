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
import { InstagramOutlined, MessageTwoTone } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetAllSuppliers } from "../api/commandApi";
import { useParams } from 'react-router-dom';



const desc = ["terrible", "bad", "normal", "good", "wonderful"];
const { Header, Content, Footer, Sider } = Layout;


const ChatView = ({ text, clientName }) => {
  const [textChat, setTextChat] = useState(text);
  const [clientPrivateName, setClientName] = useState(clientName);


  const handleSubmit = (values) => {
    const newMessage = `${clientPrivateName}\n${values.content}`;
    setTextChat((prevTextChat) => [...prevTextChat, newMessage]);
  };

  const messages = textChat.map((message) => {
    const [name, content] = message.split("\n");
    return { name, content };
  });

  return (
    <div
      style={{
        background: "#f0f0f0",
        maxHeight: "100vh",
        maxWidth: "100vw",
        overflow: "auto",
        position: "relative", // add position relative to the container
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={({ name, content }) => (
          <List.Item>
            <List.Item.Meta title={name} description={content} />
          </List.Item>
        )}
      />
        <Form onFinish={handleSubmit}>
          <Form.Item name="content">
            <Input placeholder="Message" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
  );
};


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

const Description = ({ text, instgramLink }) => {
  const [chat, setChat] = useState(null);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    function setShowChatEffect() {
      setChat(
        <ChatView
          clientName={"zohar"}
          text={[
            "zohar\nhi",
            "moshe\nhi",
            "zohar\ngood and with u?",
            "moshe\ngood",
          ]}
        />
      );
    }
    setShowChatEffect();
  }, []);

  return (
    <div>
      {text}
      <br />
      <Button icon={<InstagramOutlined />} size="large" href={instgramLink}>
        {" "}
      </Button>
      <button type="button" onClick={() => setShowChat(!showChat)}>
        <Badge count={5}>
          <Avatar icon={<MessageTwoTone />} shape="square" size="large" />
        </Badge>
      </button>
      <RatingSup />
      <PickDate />
      {showChat ? chat : ""}
    </div>
  );
};

const DataFromServer = async () => {
  const [messageApi, contextHolder] = message.useMessage();

const [resultsTable, setResultsTable] = useState(null);
const { email } = useParams();
const success = (text) => {
  messageApi.open({
    type: "success",
    content: text,
  });
};
  // const handleGetAllUsers = async () => {
  //   try {
  //     setResultsTable(null);
  //     const users = await getAllUsers(email);
  //     success("Get All Users");
  //     console.log(users.data);
  //     setResultsTable(<JsonTable data={users.data} />);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  try{
    setResultsTable(null);
    const suppliers = await GetAllSuppliers(email);
    success("Show suppliers");
    console.log(suppliers.data);
   // setResultsTable(<JsonTable data={users.data} />);
  } catch (error) {
      console.log(error);
    }
}

const dataSource = [
  {
    key: "1",
    name: "Mike",
    address: "New York No. 34 Lake Park",
    supType: "dresses",
    rate_grade: 4,
    description: (
      <Description
        text="My name is Mike, I do dresses"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
  {
    key: "5",
    name: "Mike",
    address: "New York No. 34 Lake Park",
    supType: "dresses",
    rate_grade: 4,
    description: (
      <Description
        text="My name is Mike, I do dresses"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
  {
    key: "6",
    name: "Mike",
    address: "New York No. 34 Lake Park",
    supType: "dresses",
    rate_grade: 4,
    description: (
      <Description
        text="My name is Mike, I do dresses"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
  {
    key: "2",
    name: "John",
    address: "London No. 1 Lake Park",
    supType: "flowers",
    rate_grade: 3,
    description: (
      <Description
        text="My name is Mike, I like to wear dresses"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
  {
    key: "3",
    name: "zohar",
    address: "New York No. 1 Lake Park",
    supType: "Dj",
    rate_grade: 2,
    description: (
      <Description
        text="My name is zohar, I DJ"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
  {
    key: "4",
    name: "Dean",
    address: "London No. 34 Lake Park",
    supType: "Dj",
    rate_grade: 2.5,
    description: (
      <Description
        text="My name is Dean, I DJ"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
];

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
    title: "supType",
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
 DataFromServer("liriella71@gmail.com");
  return (
    <div>
      {
        <Table
          dataSource={dataSource}
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


const AllClientView = () => {
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

  useEffect(() => {
    // Function to execute
    const showTempData =  () => {
      errorMsg("This table provides an example of dummy data for demonstration purposes.");
    };
    // Call the function
    showTempData();
  }, []); // Empty dependency array to run the effect only once


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
