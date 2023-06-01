import {
  Form,
  Input,
  Button,
  Layout,
  message,
  Upload,
  Steps,
  Select,
} from "antd";
import { CreateNewObject } from "../api/objectsApi";
import RegistrationForm from "../sharedComponents/RegisterUser";
import { useNavigate } from "react-router-dom";

import { useState, useEffect, useRef } from "react";
import ImgCrop from "antd-img-crop";
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

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

const RegistrationFormContent = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const supplierPhoto = useRef(null);
  const navigate = useNavigate();
  const [supplierOptions, setSupplierOptions] = useState([
    "FLOWERS",
    "PHOTOGRAPHER",
    "DJ",
  ]);
  const {user} = useSelector((state) => state.user);

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

  const onFinish = async (values) => {
    //todo: change the role to buissness
    let json_to_server = {};
    json_to_server["type"] = "supplier";
    json_to_server["alias"] = values["alias"];
    values["photo"] = supplierPhoto.current;
    values['mail']= user.userId.email;
    values['busyDates']= [];
    json_to_server["objectDetails"] = values;
    json_to_server["createdBy"] ={"userId": user.userId};
  
    const registerObject = await CreateNewObject(json_to_server);
    if (registerObject) {
      successMsg("Registration successful!");
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
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
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
            <Form.Item
              name="description"
              label="Description"
  
            >
          <Input.TextArea placeholder="Optional" rows = {3}/>
            </Form.Item>
            <UploadFile supplierPhoto={supplierPhoto} />
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

const BuisnessRegistration = () => {
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

const BuisnessRegistrationForm = () => {
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
      content: <BuisnessRegistration />,
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

export default BuisnessRegistrationForm;
