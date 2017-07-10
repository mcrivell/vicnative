'use strict'

import React, {Component} from 'React'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { CardItem, Icon } from 'native-base'

import {Actions} from 'react-native-router-flux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as jobsActions from '../reducers/jobs/jobsActions'


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...jobsActions }, dispatch)
  }
}

function mapStateToProps(state) {
  //console.log('state.jobs: ' + state.jobs)
  return {
    portList: state.jobs.portList,
    areaList: state.jobs.areaList
  }

}


class CardView extends Component{


  jobPressHandler = () => {
    this.props.actions.getJobDetails(this.props.job.ordine_id)
    //this.props.actions.getMails(this.props.job.ordine_id)
  };

  getJobArea = () => {
    return this.getJobAreaId()
  };

  getJobAreaId = () => {
    var portList = this.props.portList  // LISTA COMPLETA DEI PORTI
    var areaId = 0
    for(var i = 0; i < portList.length; i++) {
      if (portList[i].nominativo == this.props.job.port){
         areaId = portList[i].fk_nazione
      }
    }
    return this.getAreaName(areaId)
  };

  getAreaName = (id) => {
    var areaList = this.props.areaList // LISTA COMPLETA DELLE AREE
    var areaName = ''
    for(var i=0; i<areaList.length; i++){
      if(areaList[i].area_id == id)
        areaName = areaList[i].nominativo
    }
    //console.log('ID: ' + areaName)
    return areaName
  };


  render() {

    let job = this.props.job;
    // da controllare i job diversi da "in progress"
    var statusText = () => {
    //console.log(job.stato + job.eta)
      switch(job.stato){
        case 'Pending':
        case 'Incoming':
          return job.eta;
        case 'In progress':
          if(job.eta == '')
            return "Start date: " + job.inizio_data;
          return "Start date: " + job.inizio_data + " - ETA: " + job.eta;
        case 'Completed':
          return job.inizio_data + ', ' + job.fine_data;
        case 'Frozen':
          return ''
        default:
          return ''
      }
    };

    return(
      <CardItem key={job.ordine_id} onPress={this.jobPressHandler}
            style={{padding: 0, borderColor: 'transparent'}}>

        <View style={styles.cardItemHead} >
          <Text style={{fontSize: 13, color: '#262626'}}> {job.showJobId} - {job.fk_cliente.nominativo} </Text>
        </View>

        <View style={{flexDirection: 'row', flex: 1}}>

          <View style={styles.cardItem}>
            <Text style={styles.text}> {job.vessel} </Text>
            <Text style={styles.text}> Port: {job.port}, {this.getJobArea()} </Text>
            <Text style={styles.text}> Status: {job.stato} - {statusText()} </Text>
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Icon name='angle-right'  style={{fontSize: 65, color: '#F4F4F4'}}/>
          </View>

        </View>
      </CardItem>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardView)

var styles = StyleSheet.create({

  cardItemHead: {
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#F4F4F4',
    //borderRadius: 2,
  },
  cardItem: {
    paddingTop: 0,
    paddingBottom: 2,
  },
  text: {
    paddingTop: 3,
    paddingBottom: 3,
    color: '#333',
    fontSize: 10
  }
});
