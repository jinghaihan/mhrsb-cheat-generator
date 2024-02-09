<template>
  <a-form :model="formState" layout="inline">
    <a-form-item label="道具箱.No">
      <a-input-number
        placeholder="道具箱.No"
        v-model:value="formState.box"
        :precision="0"
        :min="1"
        allowClear
      ></a-input-number>
    </a-form-item>

    <a-form-item label="道具">
      <a-select
        placeholder="道具"
        v-model:value="formState.item"
        :options="ITEM_TYPE_OPTIONS"
        optionFilterProp="label"
        showSearch
        labelInValue
        allowClear
      ></a-select>
    </a-form-item>

    <a-form-item label="数量">
      <a-input-number
        placeholder="数量"
        v-model:value="formState.count"
        :precision="0"
        :min="0"
        :max="9999"
        allowClear
      ></a-input-number>
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
  import { ITEM_TYPE } from '@/database'
  import { isEmpty, parseSelectOptions } from '@/utils'
  import { BasicFormState } from './constant'

  export default defineComponent({
    name: 'BasicForm',
    emits: ['add', 'clear'],
    setup(_, { emit }) {
      const ITEM_TYPE_OPTIONS = parseSelectOptions(ITEM_TYPE, true)

      const formState = ref({
        box: 1,
      } as BasicFormState)

      const reset = () => {
        formState.value.item = null
        formState.value.count = 9500
      }
      reset()

      const onAdd = () => {
        emit('add', cloneDeep(formState.value))
        formState.value.box += 1
        reset()
      }
      const onClear = () => {
        emit('clear')
        formState.value.box = 1
        reset()
      }

      return {
        formState,
        ITEM_TYPE_OPTIONS,
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
