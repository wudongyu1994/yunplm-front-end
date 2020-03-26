<template>
  <div class="dashboard-container">
    <el-badge :value="2" style="margin-top: 20px;margin-right: 40px">
      <el-button>unpaid</el-button>
    </el-badge>
  </div>
</template>

<script>

export default {
  name: 'Dashboard'
}
</script>

<style lang="scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }

    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
