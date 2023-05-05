import React, { useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, Col, Row, Layout, Collapse } from "antd";

const { Header, Content, Footer, Sider } = Layout;

function CardComponent({item}) {

  return (
    <Card size="small">
      {item.name}
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
                    <CardComponent item={item}/>
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

const TablePage = () => {
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

export default TablePage;
