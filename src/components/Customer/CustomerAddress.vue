<template>
  <v-card ref="form">
    <v-card-text>
      <v-container grid-list-md>
        <v-layout row wrap>
          <!-- <v-flex xs12 sm5>
            <v-select
              label="Tipo de dirección"
              v-model="addressType"
              chips
              combobox
              :items="addressTypes"
              item-value="value"
              :disabled="disableFields"
              required
            ></v-select>
          </v-flex>  -->
          <v-spacer></v-spacer>
          <v-flex xs12 sm12>
            <v-select
              label="Tipo de vivienda"
              v-model="houseType"
              chips
              combobox
              :items="houseTypes"
              item-value="value"
              :disabled="disableFields"
              required
            ></v-select>
          </v-flex>
          <v-flex xs12 sm12>
            <v-select
              label="Ciudad"
              autocomplete
              cache-items
              :items="cities"
              :rules="cityRules"
              :search-input.sync="searchCity"
              v-model="city"
              :disabled="disableFields"
              required
            ></v-select>
          </v-flex>
          <v-flex xs12 sm5>
            <v-select
              label="Calle Principal"
              autocomplete
              cache-items
              :items="streets"
              :rules="streetRules"
              :search-input.sync="searchStreet"
              v-model="street"
              :disabled="disableFields"
              required
            ></v-select>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs12 sm6>
            <v-text-field
              label="Número"
              v-model="numStreet"
              :rules="numStreetRules"
              :disabled="disableFields"
              required>
            </v-text-field>
          </v-flex>
          <v-flex xs12 sm12>
            <v-select
              label="Calle Secundaria"
              autocomplete
              cache-items
              :items="intersections"
              :disabled="disableFields"
              :rules="intersectionRules"
              :search-input.sync="searchIntersection"
              v-model="intersection"
              required
            ></v-select>
          </v-flex>
          <v-flex xs12 sm12>
            <v-text-field
              label="Referencia"
              v-model="ref"
              :rules="refRules"
              multi-line
              :counter="200"
              :disabled="disableFields"
              required>
            </v-text-field>
          </v-flex>
           <v-flex xs12 md6>
            <v-card flat>
              <v-card-text>
                <v-switch
                  :label="`Copiar Default a Billing: ${copyDefToBill == true ? 'Si' : 'No'}`"
                  v-model="copyDefToBill"
                  :disabled="disableFields"
                ></v-switch>
              </v-card-text>
            </v-card>
          </v-flex> 
         </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-flex xs12 sm12>
        <div class="text-xs-center">
          <v-btn
            class="primary">
            Normalizar
          </v-btn>
        </div>
      </v-flex>
    </v-card-actions>
  </v-card>
</template>

<script>
/*eslint-disable*/ //trabulacion de desactivacion de validacion 
import axios from 'axios'
export default {
    props: ['customerAddress'],
    data () {
      return {
        disableFields: true,
        copyDefToBill: false,
        // addressType: null,
        // addressTypes: [
        // {value: 'default', text: 'Default'},
        // {value: 'billing', text: 'Billing'}
        // ],
        houseType: null,
        houseTypes: [
          {value: 'domicilio', text: 'Domicilio'},
          {value: 'vacacional', text: 'Vacacional'}
        ],
        cities: [],
        searchCity: null,
        streets: [],
        searchStreet: null,
        intersections: [],
        searchIntersection: null,
        city: '',
        cityRules: [
          (v) => !!v || 'Ciudad es requerida',
          (v) => v && v.length <= 100 || 'Debe tener 100 caracteres máximo',
          (v) => v.length > 0 || 'Elije la ciudad del cliente'
        ],
        street: '',
        streetRules: [
          (v) => !!v || 'Calle principal es requerida',
          (v) => v && v.length <= 100 || 'Debe tener 100 caracteres máximo'
        ],
        numStreet: '',
        numStreetRules: [
          (v) => !!v || 'Numero de calle es requerido',
          (v) => v && v.length <= 20 || 'Debe tener 20 caracteres máximo'
        ],
        intersection: '',
        intersectionRules: [
          (v) => !!v || 'Calle secundaria es requerida',
          (v) => v && v.length <= 100 || 'Debe tener 100 caracteres máximo'
        ],
        ref: '',
        refRules: [
          (v) => !!v || 'Referencia es requerida',
          (v) => v && v.length <= 200 || 'Debe tener 200 caracteres máximo'
        ],
        dialogLocation: false,
        dialogInformation: {
          country: '',
          city: '',
          state: '',
          subCity: '',
          subCityOut: '',
          townShip: '',
          neighborhood: '',
          address: '',
          postalCode: ''
        }
      }
    },
    watch: {
      searchCity (val) {
        val && this.querySelectionCity(val)
      },
      searchStreet (val) {
        val && this.querySelectionStreet(val)
      },
      searchIntersection (val) {
        val && this.querySelectionIntersection(val)
      },
      customerAddress: function () {
        this.disableFields = false
       // this.addressType = this.customerAddress.addressType
        this.houseType = this.customerAddress.houseType
        this.city = this.customerAddress.city
        this.cities.push(this.customerAddress.city)
        this.street = this.customerAddress.street
        this.streets.push(this.customerAddress.street)
        this.numStreet = this.customerAddress.numStreet
        this.intersections.push(this.customerAddress.intersection)
        this.intersection = this.customerAddress.intersection
        this.ref = this.customerAddress.ref
      }
    },
    methods: {
      querySelectionCity (city) {
        const _url = 'https://ws.api.location-world.com/Location.ashx?token='
        const _token = '8008DC45EF07DEF012A39B88F5DDDCEF74E80FF0'
        const result = []
        this.loading = true
        setTimeout(() => {
          axios.get(_url + _token + '&function=SuggestCities&prefix=' + city + '&type_strict=any&all_types=false&country=Ecuador')
            .then(({data}) => {
              for (let i = 0; i < data.result.length; i++) {
                result.push(data.result[i].name)
              }
            })
          this.loading = false
          this.cities = result
        }, 200)
      },
      querySelectionStreet (street) {
        const _url = 'https://ws.api.location-world.com/Location.ashx?token='
        const _token = '8008DC45EF07DEF012A39B88F5DDDCEF74E80FF0'
        const result = []

        setTimeout(() => {
          axios.get(_url + _token + '&function=SuggestStreetsCity&prefix=' + street + '&type_strict=any&all_types=false&country=Ecuador&city=' + this.city)
            .then(({data}) => {
              for (let i = 0; i < data.result.length; i++) {
                result.push(data.result[i].StreetName)
              }
            })
          this.streets = result
        }, 200)
      },
      querySelectionIntersection (intersection) {
        const _url = 'https://ws.api.location-world.com/Location.ashx?token='
        const _token = '8008DC45EF07DEF012A39B88F5DDDCEF74E80FF0'
        const result = []

        setTimeout(() => {
          axios.get(_url + _token + '&function=SuggestIntersections&prefix=' + intersection + '&type_strict=any&all_types=false&country=Ecuador&city=' + this.city + '&street=' + this.street)
            .then(({data}) => {
              for (let i = 0; i < data.result.length; i++) {
                result.push(data.result[i].name)
              }
            })
          this.intersections = result
        }, 200)
      },
      normaliceLocation () {
        this.dialogLocation = true
        const _url = 'https://ws.api.location-world.com/Location.ashx?'
        const _token = '8008DC45EF07DEF012A39B88F5DDDCEF74E80FF0'
        setTimeout(() => {
          axios.get(_url + 'function=GeocodeAddress&country=Ecuador&city=' + (this.city !== undefined ? this.city : '') + '&street=' + (this.street !== undefined ? this.street : '') + '&intersection=' + (this.intersection !== undefined ? this.intersection : '') + '&token=' + _token)
            .then(({data}) => {
              this.getExtendedLocation(data.Coordinates.Longitude, data.Coordinates.Latitude)
            })
        }, 200)
      },
      getExtendedLocation (longitude, latitude) {
        const _url = 'https://ws.api.location-world.com/Location.ashx?token='
        const _token = '8008DC45EF07DEF012A39B88F5DDDCEF74E80FF0'
        setTimeout(() => {
          axios.get(_url + _token + '&function=ReverseGeocode&longitude=' + longitude + '&latitude=' + latitude)
            .then(({data}) => {
              console.log(data)
              this.dialogInformation = {
                country: data.Country,
                city: data.City,
                state: data.State,
                subCity: data.SubCity,
                subCityOut: data.SubCityOut,
                townShip: data.Township,
                neighborhood: data.Neighborhood,
                address: data.Address,
                postalCode: data.PostalCode
              }
            })
        }, 200)
      }
    }
  }
</script>
