<template>
  <div :class="prefixCls">
    <div class="top-bar">
      <TopBar />
    </div>
    <div class="bottom-bar">
      <BottomBar />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue'
  import TopBar from './TopBar.vue'
  import BottomBar from './BottomBar.vue'

  export default defineComponent({
    name: 'SideBar',
    components: { TopBar, BottomBar },
    setup() {
      return {
        prefixCls: `${inject('PREFIX_CLS')}-app-layout-side-bar`,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-app-layout-side-bar';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>
