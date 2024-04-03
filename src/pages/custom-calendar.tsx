import React, { useState } from 'react';
import { Row, Col, Select } from 'antd';

interface CalendarProps {
  onSelectDate: (date: Date) => void;
}

const CustomCalendar: React.FC<CalendarProps> = ({ onSelectDate }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthOptions = months.map((month, index) => (
    <Select.Option key={index + 1} value={index + 1}>
      {month}
    </Select.Option>
  ));
  
  const handleMonthChange = (value: number) => {
    setSelectedMonth(value);
  };

  const handleYearChange = (value: number) => {
    setSelectedYear(value);
  };

  const renderCalendar = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const firstDayOfMonth = new Date(selectedYear, selectedMonth - 1, 1).getDay();

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
        className={`calendar-day ${day === null ? 'empty' : ''}`}
        onClick={() => handleDayClick(day)}
        style={{ cursor: day === null ? 'default' : 'pointer' }}
      >
        {day}
      </div>
    ));
  };

  const handleDayClick = (day: number | null) => {
    if (day !== null) {
      const selectedDate = new Date(selectedYear, selectedMonth - 1, day);
      onSelectDate(selectedDate);
    }
  };

  return (
    <div
      className="ant-calendar"
      style={{
        borderRadius: '2px',
        border: '1px solid #d9d9d9',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        width: '280px',
      }}
    >
      <div className="ant-calendar-header" style={{ padding: '8px 16px', borderBottom: '1px solid #f0f0f0' }}>
        <Row justify="space-between">
          <Col>
            <Select
              value={selectedMonth}
              onChange={handleMonthChange}
              className="ant-calendar-month-select"
              style={{ width: '100px' }}
            >
              {monthOptions}
            </Select>
          </Col>
          <Col>
            <Select
              value={selectedYear}
              onChange={handleYearChange}
              className="ant-calendar-year-select"
              style={{ width: '100px' }}
            >
              {Array.from({ length: 10 }, (_, index) => (
                <Select.Option key={selectedYear - 5 + index} value={selectedYear - 5 + index}>
                  {selectedYear - 5 + index}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>
      <div className="ant-calendar-content">
        <div className="ant-calendar-table">
          <div className="ant-calendar-tbody">
            <div className="ant-calendar-date-panel">
              <div className="ant-calendar-date-panel-header">
                <Row gutter={0}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                    <Col
                      key={index}
                      className="ant-calendar-column-header"
                      flex="auto"
                      style={{ padding: '4px', textAlign: 'center' }}
                    >
                      <span className="ant-calendar-column-header-inner" style={{ fontWeight: '500' }}>
                        {day}
                      </span>
                    </Col>
                  ))}
                </Row>
              </div>
              <div className="ant-calendar-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
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
