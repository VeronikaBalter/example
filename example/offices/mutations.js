export default {
    OFFICES_COMPLETED_LOADING(state,value) {
        state.officesCompletedLoading = value;
    },
    OFFICES_COMPLETED(state,data) {
        state.officesCompleted = data.items;
        state.officesCompletedTotal = data.total;
    },
    OFFICES_UNCOMPLETED_LOADING(state,value) {
        state.officesUncompletedLoading = value;
    },
    OFFICES_UNCOMPLETED(state,data) {
        state.officesUncompleted = data.items;
        state.officesUncompletedTotal = data.total;
    },
}
