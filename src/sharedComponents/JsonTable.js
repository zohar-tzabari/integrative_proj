import { Table } from "antd";
import { useEffect, useState } from "react";

function generateSubTable(key, value, dataIndex, title) {
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
          return generateSubTable(key, value, dataIndex, title);
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

  return (<div>
    <Table dataSource={data} columns={columns} />
  </div>)
};
