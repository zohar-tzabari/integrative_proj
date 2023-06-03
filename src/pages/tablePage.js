import React, { useState, useRef, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Card, Col, Row, Layout } from "antd";

import { useDispatch, useSelector } from "react-redux";

import { GetChildrenObject,ObjectUpdateApi } from "../api/objectsApi";
import { searchObjectsByUserEmailBoundary } from "../api/commandApi";
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
        await ChangeToMiniAppUser();
        const myObjectT = await searchObjectsByUserEmailBoundary(
          "tables",
          objectM.objectManager.objectId,
          user.user.userId.email,
          user.user.userId
        );
        await ChangeToSuperAppUser();
        setMyObject(myObjectT);
        const guests = await GetChildrenObject(
          myObjectT,
          user.user.userId.email
        );
        console.log(guests);
        setItems(guests);
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

  const handleFinishTableArragment = async () => 
  {
    for (const guest of items) {
      try {
        const { superapp, internalObjectId } = guest.objectId;
        await ObjectUpdateApi(
          guest.createdBy.userId.email,
          internalObjectId,
          {objectDetails:guest.objectDetails}
        );
        console.log(`Guest ${superapp}/${internalObjectId} updated successfully.`);
        // Handle the response as needed
      } catch (error) {
        console.error(`Error updating guest ${guest.objectId}: ${error}`);
        // Handle the error as needed
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Layout>
        <Header style={{ background: "#fff" }}>
          <Row>
            <Col span={10}></Col>
            <Col span={7}>
              <Button onClick={handleFinishTableArragment}>
                finish table arragment
              </Button>
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
