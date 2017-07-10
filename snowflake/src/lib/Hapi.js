/**
 * # Hapi.js
 *
 * This class interfaces with Hapi.com using the rest api
 * see [http://hapijs.com/api](http://hapijs.com/api)
 *
 * Singleton module see: https://k94n.com/es6-modules-single-instance-pattern
 */
'use strict'

/**
 * ## Imports
 *
 * Config for defaults and underscore for a couple of features
 */
import CONFIG from './config'
import _ from 'underscore'
import Backend from './Backend'

export class Hapi extends Backend {
  /**
   * ## Hapi.js client
   *
   *
   * @throws tokenMissing if token is undefined
   */
  initialize (token) {
    if (!_.isNull(token) && _.isUndefined(token.sessionToken)) {
      throw new Error('TokenMissing')
    }
    this._sessionToken =
      _.isNull(token) ? null : token.sessionToken.sessionToken

    this.API_BASE_URL = CONFIG.backend.hapiLocal
          ? CONFIG.HAPI.local.url
          : CONFIG.HAPI.remote.url
  }
  /**
   * ### signup
   *
   * @param data object
   *
   * {username: "barton", email: "foo@gmail.com", password: "Passw0rd!"}
   *
   * @return
   * if ok, res.json={createdAt: "2015-12-30T15:17:05.379Z",
   *   objectId: "5TgExo2wBA",
   *   sessionToken: "r:dEgdUkcs2ydMV9Y9mt8HcBrDM"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async signup (data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/register',
      body: data
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw res.json
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### login
   * encode the data and and call _fetch
   *
   * @param data
   *
   *  {username: "barton", password: "Passw0rd!"}
   *
   * @returns
   *
   * createdAt: "2015-12-30T15:29:36.611Z"
   * updatedAt: "2015-12-30T16:08:50.419Z"
   * objectId: "Z4yvP19OeL"
   * email: "barton@foo.com"
   * sessionToken: "r:Kt9wXIBWD0dNijNIq2u5rRllW"
   * username: "barton"
   *
   */
  async login (data) {
    console.log(JSON.stringify(data))
    return await this._fetch({
      method: 'POST',
      url: 'api/login/',
      body: data
    })
      .then((res) => {

        if (res.status === 200 || res.status === 201) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        console.log(error)
        throw (error)
      })
  }
  /**
   * ### logout
   * prepare the request and call _fetch
   */
  async logout () {
    return await this._fetch({
      method: 'POST',
      url: '/account/logout',
      body: {}
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201) ||
            (res.status === 400 && res.code === 209)) {
          return {}
        } else {
          throw new Error({code: res.statusCode, error: res.message})
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### resetPassword
   * the data is already in a JSON format, so call _fetch
   *
   * @param data
   * {email: "barton@foo.com"}
   *
   * @returns empty object
   *
   * if error:  {code: xxx, error: 'message'}
   */
  async resetPassword (data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/resetPasswordRequest',
      body: data
    })
      .then((response) => {
        if ((response.status === 200 || response.status === 201)) {
          return {}
        } else {
          var res = JSON.parse(response._bodyInit)
          throw (res)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### getProfile
   * Using the sessionToken, we'll get everything about
   * the current user.
   *
   * @returns
   *
   * if good:
   * {createdAt: "2015-12-30T15:29:36.611Z"
   *  email: "barton@acclivyx.com"
   *  objectId: "Z4yvP19OeL"
   *  sessionToken: "r:uFeYONgIsZMPyxOWVJ6VqJGqv"
   *  updatedAt: "2015-12-30T15:29:36.611Z"
   *  username: "barton"}
   *
   * if error, {code: xxx, error: 'message'}
   */
  async getProfile () {
    return await this._fetch({
      method: 'GET',
      url: '/account/profile/me',
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return res.json
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }
  /**
   * ### updateProfile
   * for this user, update their record
   * the data is already in JSON format
   *
   * @param userId  _id
   * @param data object:
   * {username: "barton", email: "barton@foo.com"}
   */
  async updateProfile (userId, data) {
    return await this._fetch({
      method: 'POST',
      url: '/account/profile/' + userId,
      body: data
    })
      .then((res) => {
        if ((res.status === 200 || res.status === 201)) {
          return {}
        } else {
          throw (res.json)
        }
      })
      .catch((error) => {
        throw (error)
      })
  }


  async getCustomers(){
    return await this._fetch({
      method: 'GET',
      url: 'registry/get_customer_list/'
    })
    .then((res) => {
      if ((res.status === 200 || res.status === 201)) {
					let cArray = [{cliente: '', nominativo: 'All'}]
					for(var i=0; i<(res.json).length; i++) {
						cArray.push(res.json[i])
					}
					return cArray
      } else {
		     throw (res)
        }
    })
    .catch((error) => {
      throw (error)
    })
  }


  async getBranch(userId){
		return await this._fetch({
			method: 'GET',
			url: 'registry/get_branch_list/' + userId
		})
		.then((res) => {
			if((res.status === 200 || res.status === 201)) {
				let cArray = [{sede_id: '', nome: 'All'}]
				for(var i=0; i<(res.json).length; i++) {
					cArray.push(res.json[i])
				}
				return cArray
			} else {
				throw (res)
			}
		})
		.catch((error) => { throw (error) })
	}

  async getPortList(){
    return await this._fetch({
      method: 'GET',
      url: 'registry/get_port_list/'
    })
    .then((res) => {
      if((res.status === 200 || res.status === 201)) {

        return res.json
      } else {
        throw (res)
      }
    })
    .catch((error) => { throw (error) })
  }

  async getAreaList(){
    return await this._fetch({
      method: 'GET',
      url: 'registry/get_area_list/'
    })
    .then((res) => {
      if((res.status === 200 || res.status === 201)) {
        return res.json
      } else {
        throw (res)
      }
    })
    .catch((error) => { throw (error) })
  }

  async getMails(ordine_id){
    return await this._fetch({
      method: 'GET',
      url: 'job/get_email_ordine/' + ordine_id
    })
    .then((res) => {
      if((res.status === 200 || res.status === 201)) {
        return res.json
      } else {
        throw (res)
      }
    })
    .catch((error) => { throw (error) })
  }

  async getEmplList(){
    return await this._fetch({
      method: 'GET',
      url: 'registry/get_employee_list/'
    })
    .then((res) => {
      if((res.status === 200 || res.status === 201)) {
        return res.json
      } else {
        throw (res)
      }
    })
    .catch((error) => { throw (error) })
  }
/*
	async function fetchBranch(userId) {
    fetch(BRANCH_REQUEST_URL + userId)
      .then((response) => response.json())
      .then((responseData) => {
				var cArray = [{sede_id: '', nome: 'All'}]
				for(var i=0; i<responseData.length; i++) {
					cArray.push(responseData[i])
				}
				this.setState({
							branchList: cArray
				});
				if(!this.state.loaded) {
					this.setState({
						loaded: true
					});
				}
		 })
     .done();
  },
  async getBranch(userId){
    console.log('userId: ' + userId)
    return await this._fetch({
      method: 'GET',
      url: 'registry/get_branch_list/' + 314
    })
    .then((res) => {
      if((res.status === 200 || res.status === 201)) {
    //console.log(res)
        return res
      } else {

        throw (res)
      }
    })
    .catch((error) => {
      throw (error)
    })
  }
  */

  async getJobs(branch_filter, port_filter, status_filter){
    return await this._fetch({
      method: 'GET',
      url: 'job/get_jobs_list_2/' + '?branch=' + branch_filter +
																		'&port=' + port_filter +
																		'&status=' + status_filter
    })
    .then((res) => {
      if((res.status === 200 || res.status === 201)) {
				//console.log('JOBS_: ' + JSON.stringify(res.json.lista))
        return res.json.lista
      } else {

        throw (res)
      }
    })
    .catch((error) => { throw (error) })
  }

  async getJobDetails(jobId){
    return await this._fetch({
      method: 'GET',
      url: 'job/get_job_all_details/' + jobId
    })
    .then((res) => {
      if((res.status === 200 || res.status === 201)) {
        console.log('JOBS_: ' + JSON.stringify(res.json.riferimento_cliente))
        return res.json
      } else {

        throw (res)
      }
    })
    .catch((error) => { throw (error) })
  }

  /**
   * ### _fetch
   * A generic function that prepares the request
   *
   * @returns object:
   *  {code: response.code,
   *   status: response.status,
   *   json: response.json()
   */
  async _fetch (opts) {
		console.log('URL: ' + opts.url)
    opts = _.extend({
      method: 'GET',
      url: null,
      body: null,
      callback: null,
    }, opts)

    var reqOpts = {
      method: opts.method,
      headers: {
        cache: 'force-cache'
      }
    }

    if (this._sessionToken) {
      reqOpts.headers['Authorization'] = 'Bearer ' + this._sessionToken
    }

    if (opts.method === 'POST' || opts.method === 'PUT') {
      reqOpts.headers['Accept'] = 'application/json'
      reqOpts.headers['Content-Type'] = 'application/json'
    }

    if (opts.body) {
      reqOpts.body = JSON.stringify(opts.body)
    }

    let url = this.API_BASE_URL + opts.url
    let res = {}

    let response = await fetch(url, reqOpts)
    res.status = response.status
    res.code = response.code

    return response.json()
      .then((json) => {
        res.json = json
        return res
      })
  }
}


// The singleton variable
export let hapi = new Hapi()
