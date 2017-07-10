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
  Picker
}
from 'react-native'

import { Button, Container, Content } from 'native-base'
/**
 * Use device options so we can reference the Version
 *
 */
import * as jobsActions from '../reducers/jobs/jobsActions'

/**
* ## Redux boilerplate
*/

/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which Main.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    jobs: state.jobs,
  }
}

/*
 * Bind all the actions in deviceActions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({...jobsActions}, dispatch)
  }
}


/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

/**
 * ## Subview class
 */
class Job extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    console.log('JOBSconmponentDidMount')
    //this.props.actions.getJobDetails(this.props.jobs.selectedJob)
  }


  render () {

    return (
      <Container>

        <Content style={{marginTop: 53}}>
         
          <Text> pagina prova 2 </Text>
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
    marginTop: 50
  },
  pickerContainer: {
    padding: 10, 
    flex: 1, 
    borderBottomWidth: 5, 
    color: '#333', 
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
    width: 100

  }
});