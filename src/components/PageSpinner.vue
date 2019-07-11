<template>
  <div class="page-spinner">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-spinner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;

  .v-progress-circular {
    margin-top: 64px;
  }
}
</style>
