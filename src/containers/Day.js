import React from 'react';
import { connect } from 'react-redux';
import { showModalWindow, showEditModalWindow } from '../actions';

import './Day.css';
import moment from 'moment';

const Day = ({day, showModalWindow, showEditModalWindow, reminders}) => {
    const editClick = (e, reminder) => {
        e.stopPropagation();
        showEditModalWindow(reminder);
    }

    const orderedReminders = reminders.map(reminder => {
        const splitTime = reminder.time.split(':');
        return {
            ...reminder,
            dateTime: moment({hour: splitTime[0], minute: splitTime[1]}),
        }
    }).sort((a, b) => a.dateTime.isBefore(b.dateTime, 'hour') ? -1 : 1);

    const weekday = moment({day: day}).day();
    const isWeekend =  weekday === 6 || weekday === 0;

    return (
        <div key={day}
            className={isWeekend ? 'day weekend' : 'day'}
            onClick={() => showModalWindow(day)}>
            <div className="day-header">{day}</div>
            <div className="reminders-section">
                {orderedReminders.map((reminder, i) => (
                    <div key={i}
                        style={{backgroundColor: reminder.color}}
                        onClick={e => editClick(e, reminder)}>
                            {reminder.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    reminders: state.reminders.filter(r => r.date === ownProps.day)
});

const mapDispatchToProps = dispatch => ({
    showModalWindow: date => dispatch(showModalWindow(date)),
    showEditModalWindow: selectedReminder => dispatch(showEditModalWindow(selectedReminder)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Day);
