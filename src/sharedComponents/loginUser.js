import { Form, Input, Button, Layout, message } from "antd";
import { UserLoginApi } from "../api/usersApi";
import { CreateNewObject} from "../api/objectsApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail } from '../redux/userSlice';
import { setManagerObjectId } from "../redux/objectSlice";
const { Header, Content, Footer, Sider } = Layout;


const LoginFormContent = ({ setLoginSuccess ,navigateUrl,userType}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
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
    console.log("log in", values.email);
    const user = await UserLoginApi(values.email);
    if (user) {
      console.log(user);
      if (user.role===userType){
      const email = values.email;
      let json_to_server = {};
      json_to_server["type"] =`${userType}_manager`;
      json_to_server["alias"] = "session_manager";
      json_to_server["createdBy"] =  
      {"userId":{superapp: '2023b.zohar.tzabari', email: 'superApp@gmail.com'}};
      console.log(json_to_server);
      const registerObject = await CreateNewObject(json_to_server);
      console.log(registerObject);
      dispatch(setUserEmail({ email }));
      dispatch(setManagerObjectId({registerObject}));

      console.log(values.email);
      successMsg(`${values.email} login successfuly `);
      navigate(`/${navigateUrl}/${values.email}`);
      }
      else{
        errorMsg(`the user type is ${user.role} not ${userType}`);
      }
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

const LoginForm = ({ setLoginSuccess , navigateUrl,userType}) => {
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
          <LoginFormContent setLoginSuccess={setLoginSuccess}  navigateUrl={navigateUrl} userType={userType}/>
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

const Login = ({urlToPass,type}) => {
  const [sucess, setSuccess] = useState(false);
  console.log(urlToPass);

  return <LoginForm setLoginSuccess={setSuccess} navigateUrl={urlToPass} userType = {type} />;
};

export default Login;
