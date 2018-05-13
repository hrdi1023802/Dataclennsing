<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm12>
        <customer-search
          @customer="getCustomer">
        </customer-search>
      </v-flex>
      <v-flex xs12 sm12
              v-show="panelCustomerContracts">
        <customer-contract
          :customer="customer"
          @contract="getContract">
        </customer-contract>
      </v-flex>
      <v-flex xs12 sm12
              v-show="panelCustomerInfo">
        <v-expansion-panel>
          <v-expansion-panel-content>
            <div slot="header">
              <v-subheader>Datos Personales</v-subheader>
            </div>
            <v-flex xs12 sm12>
              <customer-info
                :customerInfo="customerInfo">
              </customer-info>
            </v-flex>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">
              <v-subheader>Direcciones</v-subheader>
            </div>
            <v-flex xs12 sm12>
              <customer-address
                :customerAddress="customerAddress">
              </customer-address>
            </v-flex>
          </v-expansion-panel-content>
          <!-- <v-expansion-panel-content>
            <div slot="header">
              <v-subheader>Contacto</v-subheader>
            </div>
            <v-flex xs12 sm12>
              <customer-contact
                :customerContact="customerContact">
              </customer-contact>
            </v-flex>
          </v-expansion-panel-content> -->
        </v-expansion-panel>
        <br>
        <div class="text-xs-center">
          <v-btn
            class="primary">
            Actualizar
          </v-btn>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/*eslint-disable*/
  import CustomerAddress from './CustomerAddress.vue'
 //import CustomerContact from './CustomerContact.vue'
  import CustomerContract from './CustomerContract.vue'
  import CustomerInfo from './CustomerInfo.vue'
  import CustomerSearch from './CustomerSearch.vue'

  export default {
    components: {
      CustomerAddress,
      //CustomerContact,
      CustomerContract,
      CustomerInfo,
      CustomerSearch
    },
    data () {
      return {
        panelCustomerContracts: false,
        panelCustomerInfo: false,
        customer: {},
        customerInfo: {},
        customerAddress: {},
        //customerContact: {}
      }
    },
    methods: {
      getCustomer: function (customer) {
        if (customer) {
          this.panelCustomerContracts = true
          this.panelCustomerInfo = false
          this.customer = customer
        } else {
          this.panelCustomerContracts = true
          this.panelCustomerInfo = false
          this.customer = null
        }
      },
      getContract: function (contract) {
        if (contract) {
          this.panelCustomerInfo = true
          this.customerInfo = {
            name: contract.name,
            lastName: contract.lastName,
            birthDate: contract.birthDate,
            email: contract.email,
            cellphone: contract.cellphone,
            officephone: contract.officephone,
            housephone: contract.housephone,
            fax: contract.fax,
            gender: contract.gender
           }
           console.log("dato de contractos",contract);
          this.customerAddress = {
            addressType: contract.addressType,
            houseType: contract.houseType,
            city: contract.city,
            street: contract.street,
            numStreet: contract.numStreet,
            intersection: contract.intersection,
            ref: contract.ref
          }
          // this.customerContact = {
          //   email: contract.email,
          //   cellphone: contract.cellphone,
          //   officephone: contract.officephone,
          //   housephone: contract.housephone,
          //   fax: contract.fax
          // }
        } else {
          this.panelCustomerInfo = true
          this.customerInfo = null
          this.customerAddress = null
         // this.customerContact = null
        }
      }
    }
  }
</script>
