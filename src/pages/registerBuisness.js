import { Form, Input, Button, Layout, message, Upload } from "antd";
import { ClientRegisterApi } from "../api/usersApi";
import { InboxOutlined } from '@ant-design/icons';
import { MINIAPPUSER } from "../CONST";
import { useState } from "react";


const { Header, Content, Footer, Sider } = Layout;

const UploadFile = ()=>{
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
    const { Dragger } = Upload;

const props = {
     
    name: 'file',
    multiple: false,
    action: console.log('hi') ,
    accept: '.png',
    onChange(info) {
        const { status, response } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            console.log(info.file);
            // setUploadData(true);;
            message.successMsg(`${info.file.name} file uploaded successfully.`);
            // setAllFiles(allFiles.push(info.file));
            console.log(info.file);
        }
        else if (status === 'error') {
            message.errorMsg(`${info.file.name} file upload failed.`);
        }
    }
};
return(
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
);
}



const RegistrationFormContent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [role, setRole] = useState(MINIAPPUSER);

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
    //todo: change the role to buissness
    values["role"] = "MINIAPP_USER";
    console.log(values);
    const dataFromServer = await ClientRegisterApi(values);
    if (dataFromServer) {
      console.log(dataFromServer);
      successMsg("Registration successful!");
    } else {
      errorMsg("somthing went wrong");
    }
  };

  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish}>
        <Form.Item
          name="avatar"
          label="avatar"
          rules={[
            { required: true, message: "Please input your avatar name!" },
          ]}
        >
          <Input />
        </Form.Item>

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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
      <UploadFile/>
      //TODO dropdown of supplier type
    </>
  );
};

const BuisnessRegistrationForm = () => {
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
      ></Footer>
    </Layout>
  );
};
export default BuisnessRegistrationForm;
