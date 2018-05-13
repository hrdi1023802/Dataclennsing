<template>
  <v-app light>
    <v-navigation-drawer
      class="hidden-md-and-up"
      fixed
      v-model="sideNav"
      >
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>
              {{item.icon}}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="primary" dark>
      <v-toolbar-side-icon class="hidden-md-and-up" @click.stop="sideNav = !sideNav">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{title}}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view>
      </router-view>
    </v-content>
    <v-footer>
      <v-spacer></v-spacer>
      2017
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        title: 'DevBrain',
        sideNav: false,
        menuItems: [
//          {icon: 'face', title: 'Registrarse', link: '/signup'},
//          {icon: 'lock_open', title: 'Iniciar Sesión', link: '/signin'},
//          {icon: 'supervisor_account', title: 'Supervisor', link: '/user'},
//          {icon: 'settings_applications', title: 'Configuración', link: '/settings'}
        ]
      }
    }
  }
</script>
