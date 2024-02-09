<template>
  <a-card title="任务怪物体型" size="small">
    <template #extra>
      <a-button type="primary" size="small" @click="onSubmit"> 添加 </a-button>
    </template>
    <a-form :model="formState">
      <a-form-item label="栏位.No">
        <a-input-number
          placeholder="栏位.No"
          v-model:value="formState.slot"
          :precision="0"
          :min="1"
          :max="3"
          allowClear
          :style="{ width: '100%' }"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="体型倍率">
        <a-select
          placeholder="体型倍率"
          v-model:value="formState.multiple"
          :options="FUNCTIONAL_QUEST_MONSTER_SIZE_OPTIONS"
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
  import { FUNCTIONAL_QUEST_MONSTER_SIZE } from '@/database'
  import { parseSelectOptions } from '@/utils'
  import { QuestMonsterSizeFormState } from './constant'

  export default defineComponent({
    name: 'QuestMonsterSizeForm',
    setup() {
      const FUNCTIONAL_QUEST_MONSTER_SIZE_OPTIONS = parseSelectOptions(
        FUNCTIONAL_QUEST_MONSTER_SIZE,
      )

      const formState = ref({
        slot: null,
        multiple: [],
      } as QuestMonsterSizeFormState)

      const { genCheat } = useCheat()
      const onSubmit = () => {
        if (formState.value.multiple && formState.value.multiple.length) {
          formState.value.multiple.forEach((item) => {
            genCheat('QUEST_MONSTER_SIZE', { slot: formState.value.slot, multiple: item })
          })
          formState.value.multiple = []
        }
      }

      return {
        FUNCTIONAL_QUEST_MONSTER_SIZE_OPTIONS,
        formState,
        onSubmit,
      }
    },
  })
</script>
