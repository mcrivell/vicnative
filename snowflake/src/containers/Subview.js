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
import JobsView from '../components/JobsView'
import CardView from '../components/CardView'

//import vicTheme from '../../Themes/vic_theme';

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height



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
      modalVisible: false
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

  buttonPressHandler (getJobs, customer, branch, type) {
    getJobs(customer, branch, type)
    this.setState({modalVisible: true})
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

    return(
      <Container>
          <Content style={{ borderWidth: 2, borderColor: 'black'}}>
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {this.setState({modalVisible: false})}}
              containerStyles={{marginLeft: 20}}
            >

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
                      onPress={() => {this.setState({modalVisible: false})}}>
                        Back
                      <Icon name='angle-left' />
                    </Button>
                  </View>
                  <View>
                    {this.props.jobs.jobsList.map(job =>
                      <CardView
                        key={job.ordine_id}
                        job={job}
                        style={{padding: 0, borderColor: 'transparent'}}
                      />
                    )}
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Button
                      transparent
                      onPress={() => {this.setState({modalVisible: false}) }}>
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
    let onButtonPress = this.buttonPressHandler.bind(
      this,
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

    if(this.state.modalVisible){
      return this.renderJobsView();
    }

    return (
      <Container style={styles.container}>

        <Content style={{flex: 1, flexDirection: 'column',}}>
          <View style={styles.pickersList}>
            <View style={{flexDirection: 'column'}} >
              <View style={{flexDirection: 'row', height: 35}}>
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
              <View style={{flexDirection: 'row', height: 35}}>
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
              <View style={{flexDirection: 'row', height: 35}}>
                <Text style={styles.text}> Status: </Text>
                <View style={styles.box}>
                  <Picker

                      selectedValue={this.props.jobs.selectedType}
                      onValueChange={(val) => this.props.actions.setType(val)} >

                      {this.props.jobs.orderType.map((l, i) =>
                        <Picker.Item value={l} label={l} key={i} /> )}
                  </Picker>
                </View>
              </View>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <FormButton
                isDisabled={false}
                onPress={onButtonPress}
                buttonText={'Cerca'} />
          </View>
        </Content>
      </Container>

    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Subview)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginTop: 60,
    marginRight: 8,
    marginLeft: 8
  },
  pickerContainer: {


  },
  pickersList: {
    flex: 1,
    height: deviceHeight*0.65,
    marginTop: 40
  },

  box: {
    borderColor: '#fff',
    borderWidth: 1,
    //borderRadius: 2,
    backgroundColor: '#F4F4F4',
    paddingRight: 10,
    paddingLeft: 10,
    flex: 1,

    flexDirection: 'column',
    justifyContent: 'center'
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
  cardItemHead: {
    paddingTop: 0,
    paddingBottom: 2,
    backgroundColor: '#F4F4F4',
    //borderRadius: 2,
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
    //borderRadius: 2,
    },
  text: {

    paddingRight: 10,
    paddingTop: 3,
    color: '#333',
    width: 100,
    flexDirection: 'column',
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
