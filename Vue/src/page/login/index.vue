<style lang="less" scoped>
.login {
  margin-top: 20px;
  text-align: center;
}
</style>

<template>
    <div class="login">
        <div class="form">
            <mu-text-field v-model="userName"
                           label="用户名"
                           labelFloat />
            <br />
            <mu-text-field v-model="password"
                           label="密码"
                           type="password"
                           labelFloat />
            <br />
            <mu-button color="primary"
                       @click="goLogin">登录</mu-button>
            <mu-button color="primary"
                       @click="goReg">注册</mu-button>
        </div>

    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'login',
    data() {
        return {
            userName: '',
            password: ''
        }
    },
    computed: {
        ...mapState(['route', 'user'])
    },
    watch: {
        user: function() {
            this.watchUser()
        }
    },
    mounted() {
        this.watchUser()
    },
    methods: {
        watchUser() {
            if (this.user.userId) {
                this.$router.push({
                    name: 'JourneyList'
                })
            }
        },
        goLogin() {
            this.$http
                .post('/api/login', {
                    userName: this.userName,
                    password: this.password
                })
                .then(
                    response => {
                        if (response.data.status === 0) {
                            // 获取用户信息
                            this.$store.dispatch('getUserInfo')
                            this.$toast.success('登录成功')
                            this.$router.push('journey-list')
                        }
                    },
                    response => {
                        // error callback
                    }
                )
        },
        goReg() {
            this.$http
                .post('/api/reg', {
                    userName: this.userName,
                    password: this.password
                })
                .then(
                    response => {
                        if (response.data.status === 0) {
                            this.$toast.success('注册成功')
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
