<template>
  <a-form :model="formState" :style="{ width: '300px' }">
    <a-form-item label="装备箱.No">
      <a-input-number
        placeholder="装备箱.No"
        v-model:value="formState.box"
        :precision="0"
        :min="1"
        allowClear
      ></a-input-number>
    </a-form-item>

    <a-form-item label="类型">
      <a-select
        placeholder="类型"
        v-model:value="formState.type"
        :options="QURIOUS_CRAFTING_TYPE_OPTIONS"
        optionFilterProp="label"
        showSearch
        labelInValue
        allowClear
      ></a-select>
    </a-form-item>

    <a-form-item v-for="index in 7" :key="`技能${index}`" :label="`技能${index}`">
      <a-tree-select
        placeholder="技能"
        v-model:value="formState[`skill${index}`]"
        :treeData="QURIOUS_CRAFTING_SKILL_OPTIONS"
        treeNodeFilterProp="label"
        showSearch
        labelInValue
        allowClear
      ></a-tree-select>
    </a-form-item>

    <a-form-item>
      <a-space>
        <a-button type="primary" ghost :disabled="ADD_BTN_DISABLED" @click="onAdd">添加</a-button>
        <a-popconfirm title="确定清空吗?" ok-text="Yes" cancel-text="No" @confirm="onClear">
          <a-button danger>清空</a-button>
        </a-popconfirm>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
  import { defineComponent, ref, computed } from 'vue'
  import { QURIOUS_CRAFTING_TYPE, QURIOUS_CRAFTING_SKILL } from '@/database'
  import { isEmpty, parseSelectOptions } from '@/utils'
  import { BasicFormState } from './constant'
  import { cloneDeep } from 'lodash-es'

  export default defineComponent({
    name: 'BasicForm',
    emits: ['add', 'clear'],
    setup(_, { emit }) {
      const QURIOUS_CRAFTING_TYPE_OPTIONS = parseSelectOptions(QURIOUS_CRAFTING_TYPE)

      const formState = ref({
        box: 201,
      } as BasicFormState)

      const reset = () => {
        for (let i = 0; i < 7; i++) {
          formState.value[`skill${i + 1}`] = null
        }
        formState.value.type = QURIOUS_CRAFTING_TYPE_OPTIONS.find(
          (item) => item.label === '怪异强化',
        )
      }
      reset()

      const onAdd = () => {
        emit('add', cloneDeep(formState.value))
        formState.value.box += 1
        reset()
      }
      const onClear = () => {
        emit('clear')
        formState.value.box = 201
        reset()
      }

      return {
        formState,
        QURIOUS_CRAFTING_TYPE_OPTIONS,
        QURIOUS_CRAFTING_SKILL_OPTIONS: QURIOUS_CRAFTING_SKILL,
        ADD_BTN_DISABLED: computed(() => {
          for (const key in formState.value) {
            if (isEmpty(formState.value[key])) {
              return true
            }
          }
          return false
        }),
        onAdd,
        onClear,
      }
    },
  })
</script>
