import { Button } from 'antd';
import { BrowserRouter, Routes, Route,useNavigate } from "react-router-dom";
import RegistrationForm from "./pages/registerClinet";
import AllClientView from "./pages/suppliersTable";


const Router = () => {
  return (
      <BrowserRouter>
      <Routes>
          <Route index element={<AllClientView />} />
          <Route path="RegistrationForm" element={<AllClientView />} />
          <Route path="AllClientView" element={<AllClientView />} />
          <Route path="*" element={"nothing to see"} />            
          <Route path="hi" element={<RegistrationForm />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
