import { Form, Input, Button, Layout, message } from "antd";
import { UserLoginApi } from "../api/usersApi";
import { CreateNewObject } from "../api/objectsApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { setManagerObject } from "../redux/objectSlice";
import { UserOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const LoginFormContent = ({ setLoginSuccess, navigateUrl }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userType = useSelector((state) => state.miniApp.miniAppClientRole);

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
    const user = await UserLoginApi(values.email);
    if (user) {
      if (user.role === userType) {
        dispatch(setUser(user));
        successMsg(`${values.email} login successfuly `);
        //create manager object//
        //todo: change the role to buissness\
        if (userType != "ADMIN") {
          let json_to_server = {};
          json_to_server["type"] = "objectManager";
          json_to_server["alias"] = "manager";
          json_to_server["createdBy"] = { userId: user.userId };
          const registerObject = await CreateNewObject(json_to_server);
          dispatch(setManagerObject(registerObject));
        }
        if (navigateUrl) {
          navigate(`/${navigateUrl}/${values.email}`);
        }
      } else {
        errorMsg(`the user type is ${user.role} not ${userType}`);
      }
    } else {
      errorMsg(`couldnt found ${values.email}`);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <img
          src="https://icon-library.com/images/icon-wedding/icon-wedding-11.jpg"
          alt="Logo"
          style={{ width: "10vh", height: "10vh" }}
        />
        <h2>Login</h2>
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
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
  
};

const LoginForm = ({ setLoginSuccess, navigateUrl }) => {
  console.log(navigateUrl);

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
          <LoginFormContent
            setLoginSuccess={setLoginSuccess}
            navigateUrl={navigateUrl}
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

const Login = ({ urlToPass, type }) => {
  const [sucess, setSuccess] = useState(false);

  return <LoginForm setLoginSuccess={setSuccess} navigateUrl={urlToPass} />;
};

export default Login;
