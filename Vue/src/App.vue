<template>
  <div class="app">
    <mu-flex justify-content="center">
      <div class="content">
        <mu-appbar color="primary">
          <mu-button icon
                     slot="left"
                     @click="open=true">
            <mu-icon value="menu"></mu-icon>
          </mu-button>
          {{route.meta.title}}
        </mu-appbar>
        <router-view></router-view>
      </div>
    </mu-flex>
    <!--悬浮菜单栏-->
    <mu-drawer :open.sync="open"
               :docked="docked">
      <mu-list>
        <mu-list-item button
                      v-for="(item,index) in routerList"
                      v-if="checkMendShow(item)"
                      @click="jump(item)"
                      :key="index">
          <mu-list-item-action>
            <mu-icon :value="item.meta.icon"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>{{item.meta.title}}</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      open: false,
      docked: false
    }
  },
  computed: {
    ...mapState(['route', 'user']),
    routerList: {
      get() {
        if (this.route) {
          return this.$router.options.routes[0].children
        }
        return []
      }
    }
  },
  methods: {
    // 菜单展示逻辑
    checkMendShow(route) {
      if (route.meta.show) {
        if (route.meta.needLogin && !this.user.userId) {
          return false
        }
        return true
      }
      return false
    },
    jump(route) {
      this.open = false
      this.$router.push(route)
    }
  },
  created() {
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  min-height: 100%;
}
</style>
