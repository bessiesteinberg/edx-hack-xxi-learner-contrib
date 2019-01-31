import React from 'react';
import PropTypes from 'prop-types';
import 'react-calendar-heatmap/dist/styles.css';
import moment from 'moment';
import CalendarHeatmap from 'react-calendar-heatmap';
import './LearnerCompletionsVisualization.scss';

const today = Date.now();

function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

class LearnerCompletionsVisualization extends React.Component {
  static getBlockUrl() {
    return 'http://localhost:18000/';
  }

  static displayCompletionEvents(completionEvents) {
    return completionEvents.map(completionEvent => (
      <ul>
        <li>
          <a href={LearnerCompletionsVisualization.getBlockUrl()}>{completionEvent.block_name}</a>
        </li>
      </ul>
    ));
  }

  static groupCompletionDetailsByCourseName(completionDetails) {
    const completionDetailsByCourseName = {};
    for (let index = 0; index < completionDetails.length; index += 1) {
      const currCourseName = completionDetails[index].course_name;
      if (!(currCourseName in completionDetailsByCourseName)) {
        completionDetailsByCourseName[currCourseName] = [];
      }
      completionDetailsByCourseName[currCourseName].push(completionDetails[index]);
    }
    return Object.keys(completionDetailsByCourseName).map(courseName => (
      <span key={courseName}>
        <h2>{courseName}</h2>
        {LearnerCompletionsVisualization.displayCompletionEvents((
          completionDetailsByCourseName[courseName]
        ))}
      </span>
    ));
  }

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
      <div className="learner-completions-visualization">
        <h2 className="text-center">My Course Activity</h2>
        <CalendarHeatmap
          // TODO: assume we are always presenting a year for now
          startDate={shiftDate(today, -120)}
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
          onClick={(value) => {
            if (!value || value.count === 0 || completionDetails === value) {
              this.setState({
                completionDetails: null,
              });
            } else {
              this.setState({
                completionDetails: value,
              });
            }
          }}
        />
        <hr />
        <div className="streaks d-flex justify-space-between">
          <div className="text-center">
            <p className="font-weight-light">Current Streak</p>
            <p className="streak-number">1 day</p>
          </div>
          <div className="text-center">
            <p className="font-weight-light">Longest Streak</p>
            <p className="streak-number">5 days</p>
          </div>
        </div>
        {completionDetails && (
          <div>
            <h2>Completions on {moment(completionDetails.date).format('MMM, DD YYYY')}</h2>
            {LearnerCompletionsVisualization.groupCompletionDetailsByCourseName((
              completionDetails.completions
            ))}
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
      course_name: PropTypes.string,
    })),
  })).isRequired,
  metaData: PropTypes.shape({
    longest_streak: PropTypes.shape({
      count: PropTypes.number,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
    }),
    current_streak: PropTypes.shape({
      count: PropTypes.number,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
    }),
    total_completions: PropTypes.number,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
  }).isRequired,
};

export default LearnerCompletionsVisualization;
