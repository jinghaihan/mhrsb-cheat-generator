<template>
  <div :class="prefixCls">
    <a-card class="left-space">
      <slot name="config"></slot>
    </a-card>

    <a-card class="right-space">
      <a-space direction="vertical">
        <a-space>
          <slot name="operation"></slot>
        </a-space>
        <slot name="table"></slot>
      </a-space>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject } from 'vue'

  export default defineComponent({
    name: 'HorizontalLayout',
    setup() {
      return {
        prefixCls: `${inject('PREFIX_CLS')}-horizontal-table-layout`,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-horizontal-table-layout';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
    display: flex;
    column-gap: 8px;
    .left-space {
      flex: 0 0 auto;
      overflow: hidden;
    }
    .right-space {
      flex: 1 1 auto;
      overflow: hidden;
    }
  }
</style>
