import { Form, Input, Button, Layout, message, Upload, Steps,Select } from "antd";
import { CreateNewObject } from "../api/objectsApi";
import RegistrationForm from "../sharedComponents/RegisterUser";
import { useNavigate } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import ImgCrop from "antd-img-crop";
import {GetSupplierTypes} from "../api/miniAppApi";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

const suppliersMiniAppName = "suppliers"

const UploadFile = ({ supplierPhoto }) => {
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    // console.log(fileList);
    if (fileList.length > 0) {
      supplierPhoto.current = fileList[0];
    }
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

const RegistrationFormContent = (userEmail) => {
  const [messageApi, contextHolder] = message.useMessage();
  const supplierPhoto = useRef(null);
  const navigate = useNavigate();
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [supplierOptions, setSupplierOptions] = useState([]);

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

  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }

    useEffect(() => {
      // Function to execute
      const fetchData = async () => {
        const supplierType = await GetSupplierTypes(suppliersMiniAppName,userEmail.userEmail.userEmail);
        console.log(supplierType);
        setSupplierOptions(supplierType.data);
      };
      // Call the function
      fetchData();
    }, []); // Empty dependency array to run the effect only once
  

  const onFinish = async (values) => {
    //todo: change the role to buissness
    let json_to_server = {};
    json_to_server["type"] = "Supplier";
    json_to_server["alias"] = values["alias"];
    values["photo"] = supplierPhoto.current;
    json_to_server["objectDetails"] = values;

    console.log(json_to_server);
    const registerObject = await CreateNewObject(json_to_server);
    if (registerObject) {
      successMsg("Registration successful!");
      setRegisterSuccess(true);
      await timeout(2000); //for 1 sec delay
      navigate("/");
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
              name="email"
              label="Second Email"
              rules={[
                { required: false },
                {
                  type: "email",
                  message: "optional for second email address!",
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

            <Form.Item
              name="alias"
              label="supplier type (alias)"
              rules={[
                { required: true, message: "Please select a supplier type!" },
              ]}
            >
              <Select>
                {supplierOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option.toLowerCase()}
                  </Option>
                ))}
              </Select>
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
            <UploadFile supplierPhoto={supplierPhoto} />

            <Form.Item>
              {!registerSuccess && (
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              )}
            </Form.Item>
          </Form>
          {/* TODO: dropdown of supplier type */}
        </Content>
      </Layout>
    </>
  );
};

const BuisnessRegistration = (userEmail) => {
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
          <RegistrationFormContent userEmail={userEmail} />
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

const BuisnessRegistrationForm = () => {
  const [current, setCurrent] = useState(0);
  const [userEmail, setUserEmail] = useState();
  const [userRegisterSuccess, setRegisterSuccess] = useState(false);
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
      content: <RegistrationForm setRegisterSuccess={setRegisterSuccess} setUserEmail={setUserEmail} />,
    },
    {
      title: "Add buisnedd data",
      content: <BuisnessRegistration userEmail = {userEmail}/>,
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
            {userRegisterSuccess && current < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
          </Content>
        </Layout>
        <Sider style={{ background: "#fff" }}></Sider>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};

export default BuisnessRegistrationForm;
