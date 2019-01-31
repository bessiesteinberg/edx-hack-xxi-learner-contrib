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
      <ul className="mb-2">
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
      <div key={courseName}>
        <p className="course-name"><em>{courseName}</em></p>
        {LearnerCompletionsVisualization.displayCompletionEvents((
          completionDetailsByCourseName[courseName]
        ))}
      </div>
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
          values={completionData.completions}
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
            <p className="streak-number">{completionData.meta.current_streak.count}</p>
          </div>
          <div className="text-center">
            <p className="font-weight-light">Longest Streak</p>
            <p className="streak-number">{completionData.meta.longest_streak.count}</p>
          </div>
        </div>
        {completionDetails && (
          <div className="mt-4 font-weight-light">
            <h2>Completions on {moment(completionDetails.date).format('MMM, DD YYYY')}</h2>
            {LearnerCompletionsVisualization.groupCompletionDetailsByCourseName((
              completionDetails.blocks
            ))}
          </div>
        )}
      </div>
    );
  }
}

LearnerCompletionsVisualization.propTypes = {
  completionData: PropTypes.shape({}).isRequired,
  //   completions: PropTypes.arrayOf(PropTypes.shape({
  //     date: PropTypes.string,
  //     count: PropTypes.number,
  //     blocks: PropTypes.arrayOf(PropTypes.shape({
  //       block_type: PropTypes.string,
  //       block_key: PropTypes.string,
  //       block_name: PropTypes.string,
  //       course_name: PropTypes.string,
  //     })),
  //   }),
  //   meta: PropTypes.shape({
  //     longest_streak: PropTypes.shape({
  //       count: PropTypes.number,
  //       start_date: PropTypes.string,
  //       end_date: PropTypes.string,
  //     }),
  //     current_streak: PropTypes.shape({
  //       count: PropTypes.number,
  //       start_date: PropTypes.string,
  //       end_date: PropTypes.string,
  //     }),
  //     total_completions: PropTypes.number,
  //     start_date: PropTypes.string,
  //     end_date: PropTypes.string,
  //   }),
  // }).isRequired,
};

export default LearnerCompletionsVisualization;
