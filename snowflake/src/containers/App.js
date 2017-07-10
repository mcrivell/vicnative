/**
 * # app.js
 *  Display startup screen and
 *  getSessionTokenAtStartup which will navigate upon completion
 *
 *
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
 * Project actions
 */
import * as authActions from '../reducers/auth/authActions'
import * as deviceActions from '../reducers/device/deviceActions'
import * as globalActions from '../reducers/global/globalActions'

/**
 * The components we need from ReactNative
 */
import React from 'react'
import
{
    StyleSheet,
    View,
    Text,
    Dimensions,
}
from 'react-native'

import { Container, Content } from 'native-base'

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'

var deviceHeight = Dimensions.get('window').height
/**

/**
 *  Save that state
 */
function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version,
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

/**
 * Bind all the actions from authActions, deviceActions and globalActions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...deviceActions, ...globalActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  mainView: {
    backgroundColor: '#FFFFFF', 
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold',
  }
})

/**
 * ## App class
 */
var reactMixin = require('react-mixin')
import TimerMixin from 'react-timer-mixin'
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

let App = React.createClass({
    /**
     * See if there's a sessionToken from a previous login
     *
     */
  componentDidMount () {
        // Use a timer so App screen is displayed
    this.setTimeout(
            () => {
              this.props.actions.getSessionToken()
            },
            2500
        )
  },

  render () {
    return (
      <Container>
        <Content style={styles.mainView}>
          <View style={styles.container}>
            <View style={{height: deviceHeight*0.5, flex: 1, flexDirection: 'column', justifyContent: 'center'}}>
              <Header isFetching={this.props.auth.form.isFetching}
                showState={this.props.global.showState}
                currentState={this.props.global.currentState}
                onGetState={this.props.actions.getState}
                onSetState={this.props.actions.setState} />
            </View>
          {/*

            <View style={{height: 30, flexDirection: 'column', flex: 1, justifyContent: 'flex-end'}}>
              <Text style={styles.summary}>vicnative {I18n.t('App.version')}:{this.props.deviceVersion}</Text>
            </View>

          */}

          </View>
        </Content>
      </Container>
    )
  }
})
// Since we're using ES6 classes, have to define the TimerMixin
reactMixin(App.prototype, TimerMixin)
/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(App)
