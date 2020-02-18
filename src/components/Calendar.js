import React from 'react';
import PropTypes from 'prop-types';

import Day from '../containers/Day'

import './Calendar.css';

const Calendar = ({days}) => (
    <div id="calendar">
        {days.map(day =>(
            <Day key={day} day={day} />
        ))}
    </div>
);

Calendar.propTypes = {
    days: PropTypes.array.isRequired
}

export default Calendar;