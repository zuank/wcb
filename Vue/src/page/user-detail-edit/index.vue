<template>
  <mu-container>
    <mu-text-field fullWidth
                   v-model="nickname"
                   label="昵称"
                   type="text" />
    <mu-text-field fullWidth
                   v-model="tel"
                   label="手机号"
                   type="text" />
    <mu-text-field fullWidth
                   v-model="discription"
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
export default {
  name: 'user-detail-edit'
}
</script>

<style scoped>
</style>
