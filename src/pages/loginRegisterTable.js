import {
  Form,
  Input,
  Button,
  Layout,
  message,
  DatePicker,
  Steps,
  Select,
  Tabs,
} from "antd";
import { CreateNewObject } from "../api/objectsApi";
import RegistrationForm from "../sharedComponents/RegisterUser";
import { useNavigate } from "react-router-dom";
import Login from "../sharedComponents/loginUser";
import { useState, useEffect, useRef } from "react";
import ImgCrop from "antd-img-crop";
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;

const RegistrationFormContent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const disabledEventDate = (current) => {
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
    return selectedDate.getTime() < currentDate.getTime(); // compare dates
  };

  const successMsg = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };
  const errorMsg = (text) => {
    messageApi.open({
      type: "error",
      content: text,
    });
  };

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

  const onFinish = async (values) => {
    //todo: change the role to buissness

    let json_to_server = {};
    json_to_server["type"] = "tables";
    json_to_server["alias"] = values["name"];
    values['mail']= user.userId.email;
    json_to_server["objectDetails"] = values;
    json_to_server["createdBy"] = { userId: user.userId };

    const registerObject = await CreateNewObject(json_to_server);
    if (registerObject) {
      successMsg("Registration successful!");
      await timeout(2000); //for 1 sec delay
      // navigate("/");
    } else {
      errorMsg("somthing went wrong");
    }
  };

  return (
    <>
      <Layout>
        {contextHolder}
        <Content>
          <Form onFinish={onFinish}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="partner name" label="Name of partner">
              <Input placeholder="Optional" />
            </Form.Item>

            <Form.Item name="birth date" label="Birthday">
              <DatePicker />
            </Form.Item>

            <Form.Item
              name="city"
              label="City of the event"
              rules={[{ required: true, message: "Please input city!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="event date"
              label="Date of event"
              rules={[{ required: true, message: "Please input date!" }]}
            >
              <DatePicker disabledDate={disabledEventDate} />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
        </Content>
      </Layout>
    </>
  );
};

const CustomerRegistration = () => {
  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "#ffff",
          borderBottom: "none",
          padding: 0,
        }}
      ></Header>
      <Layout>
        <Sider
          style={{
            backgroundColor: "#ffff",
            borderBottom: "none",
            padding: 0,
          }}
        ></Sider>
        <Content>
          <RegistrationFormContent />
        </Content>
        <Sider
          style={{
            backgroundColor: "#ffff",
            borderBottom: "none",
            padding: 0,
          }}
        ></Sider>{" "}
      </Layout>
      <Footer
        style={{
          backgroundColor: "#ffff",
          borderBottom: "none",
          padding: 0,
        }}
      >
        {" "}
      </Footer>
    </Layout>
  );
};

const TableRegistrationForm = () => {
  const [current, setCurrent] = useState(0);
  const [userEmail, setUserEmail] = useState();
  const userRegisterSuccess = useSelector((state) => state.user);
  const [messageApi, contextHolder] = message.useMessage();

  const successMsg = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };
  const errorMsg = (text) => {
    messageApi.open({
      type: "error",
      content: text,
    });
  };
  const steps = [
    {
      title: "Create user",
      content: <RegistrationForm />,
    },
    {
      title: "Add buisnedd data",
      content: <CustomerRegistration />,
    },
  ];

  const next = () => {
    if (userRegisterSuccess) {
      setCurrent(current + 1);
    } else {
      console.log(userRegisterSuccess);
      errorMsg("need to register as user first");
    }
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {};

  return (
    <Layout>
      <Layout>
        <Sider style={{ background: "#fff" }}></Sider>
        <Layout>
          <Content>
            {contextHolder}
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <Button type="primary" onClick={next}>
              Next
            </Button>
          </Content>
        </Layout>
        <Sider style={{ background: "#fff" }}></Sider>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};

function singLoginTable() {
  return (
    <Tabs>
      <TabPane tab="Register" key="register">
        <TableRegistrationForm />
      </TabPane>
      <TabPane tab="Login" key="login">
        <Login type={"MINIAPP_USER"} />
      </TabPane>
    </Tabs>
  );
}

export default singLoginTable;
