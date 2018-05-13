<template>
  <v-card ref="form">
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 sm5 class="text-xs-center text-sm-right">
            <v-text-field
              label="Nombres"
              v-model="name"
              :rules="nameRules"
              :disabled="disableFields"
              :counter="50">
              required>
            </v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6 class="text-xs-center text-sm-left">
            <v-text-field
              label="Apellidos"
              v-model="lastName"
              :rules="lastNameRules"
              :disabled="disableFields"
              :counter="50"
              required>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm5>
            <v-menu
              lazy
              :close-on-content-click="false"
              v-model="menu"
              transition="scale-transition"
              offset-y
              full-width
              :nudge-right="40"
              max-width="290px"
              min-width="290px"
              :disabled="disableFields"
            >
              <v-text-field
                slot="activator"
                label="Fecha de nacimiento"
                v-model="birthDate"
                :rules="birthDateRules"
                prepend-icon="event"
                :disabled="disableFields"
                readonly
              ></v-text-field>
              <v-date-picker v-model="birthDate" no-title scrollable actions>
                <template slot-scope="{ save, cancel }">
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="cancel">Cancelar</v-btn>
                    <v-btn flat color="primary" @click="save">Aceptar</v-btn>
                  </v-card-actions>
                </template>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6>
            <v-select
              label="Género"
              v-model="gender"
              :items="genders"
              item-value="value"
              :disabled="disableFields"
              required
            ></v-select>
          </v-flex>
         <v-spacer></v-spacer>
 <v-flex xs12 sm5 class="text-xs-center text-sm-right">
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              :disabled="disableFields"
              required>
            </v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6 class="text-xs-center text-sm-left">
            <v-text-field
              label="Celular"
              v-model="cellphone"
              :rules="cellphoneRules"
              :counter="15"
              :disabled="disableFields"
              required>
            </v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm5 class="text-xs-center text-sm-right">
            <v-text-field
              label="Trabajo"
              v-model="officephone"
              :rules="officephoneRules"
              :counter="15"
              :disabled="disableFields"
              required>
            </v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6 class="text-xs-center text-sm-left">
            <v-text-field
              label="Domicilio"
              v-model="housephone"
              :rules="housephoneRules"
              :counter="15"
              :disabled="disableFields"
              required>
            </v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm5 class="text-xs-center text-sm-right">
            <v-text-field
              label="Fax"
              v-model="fax"
              :rules="faxRules"
              :disabled="disableFields"
              :counter="50">
            </v-text-field>
          </v-flex>
         <v-spacer></v-spacer>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
/*eslint-disable*/ //trabulacion de desactivacion de validacion 
export default {
  props: ["customerInfo"],
   data() {
    return {
      disableFields: true,
      name: "",
      email: "",
      nameRules: [
        v => !!v || "Nombre es requerido",
        v => (v && v.length <= 50) || "Debe tener 50 caracteres máximo"
      ],
      lastName: "",
      lastNameRules: [
        v => !!v || "Apellido es requerido",
        v => (v && v.length <= 50) || "Debe tener 50 caracteres máximo"
      ],
      menu: false,
      birthDate: null,
      birthDateRules: [v => !!v || "Fecha de nacimiento es requerida"],
      gender: null,
      genders: [
        { value: "m", text: "Masculino" },
        { value: "f", text: "Femenino" }
      ],
      emailRules: [
        v => !!v || "E-mail es requerido",
        v =>
          /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Debe ser un E-mail válido"
      ],
      cellphone: "",
      cellphoneRules: [
        v => !!v || "Celular es requerido",
        v => (v && v.length <= 15) || "Debe tener 15 caracteres máximo",
        v => !/\D/.test(v) || "Solo se permiten números"
      ],
      officephone: "",
      officephoneRules: [
        v => !!v || "Número de teléfono de trabajo es requerido",
        v => (v && v.length <= 15) || "Debe tener 15 caracteres máximo",
        v => !/\D/.test(v) || "Solo se permiten números"
      ],
      housephone: "",
      housephoneRules: [
        v => !!v || "Número de teléfono de domicilio es requerido",
        v => (v && v.length <= 15) || "Debe tener 15 caracteres máximo",
        v => !/\D/.test(v) || "Solo se permiten números"
      ],
      fax: "",
      faxRules: [
        v => !!v || "Número de teléfono de fax es requerido",
        v => (v && v.length <= 50) || "Debe tener 50 caracteres máximo",
        v => !/\D/.test(v) || "Solo se permiten números"
      ]
    };
  },
  watch: {
    customerInfo: function() {
      if (this.customerInfo) {
        this.disableFields = false;
        this.name = this.customerInfo.name;
        this.lastName = this.customerInfo.lastName;
        this.birthDate = this.customerInfo.birthDate;
        this.email = this.customerInfo.email;
        this.cellphone = this.customerInfo.cellphone;
        this.officephone = this.customerInfo.officephone;
        this.housephone = this.customerInfo.housephone;
        this.fax = this.customerInfo.fax;
        this.gender = this.customerInfo.gender;
        
      }
    }
    
  }
};
</script>
