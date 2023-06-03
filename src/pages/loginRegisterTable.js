import { Tabs } from "antd";

import Login from "../sharedComponents/loginUser";

import TableRegistrationForm from "./registerTablePage";

const { TabPane } = Tabs;

function singLoginTable() {
  return (
    <Tabs>
      <TabPane tab="Register" key="register">
        <TableRegistrationForm />
      </TabPane>
      <TabPane tab="Login" key="login">
        <Login type={"MINIAPP_USER"} />
      </TabPane>
    </Tabs>
  );
}

export default singLoginTable;
