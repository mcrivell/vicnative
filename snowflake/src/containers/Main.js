/**
 * # Main.js
 *  This is the main app screen
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
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions'
import * as globalActions from '../reducers/global/globalActions'
import * as jobsActions from '../reducers/jobs/jobsActions'

/**
 * Router
 */
import {Actions} from 'react-native-router-flux'

/**
 * The Header will display a Image and support Hot Loading
 */
import Header from '../components/Header'
import FormButton from '../components/FormButton'


/**
 * The components needed from React
 */
import React, {Component} from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { Button, Content, Container } from 'native-base'


var deviceWidth = Dimensions.get('window').width
var deviceHeight = Dimensions.get('window').height
/**
 * The platform neutral button
 */
//const Button = require('apsl-react-native-button')

/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState, 
      currentUser: state.global.currentUser
    }, 
    jobs: state.jobs
  }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions, ...jobsActions }, dispatch)
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1, 
    marginRight: 8, 
    marginLeft: 8, 
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  mainView: { 
    flexDirection: 'column', 
    flex: 1, 
    justifyContent: 'space-between', 
    marginTop: deviceHeight*0.15, 
    height: deviceHeight*0.8, 
  },
  button: {
    backgroundColor: '#ccd9ff',
    borderColor: '#ccd9ff',
    marginLeft: 10,
    marginRight: 10
  }
})
/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

/**
 * ## App class
 */
class Main extends Component {

  componentDidMount(){
      console.log('')
      this.props.actions.getPortList()
      this.props.actions.getCustomers()
      this.props.actions.setCustomer('')
      this.props.actions.getBranch(this.props.global.currentUser.login_id)
      this.props.actions.getAreaList()
      this.props.actions.getEmplList()
      
  }


  handlePress () {
    //this.props.actions.getCustomers().done()
    //this.props.actions.getBranch(this.props.global.currentUser.login_id).done()
    Actions.Subview({
      title: 'Browse jobs'
      // you can add additional props to be passed to Subview here...
    })
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.mainView}>
            <Header isFetching={this.props.auth.form.isFetching}
              showState={this.props.global.showState}
              currentState={this.props.global.currentState}
              onGetState={this.props.actions.getState}
              onSetState={this.props.actions.setState} />
            {/*
              <Button block info onPress={this.handlePress.bind(this)}>
              {I18n.t('Main.navigate')}
            </Button>
            */}
            
            <View style={{marginTop: deviceHeight*0.4}}>
              <FormButton
                isDisabled={false}
                onPress={this.handlePress.bind(this)}
                buttonText={I18n.t('Main.navigate')}
                 />
              <FormButton
                isDisabled={false}
                onPress={this.handlePress.bind(this)}
                buttonText={'Button 2'}
                 />
              <FormButton
                isDisabled={false}
                onPress={this.handlePress.bind(this)}
                buttonText={'Button 3'}
                 />
            </View>
          </View>
        </Content>
      </Container>
    )
  }
}

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(Main)
