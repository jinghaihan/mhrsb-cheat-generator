<template>
  <div :class="prefixCls">
    <HorizontalLayout>
      <template #config>
        <BasicForm @add="(value) => data.push(value)" @clear="data = []" />
      </template>

      <template #operation>
        <a-button type="primary" :disabled="!data.length" @click="onSubmit">加入购物车</a-button>
      </template>

      <template #table>
        <a-table
          :columns="columns"
          :data-source="data"
          rowKey="box"
          :pagination="false"
          size="small"
          :scroll="{ y: `calc(100vh - 142px)` }"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'skill'">
              <a-tag color="blue"> {{ record.skill1.label }}(Lv.{{ record.level1 }}) </a-tag>
              <a-tag color="blue"> {{ record.skill2.label }}(Lv.{{ record.level2 }}) </a-tag>
            </template>

            <template v-if="column.key === 'action'">
              <a-popconfirm
                title="确定删除吗?"
                ok-text="Yes"
                cancel-text="No"
                @confirm="data = data.filter((item) => item.box !== record.box)"
              >
                <a-button type="text" danger>删除</a-button>
              </a-popconfirm>
            </template>
          </template>
        </a-table>
      </template>
    </HorizontalLayout>
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, ref } from 'vue'
  import { useCheat } from '@/hooks/useCheat'
  import { columns, ColumnData } from './constant'

  import { HorizontalLayout } from '@/components/TableLayout'
  import BasicForm from './BasicForm.vue'

  export default defineComponent({
    name: 'talisman',
    components: { HorizontalLayout, BasicForm },
    setup() {
      const { genCheat } = useCheat()
      const data = ref([] as ColumnData[])

      const onSubmit = () => {
        if (data.value.length) {
          data.value.forEach((row: ColumnData) => {
            genCheat('TALISMAN', row)
          })
        }
      }

      return {
        prefixCls: `${inject('PREFIX_CLS')}-talisman`,
        columns,
        data,
        onSubmit,
      }
    },
  })
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-talisman';

  .@{prefix-cls} {
    height: 100%;
    width: 100%;
  }
</style>
