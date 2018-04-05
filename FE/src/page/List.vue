<style lang="less" scoped>
.List {

}
</style>

<template>
<div class="List">
  <mu-list>
    <mu-sub-header>今天</mu-sub-header>
    <template v-for="(item, index) in journeyList">
      <mu-list-item :title="item.name" :key="index" @click="journeyInfo(item._id)">
        <mu-avatar src="/images/avatar1.jpg" slot="leftAvatar"/>
        <span slot="describe" >
          <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> {{item.discription}}
        </span>
        <mu-icon-menu slot="right" icon="more_vert" tooltip="操作">
          <mu-menu-item title="查看" />
          <mu-menu-item title="收藏" />
        </mu-icon-menu>
      </mu-list-item>
      <mu-divider inset/>
    </template>
  </mu-list>
  <mu-infinite-scroll :scroller="scroller" :loading="loading" loadingText='加载中...'/>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'List',
  created() {
    // this.$store.dispatch('getJourneys')
    this.$store.dispatch('getUserInfo')
  },
  data(){
    return {
      loading: true,
      scroller: null
    }
  },
  mounted () {
    this.scroller = this.$el
  },
  computed: {
    ...mapState(['route', 'journey', 'user']),
    journeyList:function(){
      return this.journey.publishedList
    }
  },
  methods: {
    journeyInfo (id) {
      this.$router.push(`/journeyInfo/${id}`)
    }
  }
}
</script>
