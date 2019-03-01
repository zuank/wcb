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
  <!--<mu-infinite-scroll :scroller="scroller" :loading="loading" loadingText='加载中...' @load="loadMore"/>-->
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'list',
  created() {
    this.getList();
  },
  data(){
    return {
      loading: false,
      scroller: null,
      journeyList: []
    }
  },
  mounted () {
    this.scroller = this.$el
  },
  computed: {
    ...mapState(['route', 'user']),
  },
  methods: {
    journeyInfo (id) {
      this.$router.push({
        name:'JourneyInfo',
        params:{
          id
        }
      })
    },
    getList(){
      this.$http.get('/api/journeys').then(response => {
        if (response.data.status === 0) {
          this.journeyList = response.data.list;
        }
      }, response => {
        // error callback
      })
    },
    loadMore() {
      this.loading = true
    }
  }
}
</script>
