<template>
  <a-form ref="formRef" :model="formState" hideRequiredMark :style="{ width: '300px' }">
    <a-form-item label="开始编号" name="start" :rules="[{ required: true }]">
      <a-input-number
        placeholder="开始编号"
        v-model:value="formState.start"
        :precision="0"
        :min="1"
        allowClear
        :style="{ width: '100%' }"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="结束编号" name="end" :rules="[{ required: true }]">
      <a-input-number
        placeholder="结束编号"
        v-model:value="formState.end"
        :precision="0"
        :min="1"
        allowClear
        :style="{ width: '100%' }"
      ></a-input-number>
    </a-form-item>
    <a-form-item label="数量" name="count" :rules="[{ required: true }]">
      <a-input-number
        placeholder="数量"
        v-model:value="formState.count"
        :precision="0"
        :min="0"
        :max="9999"
        allowClear
        :style="{ width: '100%' }"
      ></a-input-number>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 20 }">
      <a-button type="primary" ghost size="small" @click="onSubmit"> 确定 </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useCheat } from '@/hooks/useCheat'
  import { ITEM_TYPE } from '@/database'
  import { ItemQuanityFormState } from './constant'

  export default defineComponent({
    name: 'ItemQuanityForm',
    setup() {
      const { genCheat } = useCheat()

      const formRef = ref()
      const formState = ref({
        start: 1,
        end: Object.keys(ITEM_TYPE).length + 1,
        count: 9500,
      } as ItemQuanityFormState)

      const onSubmit = async () => {
        try {
          const state = await formRef.value.validate()
          genCheat('ITEM_QTY', state)
        } catch (error) {}
      }

      return {
        formRef,
        formState,
        onSubmit,
      }
    },
  })
</script>
