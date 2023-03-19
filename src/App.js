import { Layout, Avatar, Badge } from "antd";
import { MessageTwoTone } from "@ant-design/icons";

import SideView from "./sideView.js";
import React, { useEffect, useState } from "react";
import SupTable from "./suppliersTable"


const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Layout>
      <Header
        style={{
          backgroundColor: "white",
          borderBottom: "none",
          padding: 0,
        }}
      >
        <a href="#">
          <Badge count={5}>
            <Avatar  icon={<MessageTwoTone />} shape="square" size="large" />
          </Badge>
        </a>
      </Header>
      <Layout>
        <Sider
          style={{
            backgroundColor: "gray",
            borderBottom: "none",
            padding: 0,
          }}
        ></Sider>
        <Content>
          {" "}
          <div>
            <SupTable />
          </div>
        </Content>
        <Sider
          style={{
            backgroundColor: "gray",
            borderBottom: "none",
            padding: 0,
          }}
        >
          right sidebar
        </Sider>
      </Layout>
      <Footer>@all right served to wed portal</Footer>
    </Layout>
  );
}

export default App;
