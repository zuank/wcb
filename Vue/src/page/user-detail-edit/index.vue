<template>
    <mu-container>
        <mu-text-field fullWidth
                       v-model="userInfo.userName"
                       label="昵称"
                       type="text" />
        <mu-text-field fullWidth
                       v-model="userInfo.tel"
                       label="手机号"
                       type="text" />
        <mu-text-field fullWidth
                       v-model="userInfo.discription"
                       label="个人简介"
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
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'user-detail-edit',
    data(){
        return{
            userInfo:{}
        }
    },
    computed: {
        ...mapState(['route', 'user'])
    },
    watch:{
        'user':function(value){
            this.userInfo = {...value}
        }
    },
    mounted(){
        this.userInfo = {...this.user}
    },
    methods:{
        toPublish(){
            this.$http.post('/api/user/update',this.userInfo).then(response => {
                if (response.data.status === 0){
                    this.$store.commit('UPDATE_USER_INFO', response.data.result);
                    this.$toast.success('更新成功')
                } else {
                    this.$toast.success(response.data.error)
                }
              
            })
        },
        back(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
</style>
