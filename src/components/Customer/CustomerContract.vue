<template>
  <v-data-table
    :headers="tableHeaders"
    :items="tableItems"
    hide-actions
    class="elevation-1">
    <template slot="items" slot-scope="props">
      <td class="text-xs-left">{{ props.item.contract }}</td>
      <td class="text-xs-left">{{ props.item.contractType }}</td>
      <td class="text-xs-left">{{ props.item.street }}</td>
      <td class="text-xs-left">{{ props.item.lastUpdate }}</td>
      <td>
        <div class="text-xs-center">
          <v-btn flat center @click="getCustomerAddressContact(props.item)">
            Default
          </v-btn>
          <v-btn flat center @click="getCustomerAddressContact(props.item)">
            Billing 
          </v-btn>
        </div>
      </td>
    </template>
    <template slot="no-data">
      <v-alert :value="true" color="warning" icon="warning">
        No se ha encontrado información
      </v-alert>
    </template>
  </v-data-table>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        tableHeaders: [
          {addresses: 'Número de contrato', align: 'left', sortable: false, value: 'contracts'},
          {text: 'Tipo Negocio', align: 'left', sortable: false, value: 'contractTypes'},
          {text: 'Dirección', align: 'left', sortable: false, value: 'addresses'},
          {text: 'Última Actualización', align: 'left', sortable: false, value: ''},
          {text: 'Opción', align: 'center', sortable: false, value: ''}
        ],
        tableItems: [],
        contract: {}
      }
    },
    watch: {
      'customer': {
        deep: true,
        handler (value) {
          this.tableItems.length = 0
          this.tableItems = []
          if (this.customer) {
            for (let i = 0; i < this.customer.addresses.length; i++) {
              this.tableItems.push(
                this.customer.addresses[i]
              )
            }
          }
        }
      }
    },
    computed: {
      ...mapGetters([
        'customer'
      ])
    },
    methods: {
      getCustomerAddressContact: function (data) {
        this.contract = data
        this.$emit('contract', this.contract)
      }
    }
}
</script>
