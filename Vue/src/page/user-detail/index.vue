<style lang="less" scoped>
.login{
  margin-top: 20px;
  text-align: center;
}
</style>

<template>
<div class="user-detail">

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
