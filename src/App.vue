<template>
  <a-config-provider
    :prefixCls="PREFIX_CLS"
    :locale="locale"
    :theme="{
      algorithm,
      token: { colorPrimary: PRIMARY_COLOR },
    }"
  >
    <AppLayout />
  </a-config-provider>
</template>

<script lang="ts">
  import { defineComponent, toRefs, computed } from 'vue'
  import zhCN from 'ant-design-vue/es/locale/zh_CN'
  import { theme as themeAlgorithm } from 'ant-design-vue'

  import { useUserStore } from '@/store'
  import { PREFIX_CLS, PRIMARY_COLOR } from '@/settings/projectSettings'
  import AppLayout from '@/components/AppLayout/index.vue'

  export default defineComponent({
    name: 'App',
    components: { AppLayout },
    provide() {
      return {
        PREFIX_CLS,
        PRIMARY_COLOR,
      }
    },
    setup() {
      const userStore = useUserStore()
      const { theme, compact } = toRefs(userStore)

      return {
        locale: zhCN,
        algorithm: computed(() => {
          const algorithm = [
            theme.value === 'light'
              ? themeAlgorithm.defaultAlgorithm
              : themeAlgorithm.darkAlgorithm,
          ]
          if (compact.value) {
            algorithm.push(themeAlgorithm.compactAlgorithm)
          }

          return algorithm
        }),
        PREFIX_CLS,
        PRIMARY_COLOR,
      }
    },
  })
</script>

<style lang="less"></style>
