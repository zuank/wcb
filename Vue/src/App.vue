<template>
  <div class="app">
    <mu-appbar style="width: 100%;" title="WCB"></mu-appbar>
    <div class="content">
      <router-view></router-view>
    </div>
    <mu-paper class="paper-bottom" v-show="route.name !== 'Login'">
      <mu-bottom-nav :value="route.name" shift @change="handleChange">
        <mu-bottom-nav-item value="JourneyList" title="ALL JOURNEY" icon="view_list"/>
        <mu-bottom-nav-item value="journeyAdd" title="ADD JOURNEY" icon="playlist_add"/>
        <mu-bottom-nav-item value="person" title="MY" icon="person"/>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'App',
  data(){
    return {
      bottomNav: ''
    }
  },
  computed: {
    ...mapState(['route'])
  },
  methods: {
    handleChange (val) {
      this.$router.push({
        name: val
      })
    }
  },
  created() {
    this.$store.dispatch('getUserInfo');
  }
}
</script>

<style lang="less" scoped>
.app {
  .mu-appbar {
    text-align: center;
    position: fixed;
    top: 0;
  }
  .content {
    overflow: auto;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 56px 0;
  }
  .paper-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
