<style lang="less" scoped>
  .user-detail{
    margin-top: 20px;
  }
</style>
<style lang="less">
  .user-detail .mu-avatar {
    background: #fff;
  }
</style>

<template>
<div class="user-detail">
  <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
    <mu-card-header :title="user.userName" sub-title="">
      <mu-avatar slot="avatar">
        <mu-icon size="46" value="info" color="blue"></mu-icon>
      </mu-avatar>
    </mu-card-header>

    <mu-list>
      <mu-list-item button :ripple="true">
        <mu-list-item-action>
          <mu-icon value="inbox"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>我参加的</mu-list-item-title>
      </mu-list-item>
      <mu-list-item button :ripple="true">
        <mu-list-item-action>
          <mu-icon value="grade"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>我发布的</mu-list-item-title>
      </mu-list-item>
      <router-link to="/user-info-edit">
        <mu-list-item button :ripple="true">
          <mu-list-item-action>
            <mu-icon value="send"></mu-icon>
          </mu-list-item-action>
          <mu-list-item-title>修改个人信息</mu-list-item-title>
        </mu-list-item>
      </router-link>

      <mu-list-item button :ripple="true">
        <mu-list-item-action>
          <mu-icon value="drafts"></mu-icon>
        </mu-list-item-action>
        <mu-list-item-title>登出</mu-list-item-title>
      </mu-list-item>
    </mu-list>
  </mu-card>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'userInfo',
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['route','user'])
  },
  methods: {

  }
}
</script>
