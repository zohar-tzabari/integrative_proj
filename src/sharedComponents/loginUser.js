import { Form, Input, Button, Layout, message } from "antd";
import { UserLoginApi } from "../api/usersApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const LoginFormContent = ({ setLoginSuccess ,navigateUrl}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();


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
    console.log("log in", values.email);
    const user = await UserLoginApi(values.email);
    if (user) {
      successMsg(`${values.email} login successfuly `);
      navigate(`/${navigateUrl}/${values.email}`);
    } else {
      errorMsg(`couldnt found ${values.email}`);
    }
  };

  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish}>
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const LoginForm = ({ setLoginSuccess , navigateUrl}) => {
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
          <LoginFormContent setLoginSuccess={setLoginSuccess}  navigateUrl={navigateUrl}/>
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

const Login = () => {
  const [sucess, setSuccess] = useState(false);
  const [navigateUrl, setNavigateUrl] = useState("MiniAppDash");

  return <LoginForm setLoginSuccess={setSuccess} navigateUrl={navigateUrl} />;
};

export default Login;
