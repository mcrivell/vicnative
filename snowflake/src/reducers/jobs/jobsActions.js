'use strict'

const {
	GET_CUSTOMERS_REQUEST, 
	GET_CUSTOMERS_SUCCESS, 
	GET_CUSTOMERS_FAILURE, 

	GET_AREA_LIST_REQUEST, 
	GET_AREA_LIST_SUCCESS, 
	GET_AREA_LIST_FAILURE, 

	GET_JOBS_REQUEST, 
	GET_JOBS_SUCCESS, 
	GET_JOBS_FAILURE, 

	GET_BRANCH_REQUEST, 
	GET_BRANCH_SUCCESS, 
	GET_BRANCH_FAILURE,

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

  ON_YEAR_FIELD_CHANGE,
  ON_VESSEL_FIELD_CHANGE,
  ON_CUSTOMER_REF_FIELD_CHANGE, 

  GET_PORT_LIST_REQUEST, 
  GET_PORT_LIST_FAILURE, 
  GET_PORT_LIST_SUCCESS, 

  GET_EMPL_LIST_REQUEST, 
  GET_EMPL_LIST_FAILURE, 
  GET_EMPL_LIST_SUCCESS, 

} = require('../../lib/constants').default

const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'

import {Actions} from 'react-native-router-flux'

export function getCustomersRequest () {
	//console.log('getCustomersRequest')
  return {
    type: GET_CUSTOMERS_REQUEST
  }
}
export function getCustomersSuccess (json) {
	//console.log('getCustomersSuccess')
  return {
    type: GET_CUSTOMERS_SUCCESS,
    payload: json
  }
}
export function getCustomersFailure (json) {
	//console.log('getCustomersFailure')
  return {
    type: GET_CUSTOMERS_FAILURE,
    payload: json
  }
}

export function getCustomers () {
	//console.log('getCustomers')
	return dispatch => {
		dispatch(getCustomersRequest())
		return BackendFactory().getCustomers()
		  .then((customers) => {
		  	dispatch(getCustomersSuccess(customers))
		  })
		  .catch((error) => {
		  	dispatch(getCustomersFailure(error))
		  })
	}
}

export function getAreaListRequest () {
	//console.log('getCustomersRequest')
  return {
    type: GET_AREA_LIST_REQUEST
  }
}
export function getAreaListSuccess (json) {
	//console.log('getCustomersSuccess')
  return {
    type: GET_AREA_LIST_SUCCESS,
    payload: json
  }
}
export function getAreaListFailure (json) {
	//console.log('getCustomersFailure')
  return {
    type: GET_AREA_LIST_FAILURE,
    payload: json
  }
}

export function getAreaList () {
	//console.log('getCustomers')
	return dispatch => {
		dispatch(getAreaListRequest())
		return BackendFactory().getAreaList()
		  .then((customers) => {
		  	dispatch(getAreaListSuccess(customers))
		  })
		  .catch((error) => {
		  	dispatch(getAreaListFailure(error))
		  })
	}
}

export function getMailsRequest () {
	//console.log('getCustomersRequest')
  return {
    type: GET_MAILS_REQUEST
  }
}
export function getMailsSuccess (json) {
	//console.log('getCustomersSuccess')
  return {
    type: GET_MAILS_SUCCESS,
    payload: json
  }
}
export function getMailsFailure (json) {
	//console.log('getCustomersFailure')
  return {
    type: GET_MAILS_FAILURE,
    payload: json
  }
}

export function getMails (ordine_id) {
	//console.log('getCustomers')
	return dispatch => {
		dispatch(getMailsRequest())
		return BackendFactory().getMails(ordine_id)
		  .then((mails) => {
		  	dispatch(getMailsSuccess(mails))
		  })
		  .catch((error) => {
		  	dispatch(getMailsFailure(error))
		  })
	}
}

export function getBranchRequest () {
  return {
    type: GET_BRANCH_REQUEST
  }
}
export function getBranchSuccess (json) {
  return {
    type: GET_BRANCH_SUCCESS,
    payload: json
  }
}
export function getBranchFailure (json) {
  return {
    type: GET_BRANCH_FAILURE,
    payload: json
  }
}

export function getBranch (userId) {
	return dispatch => {
		dispatch(getBranchRequest())
		return BackendFactory().getBranch(userId)
		  .then((branch) => {
		  	dispatch(getBranchSuccess(branch))
		  })
		  .catch((error) => {
		  	dispatch(getBranchFailure(error))
		  })
	}
}

export function getPortListRequest () {
  return {
    type: GET_PORT_LIST_REQUEST
  }
}
export function getPortListSuccess (json) {
  return {
    type: GET_PORT_LIST_SUCCESS,
    payload: json
  }
}
export function getPortListFailure (json) {
  return {
    type: GET_PORT_LIST_FAILURE,
    payload: json
  }
}

export function getPortList () {
	return dispatch => {
		dispatch(getPortListRequest())
		return BackendFactory().getPortList()
		  .then((port) => {

		  	dispatch(getPortListSuccess(port))
		  })
		  .catch((error) => {
		  	dispatch(getPortListFailure(error))
		  })
	}
}

export function getJobsRequest () {
  return {
    type: GET_JOBS_REQUEST
  }
}
export function getJobsSuccess (json) {
  return {
    type: GET_JOBS_SUCCESS,
    payload: json
  }
}
export function getJobsFailure (json) {
  return {
    type: GET_JOBS_FAILURE,
    payload: json
  }
}

export function getJobs (branch_filter, port_filter, status_filter) {
	return dispatch => {
		dispatch(getJobsRequest())
		return BackendFactory().getJobs(branch_filter, port_filter, status_filter)
		  .then((jobs) => {

		  	//dispatch(setModalVisible(true))
		  	dispatch(getJobsSuccess(jobs))		  	
		  })
		  .catch((error) => {
		  	dispatch(getJobsFailure(error))
		  })
	}
}

export function getJobsDetailRequest () {
  return {
    type: GET_JOB_DETAIL_REQUEST
  }
}
export function getJobsDetailSuccess (json) {
  return {
    type: GET_JOB_DETAIL_SUCCESS,
    payload: json
  }
}
export function getJobsDetailFailure (json) {
  return {
    type: GET_JOB_DETAIL_FAILURE,
    payload: json
  }
}

export function getJobDetails (jobId) {
	return dispatch => {
		dispatch(getJobsDetailRequest())
		dispatch(setSelectedJob(jobId))
		dispatch(getMails(jobId))
		return BackendFactory().getJobDetails(jobId)
		  .then((jobs) => {
		  	dispatch(setJobCustomer(jobs.fk_cliente.cliente_id))
				dispatch(onCustomerRefFieldChange(jobs.riferimento_cliente))
		  	dispatch(onYearFieldChange(jobs.showJobId))
		  	dispatch(onVesselFieldChange(jobs.vessel))
		  	dispatch(setJobBranch(jobs.fk_sede.sede_id))
		  	dispatch(setPort(jobs.port.porto_id))
		  	dispatch(setInspectionType(jobs.caricazione))
		  	dispatch(setLinkedPort(jobs.nave.fk_porto_sbarco))
		  	dispatch(setLinkedArea(jobs.nave.fk_area))
		  	dispatch(setMmsi(jobs.nave.mmsi))
		  	if(jobs.fk_sede.fk_director !== null)
		  	  dispatch(setPersonInCharge(jobs.fk_sede.fk_director))
		  	//dispatch(setModalVisible(false))
		  	Actions.Tabbar()
		  }).then(()=> {
		  	dispatch(getJobsDetailSuccess(jobs))

		  })
		  .catch((error) => {
		  	dispatch(getJobsDetailFailure(error))
		  })
	}
}

export function getEmplListRequest () {
	//console.log('getCustomersRequest')
  return {
    type: GET_EMPL_LIST_REQUEST
  }
}
export function getEmplListSuccess (json) {
	//console.log('getCustomersSuccess')
  return {
    type: GET_EMPL_LIST_SUCCESS,
    payload: json
  }
}
export function getEmplListFailure (json) {
	//console.log('getCustomersFailure')
  return {
    type: GET_EMPL_LIST_FAILURE,
    payload: json
  }
}

export function getEmplList () {
	//console.log('getCustomers')
	return dispatch => {
		dispatch(getEmplListRequest())
		return BackendFactory().getEmplList()
		  .then((employee) => {
		  	dispatch(getEmplListSuccess(employee))
		  })
		  .catch((error) => {
		  	dispatch(getEmplListFailure(error))
		  })
	}
}

export function setModalVisible(value) {
	console.log('SET_MODAL')
	return {
		type: SET_MODAL,
		payload: value
	}
}

export function setCustomer(value) {
	console.log('SET_CUSTOMER: ' + value )
	return {
		type: SET_CUSTOMER,
		payload: value
	}
}

export function setPort(value) {
	console.log('SET_PORT:' + value)
	return {
		type: SET_PORT, 
		payload: value
	}
}

export function setJobCustomer(value) {
	console.log('SET_JOB_CUSTOMER: ' + value )
	return {
		type: SET_JOB_CUSTOMER,
		payload: value
	}
}

export function setBranch(value) {
	console.log('SET_BRANCH')
	return {
		type: SET_BRANCH,
		payload: value
	}
}

export function setJobBranch(value) {
	console.log('SET__JOB_BRANCH')
	return {
		type: SET_JOB_BRANCH,
		payload: value
	}
}

export function setType(value) {
	console.log('SET__type')
  return {
    type: SET_TYPE, 
    payload: value
  }
}

export function setSelectedJob(value) {
	console.log('SET__selected')
	return {
		type: SET_SELECTED_JOB, 
		payload: value
	}
}

export function onCustomerRefFieldChange (value) {
	console.log('SET__customerRef')
  return {
    type: ON_CUSTOMER_REF_FIELD_CHANGE,
    payload: value
  }
}

export function onYearFieldChange (value) {
	console.log('SET__yearfield')
  return {
    type: ON_YEAR_FIELD_CHANGE,
    payload: value
  }
}

export function onVesselFieldChange (value) {
	console.log('SET_VesselFIeld')
  return {
    type: ON_VESSEL_FIELD_CHANGE,
    payload: value
  }
}

export function setArea (value) {
	console.log('SET_AREA')
	return {
		type: SET_AREA, 
		payload: value 
	}
}

export function setInspectionType(value) {
	console.log('SET__inspectionType')
	return {
		type: SET_INSPECTION_TYPE, 
		payload: value 
	}
}

export function setEmpl(value) {
	console.log('SET__empl')
	return {
		type: SET_EMPL, 
		payload: value 
	}
}

export function setLinkedPort(value){
	console.log('SET__linkedpord')
	return {
		type: SET_LINKED_PORT, 
		payload: value
	}
}

export function setLinkedArea(value) {
	console.log('SET__linkedarea')
	return {
		type: SET_LINKED_AREA, 
		payload: value
	}
}

export function setMmsi(value) {
	console.log('SET__mmsi')
	return {
		type: SET_MMSI, 
		payload: value
	}
}

export function setPersonInCharge(value) {
	console.log('SET__personincharge')
	return {
		type: SET_PERSON, 
		payload: value
	}
}






