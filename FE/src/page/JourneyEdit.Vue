<style lang="less" scoped>
.JourneyEdit{

}
</style>

<template>
<div class="JourneyEdit">
  <mu-sub-header>新增行程</mu-sub-header>
  <mu-content-block>
    行程名称<mu-text-field v-model="name" hintText="行程名称" type="text"/><br/>

    电话号码<mu-text-field v-model="tel" hintText="电话号码" type="number"/><br/>

    出发时间<mu-date-picker v-model="goDate" hintText="出发时间"/> <br/>

    返回时间<mu-date-picker v-model="backDate" hintText="返回时间"/> <br/>

    预订截止时间<mu-date-picker v-model="stopDate" hintText="预订截止时间"/> <br/>

    行程说明<mu-text-field v-model="discription" hintText="行程说明" multiLine :rows="3" :rowsMax="6"/><br/>

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
  name: 'JourneyEdit',
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
      this.$store.dispatch('addJourney', {
        name: this.name,
        tel: this.tel,
        goDate: this.goDate,
        backDate: this.backDate,
        stopDate: this.stopDate,
        discription: this.discription,
        callback:  (res) => {
          if (res.data.status === 0) {
            this.$router.push('/publishedList')
          }
        }
      })
    },
    back() {
      this.$router.push('/')
    }
  }
}
</script>
