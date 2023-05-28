import { Layout, Menu, Breadcrumb, Button } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { setMiniAppClientRole, setMiniAppName } from "../redux/miniAppSlice";
import { setUser } from "../redux/userSlice";

const buttonData = [
  { appName: "Supplier", label: "Supplier Mini App" },
  { appName: "Customer", label: "Customer Mini App" },
  { appName: "Tables", label: "Tables Mini App" },
  { appName: "Invention", label: "Approve Invention Mini App" },
  { appName: "Admin", label: "Admin" },
  { appName: "Tables", label: "Tables" },
  { appName: "miniAppDashboard", label: "Mini App Dashboard" },
];

const { Header, Content, Footer, Sider } = Layout;
const AppMatrix = () => {
  const dispatch = useDispatch();

  const handleAppClick = (appName) => {
    dispatch(setUser({}));
    dispatch(setMiniAppName(appName));
    dispatch(
      setMiniAppClientRole(appName === "Admin" ? "ADMIN" : "SUPERAPP_USER")
    );
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
        {buttonData.map((button) => (
          <Button
            key={button.appName}
            type="primary"
            size="large"
            style={{
              margin: "2em",
              width: "15em",
              height: "8em",
            }}
            onClick={() => handleAppClick(button.appName)}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </>
  );
};

function Home() {
  const user = useSelector((state) => state.user);
  const objectM = useSelector((state) => state.objectManager);
  const miniApp = useSelector((state) => state.miniApp);

  return (
    <Layout>
        <Sider style={{ background: "#fff" }}></Sider>
      {/* <Sider collapsible> */}
      {/* <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
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
        </Menu> */}
      {/* </Sider> */}
      <Layout>
        <Header 
          className="site-layout-sub-header-background"
          style={{ padding: 0 ,background: "#fff" }}
        />
        <Content >
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div>
            <h1>hi: {Object.keys(user).length != 0 ? user.user.avatar : ""}</h1>
            <h1>current mini app is: {miniApp.miniAppName}</h1>
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
