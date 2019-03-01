<template>
  <div class="app">
    <mu-appbar title="WCB">
      <!-- <mu-icon-button v-show="route.name !== 'Login'" icon="menu" slot="left"/> -->
    </mu-appbar>
    <div class="content">
      <router-view></router-view>
    </div>
    <mu-paper class="paper-bottom" v-show="route.name !== 'Login'">
      <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
        <mu-bottom-nav-item value="movies" title="Movies" icon="ondemand_video"/>
        <mu-bottom-nav-item value="music" title="Music" icon="music_note"/>
        <mu-bottom-nav-item value="books" title="Books" icon="books"/>
        <mu-bottom-nav-item value="pictures" title="Pictures" icon="photo"/>
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
      bottomNav: 'movies'
    }
  },
  computed: {
    ...mapState(['route'])
  },
  methods: {
    handleChange (val) {
      this.bottomNav = val
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
