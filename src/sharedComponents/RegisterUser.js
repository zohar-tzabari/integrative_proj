import { Form, Input, Button, Layout, message } from "antd";
import { ClientRegisterApi } from "../api/usersApi";
import { useRef } from "react";

const { Header, Content, Footer, Sider } = Layout;

const RegistrationFormContent = ({
  setRegisterSuccess,
  setUserEmail,
  userRole,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  //the state that decide if th show the register button
  const submissinShow = useRef(true);

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
    values["role"] = userRole;
    console.log(values);
    const dataFromServer = await ClientRegisterApi(values);
    if (dataFromServer) {
      console.log(dataFromServer);
      successMsg("Registration successful!");
      submissinShow.current = false;
      if (setRegisterSuccess) {
        setRegisterSuccess(true);
      }
      setUserEmail(values.email);
    } else {
      errorMsg("somthing went wrong");
      setRegisterSuccess(false);
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

const RegistrationForm = ({ setRegisterSuccess, setUserEmail, userRole }) => {
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
            setRegisterSuccess={setRegisterSuccess}
            setUserEmail={setUserEmail}
            userRole={userRole}
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
