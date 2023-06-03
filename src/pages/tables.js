import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Button,
  Card,
  Col,
  Row,
  Layout,
  Form,
  Input,
  Radio,
  Modal,
  message,
} from "antd";
import { SketchPicker } from "react-color";
import { JsonTable } from "../sharedComponents/JsonTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addGuest } from "../redux/guestsSlice";
import { addCatagory } from "../redux/catagorySlice";
import {
  CreateNewObject,
  BindObject,
  GetChildrenObject,
} from "../api/objectsApi";
import { searchObjectsByUserEmail ,searchObjectsByUserEmailBoundary} from "../api/commandApi";
import { setUser } from "../redux/userSlice";
import { UserUpdateApi, UserLoginApi } from "../api/usersApi";
import { set_all_Guests } from "../redux/guestsSlice";
const { Header, Content, Footer, Sider } = Layout;

const GuestFormComponent = () => {
  const [allGuests, setAllGuests] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [myObject, setMyObject] = useState();
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);
  const objectM = useSelector((state) => state.objectManager);

  useEffect(() => {
    // Function to execute
    const fetchData = async () => {
      if (isObjEmpty(user.user)) {
        errorMsg("need to login first");
        return;
      } else {
        clearAllMessages();
        await ChangeToMiniAppUser();
        const zohar = await searchObjectsByUserEmailBoundary(
          "tables",
          objectM.objectManager.objectId,
          user.user.userId.email,
          user.user.userId
        );
        await ChangeToSuperAppUser();
        setMyObject(zohar);
      }
    };
    // Call the function
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const ChangeToMiniAppUser = async () => {
    let tempUser = JSON.parse(JSON.stringify(user));
    tempUser["user"]["role"] = "MINIAPP_USER";
    await UserUpdateApi(user.user.userId.email, tempUser.user);
    const newUser = await UserLoginApi(user.user.userId.email);
    if (newUser) {
      dispatch(setUser(newUser));
    }
  };

  const ChangeToSuperAppUser = async () => {
    let tempUser = JSON.parse(JSON.stringify(user));
    tempUser["user"]["role"] = "SUPERAPP_USER";
    await UserUpdateApi(user.user.userId.email, tempUser.user);
    const newUser = await UserLoginApi(user.user.userId.email);
    if (newUser) {
      dispatch(setUser(newUser));
    }
  };

  // Function to clear all messages
  const clearAllMessages = () => {
    messageApi.destroy(); // Clears all messages
  };

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleNewGuestType();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const finishGuestsAdding = async () => {
    console.log(myObject);
    const guests = await GetChildrenObject(myObject, user.user.userId.email);
    console.log(guests);
    navigate(`/tables/arrangeTables`);
  };

  const onFinish = async (values) => {
    setAllGuests([...allGuests, values]);
    values["category"] = "All guests";
    values["color"] = categories.find(
      (category) => category.name === values.guestType
    ).color;
    let json_to_server = {};
    json_to_server["type"] = "guest";
    json_to_server["alias"] = `${values["firstName"]}_${values["lastName"]}`;
    json_to_server["objectDetails"] = values;
    json_to_server["createdBy"] = { userId: user.user.userId };
    const registerObject = await CreateNewObject(json_to_server);
    if (!registerObject) {
      errorMsg("somthing went wrong");
      return;
    }
    console.log(myObject);
    
    await BindObject(myObject, user.user.userId.email, registerObject.objectId);
    // Reset the form fields
    form.resetFields();
  };

  const handleNewGuestType = () => {
    if (newCategory !== "") {
      const categoryNameExists = categories.some(
        (category) => category.name === newCategory.GuestCatagoryName
      );
      if (categoryNameExists) {
        errorMsg(`${newCategory.GuestCatagoryName} already exists`);
      } else {
        const objectToAdd = {
          name: newCategory.GuestCatagoryName,
          color: sketchPickerColor,
        };
        setCategories([...categories, objectToAdd]);
        setNewCategory("");
        successMsg("Guest category added successfully!");
      }
    }
  };

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  if (isObjEmpty(user.user)) {
    errorMsg("need to conect");
    return <>{contextHolder}</>;
  }

  return (
    <>
      {contextHolder}
      <Form onFinish={onFinish} form={form}>
        <Form.Item
          name="firstName"
          label="first Name"
          rules={[
            { required: true, message: "Please input guest first name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: "Please input guest last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type of Guest"
          name="guestType"
          rules={[{ required: true, message: "Please select a guest type!" }]}
        >
          <Radio.Group>
            {categories.map((category) => (
              <Radio.Button
                key={category.name}
                value={category.name}
                style={{
                  backgroundColor: `rgba(${category.color.r}, ${category.color.g}, ${category.color.b}, ${category.color.a})`,
                }}
              >
                {category.name}
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={showModal}>
            Add new Guets type
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            add new guest
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Choose name and color"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onValuesChange={setNewCategory}>
          <Form.Item
            label="Guest Catagory Name"
            name="GuestCatagoryName"
            rules={[
              { required: true, message: "Please input Guest Catagory name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
        <SketchPicker
          onChange={(color) => {
            setSketchPickerColor(color.rgb);
          }}
          color={sketchPickerColor}
        />
      </Modal>
      <Button type="primary" onClick={finishGuestsAdding}>
        Finish with adding guests
      </Button>
      <JsonTable data={allGuests} />
    </>
  );
};

export const GuestForm = () => {
  return (
    <Layout>
      <Header style={{ background: "#fff" }}></Header>
      <Layout>
        <Layout>
          <Sider style={{ background: "#fff" }}></Sider>
          <Layout>
            <Content>
              <GuestFormComponent />
            </Content>
          </Layout>
          <Sider style={{ background: "#fff" }}></Sider>
        </Layout>
      </Layout>
    </Layout>
  );
};
