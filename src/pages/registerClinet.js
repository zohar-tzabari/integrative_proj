import { Form, Input, Button, Layout, message } from "antd";

import axios from "axios";

const { Header, Content, Footer, Sider } = Layout;
const superApp = "2023b.zohar.tzabari"
const RegistrationFormContent = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };


  const onFinish = async (values) => {
    const dataFromServer = await onFinishApi(values);
    if(dataFromServer)
    {
      console.log(dataFromServer);
      success("Registration successful!");
    }

  }

  const onFinishApi = async (values) => {
    const { firstName, lastName, email } = values;
    const dataToServer = {
      email,
    };
    console.log(dataToServer);
    try {
      const response = await axios.post(
        `http://localhost:8081/superapp/users`,
        dataToServer,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };


  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish}>
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please input your last name!" }]}
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const RegistrationForm = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <RegistrationFormContent />
        </Content>
        <Sider>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
export default RegistrationForm;
