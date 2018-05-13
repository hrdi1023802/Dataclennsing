import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store(
  {
    /*eslint-disable*/ //trabulacion de desactivacion de validacion
    state: {
      customer : {
        id: '',
        dnitype: 'Cédula/RUC/Pasaporte',
        contract: '',
        addresses: []
      }
    },
    mutations: {
      /*eslint-disable*/ //trabulacion de desactivacion de validacion
      CLEAR_CUSTOMER(state, customer) {
        state.customer.id = '';
        state.customer.contract = '';
        state.customer.addresses.length = 0;
      },
      FETCH_CUSTOMER(state, customer) {
      state.customer.id = customer.Subcriber_id;
      state.customer.contract = customer.addresses[0].referenceNumber;

      state.customer.addresses.length = 0;
      customer.addresses.forEach(function (address, index) {
        var address = {
          name: address.first_name,
          lastName: address.last_name,
          birthDate: address.birth,
          gender: '',
          contract: customer.Subcriber_id,
          addressType: '',
          houseType: '',
          city: address.Canton,
          street: address.street,
          numStreet: '',
          intersection: ' ',
          ref: ' ',
          email: address.mail,
          cellphone: address.phone1,
          officephone: '',
          housephone: '',
          fax:'',
          lastUpdate: address.upgrade,
          contractType: customer.type_bussines
        }
        state.customer.addresses.push(address);
      });
      }
    },
    actions: {
      /*eslint-disable*/ //trabulacion de desactivacion de validacion
      getCustomer({ commit }, data) {
        const urls = 'http://localhost:62685/api/GetSubscribersByReferenceNumber/';
        axios
          .get(urls + data.dni)
          .then(response => {
            commit('FETCH_CUSTOMER', response.data)
          })
          .catch(error => {
            commit('CLEAR_CUSTOMER', {})
          })
      }
    },
    getters: {
      customer: state => state.customer,
      getCustomer: state => () => state.customer
    }
  }
)