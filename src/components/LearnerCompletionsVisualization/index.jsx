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

class LearnerCompletionsVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      completionDetails: null,
    };
  }
  render() {
    const { completionData } = this.props;
    const { completionDetails } = this.state;
    return (
      <div>
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
          onClick={value => (
            this.setState({
              completionDetails: value,
            })
          )}
        />
        {completionDetails && (
          <div>
            <h2>Completions on {completionDetails.date}</h2>
          </div>
        )}
      </div>
    );
  }
}

LearnerCompletionsVisualization.propTypes = {
  completionData: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    count: PropTypes.number,
    completions: PropTypes.arrayOf(PropTypes.shape({
      block_type: PropTypes.string,
      block_key: PropTypes.string,
      block_name: PropTypes.string,
    })),
  })).isRequired,
};

export default LearnerCompletionsVisualization;
