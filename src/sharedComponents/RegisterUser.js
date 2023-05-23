import { Form, Input, Button, Layout, message } from "antd";
import { ClientRegisterApi } from "../api/usersApi";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from '../redux/userSlice';
import { object } from "prop-types";

const { Header, Content, Footer, Sider } = Layout;

const RegistrationFormContent = ({
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  //the state that decide if th show the register button
  const submissinShow = useRef(true);
  const dispatch = useDispatch(); 


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

  const onFinish = async (values) => {
    values["role"] = "SUPERAPP_USER";
    console.log(values);
    const dataFromServer = await ClientRegisterApi(values);
    console.log(typeof dataFromServer);
    if (typeof dataFromServer == "object") {
      console.log(dataFromServer);
      successMsg("Registration successful!");
      submissinShow.current = false;
      dispatch(setUser(dataFromServer));
    } else {
      errorMsg(`${dataFromServer}`);
    }
  };

  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish}>
        <Form.Item
          name="username"
          label="username"
          rules={[{ required: true, message: "Please input your user name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="avatar"
          rules={[
            { required: true, message: "Please input your avatar name!" },
          ]}
        >
          <Input />
        </Form.Item>
        {submissinShow.current && (
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        )}
      </Form>
    </>
  );
};

const RegistrationForm = () => {
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
          <RegistrationFormContent
          />
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
      ></Footer>
    </Layout>
  );
};

export default RegistrationForm;
