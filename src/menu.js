import { Layout, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import AllClientView from "./pages/suppliersTable";
import Home from "./pages/home";
import Admin from "./pages/admin";
import BuisnessRegistrationForm from "./pages/registerBuisness"
import MiniAppDash from "./pages/miniAppDashBorad"
import Login from "./sharedComponents/loginUser"
import RegistrationForm from './sharedComponents/RegisterUser';

const { Header, Content } = Layout;

function NewMenu() {
  return (
    <Router>
      <Layout>
        <Header>
          <MenuComp />
        </Header>
        <Content>
          <Routes>
            <Route index element={<Home />} />
            <Route path="AllClientView" element={<AllClientView />} />
            <Route path="*" element={"nothing to see"} />            
            <Route path="BuisnessRegistrationForm" element={<BuisnessRegistrationForm />} />
            <Route path="MiniAppDash/:email" element={<MiniAppDash />} />
            <Route path="Admin/:email" element={<Admin />} />
            <Route path="RegisterAdmin" element={<RegistrationForm userRole={"ADMIN"} />} />
            <Route path="RegisterSuperApp" element={<RegistrationForm userRole={"SUPERAPP_USER"} />} />
            <Route path="loginAdmin" element={<Login urlToPass = {"Admin"} type={"ADMIN"} />} />
            <Route path="loginMiniAppDash" element={<Login urlToPass = {"MiniAppDash"} type={"MINIAPP_USER"} />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

function MenuComp() {

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/AllClientView">
        <Link to="/AllClientView">All Client View</Link>
      </Menu.Item>
      <Menu.Item key="/loginAdmin">
        <Link to="/loginAdmin">Admin Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="/BuisnessRegistrationForm">
      <Link to="/BuisnessRegistrationForm">Buisness Registration Form</Link>
    </Menu.Item>
    <Menu.Item key="/RegisterAdmin">
      <Link to="/RegisterAdmin">Register Admin</Link>
    </Menu.Item>
    <Menu.Item key="/loginMiniAppDash">
      <Link to="/loginMiniAppDash">Login Mini APP DashBorad</Link>
    </Menu.Item>
    <Menu.Item key="/RegisterSuperApp">
      <Link to="/RegisterSuperApp">Register SuperApp User</Link>
    </Menu.Item>
    </Menu>
  );
}

export default NewMenu;