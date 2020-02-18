import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';

import Calendar from './components/Calendar';
import AddReminder from './containers/AddReminder';

import './App.css';

function App({modal}) {
  const currentDate = moment();
  const lastDay = currentDate.endOf('month').format('DD');
  const days = Array.from(Array(+lastDay).keys()).map( d => d + 1);

  return (
    <div className="App">
      {modal.opened === true ?
        <AddReminder />
        : null
      }
      <Calendar days={days} />
    </div>
  );
}

const mapStateToProps = state => ({
  modal: state.modal,
})

export default connect(mapStateToProps)(App);
