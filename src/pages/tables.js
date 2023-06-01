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
  Tabs,
} from "antd";
import { SketchPicker } from "react-color";
import { JsonTable } from "../sharedComponents/JsonTable";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addGuest } from "../redux/guestsSlice";
import { addCatagory } from "../redux/catagorySlice";
import { CreateNewObject } from "../api/objectsApi";
import { GetAllGuests } from "../api/commandApi";
import Login from "../sharedComponents/loginUser";

const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;

function CardComponent({ item }) {
  return (
    <Card
      size="small"
      style={{
        backgroundColor: `rgba(${item.objectDetails.color.r}, ${item.objectDetails.color.g}, ${item.objectDetails.color.b}, ${item.objectDetails.color.a})`,
      }}
    >
      {item.objectDetails.firstName}
    </Card>
  );
}

const Category = ({ category, items, onDragEnd }) => {
  return (
    <Droppable droppableId={category}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <h2>{category}</h2>
          {items
            .filter((item) => item.objectDetails.category === category)
            .map((item, index) => (
              <Draggable
                key={item.objectId.internalObjectId}
                draggableId={item.objectId.internalObjectId}
                index={index}
                distance={5}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    <CardComponent item={item} />
                  </div>
                )}
              </Draggable>
            ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const GuestFormComponent = () => {
  const [allGuests, setAllGuests] = useState([]);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.all_catagroies);

  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  const [guestId, setGuestId] = useState(0);
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user);

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

  const finishGuestsAdding = () => {
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
    console.log(json_to_server);
    const registerObject = await CreateNewObject(json_to_server);
    if (!registerObject) {
      errorMsg("somthing went wrong");
      return;
    }
    console.log(registerObject);
    dispatch(addGuest(registerObject));
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
        dispatch(addCatagory(objectToAdd));
        console.log(allCategories);
        setNewCategory("");
        successMsg("Guest category added successfully!");
      }
    }
  };

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  useEffect(() => {
    // Function to execute
    const fetchData = async () => {
      console.log(user.user);
      if (isObjEmpty(user.user)) {
        errorMsg("need to login first");
      } else {
        clearAllMessages();
        const previous_guests = await GetAllGuests();
        console.log(previous_guests);
      }
    };
    // Call the function
    fetchData();
  }, [user]); // Empty dependency array to run the effect only once

  if (isObjEmpty(user.user))
    return (
      <Tabs>
        <TabPane tab="Register" key="register">
          {/* Contents of Register tab */}
        </TabPane>
        <TabPane tab="Login" key="login">
          <Login type={"MINIAPP_USER"} />
        </TabPane>
      </Tabs>
    );

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

export const TablePage = () => {
  // Define the initial state of the items and their categories
  const guests = useSelector((state) => state.all_gusets);
  const guestsArray = guests.all_gusets || []; // Make sure guests.all_gusets is an array
  const [items, setItems] = useState([...guestsArray]);
  console.log(items);
  const [tablesNum, setTablesNum] = useState(20);
  const guests_categories = useSelector((state) => state.all_catagroies);

  const tables_to_sit = useRef(
    Array.from(Array(tablesNum).keys()).map((i) => `table ${i + 1}`)
  );

  // Define the function to handle drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems =  JSON.parse(JSON.stringify([...items]));
    const itemIndex = newItems.findIndex(
      (i) => i.objectId.internalObjectId === result.draggableId
    );
    const item = { ...newItems[itemIndex] };

    if (result.destination.droppableId !== result.source.droppableId) {
      item.objectDetails.category = result.destination.droppableId;
    }

    newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, item);

    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout>
        <Layout>
          <Sider style={{ background: "#fff" }}>
            <Row>
              <Category
                category="All guests"
                items={items}
                onDragEnd={onDragEnd}
              />
            </Row>
          </Sider>
          <Layout>
            <Content>
              {" "}
              <Row>
                {tables_to_sit.current.map((n) => (
                  <React.Fragment key={n}>
                    <Col span={7}>
                      <Category
                        category={n}
                        items={items}
                        onDragEnd={onDragEnd}
                      />
                    </Col>
                  </React.Fragment>
                ))}
              </Row>
            </Content>
          </Layout>
        </Layout>
        <Footer></Footer>
      </Layout>
    </DragDropContext>
  );
};
