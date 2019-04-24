<style lang="less" scoped>
.JourneyEdit {
}
</style>

<template>
  <div class="JourneyEdit">
    <mu-card>
      <mu-card-header title="Myron Avatar"
                      subTitle="sub title">
        <mu-avatar src="/images/uicon.jpg"
                   slot="avatar" />
      </mu-card-header>
      <!-- <mu-card-media title="Image Title" subTitle="Image Sub Title">
      <img src="/images/sun.jpg" />
    </mu-card-media> -->
      <mu-card-title :title="name"
                     :subTitle="tel" />
      <mu-card-text>
        <p>
          出发时间:{{goDate}}
        </p>
        <p>
          返回时间:{{backDate}}
        </p>
        <p>
          预订截止时间:{{stopDate}}
        </p>

        {{discription}}
      </mu-card-text>
      <mu-card-actions>
        <mu-button color="primary"
                   @click="updateJourneyInfo">加入</mu-button>
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'journey-info',
  created() {
    this.getJourneyInfo()
  },
  data() {
    return {
      name: '',
      tel: '',
      goDate: '',
      backDate: '',
      stopDate: '',
      discription: ''
    }
  },
  computed: {
    ...mapState(['route'])
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    getJourneyInfo() {
      this.$http.get(`/api/journey/${this.route.params.id}`).then(
        response => {
          if (response.data.status === 0) {
            Object.assign(this, response.data.result)
          }
        },
        response => {
          // error callback
        }
      )
    },

    updateJourneyInfo() {
      this.$http.put(`/api/joinJourney/${this.route.params.id}`).then(
        response => {
          if (response.data.status === 0) {
            this.getJourneyInfo()
          }
        },
        response => {
          // error callback
        }
      )
    }
  }
}
</script>
