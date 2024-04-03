import React, { useMemo, useState } from "react";
import {
  DownOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps, TableColumnsType, TableProps } from "antd";
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Table,
  Card,
  Avatar,
  Col,
  Row,
  Dropdown,
  Button,
  Space,
  Divider,
  Tabs,
} from "antd";
import { observer } from "mobx-react-lite";
import { Calendar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import CustomCalendar from "./custom-calendar";

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const { Meta } = Card;

// Code for Custom Grid Style
const gridStyleFull: React.CSSProperties = {
  width: "100%",
  textAlign: "center",
};

const gridStyleHalf: React.CSSProperties = {
  width: "50%",
  textAlign: "center",
};

const gridStyleThirds: React.CSSProperties = {
  width: "33.333%",
  textAlign: "center",
};

const gridStyleQuarter: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const handleDateSelect = (date: Date): void => {
  console.log("Selected date:", date);
};

const dataSource = [
  {
    key: "1",
    title: "Card Title 1",
    content: "This is the content of the first card.",
    date: "01-Apr (Mon)",
    boardMeetings: {
      title: "Board Meeting 1",
      description: "This is the description",
      date: "01-Apr (Mon)",
      time: "10:00 AM",
      info: "Info",
      pid: "PID",
      boardDoc: "Board Doc",
    },
    noObjectionDeadlines: {
      title: "No Objection Deadline 1",
      description: "This is the description",
      date: "01-Apr (Mon)",
      time: "10:00 AM",
      info: "Info",
      pid: "PID",
      boardDoc: "Board Doc",
    },
    otherActivities: {
      title: "Other Activity 1",
      description: "This is the description",
      date: "01-Apr (Mon)",
      time: "10:00 AM",
      info: "Info",
    },
  },
];
// ------------------------------

// Code for Add Event Menu
const addEventItems: MenuProps["items"] = [
  {
    key: "1",
    label: "Board Meetings",
  },
  {
    key: "2",
    label: "No Objection Deadlines",
  },
  {
    key: "3",
    label: "Other Activities",
  },
];

const handleMenuClick: MenuProps["onClick"] = (e) => {
  console.log(e);
};

const menuProps: MenuProps = {
  items: addEventItems,
  onClick: handleMenuClick,
};
// ------------------------------

// Code for Table Columns
const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => (
      <Space direction="vertical" size="middle">
        <a>{date}</a>
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              + Add Event
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Space>
    ),
  },
  {
    title: "Board Meetings",
    dataIndex: "boardMeetings",
    key: "boardMeetingCard",
    render: (record: any) => (
      <Card
        style={{ width: 300 }}
        actions={[
          <EditOutlined key="edit" />,
          <DoubleRightOutlined key="next" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Card.Grid style={gridStyleFull}>
          <Meta title="Event Title" description="This is the description" />
          <Meta title={record?.title} description={record.description} />
        </Card.Grid>
        <Card.Grid style={gridStyleThirds}>{record.info}</Card.Grid>
        <Card.Grid style={gridStyleThirds}>{record.pid}</Card.Grid>
        <Card.Grid style={gridStyleThirds}>{record.boardDoc}</Card.Grid>
      </Card>
    ),
  },
  {
    title: "No-Objection Deadlines",
    dataIndex: "noObjectionDeadlines",
    key: "noObjectionCard",
    render: (record: any) => (
      <Card
        style={{ width: 300 }}
        actions={[
          <EditOutlined key="edit" />,
          <DoubleLeftOutlined key="prev" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Card.Grid style={gridStyleFull}>
          <Meta title="Event Title" description="This is the description" />
          <Meta title={record.title} description={record.description} />
        </Card.Grid>
        <Card.Grid style={gridStyleThirds}>{record.info}</Card.Grid>
        <Card.Grid style={gridStyleThirds}>{record.pid}</Card.Grid>
        <Card.Grid style={gridStyleThirds}>{record.boardDoc}</Card.Grid>
      </Card>
    ),
  },
  {
    title: "Other Activities",
    dataIndex: "otherActivities",
    key: "otherActivitiesCard",
    render: (record: any) => (
      <Card
        style={{ width: 300 }}
        actions={[
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Card.Grid style={gridStyleFull}>
          <Meta title="Event Title" description="This is the description" />
          <Meta title={record.title} description={record.description} />
        </Card.Grid>
        <Card.Grid style={gridStyleFull}>{record.info}</Card.Grid>
      </Card>
    ),
  },
];
// ------------------------------

// Code for Tabs and Export Menu
const exportMenuItems: MenuProps["items"] = [
  {
    key: "1",
    label: "Export to PDF",
  },
  {
    key: "2",
    label: "Export to Excel",
  },
];

const exportMenuProps: MenuProps = {
  items: exportMenuItems,
  onClick: (e) => {
    console.log(e);
  },
};

const operations = (
  <>
    <Dropdown menu={exportMenuProps}>
      <Button>
        3-Month <DownOutlined />
      </Button>
    </Dropdown>
  </>
);
// ------------------------------

// Code for Tabs and Export Menu

// ------------------------------

const tabs = [
  {
    key: "1",
    label: "Tentative Calendar",
    children: (
      <Table
        columns={columns}
        dataSource={dataSource}
        showSorterTooltip={true}
      />
    ),
  },
  {
    key: "2",
    label: "Provisional Calendar",
    children: (
      <>
        <p>Under Construction</p>
      </>
    ),
  },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [calendarNumber, setCalendarNumber] = useState(3);
  const handleMenuClick = (e: { key: React.SetStateAction<number> }) => {
    setCalendarNumber(e.key);
  };
  const calendarSelectItems: MenuProps["items"] = [
    {
      key: "3",
      label: "3-Month",
    },
    {
      key: "12",
      label: "12-Month",
    },
  ];

  const calendarProps: MenuProps = {
    items: calendarSelectItems,
    onClick: handleMenuClick,
  };
  const calendars = Array.from({ length: calendarNumber }).map((_, index) => (
    <div key={index} style={{ padding: "8px" }}>
      <CustomCalendar
        onSelectDate={handleDateSelect}
        month={
          new Date().getMonth() + 1 + index > 12
            ? (new Date().getMonth() + 1 + index) % 12
            : new Date().getMonth() + 1 + index
        }
        year={
          new Date().getMonth() + 1 + index > 12
            ? new Date().getFullYear() + 1
            : new Date().getFullYear()
        }
      />
    </div>
  ));

  const calendarOperation = (
    <>
      <div style={{ paddingTop: "10px" }}>
        <Dropdown menu={calendarProps}>
          <Button>
            {calendarNumber === 3 ? "3-Month" : "12-Month"}
            <DownOutlined />
          </Button>
        </Dropdown>
      </div>
    </>
  );
  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={400}>
            <div
              style={{
                maxWidth: "75%",
                border: "1px solid #d9d9d9",
                borderRadius: 4,
              }}
            >
              <Content style={{ padding: "0 24px" }}>
                <Tabs tabBarExtraContent={calendarOperation} />
              </Content>
              {calendars}
            </div>
          </Sider>
          <Content style={{ padding: "0 24px" }}>
            <Tabs tabBarExtraContent={operations} items={tabs} />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Caravel Labs ©2024 Created by CL Engineering Team
      </Footer>
    </Layout>
  );
};

export default observer(App);
