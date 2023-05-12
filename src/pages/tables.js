import React, { useState, useRef } from "react";
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


const { Header, Content, Footer, Sider } = Layout;

function CardComponent({ item }) {
  return <Card size="small">{item.name}</Card>;
}

const Category = ({ category, items, onDragEnd }) => {
  return (
    <Droppable droppableId={category}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <h2>{category}</h2>
          {items
            .filter((item) => item.category === category)
            .map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
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
  const [categories, setCategories] = useState([
    {
      name: "Groom family",
      color: {
        r: "241",
        g: "112",
        b: "19",
        a: "1",
      },
    },
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [newGuest, setNewGuest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });
  const [form] = Form.useForm();

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
    navigate("/tables/arrangeTables");
  };

  const onFinish = (values) => {
    setAllGuests([...allGuests, values]);
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
            add new ghest
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
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export const TablePage = () => {
  // Define the initial state of the items and their categories
  const [items, setItems] = useState([
    { id: "1", name: "Dean", lastName: "Temp", category: "All ghests" },
    { id: "2", name: "Tom", lastName: "Temp", category: "All ghests" },
    { id: "3", name: "Zohar", lastName: "Temp", category: "All ghests" },
    { id: "4", name: "Tal", lastName: "Temp", category: "All ghests" },
    { id: "5", name: "Liri", lastName: "Temp", category: "All ghests" },
    { id: "6", name: "Michaella", lastName: "Temp", category: "All ghests" },
    { id: "7", name: "Roy", lastName: "Temp", category: "All ghests" },
    { id: "8", name: "Dean", lastName: "Temp", category: "All ghests" },
    { id: "9", name: "Tom", lastName: "Temp", category: "All ghests" },
    { id: "10", name: "Zohar", lastName: "Temp", category: "All ghests" },
    { id: "11", name: "Tal", lastName: "Temp", category: "All ghests" },
    { id: "12", name: "Liri", lastName: "Temp", category: "All ghests" },
    { id: "13", name: "Michaella", lastName: "Temp", category: "All ghests" },
    { id: "14", name: "Roy", lastName: "Temp", category: "All ghests" },
  ]);
  const [tablesNum, setTablesNum] = useState(20);
  const categories = useRef(
    Array.from(Array(tablesNum).keys()).map((i) => `table ${i + 1}`)
  );

  // Define the function to handle drag and drop
  const onDragEnd = (result) => {
    // If the item was not dropped in a valid droppable area, do nothing
    if (!result.destination) {
      return;
    }

    // Get the items array and the item that was dragged
    const newItems = [...items];
    const item = newItems.find((i) => i.id === result.draggableId);

    // If the item was dropped in a different category, update its category
    if (result.destination.droppableId !== result.source.droppableId) {
      item.category = result.destination.droppableId;
    }

    // Move the item to the new position
    newItems.splice(
      result.destination.index,
      0,
      newItems.splice(result.source.index, 1)[0]
    );

    // Update the state with the new items array
    setItems(newItems);
    console.log(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout>
        <Layout>
          <Sider style={{ background: "#fff" }}>
            <Row>
              <Category
                category="All ghests"
                items={items}
                onDragEnd={onDragEnd}
              />
            </Row>
          </Sider>
          <Layout>
            <Content>
              {" "}
              <Row>
                {categories.current.map((n) => (
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
