/**
 * # Subview.js
 *
 *  This is called from main to demonstrate the back button
 *
 */
'use strict'
/*
 * ## Imports
 *
 * Imports from redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

/**
 * Navigation Bar
 */
import NavigationBar from 'react-native-navbar'

/**
 * The necessary components from React
 */
import React, { Component } from 'react'
import
{
  StyleSheet,
  View,
  Text,
  Picker,
  TextInput,
  DatePickerAndroid,
  Linking,
  Dimensions
}
from 'react-native'

import { Button, Container, Content, Spinner } from 'native-base'

const INSPECTION_TYPE = { DISCHARGING:'Discharging', LOADING:'Loading', OTHER: 'Other inspection' }

var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height

import MyDatePicker from '../components/MyDatePicker'
import ItemCheckbox from '../components/ItemCheckbox'

import * as jobsActions from '../reducers/jobs/jobsActions'


function mapStateToProps (state) {
  return {
    jobs: state.jobs
  }
}


function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({...jobsActions}, dispatch)
  }
}

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

import t from 'tcomb-form-native'

let Form = t.form.Form

class Job extends Component {
  constructor(props) {
    super(props)
    console.log('COSTRUTTORE')
    this.state = {
      customerReference: '',
      mmsiReference: '',
      customer: '',
      //year: '',
      yearArray: [],
      branch: '',
      vessel: '',
      checked: false,
      port: '',
      //areaList: [],
      area: '',
      inspectionType: '',
      selectedEmpl: '',
      linkedPort: '',
      linkedArea: ''
    }
  }

  componentDidMount(){
    //if (this.props.jobs.jobsDetail === {}) {

    //}

    this.setState({
      customerReference: this.props.jobs.customerReference,
      customer: this.props.jobs.JobCustomer,
      mmsiRef: this.props.jobs.mmsiReference,
      //year: this.props.jobs.year,
      branch: this.props.jobs.JobBranch,
      yearArray: this.props.jobs.yearArray,
      vessel: this.props.jobs.vessel,
      port: this.props.jobs.port,
      checked: this.props.jobs.checked,
      //areaList: this.props.jobs.areaList,
      area: this.props.jobs.area,
      inspectionType: this.props.jobs.inspectionType,
      selectedEmpl: this.props.jobs.selectedEmpl,
      linkedPort: this.props.jobs.linkedPort,
      linkedArea: this.props.jobs.linkedArea
    })

  }

  componentWillReceiveProps(nextProps){
    //console.log('WILL_RECEIVE: ' + JSON.stringify(nextProps.jobs.jobBranch))
    this.setState({
      customerReference: nextProps.jobs.customerReference,
      mmsiRef: nextProps.jobs.mmsiReference,
      customer: nextProps.jobs.jobCustomer,
      //year: nextProps.jobs.year,
      branch: nextProps.jobs.JobBranch,
      yearArray: nextProps.jobs.yearArray,
      vessel: nextProps.jobs.vessel,
      port: nextProps.jobs.selectedPort,
      checked: nextProps.jobs.checked,
      //areaList: nextProps.props.jobs.areaList,
      area: nextProps.jobs.area,
      inspectionType: nextProps.jobs.inspectionType,
      selectedEmpl: nextProps.jobs.selectedEmpl,
      linkedPort: nextProps.jobs.linkedPort,
      linkedArea: nextProps.jobs.linkedArea
    })
  }



  renderLoadingView = () => {
    //console.log('this.props.jobs.loaded: ' + this.props.jobs.loaded)
    return (
      <Container>
        <Content style={{marginTop: 150}}>
          <Spinner color='black' />
        </Content>
      </Container>
    )
  };

  onValueChange = (key: string, value: string) => {

    switch (key) {
      case 'customer':
        this.props.actions.setJobCustomer(value)
        break
      case 'branch':
        this.props.actions.setJobBranch(value)
        break
      case 'year':
        this.props.actions.onYearFieldChange(value + '/' +this.state.yearArray[1])
        break
      case 'vessel':
        this.props.actions.onVesselFieldChange(value)
        break
      case 'cRef':
        if(value !== ''){
          this.props.actions.onCustomerRefFieldChange(value)
        }
        this.setState({ customerReference: value })
        break
      case 'checkBox':
        this.setState({ checked: !this.state.checked })
        break
      case 'port':
        this.props.actions.setPort(value)
        break
      case 'area':
        this.props.actions.setArea(value)
        break
      case 'inspectionType':
        this.props.actions.setInspectionType(value)
        break
      case 'empl':
        this.props.actions.setEmpl(value)
        break
      case 'linkedPort':
        this.props.actions.setLinkedPort(value)
        break
      case 'linkedArea':
        this.props.actions.setLinkedArea(value)
        break
      case 'MMSI':
        if(value !== ''){
          this.props.actions.setMmsi(value)
        }
        this.setState({ mmsiReference: value })
        break
      case 'personInCharge':
        this.props.actions.setPersonInCharge(value)
    }
  };

  render () {
    //console.log('RENDER')

    let self = this

    let customerRef = this.state.customerReference
    let mmsiRef = this.state.mmsiReference

    return (
      <Container style={styles.container}>

        <Content>

          <View style={{flexDirection: 'column'}} >

            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Customer: </Text>
              <View style={styles.box}>
                <Picker
                  enabled={this.props.jobs.loaded}
                  style={styles.pickerContainer}
                  selectedValue={this.props.jobs.jobCustomer}
                  onValueChange={this.onValueChange.bind(this, 'customer')} >

                  {this.props.jobs.customersArray.map((l, i) =>
                  <Picker.Item  value={l.cliente_id} label={l.nominativo} key={i} /> )}
                </Picker>
              </View>
            </View>

            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Customer ref.: </Text>
              <View style={styles.box}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={self.onValueChange.bind(self, 'cRef')}
                  value={this.state.customerReference}
                />
              </View>
            </View>
{/*
0 - discharging
1 - loading
2 - other inspection

*/}
            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Type of insp.: </Text>
              <View style={styles.box}>
                <Picker
                    style={styles.pickerContainer}
                    selectedValue={this.state.inspectionType}
                    onValueChange={this.onValueChange.bind(this, 'inspectionType')} >
                  <Picker.Item label={INSPECTION_TYPE.DISCHARGING} value={0}/>
                  <Picker.Item label={INSPECTION_TYPE.LOADING} value={1}/>
                  <Picker.Item label={INSPECTION_TYPE.OTHER} value={2}/>

                </Picker>
              </View>
            </View>

            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Insp. port: </Text>
              <View style={styles.box}>
                <Picker
                    style={styles.pickerContainer}
                    selectedValue={this.props.jobs.port}
                    onValueChange={this.onValueChange.bind(this, 'port')} >
                  {this.props.jobs.portList.map((l, i) =>
                  <Picker.Item  value={l.porto_id} label={l.nominativo} key={i} /> )}

                </Picker>
              </View>
            </View>

            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Insp. state: </Text>
              <View style={styles.box}>
                <Picker
                    style={styles.pickerContainer}
                    selectedValue={this.props.jobs.area}
                    onValueChange={this.onValueChange.bind(this, 'area')} >
                  {this.props.jobs.areaList.map((l, i) =>
                  <Picker.Item  value={l.area_id} label={l.nominativo} key={i} /> )}

                </Picker>
              </View>
            </View>

            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Linked port: </Text>
              <View style={styles.box}>
                <Picker
                    style={styles.pickerContainer}
                    selectedValue={this.props.jobs.linkedPort}
                    onValueChange={this.onValueChange.bind(this, 'linkedPort')} >
                  {this.props.jobs.portList.map((l, i) =>
                  <Picker.Item  value={l.porto_id} label={l.nominativo} key={i} /> )}
                </Picker>
              </View>
            </View>

            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Linked state: </Text>
              <View style={styles.box}>
                <Picker
                    style={styles.pickerContainer}
                    selectedValue={this.props.jobs.linkedArea}
                    onValueChange={this.onValueChange.bind(this, 'linkedArea')} >
                  {this.props.jobs.areaList.map((l, i) =>
                  <Picker.Item  value={l.area_id} label={l.nominativo} key={i} /> )}

                </Picker>
              </View>
            </View>

            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Op. branch: </Text>
              <View style={styles.box}>
                <Picker
                  style={styles.pickerContainer}
                  selectedValue={this.props.jobs.jobBranch}
                  onValueChange={this.onValueChange.bind(this, 'branch')} >

                  {this.props.jobs.branchList.map((l, i) =>
                    <Picker.Item value={l.sede_id} label={l.nome} key={i} /> )}
                </Picker>
              </View>
            </View>

            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Inv. branch: </Text>
              <View style={styles.textBox}>
                <Text style={styles.textInput}> some branch </Text>
              </View>
            </View>
          </View>
            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Job Id: </Text>
              <View style={styles.YearBox}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={self.onValueChange.bind(self, 'year')}
                  value={this.state.yearArray[0]}
                />
                <Text style={{padding: 5, color: '#333'}}> /{this.state.yearArray[1]}</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> Vessel: </Text>
              <View style={styles.box}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={self.onValueChange.bind(self, 'vessel')}
                  value={this.state.vessel}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row'}} >
              <Text style={styles.textLong}> MMSI/IMO: </Text>
              <View style={styles.YearBox}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={self.onValueChange.bind(self, 'MMSI')}
                  value={this.state.mmsiRef}
                />
                <Text style={{padding: 5, color: 'blue'}}
                      onPress={() => Linking.openURL('http://google.com')}> Get MMSI/IMO </Text>
              </View>
            </View>

          <View style={{flexDirection: 'row'}} >
            <Text style={styles.textLong}> P. in charge: </Text>
            <View style={styles.box}>
              <Picker
                style={styles.pickerContainer}
                selectedValue={this.props.jobs.personInCharge}
                onValueChange={this.onValueChange.bind(this, 'personInCharge')}>

                {
                  this.props.jobs.emplList.map((l, i) =>
                    <Picker.Item  value={l.dipendente_id} label={l.cognome + ' ' + l.nome} key={i} /> )
                }

              </Picker>
            </View>
          </View>
          <View style={{flexDirection: 'row'}} >
            <Text style={styles.textLong}> ETA: </Text>
            <View >
              <MyDatePicker />
            </View>

          </View>
          <View style={{flexDirection: 'row', flex: 1, alignItems: 'center'}} >
            <Text style={styles.textLongRed}> Trial/Special job </Text>
            <View >

              <ItemCheckbox
                color="red"
                backgroundColor="#ff9999"
                text={''}
                disabled={!this.props.jobs.loaded}
                onCheck={this.onValueChange.bind(this, 'checkBox')}
                onUncheck={this.onValueChange.bind(this, 'checkBox')} />

            </View>
               <Text style={styles.textLongOrange}> Special requests </Text>
               <View>

              <ItemCheckbox
                text={''}
                color="orange"
                backgroundColor="#ffe4b3"
                disabled={!this.props.jobs.loaded}
                onCheck={this.onValueChange.bind(this, 'checkBox')}
                onUncheck={this.onValueChange.bind(this, 'checkBox')} />

            </View>
          </View>
          <View style={{flexDirection: 'row'}} >
            <Text style={styles.textLong}> </Text>
          </View>
          <View style={{flexDirection: 'row'}} >
            <Text style={styles.textLong}> </Text>
          </View>

          {/*<Text> {JSON.stringify(this.props.jobs.jobsDetail)} </Text>*/}

        </Content>
      </Container>
    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Job)

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
  dateContainer: {
    flex: 1,
    height: 35,
    justifyContent: 'center'
  },
  box: {
    borderColor: '#fff',
    borderWidth: 1,
    //borderRadius: 2,
    backgroundColor: '#F4F4F4',
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1,
    height: 35,
  },
  YearBox: {
    borderColor: '#fff',
    borderWidth: 1,
    //borderRadius: 2,
    backgroundColor: '#F4F4F4',
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1,
    flexDirection: 'row',
    height: 35,
  },
  textBox: {
    borderColor: '#fff',
    borderWidth: 1,
    //borderRadius: 2,
    backgroundColor: '#F4F4F4',
    paddingRight: 10,
    paddingLeft: 6,
    paddingTop: 7,
    flex: 1,

    height: 35,
  },
  title: {
    fontSize: 10,
    marginBottom: 4,
    textAlign: 'left',
  },
  scrollView: {
    height: 300,
    },
  text: {
    padding: 10,
    color: '#333',
    //width: deviceWidth*30/100

  },
  textLong: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingRight: 6,
    color: '#333',
    width: deviceWidth*0.26
    //alignSelf: 'center'

  },
  textLongRed: {
    padding: 10,
    color: 'red',
    //width: deviceWidth*40/100,
    //alignSelf: 'center'

  },
  textLongOrange: {
    padding: 10,
    color: 'orange',
    //width: deviceWidth*40/100
    //alignSelf: 'center'

  },
  textInput: {
    height: 35,
    //justifyContent: 'center',
    color: '#333',
    flex: 1,
  },
   inputs: {
    //flex: 1,
    //width: 150,
    //backgroundColor: 'yellow',
    //justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10
  },
  colorBoxRed: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    //alignItems: 'center',
    //padding: 2,
    //width: 25,
    //borderWidth: 2,
    //size: 30,
    //borderRadius: 6,
    //borderColor: '#fff',

    //borderRadius: 8,
    backgroundColor: 'red',
    paddingRight: 10,
    paddingLeft: 10,
    height: 25,
  },
  colorBoxOrange: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    //padding: 2,
    //width: 25,
    //borderWidth: 2,
    //size: 30,
    //borderRadius: 6,
    //borderColor: '#fff',

    borderRadius: 8,
    backgroundColor: 'orange',
    paddingRight: 10,
    paddingLeft: 10,
    height: 35,
  },
  checkBoxlines: {
    flexDirection: 'row',
    flex: 1,
  },

});
