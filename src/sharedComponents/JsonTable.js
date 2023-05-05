import {  Table } from "antd";
import { useEffect, useState } from "react";


export const JsonTable = ({ data }) => {
    const [columns, setColumns] = useState([]);
  
    useEffect(() => {
      if (data.length > 0) {
        const keys = Object.keys(data[0]);
        const newColumns = keys.map((key) => {
          const dataIndex = key;
          const title = key.toUpperCase();
          const value = data[0][key];
          if (typeof value === "object" && value !== null) {
            const subKeys = Object.keys(value);
            const children = subKeys.map((subKey) => ({
              title: subKey.toUpperCase(),
              dataIndex: `${key}.${subKey}`,
              key: `${key}.${subKey}`,
              render: (text, record) => record[key][subKey],
            }));
            return {
              title,
              dataIndex,
              key,
              children,
            };
          }
          return {
            title,
            dataIndex,
            key,
          };
        });
        setColumns(newColumns);
      }
    }, [data]);
  
  

    return <Table dataSource={data} columns={columns} />;
  };