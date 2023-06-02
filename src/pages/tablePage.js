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
import { searchObjectsByUserEmail } from "../api/commandApi";
import { setUser } from "../redux/userSlice";
import { UserUpdateApi, UserLoginApi } from "../api/usersApi";

const { Header, Content, Footer, Sider } = Layout;

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

export const TablePage = ({}) => {
  // Define the initial state of the items and their categories
  const guests = useSelector((state) => state.all_gusets);
  const [items, setItems] = useState([]);
  const [tablesNum, setTablesNum] = useState(20);
  const guests_categories = [];
  const user = useSelector((state) => state.user);
  const [myObject, setMyObject] = useState();

  const objectM = useSelector((state) => state.objectManager);
  const dispatch = useDispatch();

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

  const tables_to_sit = useRef(
    Array.from(Array(tablesNum).keys()).map((i) => `table ${i + 1}`)
  );

  useEffect(() => {
    // Function to execute
    const fetchData = async () => {
      try {
        setItems([
          {
            objectId: {
              superapp: "2023b.zohar.tzabari",
              internalObjectId: "ca3549e2-d255-4782-a4dd-8cca7151e56b",
            },
            type: "guest",
            alias: "Zohar_Tzabari",
            active: true,
            creationTimestamp: "2023-06-02T12:35:34.322+00:00",
            location: {
              lat: 0,
              lng: 0,
            },
            createdBy: {
              userId: {
                superapp: "2023b.zohar.tzabari",
                email: "zohar.zabari@gmail.vcvcom",
              },
            },
            objectDetails: {
              firstName: "Zohar",
              lastName: "Tzabari",
              guestType: "zohar",
              category: "All guests",
              color: {
                r: "241",
                g: "112",
                b: "19",
                a: "1",
              },
            },
          },
          {
            objectId: {
              superapp: "2023b.zohar.tzabari",
              internalObjectId: "de362617-2eb4-4ef9-ab19-2088398621ee",
            },
            type: "guest",
            alias: "adi_levi",
            active: true,
            creationTimestamp: "2023-06-02T12:35:49.858+00:00",
            location: {
              lat: 0,
              lng: 0,
            },
            createdBy: {
              userId: {
                superapp: "2023b.zohar.tzabari",
                email: "zohar.zabari@gmail.vcvcom",
              },
            },
            objectDetails: {
              firstName: "adi",
              lastName: "levi",
              guestType: "frend",
              category: "All guests",
              color: {
                r: 241,
                g: 19,
                b: 93,
                a: 1,
              },
            },
          },
          {
            objectId: {
              superapp: "2023b.zohar.tzabari",
              internalObjectId: "5958f829-4345-4998-926a-2e2f0666e28e",
            },
            type: "guest",
            alias: "kobi_efrati",
            active: true,
            creationTimestamp: "2023-06-02T12:36:16.723+00:00",
            location: {
              lat: 0,
              lng: 0,
            },
            createdBy: {
              userId: {
                superapp: "2023b.zohar.tzabari",
                email: "zohar.zabari@gmail.vcvcom",
              },
            },
            objectDetails: {
              firstName: "kobi",
              lastName: "efrati",
              guestType: "famly",
              category: "All guests",
              color: {
                r: 19,
                g: 137,
                b: 241,
                a: 1,
              },
            },
          },
          {
            objectId: {
              superapp: "2023b.zohar.tzabari",
              internalObjectId: "d1a45f6e-9bfb-4570-bead-1d68285a9706",
            },
            type: "guest",
            alias: "moshe_levi",
            active: true,
            creationTimestamp: "2023-06-02T12:35:58.018+00:00",
            location: {
              lat: 0,
              lng: 0,
            },
            createdBy: {
              userId: {
                superapp: "2023b.zohar.tzabari",
                email: "zohar.zabari@gmail.vcvcom",
              },
            },
            objectDetails: {
              firstName: "moshe",
              lastName: "levi",
              guestType: "frend",
              category: "All guests",
              color: {
                r: 241,
                g: 19,
                b: 93,
                a: 1,
              },
            },
          },
          {
            objectId: {
              superapp: "2023b.zohar.tzabari",
              internalObjectId: "4e9659a9-0027-4504-9f55-87d765b51b5a",
            },
            type: "guest",
            alias: "shsiso_fvfdf",
            active: true,
            creationTimestamp: "2023-06-02T12:36:22.472+00:00",
            location: {
              lat: 0,
              lng: 0,
            },
            createdBy: {
              userId: {
                superapp: "2023b.zohar.tzabari",
                email: "zohar.zabari@gmail.vcvcom",
              },
            },
            objectDetails: {
              firstName: "shsiso",
              lastName: "fvfdf",
              guestType: "famly",
              category: "All guests",
              color: {
                r: 19,
                g: 137,
                b: 241,
                a: 1,
              },
            },
          },
        ]);
        // await ChangeToMiniAppUser();
        // const myObj = await searchObjectsByUserEmail(
        //   "tables",
        //   objectM.objectManager.objectId,
        //   user.user.userId.email,
        //   user.user.userId
        // );
        // console.log(myObj);
        // await ChangeToSuperAppUser();
        // setMyObject(myObj);
        // const guests = await GetChildrenObject(myObj, user.user.userId.email);
        // console.log(guests);
      } catch (error) {
        console.log(error);
        await ChangeToSuperAppUser();
      }
    };
    // Call the function
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newItems = [...items];
    const itemIndex = newItems.findIndex(
      (i) => i.objectId.internalObjectId === result.draggableId
    );
    const item = newItems[itemIndex];

    if (result.destination.droppableId !== result.source.droppableId) {
      const updatedItem = {
        ...item,
        objectDetails: {
          ...item.objectDetails,
          category: result.destination.droppableId,
        },
      };

      const updatedItems = [
        ...newItems.slice(0, itemIndex),
        updatedItem,
        ...newItems.slice(itemIndex + 1),
      ];

      setItems(updatedItems);
      console.log(updatedItems);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout>
        <Header style={{ background: "#fff" }}>
          <Row>
            <Col span={10}></Col>
            <Col span={7}>
              <Button onClick={()=>console.log("hi")}>finish table arragment</Button>
            </Col>
          </Row>
        </Header>
      </Layout>
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
