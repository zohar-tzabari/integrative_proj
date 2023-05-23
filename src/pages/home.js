import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setMiniAppName } from "../redux/miniAppSlice";

const { Header, Content, Footer, Sider } = Layout;
const AppMatrix = () => {
  const dispatch = useDispatch();
  const handleSupplierAppClick = () => {
    dispatch(setMiniAppName('Supplier Mini App'));
  };

  const handleCustomerAppClick = () => {
    dispatch(setMiniAppName('Customer Mini App'));
  };

  const handleTablesAppClick = () => {
    dispatch(setMiniAppName('Tables Mini App'));
  };

  const handleApproveInventionAppClick = () => {
    dispatch(setMiniAppName('Approve Invention Mini App'));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Button type="primary" size="large" onClick={handleSupplierAppClick}>
          Supplier Mini App
        </Button>
        <Button type="primary" size="large" onClick={handleCustomerAppClick}>
          Customer Mini App
        </Button>
        <Button type="primary" size="large" onClick={handleTablesAppClick}>
          Tables Mini App
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={handleApproveInventionAppClick}
        >
          Approve Invention Mini App
        </Button>
      </div>
    </>
  );
};

function Home() {
  const user = useSelector((state) => state.user);
  const objectM = useSelector((state) => state.objectManager);
  const miniAppName = useSelector((state) => state.miniAppName);



  return (
    <Layout>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            example
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            example
          </Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />}>
            example
          </Menu.Item>
          <Menu.Item key="4" icon={<TeamOutlined />}>
            example
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          className="site-layout-sub-header-background"
          style={{ padding: 0 }}
        />
        <Content>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            {console.log(user)}
            <h1>hi: {user? user.avatar:""}</h1>
            <h1>current mini app is: {miniAppName.miniAppName}</h1>
            <h1>Welcome to our web portal!</h1>
            <p>We are a leading provider of web-based solutions.</p>
          </div>
          <AppMatrix />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Web Portal ©2023 Created by My Company
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Home;
