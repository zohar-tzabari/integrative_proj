import { Layout, Menu } from 'antd';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useLocation,
  Routes
} from "react-router-dom";
import RegistrationForm from "./pages/registerClinet";
import AllClientView from "./pages/suppliersTable";
import Home from "./pages/home";


const { Header, Content } = Layout;

function AppTemp() {
  return (
    <Router>
      <Layout>
        <Header>
          <MenuComp />
        </Header>
        <Content>
          <Routes>
            <Route index element={<Home />} />
            <Route path="RegistrationForm" element={<RegistrationForm />} />
            <Route path="AllClientView" element={<AllClientView />} />
            <Route path="*" element={"nothing to see"} />            
            <Route path="hi" element={<RegistrationForm />} />
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
      <Menu.Item key="/RegistrationForm">
        <Link to="/RegistrationForm">Registration Form</Link>
      </Menu.Item>
      <Menu.Item key="/AllClientView">
        <Link to="/AllClientView">All Client View</Link>
      </Menu.Item>
    </Menu>
  );
}

export default AppTemp;