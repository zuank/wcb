<style lang="less" scoped>
.JourneyEdit{

}
</style>

<template>
<div class="JourneyEdit">
  <mu-sub-header>新增行程</mu-sub-header>
  <mu-content-block>
    <mu-text-field fullWidth v-model="name" label="行程名称" hintText="行程名称" type="text"/>

    <mu-text-field fullWidth v-model="tel" label="电话号码" hintText="电话号码" type="number"/>

    <mu-date-picker fullWidth v-model="goDate" label="出发时间" hintText="出发时间"/>

    <mu-date-picker fullWidth v-model="backDate" label="返回时间" hintText="返回时间"/>

    <mu-date-picker fullWidth v-model="stopDate" label="预订截止时间" hintText="预订截止时间"/>

    <mu-text-field fullWidth v-model="discription" label="行程说明" hintText="行程说明" multiLine :rows="3" :rowsMax="6"/>

    <p style="text-align: center;">
      <mu-raised-button label="发布" @click="toPublish" secondary/>
      <mu-raised-button label="取消" @click="back" secondary/>
    </p>
  </mu-content-block>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'journeyEdit',
  data(){
    return {
      name:'',
      tel:'',
      goDate:'',
      backDate:'',
      stopDate:'',
      discription:''
    }
  },
  computed: {
    ...mapState(['route'])
  },
  methods: {
    toPublish(){
      this.$http.post('/api/journey', {
        name: this.name,
        tel: this.tel,
        goDate: this.goDate,
        backDate: this.backDate,
        stopDate: this.stopDate,
        discription: this.discription,
      }).then(response => {
        if (response.data.status === 0) {
          this.$toast.success('操作成功');
          this.$router.push({
            name:'JourneyList',
          })
        }
      }, response => {
        // error callback
      })
    },
    back() {
      this.$router.push('/')
    }
  }
}
</script>
