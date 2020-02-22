import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { addReminder, editReminder, closeModalWindow } from '../actions';

import loadingGif from './loading.gif';
import './AddReminder.css';

const AddReminder = ({originalDate, addReminder, editReminder, closeModalWindow, selectedReminder}) => {
    const [fieldsWithError, setFieldsWithError] = useState([]);
    const [label, setLabel] = useState((selectedReminder && selectedReminder.label) || '');
    const [color, setColor] = useState((selectedReminder && selectedReminder.color) || '#DF0042');
    const [time, setTime] = useState((selectedReminder && selectedReminder.time) || '');
    const [city, setCity] = useState((selectedReminder && selectedReminder.city) || '');
    const [date, setDate] = useState(originalDate || selectedReminder.date || '');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const moment = extendMoment(Moment);

    useEffect(() => {
        function findWeather (weatherForecasts) {
            if (!weatherForecasts || !weatherForecasts.list || !weatherForecasts.list.length){
                setWeather(null);
                return null;
            }

            const filteredForecasts = weatherForecasts.list.filter(forecast => moment(date).isSame(moment(forecast.dt_txt), 'day'));

            const foundWeather = filteredForecasts.reduce((currentWeather, forecast, i) => {
                let newWeather;
                if (!forecast || !forecast.weather || !forecast.weather.length || !forecast.weather[0].main)
                        return null;

                if (!time || !currentWeather){
                    newWeather = forecast.weather[0].main;
                }else{
                    try{
                        const dateTime = moment(`${date} ${time}`);
                        const forecastDateTime = moment(forecast.dt_txt);
                        const range = moment.rangeFromInterval('hour', -3 , forecastDateTime);
                        newWeather = range.contains(dateTime, {excludeStart: true}) ? forecast.weather[0].main : null;
                    }catch(err){
                        console.err(err);
                        return currentWeather;
                    }
                }

                return newWeather || currentWeather;
            }, null);

            setWeather(foundWeather);
        }

        async function fetchData() {
            setWeather(null);
            const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_ID}`);
            res.json()
                .then(res => findWeather(res))
                .catch(err => setWeather(null))
                .finally(() =>  setLoading(false));
        }

        setWeather(null);

        const today = moment().startOf('day');
        const range = moment.rangeFromInterval('day', 5, today);
        //limits forecast search in 5 five days, due to weather API limitation
        if (city && date && range.contains(moment(date))){
            const id = setTimeout(() => {
                setLoading(true);
                fetchData();
            }, 2000);
            return () => clearTimeout(id);
        }
    }, [city, date, time, moment]);

    const isEditing = () => selectedReminder && Number.isInteger(selectedReminder.id);

    const ValidationErrorMessage = () => <span className="validation-error">This field is required</span>;

    const validation = () => {
        const errors = [];

        if (!label.trim())
            errors.push('label');

        if (isEditing() && !date)
            errors.push('date');

        if (!time)
            errors.push('time');

        if (!city.trim())
            errors.push('city');

        setFieldsWithError(errors);
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
            case 'date':
                setDate(e.target.value);
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

    //se mudar o dia e a cidade, faria a requisição de novo

    return (
        <div id="reminder">
            <div className="window">
                <div className="header">
                    <h3>{`${isEditing() ? 'Edit Reminder' : 'Add Reminder'} - ${moment(date, 'YYYY-MM-DD').format('ll')}`}</h3>
                    {loading ?
                        <img src={loadingGif} alt="loading" className="loading" />
                    :null}
                    {weather ?
                        <div className="weather-forecast">
                            <h6>Forecast:</h6>
                            <h5>{weather}</h5>
                        </div>
                    :null}
                </div>
                <form onSubmit={submit}>
                    <label>Label</label>
                    <input id="label" name="label" maxLength="30" onChange={change} value={label} />
                    {fieldsWithError.includes('label') ? <ValidationErrorMessage /> : null}

                    {isEditing() ?
                        <>
                            <label>Date</label>
                            <input id="date" name="date" type="date" onChange={change} value={date} min="2020-02-01" max="2020-02-29"></input>
                            {fieldsWithError.includes('date') ? <ValidationErrorMessage /> : null}
                        </>
                    :null}

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
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    addReminder: (label, date, time, color, city) => dispatch(addReminder({label, date, time, color, city})),
    editReminder: (id, label, date, time, color, city) => dispatch(editReminder({id, label, date, time, color, city})),
    closeModalWindow: () => dispatch(closeModalWindow())
});

const mapStateToProps = state => ({
    originalDate: state.modal.date,
    selectedReminder: state.modal.selectedReminder
});

export default connect(mapStateToProps, mapDispatchToProps)(AddReminder);
