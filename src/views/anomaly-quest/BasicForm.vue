<template>
  <a-form :model="formState" :style="{ width: '340px' }">
    <a-row :gutter="24">
      <a-col :span="12">
        <a-form-item label="入手索引">
          <a-input-number
            placeholder="入手索引"
            v-model:value="formState.index"
            :precision="0"
            :min="1"
            :max="9999"
            allowClear
          ></a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="任务索引">
          <a-input-number
            placeholder="任务索引"
            v-model:value="formState.questIndex"
            :precision="0"
            :min="1"
            :max="200"
            allowClear
          ></a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="特别探究化">
          <a-select
            placeholder="特别探究化"
            v-model:value="formState.sp"
            :options="ANOMALY_QUEST_SP_OPTIONS"
            optionFilterProp="label"
            showSearch
            labelInValue
            allowClear
            :style="{ width: '90px', 'min-width': 'auto' }"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="任务等级">
          <a-input-number
            placeholder="任务等级"
            v-model:value="formState.level"
            :precision="0"
            :min="1"
            :max="300"
            allowClear
          ></a-input-number>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="任务类别">
          <a-select
            placeholder="任务类别"
            v-model:value="formState.type"
            :options="ANOMALY_QUEST_TYPE_OPTIONS"
            optionFilterProp="label"
            showSearch
            labelInValue
            allowClear
            :style="{ width: '90px', 'min-width': 'auto' }"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="讨伐数目">
          <a-select
            placeholder="讨伐数目"
            v-model:value="formState.hunt"
            :options="ANOMALY_QUEST_HUNT_OPTIONS"
            optionFilterProp="label"
            showSearch
            labelInValue
            allowClear
            :style="{ width: '90px', 'min-width': 'auto' }"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col v-for="index in 5" :key="`怪物${index}`" :span="24">
        <a-form-item :label="index === 5 ? '乱入怪物' : `怪物${index}`">
          <a-select
            :placeholder="index === 5 ? '乱入怪物' : `怪物${index}`"
            v-model:value="formState[`monster${index}`]"
            :options="
              index === 1 ? ANOMALY_QUEST_MONSTER_MAJOR_OPTIONS : ANOMALY_QUEST_MONSTER_OPTIONS
            "
            optionFilterProp="label"
            showSearch
            labelInValue
            allowClear
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="目的地">
          <a-select
            placeholder="目的地"
            v-model:value="formState.location"
            :options="ANOMALY_QUEST_LOCATION_OPTIONS"
            optionFilterProp="label"
            showSearch
            labelInValue
            allowClear
            :style="{ width: '90px', 'min-width': 'auto' }"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="限制时间">
          <a-select
            placeholder="限制时间"
            v-model:value="formState.timelimit"
            :options="ANOMALY_QUEST_TIMELIMIT_OPTIONS"
            optionFilterProp="label"
            showSearch
            labelInValue
            allowClear
            :style="{ width: '90px', 'min-width': 'auto' }"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="失败条件">
          <a-select
            placeholder="失败条件"
            v-model:value="formState.fail"
            :options="ANOMALY_QUEST_FAIL_OPTIONS"
            optionFilterProp="label"
            showSearch
            labelInValue
            allowClear
            :style="{ width: '100px', 'min-width': 'auto' }"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="参加人数">
          <a-select
            placeholder="参加人数"
            v-model:value="formState.playerQty"
            :options="ANOMALY_QUEST_PLAYERQTY_OPTIONS"
            optionFilterProp="label"
            showSearch
            labelInValue
            allowClear
            :style="{ width: '90px', 'min-width': 'auto' }"
          ></a-select>
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="时间段">
          <a-select
            placeholder="时间段"
            v-model:value="formState.timezone"
            :options="ANOMALY_QUEST_TIMEZONE_OPTIONS"
            optionFilterProp="label"
            showSearch
            labelInValue
            allowClear
            :style="{ width: '90px', 'min-width': 'auto' }"
          ></a-select>
        </a-form-item>
      </a-col>
    </a-row>

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
  import {
    ANOMALY_QUEST_TYPE,
    ANOMALY_QUEST_HUNT,
    ANOMALY_QUEST_MONSTER_MAJOR,
    ANOMALY_QUEST_MONSTER,
    ANOMALY_QUEST_LOCATION,
    ANOMALY_QUEST_TIMELIMIT,
    ANOMALY_QUEST_FAIL,
    ANOMALY_QUEST_PLAYERQTY,
    ANOMALY_QUEST_TIMEZONE,
    ANOMALY_QUEST_SP,
  } from '@/database'
  import { isEmpty, parseSelectOptions } from '@/utils'
  import { BasicFormState } from './constant'

  export default defineComponent({
    name: 'BasicForm',
    emits: ['add', 'clear'],
    setup(_, { emit }) {
      const ANOMALY_QUEST_TYPE_OPTIONS = parseSelectOptions(ANOMALY_QUEST_TYPE)
      const ANOMALY_QUEST_HUNT_OPTIONS = parseSelectOptions(ANOMALY_QUEST_HUNT)
      const ANOMALY_QUEST_MONSTER_MAJOR_OPTIONS = Object.keys(ANOMALY_QUEST_MONSTER_MAJOR).map(
        (label) => {
          return {
            label,
            value: ANOMALY_QUEST_MONSTER_MAJOR[label].code,
          }
        },
      )
      const ANOMALY_QUEST_MONSTER_OPTIONS = parseSelectOptions(ANOMALY_QUEST_MONSTER)
      const ANOMALY_QUEST_LOCATION_OPTIONS = parseSelectOptions(ANOMALY_QUEST_LOCATION)
      const ANOMALY_QUEST_TIMELIMIT_OPTIONS = parseSelectOptions(ANOMALY_QUEST_TIMELIMIT)
      const ANOMALY_QUEST_FAIL_OPTIONS = parseSelectOptions(ANOMALY_QUEST_FAIL)
      const ANOMALY_QUEST_PLAYERQTY_OPTIONS = parseSelectOptions(ANOMALY_QUEST_PLAYERQTY)
      const ANOMALY_QUEST_TIMEZONE_OPTIONS = parseSelectOptions(ANOMALY_QUEST_TIMEZONE)
      const ANOMALY_QUEST_SP_OPTIONS = parseSelectOptions(ANOMALY_QUEST_SP)

      const formState = ref({
        index: 9999,
        questIndex: 200,
        level: 300,
      } as BasicFormState)

      const reset = () => {
        formState.value.type = ANOMALY_QUEST_TYPE_OPTIONS.find((item) => item.label === '狩猎')
        formState.value.hunt = ANOMALY_QUEST_HUNT_OPTIONS.find((item) => item.label === '1头')
        formState.value.location = ANOMALY_QUEST_LOCATION_OPTIONS.find(
          (item) => item.label === '斗技场',
        )
        formState.value.timelimit = ANOMALY_QUEST_TIMELIMIT_OPTIONS.find(
          (item) => item.label === '25分',
        )
        formState.value.fail = ANOMALY_QUEST_FAIL_OPTIONS.find((item) => item.label === '5次力尽')
        formState.value.playerQty = ANOMALY_QUEST_PLAYERQTY_OPTIONS.find(
          (item) => item.label === '4人',
        )
        formState.value.timezone = ANOMALY_QUEST_TIMEZONE_OPTIONS.find(
          (item) => item.label === '昼',
        )
        formState.value.sp = ANOMALY_QUEST_SP_OPTIONS.find((item) => item.label === '否')

        for (let i = 0; i < 5; i++) {
          if (i) {
            formState.value[`monster${i + 1}`] = ANOMALY_QUEST_MONSTER_OPTIONS.find(
              (item) => item.label === '无',
            )
          } else {
            formState.value[`monster${i + 1}`] = null
          }
        }
      }
      reset()

      const onAdd = () => {
        emit('add', cloneDeep(formState.value))
        formState.value.index -= 1
        formState.value.questIndex -= 1
        reset()
      }
      const onClear = () => {
        emit('clear')
        formState.value.index = 9999
        formState.value.questIndex = 200
        reset()
      }

      return {
        formState,
        ANOMALY_QUEST_TYPE_OPTIONS,
        ANOMALY_QUEST_HUNT_OPTIONS,
        ANOMALY_QUEST_MONSTER_MAJOR_OPTIONS,
        ANOMALY_QUEST_MONSTER_OPTIONS,
        ANOMALY_QUEST_LOCATION_OPTIONS,
        ANOMALY_QUEST_TIMELIMIT_OPTIONS,
        ANOMALY_QUEST_FAIL_OPTIONS,
        ANOMALY_QUEST_PLAYERQTY_OPTIONS,
        ANOMALY_QUEST_TIMEZONE_OPTIONS,
        ANOMALY_QUEST_SP_OPTIONS,
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
