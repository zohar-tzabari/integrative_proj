import { DatePicker, Table, Button, Rate } from "antd";
import { InstagramOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const PickDate = () => {
  const [date, setDate] = useState(null);
  const [busyDates, setBusyDates] = useState([
    "2023-03-15",
    "2023-03-23",
    "2023-04-02",
  ]);

  const disabledDate = (current) => {
    const formattedCurrent = current.format("YYYY-MM-DD");
    const today = new Date(); // get current date
    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ); // remove time part of current date
    const selectedDate = new Date(
      current.year(),
      current.month(),
      current.date()
    ); // remove time part of selected date
    return (
      busyDates.includes(formattedCurrent) ||
      selectedDate.getTime() < currentDate.getTime()
    ); // compare dates
  };

  return (
    <DatePicker
      bordered={false}
      value={date}
      onChange={setDate}
      disabledDate={disabledDate}
    />
  );
};

const RatingSup = () => {
  const [price, setPrice] = useState(0);
  const [quality, setQuality] = useState(0);
  const [services, setServices] = useState(0);

  return (
    <div>
      <br />
      price:
      <span>
        <Rate tooltips={desc} onChange={setPrice} value={price} />
        {price ? <span className="ant-rate-text">{desc[price - 1]}</span> : ""}
      </span>
      <br />
      quality:
      <span>
        <Rate tooltips={desc} onChange={setQuality} value={quality} />
        {quality ? (
          <span className="ant-rate-text">{desc[quality - 1]}</span>
        ) : (
          ""
        )}
      </span>
      <br />
      services:
      <span>
        <Rate tooltips={desc} onChange={setServices} value={services} />
        {services ? (
          <span className="ant-rate-text">{desc[services - 1]}</span>
        ) : (
          ""
        )}
      </span>
      <br />
    </div>
  );
};

const Description = ({ text, instgramLink }) => {
  return (
    <div>
      {text}
      <br />
      <Button icon={<InstagramOutlined />} size="large" href={instgramLink}>
        {" "}
      </Button>
      <RatingSup />
      <PickDate />
    </div>
  );
};

const dataSource = [
  {
    key: "1",
    name: "Mike",
    address: "New York No. 34 Lake Park",
    supType: "dresses",
    rate_grade: 4,
    description: (
      <Description
        text="My name is Mike, I do dresses"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
  {
    key: "5",
    name: "Mike",
    address: "New York No. 34 Lake Park",
    supType: "dresses",
    rate_grade: 4,
    description: (
      <Description
        text="My name is Mike, I do dresses"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
  {
    key: "6",
    name: "Mike",
    address: "New York No. 34 Lake Park",
    supType: "dresses",
    rate_grade: 4,
    description: (
      <Description
        text="My name is Mike, I do dresses"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
  {
    key: "2",
    name: "John",
    address: "London No. 1 Lake Park",
    supType: "flowers",
    rate_grade: 3,
    description: (
      <Description
        text="My name is Mike, I like to wear dresses"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
  {
    key: "3",
    name: "zohar",
    address: "New York No. 1 Lake Park",
    supType: "Dj",
    rate_grade: 2,
    description: (
      <Description
        text="My name is zohar, I DJ"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
  {
    key: "4",
    name: "Dean",
    address: "London No. 34 Lake Park",
    supType: "Dj",
    rate_grade: 2.5,
    description: (
      <Description
        text="My name is Dean, I DJ"
        instgramLink="https://www.instagram.com/"
      />
    ),
    photo: (
      <img
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        alt="My Photo"
        width={100}
        height={100}
      />
    ),
  },
];

const cities = [
  {
    text: "New York",
    value: "New York",
  },
  {
    text: "London",
    value: "London",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "supType",
    dataIndex: "supType",
    key: "supType",
    filters: [
      {
        text: "Dj",
        value: "Dj",
      },
      {
        text: "flowers",
        value: "flowers",
      },
      {
        text: "dresses",
        value: "dresses",
      },
    ],
    onFilter: (value, record) => record.supType.indexOf(value) === 0,
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    filters: cities,
    onFilter: (value, record) => record.address.includes(value),
  },
  {
    title: "Rate grade",
    dataIndex: "rate_grade",
    key: "rate_grade",
    sorter: (a, b) => a.rate_grade - b.rate_grade,
  },
  {
    title: "Photo",
    dataIndex: "photo",
    key: "photo",
  },
];

const SupTable = () => {
  return (
    <div>
      {
        <Table
          dataSource={dataSource}
          expandable={{
            expandedRowRender: (record) => (
              <p
                style={{
                  margin: 0,
                }}
              >
                {record.description}
              </p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          columns={columns}
        />
      }
    </div>
  );
};
export default SupTable;
