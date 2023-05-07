import { Button, Layout, message } from "antd";
import {
  GetAllSuppliers,GetSupplierTypes
} from "../api/miniAppApi";
import {  useState } from "react";
import {JsonTable} from "../sharedComponents/JsonTable";
const { Header, Content, Footer, Sider } = Layout;


function MiniAPPComp() {
  const [results, setResults] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [resultsTable, setResultsTable] = useState(null);

  const success = (text) => {
    messageApi.open({
      type: "success",
      content: text,
    });
  };


  const handleGetAllSuppliers = async () => {
    try {
      setResultsTable(null);
      const suppliers = await GetAllSuppliers("zohar");
      setResultsTable (<JsonTable data={suppliers.data} />);
      success("Get All Suppliers");
      console.log(suppliers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllTypes = async () => {
    try {
      setResultsTable(null);
      const types = await GetSupplierTypes("zohar");
      console.log(types);
      setResultsTable (<JsonTable data={[types.data]} />);
      success("Get All supplier types");
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
        <Button
          style={{ margin: "0.5rem" }}
          type="primary"
          onClick={handleGetAllTypes}
        >
          Get All Suppliers types
        </Button>
        {resultsTable}
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