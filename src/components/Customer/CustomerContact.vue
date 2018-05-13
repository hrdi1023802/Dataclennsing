<template>
  <v-card ref="form">
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 sm12>
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              :disabled="disableFields"
              required>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field
              label="Celular"
              v-model="cellphone"
              :rules="cellphoneRules"
              :counter="15"
              :disabled="disableFields"
              required>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field
              label="Trabajo"
              v-model="officephone"
              :rules="officephoneRules"
              :counter="15"
              :disabled="disableFields"
              required>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field
              label="Domicilio"
              v-model="housephone"
              :rules="housephoneRules"
              :counter="15"
              :disabled="disableFields"
              required>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field
              label="Fax"
              v-model="fax"
              :rules="faxRules"
              :disabled="disableFields"
              :counter="50">
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: ['customerContact'],
    data () {
      return {
        disableFields: true,
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail es requerido',
          (v) => /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Debe ser un E-mail válido'
        ],
        cellphone: '',
        cellphoneRules: [
          (v) => !!v || 'Celular es requerido',
          (v) => v && v.length <= 15 || 'Debe tener 15 caracteres máximo',
          (v) => !/\D/.test(v) || 'Solo se permiten números'
        ],
        officephone: '',
        officephoneRules: [
          (v) => !!v || 'Número de teléfono de trabajo es requerido',
          (v) => v && v.length <= 15 || 'Debe tener 15 caracteres máximo',
          (v) => !/\D/.test(v) || 'Solo se permiten números'
        ],
        housephone: '',
        housephoneRules: [
          (v) => !!v || 'Número de teléfono de domicilio es requerido',
          (v) => v && v.length <= 15 || 'Debe tener 15 caracteres máximo',
          (v) => !/\D/.test(v) || 'Solo se permiten números'
        ],
        fax: '',
        faxRules: [
          (v) => !!v || 'Número de teléfono de fax es requerido',
          (v) => v && v.length <= 50 || 'Debe tener 50 caracteres máximo',
          (v) => !/\D/.test(v) || 'Solo se permiten números'
        ]
      }
    },
    watch: {
      customerContact: function () {
        this.disableFields = false
        this.email = this.customerContact.email
        this.cellphone = this.customerContact.cellphone
        this.officephone = this.customerContact.officephone
        this.housephone = this.customerContact.housephone
        this.fax = this.customerContact.fax
      }
    }
  }
</script>
