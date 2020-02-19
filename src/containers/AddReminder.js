import React, {useState} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import { addReminder, editReminder, closeModalWindow } from '../actions';

import './AddReminder.css';

const AddReminder = ({date, addReminder, editReminder, closeModalWindow, selectedReminder}) => {
    const [fieldsWithError, setFieldsWithError] = useState([]);
    const [label, setLabel] = useState((selectedReminder && selectedReminder.label) || '');
    const [color, setColor] = useState((selectedReminder && selectedReminder.color) || '#DF0042');
    const [time, setTime] = useState((selectedReminder && selectedReminder.time) || '');
    const [city, setCity] = useState((selectedReminder && selectedReminder.city) || '');

    const isEditing = () => selectedReminder && Number.isInteger(selectedReminder.id);

    if (isEditing()){
        date = selectedReminder.date;
    }

    const ValidationErrorMessage = () => <span className="validation-error">This field is required</span>;

    const validation = () => {
        const errors = [];

        if (!label.trim())
            errors.push('label');

        if (!time)
            errors.push('time');

        if (!city.trim())
            errors.push('city');

        setFieldsWithError([...errors]);
        return !errors.length;
    }

    const change = (e) => {
        if (!e || !e.target || !e.target.name)
            return;

        switch(e.target.name){
            case 'label':
                setLabel(e.target.value);
                break;
            case 'color':
                setColor(e.target.value);
                break;
            case 'time':
                setTime(e.target.value);
                break;
            case 'city':
                setCity(e.target.value);
                break;
            default:
        }
    }

    const submit = e => {
        e.preventDefault();

        if (!validation()) {
          return
        }

        if (isEditing()){
            editReminder(selectedReminder.id, label.trim(), date, time, color, city.trim());
        }else{
            addReminder(label.trim(), date, time, color, city.trim());
        }
        closeModalWindow();
    }

    const cancel = e => {
        e.preventDefault();
        closeModalWindow();
    }

    return (
        <div id="reminder">
            <form onSubmit={submit}>
                <h3>{`${isEditing() ? 'Edit Reminder' : 'Add Reminder'} - ${moment({day: date}).format('ll')}`}</h3>

                <label>Label</label>
                <input id="label" name="label" maxLength="30" onChange={change} value={label} />
                {fieldsWithError.includes('label') ? <ValidationErrorMessage /> : null}

                <label>Time</label>
                <input id="time" name="time" type="time" onChange={change} value={time} pattern="[0-9]{2}:[0-9]{2}" />
                {fieldsWithError.includes('time') ? <ValidationErrorMessage /> : null}

                <label>Color</label>
                <input id="color" name="color" onChange={change} type="color" value={color} />
                {fieldsWithError.includes('color') ? <ValidationErrorMessage /> : null}

                <label>City</label>
                <input id="city" name="city" onChange={change} value={city} />
                {fieldsWithError.includes('city') ? <ValidationErrorMessage /> : null}

                <div id="buttons-section">
                    <button id="cancel" onClick={cancel}>Cancel</button>
                    <button type="submit">Save Remider</button>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addReminder: (label, date, time, color, city) => dispatch(addReminder({label, date, time, color, city})),
    editReminder: (id, label, date, time, color, city) => dispatch(editReminder({id, label, date, time, color, city})),
    closeModalWindow: () => dispatch(closeModalWindow())
});

const mapStateToProps = state => ({
    date: state.modal.date,
    selectedReminder: state.modal.selectedReminder
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReminder);