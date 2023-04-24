import { Button, Layout } from "antd";
import {
  getAllUsers,
  getAllCommands,
  deleteAllUsers,
  deleteAllObjects,
  deleteAllCommandsHistory,
} from "../api/AdminAPI";
const { Header, Content, Footer, Sider } = Layout;

function AdminComp() {
  const handleGetAllUsers = async () => {
    try {
      const users = await getAllUsers();
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllCommands = async () => {
    try {
      const commands = await getAllCommands();
      console.log(commands);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllUsers = async () => {
    try {
      await deleteAllUsers();
      console.log("All users deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllObjects = async () => {
    try {
      await deleteAllObjects();
      console.log("All objects deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAllCommandsHistory = async () => {
    try {
      await deleteAllCommandsHistory();
      console.log("All commands history deleted");
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
      <Button style={{ margin: "0.5rem" }} type="primary" onClick={handleGetAllUsers}>
        Get All Users
      </Button>
      <Button style={{ margin: "0.5rem" }} type="primary" onClick={handleGetAllCommands}>
        Get All Commands
      </Button>
      <Button style={{ margin: "0.5rem" }} onClick={handleDeleteAllUsers}>
        Delete All Users
      </Button>
      <Button style={{ margin: "0.5rem" }} onClick={handleDeleteAllObjects}>
        Delete All Objects
      </Button>
      <Button style={{ margin: "0.5rem" }} onClick={handleDeleteAllCommandsHistory}>
        Delete All Commands History
      </Button>
    </div>
  );
}

const Admin = () => {
  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <AdminComp />
        </Content>
        <Sider>Sider</Sider>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
export default Admin;
