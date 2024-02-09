<template>
  <a-card title="功能清单" size="small">
    <div class="space">
      <div class="left-space">
        <a-collapse v-model:activeKey="activeKey" :bordered="false">
          <a-collapse-panel
            v-for="(item, index) in list"
            :key="item.title"
            :header="item.title"
            :id="`cheat${index}`"
          >
            <template #extra>
              <span @click="(e: MouseEvent) => e.stopPropagation()">
                <a-checkbox
                  :checked="inCart(parseCheat(item[version]))"
                  @change="(e: CheckboxChangeEvent) => onCart(e, item)"
                ></a-checkbox>
              </span>
            </template>
            <pre>{{ item[version] }}</pre>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <div class="right-space">
        <a-anchor
          :items="
            list.map((item, index) => {
              return {
                title: item.title,
                key: `cheat${index}`,
                href: `#cheat${index}`,
              }
            })
          "
          :getContainer="getAnchorContainer"
        ></a-anchor>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, toRefs } from 'vue'
  import { useUserStore } from '@/store'
  import { parseCheat, fetchXlsx } from '@/utils'
  import { CheckboxChangeEvent } from 'ant-design-vue/es/_util/EventInterface'

  export default defineComponent({
    name: 'CheatListForm',
    setup() {
      const userStore = useUserStore()
      const { version, inCart } = toRefs(userStore)

      const list = ref([] as Record<string, string>[])
      const activeKey = ref([] as string[])

      const readXlsx = async () => {
        const data = await fetchXlsx('/attachment/functional-list.xlsx', 'Sheet1')
        const header = data[0]
        data.splice(0, 1)

        const rows = data.map((item) => {
          const row = { title: item[0] } as Record<string, string>
          header.forEach((title, index) => {
            if (index) {
              row[title] = item[index]
            }
          })
          return row
        })
        list.value = rows.filter((item) => item.title)
        activeKey.value = list.value.map((item) => item.title)
      }
      readXlsx()

      const onCart = (event: CheckboxChangeEvent, item: Record<string, string>) => {
        const checked = event.target?.checked
        const cheats = parseCheat(item[userStore.version])
        if (checked) {
          userStore.addCart(cheats)
        } else {
          userStore.removeCart(cheats)
        }
      }

      const SCROLL_CONTAINER = inject('SCROLL_CONTAINER') as string

      return {
        version,
        list,
        activeKey,
        onCart,
        inCart,
        parseCheat,
        getAnchorContainer: () => {
          return document.getElementById(SCROLL_CONTAINER)
        },
      }
    },
  })
</script>

<style lang="less" scoped>
  .space {
    display: flex;
    column-gap: 8px;
    scroll-behavior: smooth;
    .left-space {
      flex: 1 1 auto;
    }
    .right-space {
      flex: 0 0 auto;
      width: 300px;
    }
  }
</style>
