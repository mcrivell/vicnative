'use strict'

const InitialState = require('./jobsInitialState').default

const {
	GET_CUSTOMERS_REQUEST, 
	GET_CUSTOMERS_SUCCESS, 
	GET_CUSTOMERS_FAILURE, 

	GET_JOBS_REQUEST, 
	GET_JOBS_SUCCESS, 
	GET_JOBS_FAILURE, 

	GET_BRANCH_REQUEST, 
  GET_BRANCH_SUCCESS, 
  GET_BRANCH_FAILURE,

  GET_AREA_LIST_REQUEST, 
  GET_AREA_LIST_SUCCESS, 
  GET_AREA_LIST_FAILURE, 

  GET_MAILS_REQUEST, 
  GET_MAILS_SUCCESS, 
  GET_MAILS_FAILURE, 

	SET_MODAL, 
	SET_CUSTOMER, 
  SET_JOB_CUSTOMER,
	SET_BRANCH, 
  SET_JOB_BRANCH, 
  SET_TYPE,
  SET_SELECTED_JOB, 
  SET_PORT, 
  SET_AREA, 
  SET_INSPECTION_TYPE,
  SET_EMPL, 
  SET_LINKED_PORT, 
  SET_LINKED_AREA,  
  SET_MMSI, 
  SET_PERSON,

  GET_JOB_DETAIL_REQUEST, 
  GET_JOB_DETAIL_SUCCESS, 
  GET_JOB_DETAIL_FAILURE, 

  ON_CUSTOMER_REF_FIELD_CHANGE, 
  ON_YEAR_FIELD_CHANGE, 
  ON_VESSEL_FIELD_CHANGE, 

  GET_PORT_LIST_REQUEST, 
  GET_PORT_LIST_FAILURE, 
  GET_PORT_LIST_SUCCESS, 

  GET_EMPL_LIST_REQUEST, 
  GET_EMPL_LIST_FAILURE, 
  GET_EMPL_LIST_SUCCESS, 

} = require('../../lib/constants').default

const initialState = new InitialState()

export default function jobsReducer (state = initialState, action) {
	
	let nextProfileState = null

	if (!(state instanceof InitialState))
	  return initialState.mergeDeep(state)

  switch (action.type) {

  	case GET_CUSTOMERS_REQUEST: 
  	case GET_BRANCH_REQUEST:
    case GET_JOBS_REQUEST:
    case GET_JOB_DETAIL_REQUEST:
    case GET_PORT_LIST_REQUEST:
    case GET_AREA_LIST_REQUEST: 
    case GET_EMPL_LIST_REQUEST:
    case GET_MAILS_REQUEST: 
  		let nextState = state.setIn(['loaded'], false)
  		return nextState

  	case GET_CUSTOMERS_FAILURE: 
  	case GET_BRANCH_FAILURE: 
    case GET_JOBS_FAILURE:
    case GET_JOB_DETAIL_FAILURE:
    case GET_PORT_LIST_FAILURE:
    case GET_AREA_LIST_FAILURE: 
    case GET_EMPL_LIST_FAILURE: 
    case GET_MAILS_FAILURE:
  		return state.setIn(['loaded'], true)
  		            .setIn(['error'], action.payload)
  	
  	case GET_CUSTOMERS_SUCCESS: 
      //console.log(action.payload.slice(1))
  	  return state.setIn(['loaded'], true)
                  .setIn(['customersArrayAll'], action.payload)
                  .setIn(['customersArray'], action.payload.slice(1))

    case GET_BRANCH_SUCCESS: 
  	  return state.setIn(['loaded'], true)
                  .setIn(['branchListAll'], action.payload)
                  .setIn(['branchList'], action.payload.slice(1))

    case GET_MAILS_SUCCESS: 
      return state.setIn(['mailsList'], action.payload)
        
    case GET_JOBS_SUCCESS: 
    //console.log('action.payload: ' + JSON.stringify(action.payload))
      return state.setIn(['loaded'], true)
                  .setIn(['jobsList'], action.payload)

    case GET_AREA_LIST_SUCCESS: 
      return state.setIn(['loaded'], true)
                  .setIn(['areaList'], action.payload)

    case GET_JOB_DETAIL_SUCCESS: 
      //console.log('RIFERIMENTO CLIENTE: ' + JSON.stringify(action.payload))
      return state.setIn(['loaded'], true)
                  .setIn(['jobsDetail'], action.payload)
                  //.setIn(['selectedJob'], action.payload.ordine_id)
                  //.setIn(['customerReference'], action.payload.riferimento_cliente)
                  //.setIn(['yearArray'], action.payload.showJobId.split('/'))
                  //.setIn(['year'], yearArray[0])
                  
                  //.setIn(['selectedCustomer'], action.payload.fk_client.nominativo)
    case GET_PORT_LIST_SUCCESS: 
      return state.setIn(['loaded'], true)
                  .setIn(['portList'], action.payload)

    case GET_EMPL_LIST_SUCCESS: 
      return state.setIn(['loaded'], true)
                  .setIn(['emplList'], action.payload)
  	
  	case SET_MODAL: 
  		return state.setIn(['modalVisible'], action.payload)

  	case SET_CUSTOMER: 
  		return state.setIn(['customer'], action.payload)

    case SET_PORT: 
      return state.setIn(['port'], action.payload)

    case SET_JOB_CUSTOMER: 
      return state.setIn(['jobCustomer'], action.payload)

  	case SET_BRANCH: 
  		return state.setIn(['branch'], action.payload)

    case SET_JOB_BRANCH: 
      return state.setIn(['jobBranch'], action.payload)
      
    case SET_TYPE: 
      return state.setIn(['selectedType'], action.payload)

    case SET_SELECTED_JOB: 
      return state.setIn(['selectedJob'], action.payload)

    case SET_AREA: 
      return state.setIn(['area'], action.payload)

    case SET_INSPECTION_TYPE: 
      return state.setIn(['inspectionType'], action.payload)

    case SET_EMPL: 
      return state.setIn(['selectedEmpl'], action.payload)

    case SET_MMSI: 
      return state.setIn(['mmsiReference'], action.payload)

    case SET_LINKED_PORT: 
      return state.setIn(['linkedPort'], action.payload)

    case SET_LINKED_AREA:
      return state.setIn(['linkedArea'], action.payload)

    case SET_PERSON: 
      return state.setIn(['personInCharge'], action.payload)

    case ON_CUSTOMER_REF_FIELD_CHANGE: 
     //console.log('RFERIMENTO_CLIENTE': action.payload)
      return state.setIn(['customerReference'], action.payload)

    case ON_YEAR_FIELD_CHANGE: 
      return state.setIn(['year'], action.payload)
                  .setIn(['yearArray'], action.payload.split('/'))

    case ON_VESSEL_FIELD_CHANGE: 
      return state.setIn(['vessel'], action.payload)

  }

  return state
}
