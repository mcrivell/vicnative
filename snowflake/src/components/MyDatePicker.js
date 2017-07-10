import React, { Component } from 'react'
import DatePicker from 'react-native-datepicker'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as globalActions from '../reducers/global/globalActions'

function mapStateToProps (state) {
  return {
    date: state.global.date
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({...globalActions}, dispatch)
  }
}

class MyDatePicker extends Component {
  constructor(props){
    super(props)
  }

  render(){

    return (
      <DatePicker
        style={{flex:1}}
        date={this.props.date}
        mode="datetime"
        placeholder="select date"
        format="DD-MM-YYYY HH:mm"
        minDate="01-01-2016"
        maxDate="01-01-2018"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 30,
            backgroundColor: '#F4F4F4',
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.props.actions.setDate(date)}}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDatePicker)
