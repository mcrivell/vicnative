'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import {Actions} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar'


import React, { Component } from 'react'
import
{
  StyleSheet,
  View,
  Text, 
  Alert, 
  Modal, 
  ScrollView, 
  Dimensions
}
from 'react-native'

import { Button, Container, Content, Icon, CardItem} from 'native-base'

import MailView from '../components/MailView'

import * as jobsActions from '../reducers/jobs/jobsActions'

var _ = require('lodash')

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

// DA SISTEMARE 
class JobDetails_1 extends Component {
  constructor(props) {
      super(props)
      this.state = {
        email: {},
        modalVisible: false, 
      }
    }
 
  renderUpdateView() {

    var _scrollView: ScrollView;
    
    return(
      <Container>
        <Content>
         
            <View style={styles.modal}>
              <ScrollView
                ref={(scrollView) => { _scrollView = scrollView; }}
                automaticallyAdjustContentInsets={false}
                onScroll={() => {}}
                scrollEventThrottle={200}
                
                >
                
              <View>
                <View>
                  <Text style={styles.cardItemHead}>{this.state.email.oggetto} </Text>
                  <Text style={styles.text}> from: {this.state.email.mittente} </Text>
                  <Text style={styles.text}> date: {this.state.email.ora} </Text>
                  <View  style={{marginLeft: 12, marginRight: 12}}>
                    <Text style={styles.text}>{this.state.email.testo} </Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Button 
                    transparent
                    onPress={() => {this.setState({modalVisible: false})}}>
                      Close
                    <Icon name='angle-left' />
                  </Button>
                </View>       
              </View>
                
            </ScrollView>
          </View>
        
      </Content>
    </Container>
    )
  }

  
  render () {

    if(this.state.modalVisible){
      return this.renderUpdateView(); 
    }

    return (
      <Container style={styles.container}>
        <Content>
          <View>                          
            <View>
              {this.props.jobs.mailsList.map((m, i) =>
                <CardItem key={i}
                          style={{padding: 0, borderColor: 'transparent'}} 
                          onPress={() => {this.setState({email: m, modalVisible: true})}}>
                  <View style={styles.cardItemHead} >
                    <Text style={{fontSize: 13, color: '#262626'}}>{m.oggetto}</Text>                        
                  </View>
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={styles.cardItem}>
                      <Text style={styles.text}>from: {m.mittente}</Text>
                      <Text style={styles.text}>to: {m.destinatario}</Text>
                      <Text style={styles.text}>{_.truncate(m.testo, {
                                                              'length': 60,
                                                              'separator': ' [...]'
                                                            }).replace(/[^\x20-\x7E]/gmi, '')} </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Icon name='angle-right'  style={{fontSize: 65, color: '#F4F4F4'}}/>
                    </View>
                  </View> 
                  
                </CardItem>
              )}
            </View>        
          </View>
        </Content>
      </Container>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails_1)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 65, 
    marginRight: 8, 
    marginLeft: 8
  },
  cardItemHead: {
    padding: 2, 
    backgroundColor: '#F4F4F4', 
    //borderRadius: 2, 
  },
  cardItem: {
    padding: 2
  },
  text: {
    paddingTop: 3,
    color: '#333', 
    fontSize: 12, 
    width: deviceWidth*0.7
  }, 
  modal: {
    marginTop: 60, 
    alignSelf: 'center',
    width: deviceWidth*0.8,
    //height: deviceHeight*0.8, 
    backgroundColor: 'white', 
    borderWidth: 1, 
    borderColor: '#F4F4F4', 
    //borderRadius: 2
  }
});