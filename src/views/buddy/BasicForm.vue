<template>
  <a-form layout="inline" :model="formState">
    <a-form-item label="类型">
      <a-select
        placeholder="类型"
        v-model:value="formState.type"
        :options="BUDDY_TYPE_OPTIONS"
        optionFilterProp="label"
        showSearch
        labelInValue
        allowClear
      ></a-select>
    </a-form-item>

    <a-form-item label="栏位.No">
      <a-input-number
        placeholder="栏位.No"
        v-model:value="formState.box"
        :precision="0"
        :min="1"
        allowClear
      ></a-input-number>
    </a-form-item>

    <a-form-item label="等级">
      <a-select
        placeholder="等级"
        v-model:value="formState.level"
        :options="BUDDY_LEVEL_OPTIONS"
        optionFilterProp="label"
        showSearch
        labelInValue
        allowClear
      ></a-select>
    </a-form-item>

    <a-form-item>
      <a-button type="primary" ghost :disabled="ADD_BTN_DISABLED" @click="onAdd">添加</a-button>
    </a-form-item>

    <a-form-item>
      <a-popconfirm title="确定清空吗?" ok-text="Yes" cancel-text="No" @confirm="onClear">
        <a-button danger>清空</a-button>
      </a-popconfirm>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
  import { cloneDeep } from 'lodash-es'
  import { defineComponent, ref, computed } from 'vue'
  import { BUDDY_TYPE, BUDDY_LEVEL } from '@/database'
  import { isEmpty, parseSelectOptions } from '@/utils'
  import { BasicFormState } from './constant'

  export default defineComponent({
    name: 'BasicForm',
    emits: ['add', 'clear'],
    setup(_, { emit }) {
      const BUDDY_TYPE_OPTIONS = parseSelectOptions(BUDDY_TYPE)
      const BUDDY_LEVEL_OPTIONS = parseSelectOptions(BUDDY_LEVEL)

      const formState = ref({
        box: 1,
        type: BUDDY_TYPE_OPTIONS.find((item) => item.label === '艾露猫'),
        level: BUDDY_LEVEL_OPTIONS.find((item) => item.label === '49'),
      } as BasicFormState)

      const onAdd = () => {
        emit('add', cloneDeep(formState.value))
      }
      const onClear = () => {
        emit('clear')
      }

      return {
        formState,
        BUDDY_TYPE_OPTIONS,
        BUDDY_LEVEL_OPTIONS,
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
