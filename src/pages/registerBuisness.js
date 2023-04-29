import { Form, Input, Button, Layout, message, Upload } from "antd";
import { ClientRegisterApi } from "../api/usersApi";
import { InboxOutlined } from "@ant-design/icons";

import { useState, useEffect } from "react";
import ImgCrop from "antd-img-crop";

const { Header, Content, Footer, Sider } = Layout;
const { Dragger } = Upload;

const UploadFile = () => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    console.log(fileList);
  }, [fileList[0]]); // Only re-run the effect if count changes

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const dummyRequest = async ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  return (
    <ImgCrop rotationSlider>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        customRequest={dummyRequest}
      >
        {fileList.length < 1 && "+ Upload buisness photo"}
      </Upload>
    </ImgCrop>
  );
};

const RegistrationFormContent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // const [role, setRole] = useState(MINIAPPUSER);

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
      <Layout>
        <Header
          style={{
            backgroundColor: "#ffff",
            borderBottom: "none",
            padding: 0,
          }}
        ></Header>
        {contextHolder}
        <Sider
          style={{
            backgroundColor: "#ffff",
            borderBottom: "none",
            padding: 0,
          }}
        >
          <UploadFile />
        </Sider>

        <Content>
          <Form onFinish={onFinish}>
            <Form.Item
              name="avatar"
              label="Avatar"
              rules={[
                { required: true, message: "Please input your avatar name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="username"
              label="Username"
              rules={[
                { required: true, message: "Please input your user name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="instagram" label="Instagram">
              <Input placeholder="Optional" />
            </Form.Item>

            <Form.Item name="facebook" label="Facebook">
              <Input placeholder="Optional" />
            </Form.Item>

            <Form.Item
              name="city"
              label="City"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="address" label="Address">
              <Input placeholder="Optional" />
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
          {/* TODO: dropdown of supplier type */}
        </Content>
      </Layout>
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
