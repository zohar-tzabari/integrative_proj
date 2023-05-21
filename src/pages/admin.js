import { Button, Layout, Table, message } from "antd";
import {
  getAllUsers,
  getAllCommands,
  deleteAllUsers,
  deleteAllObjects,
  deleteAllCommandsHistory,
} from "../api/AdminAPI";
import { useState } from "react";
import { JsonTable } from "../sharedComponents/JsonTable";
import { useParams } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

function AdminComp() {
  const [resultsTable, setResultsTable] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { email } = useParams();

  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };

  const handleGetAllUsers = async () => {
    try {
      setResultsTable(null);
      const users = await getAllUsers(email);
      success("Get All Users");
      console.log(users.data);
      setResultsTable(<JsonTable data={users.data} />);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllCommands = async () => {
    setResultsTable(null);
    try {
      const commands = await getAllCommands(email);
      setResultsTable(<JsonTable data={commands.data} />);
      console.log(commands.data);
      success("Get All Commands");
      // setResultsTable(commands);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllUsers = async () => {
    try {
      await deleteAllUsers(email);
      success("All users deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllObjects = async () => {
    try {
      await deleteAllObjects(email);
      success("All objects deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllCommandsHistory = async () => {
    try {
      await deleteAllCommandsHistory(email);
      success("All commands history deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",
        alignContent: "stretch",
      }}
    >
      <Button
        style={{ margin: "0.5rem" }}
        type="primary"
        onClick={handleGetAllUsers}
      >
        Get All Users
      </Button>
      <Button
        style={{ margin: "0.5rem" }}
        type="primary"
        onClick={handleGetAllCommands}
      >
        Get All Commands
      </Button>
      <Button
        danger
        style={{ margin: "0.5rem" }}
        onClick={handleDeleteAllUsers}
      >
        Delete All Users
      </Button>
      <Button
        danger
        style={{ margin: "0.5rem" }}
        onClick={handleDeleteAllObjects}
      >
        Delete All Objects
      </Button>
      <Button
        danger
        style={{ margin: "0.5rem" }}
        onClick={handleDeleteAllCommandsHistory}
      >
        Delete All Commands History
      </Button>
      {resultsTable}
      {contextHolder}
    </div>
  );
}

const Admin = () => {
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
        <Content
          style={{
            backgroundColor: "#ffff",
            borderBottom: "none",
            padding: 0,
          }}
        >
          <AdminComp />
        </Content>
        <Sider
          style={{
            backgroundColor: "#ffff",
            borderBottom: "none",
            padding: 0,
          }}
        ></Sider>
      </Layout>
      <Footer></Footer>
    </Layout>
  );
};
export default Admin;
