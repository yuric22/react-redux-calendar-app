import {combineReducers} from 'redux';
import modal from './reminderModal';
import reminders from './reminders';

export default combineReducers({
    modal,
    reminders
});