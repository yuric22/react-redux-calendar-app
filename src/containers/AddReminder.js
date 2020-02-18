import React from 'react';
import {connect} from 'react-redux';
import { addReminder, closeModalWindow } from '../actions';

import './AddReminder.css';

const AddReminder = ({date, addReminder, closeModalWindow, reminder}) => {
    let labelInput, colorInput, timeInput, cityInput;

    //TODO implement edit feature

    const submit = e => {
        e.preventDefault();

        //TODO finish validation
        if (!labelInput.value.trim()) {
          return
        }

        addReminder(labelInput.value, date, timeInput.value, colorInput.value, cityInput.value);
        closeModalWindow();
    }

    const cancel = e => {
        e.preventDefault();
        closeModalWindow();
    }

    return (
        <div id="reminder">
            <form onSubmit={submit}>
                <label>Description</label>
                <input id="description" ref={node => labelInput = node} />
                <label>Time</label>
                <input id="time" type="time" pattern="[0-9]{2}:[0-9]{2}" ref={node => timeInput = node} />
                <label>Color</label>
                <input id="color" type="color" ref={node => colorInput = node} />
                <label>City</label>
                <input id="city" ref={node => cityInput = node} />

                <div>
                    <button type="submit">Add Remider</button>
                    <button onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addReminder: (label, date, time, color, city) => dispatch(addReminder({label, date, time, color, city})),
    closeModalWindow: () => dispatch(closeModalWindow())
});

const mapStateToProps = state => ({
    date: state.modal.date,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReminder);