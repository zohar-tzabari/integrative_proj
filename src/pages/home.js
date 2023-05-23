import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

function Home() {
  const email = useSelector(state=>state.userEmail);
  const objectM = useSelector(state=>state.objectManager);

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
            <h1>hi: {email.userEmail}</h1>
            <h1>object manager is: {objectM.type}</h1>
            {console.log(objectM)}
            <h1>Welcome to our web portal!</h1>
            <p>We are a leading provider of web-based solutions.</p>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Web Portal ©2023 Created by My Company
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Home;
