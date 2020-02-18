import React from 'react';
import { connect } from 'react-redux';
import { showModalWindow } from '../actions';

import './Day.css';

const Day = ({day, showModalWindow, reminders}) => {
    const reminder = reminders.find(r => r.date === day);

    return (
        <div key={day}
            className={!!reminder ? 'day reminder' : 'day'}
            style={{backgroundColor: !!reminder ? reminder.color : 'unset'}}
            onClick={() => showModalWindow(day)}>
            <div>{day}</div>
        </div>
    );
};

const mapStateToProps = state => ({
    reminders: state.reminders
});

const mapDispatchToProps = dispatch => ({
    showModalWindow: (date) => dispatch(showModalWindow(date))
})

export default connect(mapStateToProps, mapDispatchToProps)(Day);