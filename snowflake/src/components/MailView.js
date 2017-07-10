'use strict'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Actions} from 'react-native-router-flux'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Modal, ScrollView, Dimensions } from 'react-native'
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

class MailView extends Component {

  constructor(props){
    super(props)
    this.state = {
      modalVisible: true
    }
  }

  renderLoadingView() {
    //console.log('this.props.jobs.loaded: ' + this.props.jobs.loaded)
    return (
      <Container>
        <Content style={{marginTop: 150}}>
          <Spinner color='blue' />
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
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setState({modalVisible: false})}}
            containerStyles={{marginLeft: 20}} >
            <View style={styles.modal}>
              <ScrollView
                ref={(scrollView) => { _scrollView = scrollView; }}
                automaticallyAdjustContentInsets={false}
                onScroll={() => {}}
                scrollEventThrottle={250}>

                <View>
                  <View>
                    <Text style={styles.cardItemHead}>{this.props.email.oggetto} </Text>
                    <Text style={styles.text}>from: {this.props.email.mittente} </Text>
                    <Text style={styles.text}>date: {this.props.email.ora} </Text>
                    <View  style={{marginLeft: 12, marginRight: 12}}>
                      <Text style={styles.text}>{this.props.email.testo} </Text>
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
          </Modal>
        </Content>
      </Container>
    )
  }

  render () {
    if (this.props.jobs.modalVisible)
      return this.renderUpdateView();
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MailView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 55,
    marginRight: 8,
    marginLeft: 8
  },
  cardItemHead: {
    padding: 5,
    backgroundColor: '#e6ecff',
    borderRadius: 2,
  },
  cardItem: {
    paddingTop: 0,
    paddingBottom: 2,
  },
  text: {
    padding: 5,
    color: '#333',
    fontSize: 12
  },
  modal: {
    marginTop: 60,
    alignSelf: 'center',
    width: deviceWidth*0.8,
    //height: deviceHeight*0.8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e6ecff',
  }
});
