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
      <Layout
        style={{
          padding: 0,
          background: "rgba(255, 255, 100, 0.1)",
          backgroundImage:
            'url("https://img.freepik.com/free-vector/light-pink-heart-pattern_53876-67660.jpg")',
          backgroundSize: "20%",
          backgroundRepeat: "repeat",
        }}
      >
        <Content
          style={{
            padding: 0,
            background: "rgba(255, 255, 100, 0.1)",
            backgroundImage:
              'url("https://img.freepik.com/free-vector/light-pink-heart-pattern_53876-67660.jpg")',
            backgroundSize: "20%",
            backgroundRepeat: "repeat",
          }}
        >
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
