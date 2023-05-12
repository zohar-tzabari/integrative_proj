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
import {TablePage,GuestForm }from "./pages/tables"



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
            <Route path="Admin" element={<Admin />} />
            <Route path="*" element={"nothing to see"} />            
            <Route path="BuisnessRegistrationForm" element={<BuisnessRegistrationForm />} />
            <Route path="tables/arrangeTables" element={<TablePage />} />
            <Route path="tables/insertGuests" element={<GuestForm />} />
            <Route path="MiniAppDash" element={<MiniAppDash />} />
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
      <Menu.Item key="/Admin">
        <Link to="/Admin">Admin Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="/BuisnessRegistrationForm">
      <Link to="/BuisnessRegistrationForm">Buisness Registration Form</Link>
    </Menu.Item>
    <Menu.Item key="/tables/insertGuests">
        <Link to="/tables/insertGuests">Tables organizer</Link>
      </Menu.Item>
    <Menu.Item key="/MiniAppDash">
      <Link to="/MiniAppDash">Mini APP DashBorad</Link>
    </Menu.Item>
    </Menu>
  );
}

export default NewMenu;