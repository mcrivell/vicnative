'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import {Actions} from 'react-native-router-flux'

import React, { Component } from 'react'
import
{
  StyleSheet,
  View,
  Text, 
  Modal, 
  ScrollView, 
  Dimensions
}
from 'react-native'

import { Button, Container, Content, Icon } from 'native-base'

import * as jobsActions from '../reducers/jobs/jobsActions'

import CardView from '../components/CardView'

var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height

import t from 'tcomb-form-native'

function mapStateToProps (state) {
  return {
    jobs: state.jobs,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({...jobsActions}, dispatch)
  }
}

var alertMessage = 'prova prova prova prova prova prova prova prova' +
                   'prova prova prova prova prova prova prova prova' +
                   'prova prova prova prova prova prova prova prova' +
                   'prova prova prova prova prova prova prova prova'

class ModalView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalType: 'jobList'
    }
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

  renderUpdateView() {

    if (!this.props.jobs.loaded) {
      return this.renderLoadingView();
    }
    
    var _scrollView: ScrollView;

    return(
      <Container>
        <Content>
          <Modal

            animationType={"slide"}
            transparent={true}
            visible={this.props.jobs.modalVisible}
            onRequestClose={() => {this.props.actions.setModalVisible(!this.props.jobs.modalVisible)}}
            containerStyles={{marginLeft: 20}} >
            <View style={styles.modal}>
              <ScrollView
                ref={(scrollView) => { _scrollView = scrollView; }}
                automaticallyAdjustContentInsets={false}
                onScroll={() => {}}
                scrollEventThrottle={200}
                
                >
                
                <View style={{marginLeft: 20, marginRight: 20}}>
                  <View>
                    <Text> Title </Text>
                    <Text> from: xxx@xxx.com </Text>
                    <Text>{alertMessage} </Text>
                  </View>
                <View style={{flexDirection: 'row'}}>
                    <Button 
                      onPress={() => { this.props.actions.setModalVisible(!this.props.jobs.modalVisible) }}>
                        Back
                      <Icon name='angle-left' />
                    </Button>
                  </View>       
                </View>
                
              </ScrollView>
          </View>
        </Modal>
      </Content>
    </Container>
    )
  }

  renderJobsView(){

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
              visible={this.props.jobs.modalVisible}
              onRequestClose={() => {this.props.actions.setModalVisible(!this.props.jobs.modalVisible)}}
              containerStyles={{marginLeft: 20}} >
            <View >
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
                    { 
                      this.props.jobs.jobsList.map( job =>
                      <CardView key={job.ordine_id} 
                                job={job}
                                style={{padding: 0, borderColor: 'transparent'}} />
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
            </View>
          </Modal>
        </Content>
      </Container>
      )
  }


  render () {

    if (this.props.jobs.modalVisible){
      if(this.props.modalType == 'jobList')
        return this.renderJobsView(); 
      if(this.props.modalType == 'singleMail')
        return this.renderUpdateView(); 
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 65, 
    marginRight: 8, 
    marginLeft: 8
  },
  cardItemHead: {
    paddingTop: 2,
    paddingBottom: 2,
    backgroundColor: '#e6ecff', 
    borderRadius: 2, 
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
  }, 
  modal: {
    marginTop: 60, 
    alignSelf: 'center',
    width: deviceWidth*0.8,
    height: deviceHeight*0.8, 
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: '#e6ecff', 
    borderRadius: 2
  }
});

