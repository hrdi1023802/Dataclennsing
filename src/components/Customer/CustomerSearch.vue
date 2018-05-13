<template>
  <v-layout>
    <v-flex xs5 sm4 md4>
      <v-select
        clearable
        auto
        solo
        single-line
        label="Criterio de búsqueda"
        v-model="dnitype"
        :items="dnitypes"
        item-value="value"
        :rules="dnitypeRules"
        required
      ></v-select>
    </v-flex>
    <v-spacer></v-spacer>
    <v-flex xs7 sm8 md8>
      <v-text-field
        single-line
        solo
        suffix
        label="Búsqueda"
        v-model="dni"
        :rules="dniRules"
        :counter="15"
        v-on:keypress.enter.prevent="Search"
        append-icon="search"
        required
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        dnitype: null,
        dnitypeRules: [
          (v) => !!v || 'Tipo de documento requerido'
        ],
        dnitypes: [
          {value: 'dni', text: 'Cédula/RUC/Pasaporte'},
          {value: 'contract', text: 'Número de contrato'},
          {value: 'smartcard', text: 'Smartcard'}
        ],
        dni: '1703729689',
        dniRules: [
          (v) => !!v || 'Número de identificacíon requerida',
          (v) => v && v.length >= 6 || 'No puede tener menos de 6 caracteres',
          (v) => v.length <= 15 || 'No puede tener mas de 15 caracteres',
          (v) => !/\D/.test(v) || 'Solo se permiten números'
        ]
      }
    },
    computed: {
      formisValid () {
        return this.dni !== '' &&
          this.dnitype !== '' &&
          this.dni.length >= 6 &&
          this.dni.length <= 15 &&
          !/\D/.test(this.dni)
      }
    },
    methods: {
      Search: function () {
        if (!this.formisValid) {
          return
        }
        const searchData = {
          dni: this.dni,
          dnitype: this.dnitype,
          date: new Date()
        }
        this.$store.dispatch('getCustomer', searchData)
        let customer = this.$store.getters.customer
        if (!customer) {
          customer = null
        }
        this.$emit('customer', customer)
      }
    }
  }
</script>
