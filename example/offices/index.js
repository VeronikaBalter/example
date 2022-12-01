import _ from 'lodash';
import actions from './actions';
import mutations from './mutations';

export const initialState = {
    headersOfficesCompleted:[
      { key: 'info', label: 'Client information' },
      { key: 'members', label: 'Assigned members', sortable: true },
      { key: 'insuranceColl', label: 'Insurance coll.', sortable: true },
      { key: 'totalAR', label: 'Total AR', sortable: true },
      { key: 'insOver90', label: 'Ins. Over 90', sortable: true },
    ],
    officesCompletedLoading:false,
    officesCompleted:[],
    officesCompletedTotal:0,

    headersOfficesUncompleted:[
      { key: 'info', label: 'Client information' },
      { key: 'completePercent', label: 'Complete percent' },
      { key: 'status', label: 'Status' },
      { key: 'actions', label: 'Actions'  },
    ],
    officesUncompletedLoading:false,
    officesUncompleted:[],
    officesUncompletedTotal:0
    
};

const offices = {
    namespaced: true,
    state: _.cloneDeep(initialState),
    mutations,
    actions
};

export default offices;
