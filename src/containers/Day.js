import React from 'react';
import { connect } from 'react-redux';
import { showModalWindow } from '../actions';

import './Day.css';

const Day = ({day, showModalWindow, reminders}) => {
    return (
        <div key={day}
            className={'day'}
            onClick={() => showModalWindow(day)}>
            <div className="day-header">{day}</div>
            <div className="reminders-section">
                {reminders.map((reminder, i) => (
                    <div key={i} style={{backgroundColor: reminder.color}}>{reminder.label}</div>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    reminders: state.reminders.filter(r => r.date === ownProps.day)
});

const mapDispatchToProps = dispatch => ({
    showModalWindow: (date) => dispatch(showModalWindow(date))
})

export default connect(mapStateToProps, mapDispatchToProps)(Day);