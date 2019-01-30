import React from 'react';
import PropTypes from 'prop-types';
import 'react-calendar-heatmap/dist/styles.css';
import CalendarHeatmap from 'react-calendar-heatmap';
import './LearnerCompletionsVisualization.scss';

const today = Date.now();

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

const LearnerCompletionsVisualization = ({
  completionData,
}) => (
  <CalendarHeatmap
    // TODO: assume we are always presenting a year for now
    startDate={shiftDate(today, -365)}
    endDate={today}
    values={completionData}
    classForValue={(value) => {
      if (!value) {
        return 'color-0';
      }
      return `color-${value.count}`;
    }}
    showMonthLabels
    showWeekdayLabels
    horizontal={false}
  />
);

LearnerCompletionsVisualization.propTypes = {
  completionData: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    count: PropTypes.number,
  })).isRequired,
};

export default LearnerCompletionsVisualization;
