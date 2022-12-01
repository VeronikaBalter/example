import Vue from 'vue';
import axios from 'axios';

export default {
    async getOfficesCompleted(context, filters) {
        if(filters == undefined){
            filters = {
                page:1,
                perPage: 8
            }
        }
        context.commit('OFFICES_COMPLETED_LOADING', { params: filters});
        await axios.get(`/api/practice/offices/completed`, {}).then(result => { 
            context.commit('OFFICES_COMPLETED',result.data);
            context.commit('OFFICES_COMPLETED_LOADING',false);
        }).catch(err => {
            context.commit('OFFICES_COMPLETED_LOADING',false);
        });
    },
    async getOfficesUncompleted(context, filters) {
        if(filters == undefined){
            filters = {
                page:1,
                perPage: 8
            }
        }
        context.commit('OFFICES_UNCOMPLETED_LOADING',true);
        await axios.get(`/api/practice/offices/uncompleted`, { params: filters}).then(result => { 
            context.commit('OFFICES_UNCOMPLETED',result.data);
            context.commit('OFFICES_UNCOMPLETED_LOADING',false);
            
        }).catch(err => {
            context.commit('OFFICES_UNCOMPLETED_LOADING',false);
        });
    },
    async changeStatus(context,office) {
        let data = {
            newStatus: office.status,
            notice: office.notice
        }
        const vm = new Vue();
        await axios.post(`/api/practice/offices/${office.id}/change-status`, data).then(result => { 
            vm.$toasted.success('Status has been successfully changed');
            context.dispatch('getOfficesUncompleted');
        }).catch(err => {
        });
    },
};
