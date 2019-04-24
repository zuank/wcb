<style lang="less" scoped>
.List {
}
</style>

<template>
  <div class="List">
    <mu-list textline="two-line">
      <template v-for="(item, index) in journeyList">
        <mu-list-item avatar
                      :ripple="false"
                      button
                      :key="item._id">
          <mu-list-item-content @click="journeyInfo(item._id)">
            <mu-list-item-title>{{item.name}}</mu-list-item-title>
            <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)">{{item.userName}}</mu-list-item-sub-title>
            <mu-list-item-sub-title>
              {{item.direction}}
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-list-item-after-text>15 min</mu-list-item-after-text>
            <mu-checkbox color="yellow700"
                         v-model="selects"
                         value="value1"
                         uncheck-icon="star_border"
                         checked-icon="star"></mu-checkbox>
          </mu-list-item-action>
        </mu-list-item>
        <mu-divider :key="index"></mu-divider>
      </template>
    </mu-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'list',
  created() {
    this.getList()
  },
  data() {
    return {
      loading: false,
      scroller: null,
      journeyList: [],
      selects: []
    }
  },
  mounted() {
    this.scroller = this.$el
  },
  computed: {
    ...mapState(['route', 'user'])
  },
  methods: {
    journeyInfo(id) {
      this.$router.push({
        name: 'JourneyInfo',
        params: {
          id
        }
      })
    },
    getList() {
      this.$http.get('/api/journeys').then(
        response => {
          if (response.data.status === 0) {
            this.journeyList = response.data.list
          }
        },
        response => {
          // error callback
        }
      )
    },
    loadMore() {
      this.loading = true
    }
  }
}
</script>
