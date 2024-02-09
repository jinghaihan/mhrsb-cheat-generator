<template>
  <AppLogo />

  <Action
    v-for="route in routes"
    :key="route.name"
    :title="route.meta?.title"
    placement="right"
    :icon="route.meta?.icon"
    :active="getIsActive(route)"
    @click="changeRoute(route.path)"
  />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import type { RouteRecordRaw } from 'vue-router'
  import { useRouter } from 'vue-router'
  import { routes } from '@/router/routes'

  import AppLogo from '@/components/AppLogo/index.vue'

  export default defineComponent({
    name: 'SiderTopBar',
    components: { AppLogo },
    setup() {
      const router = useRouter()
      const getIsActive = (route: RouteRecordRaw) => {
        return router.currentRoute.value.name === route.name
      }
      const changeRoute = (path: string) => {
        router.push({ path })
      }
      return {
        routes: routes.filter((route) => route.name),

        getIsActive,
        changeRoute,
      }
    },
  })
</script>
