<style lang="less" scoped>
</style>

<template>
  <div class="JourneyEdit">
    <mu-container>
      <mu-text-field fullWidth
                     v-model="name"
                     label="行程名称"
                     type="text" />

      <mu-text-field fullWidth
                     v-model="tel"
                     label="电话号码"
                     type="number" />

      <mu-date-input fullWidth
                     v-model="goDate"
                     label="出发时间" />

      <mu-date-input fullWidth
                     v-model="backDate"
                     label="返回时间" />

      <mu-date-input fullWidth
                     v-model="stopDate"
                     type="dateTime"
                     label-float
                     full-width
                     landscape
                     label="预订截止时间" />

      <mu-text-field fullWidth
                     v-model="discription"
                     label="行程说明"
                     multiLine
                     :rows="3"
                     :rowsMax="6" />

      <p style="text-align: center;">
        <mu-button color="primary"
                   @click="toPublish"
                   secondary>发布</mu-button>
        <mu-button color="primary"
                   @click="back"
                   secondary>取消</mu-button>
      </p>
    </mu-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'journeyEdit',
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
    toPublish() {
      this.$http
        .post('/api/journey', {
          name: this.name,
          tel: this.tel,
          goDate: this.goDate,
          backDate: this.backDate,
          stopDate: this.stopDate,
          discription: this.discription
        })
        .then(response => {
          if (response.data.status === 0) {
            this.$toast.success('操作成功')
            this.$router.push({
              name: 'JourneyList'
            })
          }
        })
    },
    back() {
      this.$router.push('/')
    }
  },
  created() {
    console.log(this)
  }
}
</script>
