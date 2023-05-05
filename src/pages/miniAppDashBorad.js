import { Button, Layout, message } from "antd";
import {
  GetAllSuppliers
} from "../api/miniAppApi";
import {  useState } from "react";
import {JsonTable} from "../sharedComponents/JsonTable";
const { Header, Content, Footer, Sider } = Layout;


function MiniAPPComp() {
  const [results, setResults] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };


  const handleGetAllSuppliers = async () => {
    try {
      const users = await GetAllSuppliers("zohar");
      success("Get All Suppliers");
      console.log(users);
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
          onClick={handleGetAllSuppliers}
        >
          Get All Suppliers
        </Button>
        <JsonTable data = {results} />
      {contextHolder}
      </div>
  );
}

const MiniAppDash = () => {
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
          <MiniAPPComp />
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
export default MiniAppDash;
