<template>
  <a-card title="猎人速率" size="small">
    <template #extra>
      <a-button type="primary" size="small" @click="onSubmit"> 添加 </a-button>
    </template>
    <a-form :model="formState">
      <a-form-item label="猎人速率">
        <a-select
          placeholder="猎人速率"
          v-model:value="formState.multiple"
          :options="FUNCTIONAL_HUNTER_SPEED_MULTIPLE_TYPE_OPTIONS"
          optionFilterProp="label"
          showSearch
          labelInValue
          allowClear
          mode="multiple"
        ></a-select>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useCheat } from '@/hooks/useCheat'
  import { FUNCTIONAL_HUNTER_SPEED_MULTIPLE_TYPE } from '@/database'
  import { parseSelectOptions } from '@/utils'
  import { HunterSpeedFormState } from './constant'

  export default defineComponent({
    name: 'HunterSpeedForm',
    setup() {
      const FUNCTIONAL_HUNTER_SPEED_MULTIPLE_TYPE_OPTIONS = parseSelectOptions(
        FUNCTIONAL_HUNTER_SPEED_MULTIPLE_TYPE,
      )

      const formState = ref({
        multiple: [],
      } as HunterSpeedFormState)

      const { genCheat } = useCheat()
      const onSubmit = () => {
        if (formState.value.multiple && formState.value.multiple.length) {
          formState.value.multiple.forEach((item) => {
            genCheat('HUNTER_SPEED', { multiple: item })
          })
          formState.value.multiple = []
        }
      }

      return {
        formState,
        FUNCTIONAL_HUNTER_SPEED_MULTIPLE_TYPE_OPTIONS,
        onSubmit,
      }
    },
  })
</script>
