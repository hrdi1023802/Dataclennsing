<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-flex xs12 sm10 md8 lg6>
        <v-card ref="form">
          <v-card-title>
            <p class="title">Iniciar Sesión</p>
          </v-card-title>
          <v-card-text>
            <v-text-field
              name="username"
              label="Usuario"
              id="username"
              :rules="usernameRules"
              v-model="username"
              required
            >
            </v-text-field>
            <v-text-field
              name="password"
              label="Contraseña"
              id="password"
              type="password"
              :rules="passwordRules"
              v-model="password"
              :keypress.enter.prevent="Signin"
              required
            ></v-text-field>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              class="primary"
              :disabled="!formisValid"
              type="submit"
              @click="Signin()"
            >
              Iniciar Sesión
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        username: '',
        usernameRules: [
          (v) => !!v || 'Usuario es requerida'
        ],
        password: '',
        passwordRules: [
          (v) => !!v || 'Contraseña es requerida'
        ]
      }
    },
    computed: {
      formisValid () {
        return this.password !== '' && this.username !== ''
      }
    },
    methods: {
      Signin: function () {
        if (!this.formisValid) {
          return
        }
        const signinData = {
          username: this.username,
          password: this.password,
          date: new Date()
        }
        console.log('sign in data: ', signinData)
        this.$router.push('customerSearch')
      }
    }
  }
</script>
