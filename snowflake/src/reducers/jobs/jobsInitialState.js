'use strict'

const {Record} = require('immutable')
const inspectionTypes = require('../../lib/constants').default

var InitialState = Record({
	modalVisible: false,
	error: null, 
	customersArray: [],
	customersArrayAll: [], 
	customer: '',
	branchList: [],
	branchListAll: [], 
  mailsList: [], 
	branch: '', 
	jobBranch: '', 
	loaded: '', 
	orderType: [
		'All', 
    'Pending', 
    'Incoming ETA > 3 gg',
    'Incoming ETA <= 3gg', 
    'In progress', 
    'To be reported', 
    'Finished', 
    'Canceled', 
    'Frozen'
  	], 
	selectedType: '', 
	jobsList: [],
	jobsDetail: {},
	selectedJob: '', 
  customerReference: '', 
  jobCustomer: '', 
  yearArray: [], 
  year: '', 
  vessel: '', 
  portList: [],
  port: '', 
  areaList: [], 
  area: '', 
  linkedPort: '',
  linkedArea: '', 
  inspectionType: '', 
  emplList: [], 
  selectedEmpl: '',	
  mmsiReference: '', 
  personInCharge: ''
})

export default InitialState
