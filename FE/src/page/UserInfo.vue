<style lang="less" scoped>
.login{
  margin-top: 20px;
  text-align: center;
}
</style>

<template>
<div class="login">
  <div class="form">
    <mu-text-field v-model="userName" label="用户名" labelFloat/><br/>
    <mu-text-field v-model="password" label="密码" type="password" labelFloat/><br/>
    <mu-raised-button label="登录" @click="goLogin" secondary/>
    <mu-raised-button label="注册" @click="goReg" secondary/>
  </div>

</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'UserInfo',
  data(){
    return {
      userName:'',
      password:''
    }
  },
  computed: {
    ...mapState(['route'])
  },
  methods: {
    goLogin() {
      this.$store.dispatch('login',{
        userName: this.userName,
        password: this.password,
        callback: (res) => {
          this.$router.push('publishedList')
        }
      })
    },
    goReg(){
      this.$store.dispatch('reg',{
        userName: this.userName,
        password: this.password,
        callback: (res) => {
          
        }
      })
    }
  }
}
</script>
