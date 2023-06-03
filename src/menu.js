import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import AllClientView from "./pages/suppliersTable";
import Home from "./pages/home";
import Admin from "./pages/admin";
import BuisnessRegistrationForm from "./pages/registerBuisness";
import MiniAppDash from "./pages/miniAppDashBorad";
import Login from "./sharedComponents/loginUser";
import RegistrationForm from "./sharedComponents/RegisterUser";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GuestForm } from "./pages/tables";
import { TablePage } from "./pages/tablePage";
import SupplierPage from "./pages/supplierPage";
import TableRegistrationForm from "./pages/loginRegisterTable";
import SingLoginCustomers from './pages/registerCustomer'

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
            <Route
              path="client/register"
              element={<SingLoginCustomers />}
            />

            <Route path="*" element={"nothing to see"} />
            <Route
              path="BuisnessRegistrationForm"
              element={<BuisnessRegistrationForm />}
            />
            <Route path="MiniAppDash/:email" element={<MiniAppDash />} />
            <Route path="Admin/:email" element={<Admin />} />
            <Route
              path="RegisterAdmin"
              element={<RegistrationForm userRole={"ADMIN"} />}
            />
            <Route
              path="RegisterSuperApp"
              element={<RegistrationForm userRole={"SUPERAPP_USER"} />}
            />
            <Route
              path="loginAdmin"
              element={<Login urlToPass={"Admin"} type={"ADMIN"} />}
            />
            <Route
              path="loginMiniAppDash"
              element={
                <Login urlToPass={"MiniAppDash"} type={"MINIAPP_USER"} />
              }
            />
            <Route
              path="BuisnessRegistrationForm"
              element={<BuisnessRegistrationForm />}
            />
            <Route path="supplierPage" element={<SupplierPage />} />
            <Route
              path="supplier/login"
              element={<Login type={"MINIAPP_USER"} role={"Supplier"}/>}
            />
            <Route path="tables/arrangeTables" element={<TablePage />} />
            <Route path="tables/insertGuests" element={<GuestForm />} />
            <Route
              path="tables/RegistrationForm"
              element={<TableRegistrationForm />}
            />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

function MenuComp() {
  const currentMiniApp = useSelector((state) => state.miniApp);
  const [menuToAdd, setMenuToAdd] = useState([]);

  useEffect(() => {
    // Function to execute
    const fetchData = () => {
      switch (currentMiniApp.miniAppName) {
        case "Supplier": {
          setMenuToAdd([
            {
              key: "/BuisnessRegistrationForm",
              to: "/BuisnessRegistrationForm",
              name: "Buisness Registration Form",
            },
            {
              key: "/supplierPage",
              to: "/supplierPage",
              name: "Buisness page",
            },
            {
              key: "/supplier/login",
              to: "/supplier/login",
              name: "login",
            },
          ]);
          break;
        }
        case "Customer": {
          setMenuToAdd([
            {
              key: "/AllClientView",
              to: "/AllClientView",
              name: "All Client View",
            },
            {
              key: "/client/register",
              to: "/client/register",
              name: "Customer register",
            },
          ]);
          break;
        }
        case "Tables": {
          setMenuToAdd([
            {
              key: "/tables/insertGuests",
              to: "/tables/insertGuests",
              name: "Tables organizer",
            },
            {
              key: "tables/RegistrationForm",
              to: "tables/RegistrationForm",
              name: "Tables RegistrationForm",
            },
          ]);
          break;
        }
        case "Invention": {
          setMenuToAdd([]);
          break;
        }
        case "Admin": {
          setMenuToAdd([
            {
              key: "/loginAdmin",
              to: "/loginAdmin",
              name: "Admin Dashboard",
            },
            {
              key: "/RegisterAdmin",
              to: "/RegisterAdmin",
              name: "Register Admin",
            },
          ]);
          break;
        }
        case "miniAppDashboard": {
          setMenuToAdd([
            {
              key: "/loginMiniAppDash",
              to: "/loginMiniAppDash",
              name: "Login Mini APP DashBorad",
            },
            {
              key: "/RegisterSuperApp",
              to: "/RegisterSuperApp",
              name: "Register SuperApp User",
            },
          ]);
          break;
        }
        default: {
          setMenuToAdd([]);
          // Add default case code if needed
          break;
        }
      }
    };
    // Call the function
    fetchData();
  }, [currentMiniApp]); // Empty dependency array to run the effect only once

  useEffect(() => {

  }, [menuToAdd]);

  return (
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      {menuToAdd.map((item) => (
        <Menu.Item key={item.key}>
          <Link to={item.to}>{item.name}</Link>
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default NewMenu;
