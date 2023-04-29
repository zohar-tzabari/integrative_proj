import { Button, Layout, Table, message } from "antd";
import {
  getAllUsers,
  getAllCommands,
  deleteAllUsers,
  deleteAllObjects,
  deleteAllCommandsHistory,
} from "../api/AdminAPI";
import { useEffect, useState } from "react";

const { Header, Content, Footer, Sider } = Layout;

const JsonTable = ({ data }) => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const newColumns = keys.map((key) => ({
        title: key.toUpperCase(),
        dataIndex: key,
        key,
      }));
      setColumns(newColumns);
    }
  }, [data]);

  return <Table dataSource={data} columns={columns} />;
};

function AdminComp() {
  const [results, setResults] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };


  const handleGetAllUsers = async () => {
    try {
      const users = await getAllUsers();
      success("Get All Users");
      console.log(users.data);
      setResults(users.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllCommands = async () => {
    try {
      const commands = await getAllCommands();
      setResults(commands.data);
      success("Get All Commands");
      // setResults(commands);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllUsers = async () => {
    try {
      await deleteAllUsers();
      success("All users deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllObjects = async () => {
    try {
      await deleteAllObjects();
      success("All objects deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllCommandsHistory = async () => {
    try {
      await deleteAllCommandsHistory();
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
        <JsonTable data = {results} />
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
