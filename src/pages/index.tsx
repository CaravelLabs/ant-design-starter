import React from "react";
import {
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
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const { Meta } = Card;

const gridStyleFull: React.CSSProperties = {
  width: '100%',
  textAlign: 'center',
};

const gridStyleHalf: React.CSSProperties = {
  width: '50%',
  textAlign: 'center',
}

const gridStyleThirds: React.CSSProperties = {
  width: '33.333%',
  textAlign: 'center',
}

const gridStyleQuarter: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
}

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

const dataSource = [
  {
    key: "1",
    title: "Card Title 1",
    content: "This is the content of the first card.",
    date: "01-Apr",
  },
];

const columns = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    render: (date: string) => <a>{date}</a>,
  },
  {
    title: "Board Meetings",
    dataIndex: "",
    key: "card",
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
          <Meta
            title="Event Title"
            description="This is the description"
          />
        </Card.Grid>
        {/* <Card.Grid style={gridStyleHalf}>Date</Card.Grid>
        <Card.Grid style={gridStyleHalf}>Time</Card.Grid> */}
        <Card.Grid style={gridStyleThirds}>Info</Card.Grid>
        <Card.Grid style={gridStyleThirds}>PID</Card.Grid>
        <Card.Grid style={gridStyleThirds}>Board Doc</Card.Grid>
      </Card>
    ),
  },
  {
    title: "No-Objection Deadlines",
    dataIndex: "",
    key: "card",
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
          <Meta
            title="Event Title"
            description="This is the description"
          />
        </Card.Grid>
        {/* <Card.Grid style={gridStyleHalf}>Date</Card.Grid>
        <Card.Grid style={gridStyleHalf}>Time</Card.Grid> */}
        <Card.Grid style={gridStyleThirds}>Info</Card.Grid>
        <Card.Grid style={gridStyleThirds}>PID</Card.Grid>
        <Card.Grid style={gridStyleThirds}>Board Doc</Card.Grid>
      </Card>
    ),
  },
  {
    title: "Other Activities",
    dataIndex: "",
    key: "card",
    render: (record: any) => (
      <Card
        style={{ width: 300 }}
        actions={[
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Card.Grid style={gridStyleFull}>
          <Meta
            title="Event Title"
            description="This is the description"
          />
        </Card.Grid>
        {/* <Card.Grid style={gridStyleHalf}>Date</Card.Grid>
        <Card.Grid style={gridStyleHalf}>Time</Card.Grid> */}
        <Card.Grid style={gridStyleFull}>Info</Card.Grid>
      </Card>
    ),
  },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={items2}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Table
              columns={columns}
              dataSource={dataSource}
              showSorterTooltip={true}
            />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        {/* Caravel Labs ©2024 Created by CL Engineering Team */}
      </Footer>
    </Layout>
  );
};

export default App;
