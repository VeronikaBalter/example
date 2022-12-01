<template>
  <div>
    <div v-if="loading">
      <div class="d-flex justify-content-center mb-5 mt-5">
        <b-spinner></b-spinner>
      </div>
    </div>
    <b-card v-else class="offices">
      <!-- Top line with filters and buttons -->
      <b-row class="mb-2">
        <b-col class="p-0">
          <b-input-group class="input-icon">
            <b-input-group-prepend is-text>
              <i class="icon-search"/>
            </b-input-group-prepend>
            <b-input v-model="filters.search" type="search" placeholder="Search..." class="search" @input="getOffices()"/>
          </b-input-group>
          
        </b-col>
        <b-col class="col-auto sort">
          <i class="icon-sort-arrows icon-sort"/>
          <i class="icon-chevron-down icon-arrow"/>
          <b-select v-model="filters.orderBy" :options="sortingArray"  @change="getOffices()"/>
        </b-col>
        <b-col class="col-auto p-0"><b-button variant="primary" @click="$root.$emit('bv::show::modal', 'add-office', '#btnAddOffice')" ref="btnAddOffice">Add office</b-button></b-col>
      </b-row>
      <!-- Table -->
      <div v-if="items.length == 0" class="empty-table">
        No offices created yet
      </div>
      <div v-else>
        <b-table 
          id="offices-table"
          :items="items" 
          :fields="headers"  
          @row-clicked="onOfficeClicked">
          <template #cell(info)="data">
            <b-row>
                <b-col class="col-auto p-0">
                    <img v-if="data.item.logo != null" class="img-empty" :src="'/api/file/' + data.item.logo" />
                    <div v-else  class="logo-empty"><i class="icon-office"/></div>
                </b-col>
                <b-col class="name">
                    <div class="mt-n1">{{data.item.name}}</div>
                    <b-row class="justify-content-start">
                        <b-col v-for="(item, index) in data.item.services" :key="index" class=" col-auto tag mb-1">{{item}}</b-col>
                    </b-row>
                </b-col>
            </b-row>
          </template>
          <template #cell(members)="data">
            <b-row  class="justify-content-end">
              <div v-if="data.item.members.length > 0">
                <b-col v-for="(item,index) in data.item.members" :key="index" class="icon-member-medium col-auto mr-n15"><i class="icon-user"/></b-col>
              </div>
              <div v-else class="text-center">-</div>
            </b-row>
          </template>
          <template #cell(insuranceColl)="data">
            <b-row  class="justify-content-end">
              <div v-if="data.item.insuranceColl > 0"  
                :class="[data.item.insuranceColl >= 30 ? 'percent-tag-outline-green' : 
                data.item.insuranceColl < 3 ? 'percent-tag-outline-red' : 'percent-tag-outline-orange','insurance']">$ {{data.item.insuranceColl}}</div>
              <div v-else class="text-center">-</div>
            </b-row>
          </template>
          <template #cell(totalAR)="data">
            <b-row class="justify-content-end">
            <div v-if="data.item.totalAR > 0" 
                :class="[data.item.totalAR >= 50 ? 'percent-tag-outline-green' : 
                data.item.totalAr < 30 ? 'percent-tag-outline-red' : 'percent-tag-outline-orange','percent']">{{data.item.totalAR}}%</div>
            <div v-else class="text-center">-</div>
            </b-row>
          </template>
          <template #cell(insOver90)="data">
            <b-row class="justify-content-end">
              <div v-if="data.item.insOver90 > 0" 
                :class="[data.item.insOver90 <=5 ? 'percent-tag-green' : data.item.insOver90 > 26 ? 'percent-tag-red' : 'percent-tag-orange','percent']">{{data.item.insOver90}}%</div>
            <div v-else class="text-center">-</div>
            </b-row>
          </template>
        </b-table>
        <!-- Paginate  -->
        <paginate v-if="total > filters.perPage" :total="total" :settings="filters" @changePage="changePage" @changePerPage="changePerPage"/>
      </div>
    </b-card>
    <add-office />
  </div>
</template>

<script>
import AddOffice from '../components/modalWindows/AddOffice.vue';
import Paginate from '../components/common/Paginate.vue';
export default {
  components: { AddOffice,Paginate },
  data() {
    return {
      sortingArray:['Recently', 'Long-ago'],
      filters:{
        search:'',
        orderBy: 'Recently',
        perPage:8,
        page:1,
      },      
    };
  },
  created(){
    this.getOffices();
  },
  computed:{
    headers(){
      return this.$store.state.offices.headersOfficesCompleted;
    },
    items(){
      return this.$store.state.offices.officesCompleted;
    },
    loading(){
      return this.$store.state.offices.officesCompletedLoading;
    },
    total(){
      return this.$store.state.offices.officesCompleted.length;
    }
  },
  methods:{
    getOffices(){
      this.$store.dispatch('offices/getOfficesCompleted',this.filters);
    },
    onOfficeClicked(item){
      this.$router.push({ name: 'Office', params: { id: item.id } });
    },
    changePage(page){
      this.filters.page = page;
      this.getOffices()
    },
    changePerPage(perPage){
      this.filters.perPage = perPage;
      this.getPatients()
    },
  }
}
</script>