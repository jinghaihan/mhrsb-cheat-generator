<template>
  <a-card title="任务报酬倍率" size="small">
    <template #extra>
      <a-button type="primary" size="small" @click="onSubmit"> 添加 </a-button>
    </template>
    <a-form :model="formState">
      <a-form-item label="任务报酬倍率">
        <a-select
          placeholder="任务报酬倍率"
          v-model:value="formState.multiple"
          :options="FUNCTIONAL_QUEST_REWARD_MULTIPLE_TYPE_OPTIONS"
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
  import { FUNCTIONAL_QUEST_REWARD_MULTIPLE_TYPE } from '@/database'
  import { parseSelectOptions } from '@/utils'
  import { QuestRewardMultiplerFormState } from './constant'

  export default defineComponent({
    name: 'QuestRewardMultiplerForm',
    setup() {
      const FUNCTIONAL_QUEST_REWARD_MULTIPLE_TYPE_OPTIONS = parseSelectOptions(
        FUNCTIONAL_QUEST_REWARD_MULTIPLE_TYPE,
      )

      const formState = ref({
        multiple: [],
      } as QuestRewardMultiplerFormState)

      const { genCheat } = useCheat()
      const onSubmit = () => {
        if (formState.value.multiple && formState.value.multiple.length) {
          formState.value.multiple.forEach((item) => {
            genCheat('QUEST_REWARD_MULTIPLER', { multiple: item })
          })
          formState.value.multiple = []
        }
      }

      return {
        formState,
        FUNCTIONAL_QUEST_REWARD_MULTIPLE_TYPE_OPTIONS,
        onSubmit,
      }
    },
  })
</script>
