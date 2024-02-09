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
        :options="TALISMAN_TYPE_OPTIONS"
        optionFilterProp="label"
        showSearch
        labelInValue
        allowClear
      ></a-select>
    </a-form-item>

    <a-form-item label="技能1">
      <a-input-group compact>
        <a-select
          placeholder="技能1"
          v-model:value="formState.skill1"
          :options="TALISMAN_SKILL_OPTIONS"
          optionFilterProp="label"
          showSearch
          labelInValue
          allowClear
          :style="{ width: '80%' }"
        ></a-select>
        <a-input-number
          placeholder="Lv."
          v-model:value="formState.level1"
          :precision="0"
          :min="0"
          :max="5"
          allowClear
          :style="{ width: '20%' }"
        ></a-input-number>
      </a-input-group>
    </a-form-item>

    <a-form-item label="技能2">
      <a-input-group compact>
        <a-select
          placeholder="技能2"
          v-model:value="formState.skill2"
          :options="TALISMAN_SKILL_OPTIONS"
          optionFilterProp="label"
          showSearch
          labelInValue
          allowClear
          :style="{ width: '80%' }"
        ></a-select>
        <a-input-number
          placeholder="Lv."
          v-model:value="formState.level2"
          :precision="0"
          :min="0"
          :max="5"
          allowClear
          :style="{ width: '20%' }"
        ></a-input-number>
      </a-input-group>
    </a-form-item>

    <a-form-item label="插槽">
      <a-select
        placeholder="插槽"
        v-model:value="formState.slot"
        :options="TALISMAN_SLOT_OPTIONS"
        optionFilterProp="label"
        showSearch
        labelInValue
        allowClear
      ></a-select>
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
  import { cloneDeep } from 'lodash-es'
  import { defineComponent, ref, computed } from 'vue'
  import { TALISMAN_TYPE, TALISMAN_SKILL, TALISMAN_SLOT } from '@/database'
  import { isEmpty, parseSelectOptions } from '@/utils'
  import { BasicFormState } from './constant'

  export default defineComponent({
    name: 'BasicForm',
    emits: ['add', 'clear'],
    setup(_, { emit }) {
      const TALISMAN_TYPE_OPTIONS = parseSelectOptions(TALISMAN_TYPE, true)
      const TALISMAN_SKILL_OPTIONS = parseSelectOptions(TALISMAN_SKILL, true)
      const TALISMAN_SLOT_OPTIONS = parseSelectOptions(TALISMAN_SLOT)

      const formState = ref({
        box: 201,
      } as BasicFormState)

      const reset = () => {
        formState.value.type = TALISMAN_TYPE_OPTIONS.find((item) => item.label === '圣贤护石')
        formState.value.skill1 = null
        formState.value.level1 = 0
        formState.value.skill2 = null
        formState.value.level2 = 0
        formState.value.slot = TALISMAN_SLOT_OPTIONS.find((item) => item.label === '4-1-1')
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
        TALISMAN_TYPE_OPTIONS,
        TALISMAN_SKILL_OPTIONS,
        TALISMAN_SLOT_OPTIONS,
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
