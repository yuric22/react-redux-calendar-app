import React, {useState} from 'react';
import {connect} from 'react-redux';
import { addReminder, closeModalWindow } from '../actions';

import './AddReminder.css';

const AddReminder = ({date, addReminder, closeModalWindow, reminder}) => {
    let labelInput, colorInput, timeInput, cityInput;
    const [fieldsWithError, setFieldsWithError] = useState([]);

    //TODO implement edit feature

    const ValidationErrorMessage = () => <span className="validation-error">This field is required</span>;

    const validation = () => {
        const errors = [];

        if (!labelInput.value.trim())
            errors.push('label');

        if (!timeInput.value)
            errors.push('time');

        if (!cityInput.value.trim())
            errors.push('city');

        setFieldsWithError([...errors]);
        return !errors.length;
    }

    const submit = e => {
        e.preventDefault();

        if (!validation()) {
          return
        }

        addReminder(labelInput.value.trim(), date, timeInput.value, colorInput.value, cityInput.value.trim());
        closeModalWindow();
    }

    const cancel = e => {
        e.preventDefault();
        closeModalWindow();
    }

    return (
        <div id="reminder">
            <form onSubmit={submit}>
                <label>Label</label>
                <input id="label" maxLength="30" ref={node => labelInput = node} />
                {fieldsWithError.includes('label') ? <ValidationErrorMessage /> : null}

                <label>Time</label>
                <input id="time" type="time" pattern="[0-9]{2}:[0-9]{2}" ref={node => timeInput = node} />
                {fieldsWithError.includes('time') ? <ValidationErrorMessage /> : null}

                <label>Color</label>
                <input id="color" type="color" ref={node => colorInput = node} />
                {fieldsWithError.includes('color') ? <ValidationErrorMessage /> : null}

                <label>City</label>
                <input id="city" ref={node => cityInput = node} />
                {fieldsWithError.includes('city') ? <ValidationErrorMessage /> : null}

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