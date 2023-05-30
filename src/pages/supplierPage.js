import React, { useState } from 'react';
import { Layout, DatePicker, Table } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

const latestClients = [
  { id: 1, name: 'Client A', date: '2023-05-25' },
  { id: 2, name: 'Client B', date: '2023-05-27' },
  { id: 3, name: 'Client C', date: '2023-05-28' },
]; // Sample array of latest clients

const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Client Name', dataIndex: 'name', key: 'name' },
    { title: 'Request Date', dataIndex: 'date', key: 'date' },
  ];

const SupplierPage = () => {
    const [busyDates, setBusyDates] = useState(['2023-05-15', '2023-05-20', '2023-05-22']);
  
    const disabledDate = (current) => {
      // Disable dates that are already busy
      const formattedDate = current.format('YYYY-MM-DD');
      return busyDates.includes(formattedDate);
    };
  
    const handleDateChange = (date, dateString) => {
      const formattedDate = date.format('YYYY-MM-DD');
      if (busyDates.includes(formattedDate)) {
        // Remove date if it already exists in the array
        setBusyDates(busyDates.filter((date) => date !== formattedDate));
      } else {
        // Add date if it doesn't exist in the array
        setBusyDates([...busyDates, formattedDate]);
      }
    };


  return (
    <Layout>
      <Sider style={{ background: "#fff"}}></Sider>
      <Layout>
        <Content>
          <h2>Select Busy Dates</h2>
          <DatePicker disabledDate={disabledDate} onChange={handleDateChange} />

          <h2>Costumers Requests</h2>
          <Table dataSource={latestClients} columns={columns} />
        </Content>
        <Footer></Footer>
      </Layout>
    </Layout>
  );
};

export default SupplierPage;
