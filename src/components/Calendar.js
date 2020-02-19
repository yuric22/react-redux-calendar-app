import React from 'react';
import PropTypes from 'prop-types';

import Day from '../containers/Day'

import './Calendar.css';

const Calendar = ({days}) => (
    <div id="calendar">
        <div className="header">Sunday</div>
        <div className="header">Monday</div>
        <div className="header">Tuesday</div>
        <div className="header">Wednesday</div>
        <div className="header">Thursday</div>
        <div className="header">Friday</div>
        <div className="header">Saturday</div>
        {days.map(day =>(
            <Day key={day} day={day} />
        ))}
    </div>
);

Calendar.propTypes = {
    days: PropTypes.array.isRequired
}

export default Calendar;