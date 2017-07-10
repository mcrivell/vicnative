'use strict'
 
import React, {Component} from 'React'
import {
  StyleSheet,
  View,
  Modal, 
  TouchableHighlight, 
  Picker,
  ScrollView, 
  Dimensions
} from 'react-native'

import { ListItem, Container, Content, Spinner, Button, Card, CardItem, Text, Icon, H3 } from 'native-base'

import NavigationBar from 'react-native-navbar'

import {Actions} from 'react-native-router-flux'

import _ from 'underscore'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as jobsActions from '../reducers/jobs/jobsActions'
import * as globalActions from '../reducers/global/globalActions'


import ErrorAlert from '../components/ErrorAlert'
import FormButton from '../components/FormButton'

//import vicTheme from '../../Themes/vic_theme';

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 60, 
    marginRight: 8, 
    marginLeft: 8
  },
  pickerContainer: {
    flex: 1, 
    height: 35,
  },
  box: {
    borderColor: '#fff',
    borderWidth: 1, 
    borderRadius: 2, 
    backgroundColor: '#e6ecff',
    paddingRight: 10, 
    paddingLeft: 10, 
    flex: 1, 
    height: 35, 
  },
  textBox: {
    borderColor: '#fff',
    borderWidth: 1, 
    borderRadius: 2, 
    backgroundColor: '#e6ecff',
    paddingRight: 10, 
    paddingLeft: 6, 
    paddingTop: 7, 
    flex: 1, 
    
    height: 35, 
  },
  cardItemHead: {
    paddingTop: 0,
    paddingBottom: 2,
    backgroundColor: '#e6ecff', 
    borderRadius: 2, 
  },
  cardItem: {
    paddingTop: 0,
    paddingBottom: 2,
    //rrbackgroundColor: '#e6ecff' 
  },
  title: {
    fontSize: 10,
    marginBottom: 4,
    textAlign: 'left',  
  },
  scrollView: {
    height: 300,
    marginRight: 28, 
    marginLeft: 28, 
    borderWidth: 1, 
    borderColor: 'yellow',
    borderRadius: 2, 
    }, 
  text: {
    padding: 10,
    color: '#333', 
    width: 100

  }, 
  textLong: {
    padding: 10,
    color: '#333', 
    width: 150, 
    //alignSelf: 'center'

  }, 
  textInput: {
    height: 35,
    justifyContent: 'center', 
    color: '#333',

  }
});


function mapStateToProps(state) {
  //console.log('state.jobs: ' + state.jobs)
  return {
    jobs: state.jobs,
    global: {
      currentUser: state.global.currentUser.login_id
    }
  }
  
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
                                  ...globalActions,
                                  ...jobsActions }, dispatch)
  }
}


class Subview extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedJob: this.props.jobs.selectedJob,
    }
  }

  componentWillReceiveProps (nextprops) {
    this.setState({
      selectedJob: nextprops.jobs.selectedJob
    })
  }

  componentDidUpdate(){
    //console.log('XXXcomponentDidUpdate')
    
    if(this.props.jobs.customer === undefined ){
      this.props.actions.setCustomer('')
    }
    if(this.props.jobs.branch === undefined){
      this.props.actions.setBranch('')
    }
  }
  

  getJobArea(port){
    return this.getJobAreaId(port)
  }

  getJobAreaId(port){
    var portList = this.props.jobs.portList
    var areaId = 0
    for(var i = 0; i < portList.length; i++) {
      if(portList[i].nominativo == port){
         areaId = portList[i].fk_nazione
      }
       
    }
    return this.getAreaName(areaId)
  }

  getAreaName(id){
    //console.log(id)
    var areaList = this.props.jobs.areaList
    var areaName = ''
    for(var i=0; i<areaList.length; i++){
      if(areaList[i].area_id == id)
        areaName = areaList[i].nominativo
    }
    return areaName
  }

  jobPressHandler(ordine_id){
    
    
    this.props.actions.getJobDetails(ordine_id)
    
    //console.log('selectedJob: ' + this.props.jobs.selectedJob)
    //this.props.actions.setModalVisible(!this.props.jobs.modalVisible)
    //Actions.Tabbar()
  }

  buttonPressHandler (getJobs, customer, branch, type) {
    
    getJobs(customer, branch, type)
    //setModalVisible(!modalVisible)
    
  }
  
  renderLoadingView() {
    //console.log('this.props.jobs.loaded: ' + this.props.jobs.loaded)
    return (
      <Container>
        <Content style={{marginTop: 150}}>
          <Spinner color='green' />            
        </Content>
      </Container>
    )
  }
  
  renderJobsView() {
    if (!this.props.jobs.loaded) {
      return this.renderLoadingView();
    }
    var _scrollView: ScrollView;
    
    var statusText = (job) => {
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
      <Container>
        <Content>
          <Modal

            animationType={"slide"}
            transparent={false}
            visible={this.props.jobs.modalVisible}
            onRequestClose={() => {this.props.actions.setModalVisible(!this.props.jobs.modalVisible)}}
            containerStyles={{marginLeft: 20}} >
          
            <ScrollView
              ref={(scrollView) => { _scrollView = scrollView; }}
              automaticallyAdjustContentInsets={false}
              onScroll={() => {}}
              scrollEventThrottle={200}
              
              >
              <View style={{marginLeft: 20, marginRight: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Button 
                    transparent
                    onPress={() => { this.props.actions.setModalVisible(!this.props.jobs.modalVisible) }}>
                      Back
                    <Icon name='angle-left' />
                  </Button>
                </View>
                              
                <View>
                  {this.props.jobs.jobsList.map((l, i) =>
                    <CardItem key={i} 
                              style={{padding: 0, borderColor: 'transparent'}} 
                              onPress={this.jobPressHandler.bind(this, l.ordine_id)}>
                      
                      <View style={styles.cardItemHead} >
                        <Text style={{fontSize: 13}}> {l.showJobId} - {l.fk_cliente.nominativo} </Text>                        
                      </View>

                      <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={styles.cardItem}>
                          <Text style={{fontSize: 10}}> {l.vessel} </Text>
                          <Text style={{fontSize: 10}}> Port: {l.port}, {this.getJobArea(l.port)} </Text>
                          <Text style={{fontSize: 10}}> Status: {l.stato} - {statusText(l)} </Text>
                          
                        </View> 
                        {/*
                          titolo: jobId - cliente
                          port: città, nazione
                          
                          "finito": 0, 
                          "annullato": 0, 
                          "in_corso": 1, 

                          status: pending (0 0 0 + ETA vuoto)
                                  incoming (0 0 0) (da stampare l'ETA)
                                  in progress (0 0 1) (da stampare inizio_data e ETC) 
                                  completed (1 0 1) (stampare inizio_data fine data)
                                  frozen ( frozen == 1)
                                  
                          */}
                          <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Icon name='angle-right'  style={{fontSize: 65, color: '#e6ecff'}}/>
                          </View>
                        
                      </View>
                    </CardItem>
                  )}
                  </View>

                  <View style={{flexDirection: 'row'}}>
                    <Button 
                      transparent
                      onPress={() => { this.props.actions.setModalVisible(!this.props.jobs.modalVisible) }}>
                        Back
                      <Icon name='angle-left' />
                    </Button>
                  </View>            
                
              </View>
            </ScrollView>
          
        </Modal>
      </Content>
    </Container>
    )
  }
    
  render() {
    
    let onButtonPress = this.buttonPressHandler.bind(null,
                          this.props.actions.getJobs,
                          this.props.jobs.customer,
                          this.props.jobs.branch,
                          this.props.jobs.selectedType,
                          )

    
   
    var titleConfig = {
      title: I18n.t('Subview.subview')
    }
  
    var leftButtonConfig = {
      title: I18n.t('Subview.back'),
      handler: Actions.pop
    }
    
    if (!this.props.jobs.loaded) {
      return this.renderLoadingView();
    }
    
    if(this.props.jobs.modalVisible){
      return this.renderJobsView(); 
    }

    return (
      <Container style={styles.container}>
        <NavigationBar
          title={titleConfig}
          leftButton={leftButtonConfig} />

        <Content>

          <View style={{flexDirection: 'column'}} >
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}> Customer: </Text>
              <View style={styles.box}>
                <Picker
                  style={styles.pickerContainer}
                  selectedValue={this.props.jobs.customer}
                  onValueChange={(val) => this.props.actions.setCustomer(val)} >
                  
                  {this.props.jobs.customersArrayAll.map((l, i) =>
                   <Picker.Item  value={l.cliente_id} label={l.nominativo} key={i} /> )}
               
                </Picker>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'column'}} >
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}> Branch: </Text>
               <View style={styles.box}>
                <Picker
                  style={styles.pickerContainer}
                  selectedValue={this.props.jobs.branch}
                  onValueChange={(val) => this.props.actions.setBranch(val)} >
                  
                  {this.props.jobs.branchListAll.map((l, i) =>
                    <Picker.Item value={l.sede_id} label={l.nome} key={i} /> )}
                </Picker>
              </View>
            </View>
          </View>

          <View style={{flexDirection: 'column'}} >
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text}> Status: </Text>
               <View style={styles.box}>
                <Picker
                    style={styles.pickerContainer}
                    selectedValue={this.props.jobs.selectedType}
                    onValueChange={(val) => this.props.actions.setType(val)} >
                    
                    {this.props.jobs.orderType.map((l, i) =>
                      <Picker.Item value={l} label={l} key={i} /> )}
                </Picker> 
              </View>
            </View>
          </View>
          <FormButton
              isDisabled={false}
              onPress={onButtonPress}
              buttonText={'Cerca'} />
          
        </Content>
      </Container>
        
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subview)
