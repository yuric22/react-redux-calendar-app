import React from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { connect } from 'react-redux';

import Calendar from './components/Calendar';
import AddReminder from './containers/AddReminder';

import './App.css';

function App({modal}) {
  const moment = extendMoment(Moment);
  const days = Array.from(moment.range('2020-01-26', '2020-02-29').by('day')).map(d => d.format('YYYY-MM-DD'));

  return (
    <div className="App">
      {modal.opened === true ?
        <AddReminder />
        : null
      }
      <h2>{`${moment().format('MMMM')} ${moment().format('YYYY')}`}</h2>
      <Calendar days={days} />
    </div>
  );
}

const mapStateToProps = state => ({
  modal: state.modal,
})

export default connect(mapStateToProps)(App);
