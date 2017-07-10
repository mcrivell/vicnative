/**
 * # FormButton.js
 *
 * Display a button that responds to onPress and is colored appropriately
 */
'use strict'
/**
 * ## Imports
 *
 * React
 */
import React from 'react'
import
{
  StyleSheet,
  View
} from 'react-native'

/**
 * The platform neutral button
 */
const Button = require('apsl-react-native-button')

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  signin: {
    marginLeft: 8,
    marginRight: 8
  },
  button: {
    backgroundColor: '#7D5BA6',
    borderColor: '#7D5BA6', 
    borderRadius: 0, 
  }

})

var FormButton = React.createClass({
  /**
   * ### render
   *
   * Display the Button
   */
  render () {
    return (
      <View>
        <Button style={styles.button}
          textStyle={{fontSize: 16, color: 'white'}}
          isDisabled={this.props.isDisabled}
          onPress={this.props.onPress} >
          {this.props.buttonText}
        </Button>
      </View>
    )
  }
})

module.exports = FormButton
