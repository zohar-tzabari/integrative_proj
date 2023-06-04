import { Tabs } from "antd";

import Login from "../sharedComponents/loginUser";

import BuisnessRegistrationForm from "./registerBuisness";

const { TabPane } = Tabs;

function SingLoginSupplier() {
  return (
    <Tabs>
      <TabPane tab="Register" key="register">
        <BuisnessRegistrationForm />
      </TabPane>
      <TabPane tab="Login" key="login">
        <Login type={"MINIAPP_USER"} />
      </TabPane>
    </Tabs>
  );
}

export default SingLoginSupplier;
