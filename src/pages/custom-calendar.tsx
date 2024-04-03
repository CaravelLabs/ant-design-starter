import React, { useState } from "react";
import { Row, Col, Select, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface CalendarProps {
  onSelectDate: (date: Date) => void;
  month: number
  year: number
}

const CustomCalendar: React.FC<CalendarProps> = ({ onSelectDate, month, year }) => {

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthOptions = months.map((month, index) => (
    <Select.Option key={index + 1} value={index + 1}>
      {month}
    </Select.Option>
  ));

  const renderCalendar = () => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(
      year,
      month - 1,
      1
    ).getDay();

    const calendarDays = [];

    // Fill the array with days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.unshift(null);
    }

    return calendarDays.map((day, index) => (
      <div
        key={index}
        className={`calendar-day ${day === null ? "empty" : ""}`}
        onClick={() => handleDayClick(day)}
        style={{ cursor: day === null ? "default" : "pointer", textAlign: "center"}}
      >
        {day}
      </div>
    ));
  };

  const handleDayClick = (day: number | null) => {
    if (day !== null) {
      const selectedDate = new Date(year, month - 1, day);
      onSelectDate(selectedDate);
    }
  };

  return (
    <div
      className="ant-calendar"
      style={{
        borderRadius: "2px",
        border: "1px solid #d9d9d9",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        width: "270px",
      }}
    >
      <div
        className="ant-calendar-header"
        style={{ padding: "8px 16px", borderBottom: "1px solid #f0f0f0" }}
      >
        <Row justify="space-between">
          <Col>
            <Button>
              {months[month - 1]}
            </Button>
          </Col>
          <Col>
            <Button>
              {year}
            </Button>
          </Col>
        </Row>
      </div>
      <div className="ant-calendar-content" style={{ padding: '10px'}}>
        <div className="ant-calendar-table">
          <div className="ant-calendar-tbody">
            <div className="ant-calendar-date-panel">
              <div className="ant-calendar-date-panel-header">
                <Row gutter={0}>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day, index) => (
                      <Col
                        key={index}
                        className="ant-calendar-column-header"
                        flex="auto"
                        style={{ padding: "4px", textAlign: "center" }}
                      >
                        <span
                          className="ant-calendar-column-header-inner"
                          style={{ fontWeight: "500", textAlign: "center" }}
                        >
                          {day}
                        </span>
                      </Col>
                    )
                  )}
                </Row>
              </div>
              <div
                className="ant-calendar-body"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                }}
              >
                {renderCalendar()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
