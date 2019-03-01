<style lang="less" scoped>
  .login {
    margin-top: 20px;
    text-align: center;
  }
</style>

<template>
  <div class="login">
    <div class="form">
      <mu-text-field v-model="userName" label="用户名" labelFloat/>
      <br/>
      <mu-text-field v-model="password" label="密码" type="password" labelFloat/>
      <br/>
      <mu-raised-button label="登录" @click="goLogin" secondary/>
      <mu-raised-button label="注册" @click="goReg" secondary/>
    </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        userName: '',
        password: ''
      }
    },
    computed: {
      ...mapState(['route','user'])
    },
    created(){
      if (this.user.userId) {
        this.$router.push({
          name: 'JourneyList'
        })
      }
    },
    methods: {
      goLogin() {
        this.$http.post('/api/login', {
          userName: this.userName,
          password: this.password,
        }).then(response => {
          if (response.data.status === 0) {
            this.$toast.success('登录成功');
            this.$router.push('publishedList');
          }
        }, response => {
          // error callback
        })
      },
      goReg() {
        this.$http.post('/api/reg', {
          userName: this.userName,
          password: this.password,
        }).then(response => {
          if (response.data.status === 0) {
            this.$toast.success('注册成功');
          }
        }, response => {
          // error callback
        })
      }
    }
  }
</script>
