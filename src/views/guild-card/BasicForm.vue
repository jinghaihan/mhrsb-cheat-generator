<template>
  <a-card title="基本信息" size="small">
    <a-form :model="formState" layout="vertical">
      <a-form-item label="金钱">
        <a-input-group compact>
          <a-input-number
            placeholder="金钱"
            v-model:value="formState.zenny"
            :precision="0"
            :min="1"
            :max="99999999"
            allowClear
            :style="{ width: '45%' }"
          ></a-input-number>
          <a-input-number
            placeholder="总金钱"
            v-model:value="formState.overallZenny"
            :precision="0"
            :min="1"
            allowClear
            :style="{ width: '55%' }"
          ></a-input-number>
        </a-input-group>
      </a-form-item>
      <a-form-item label="炎火点数">
        <a-input-number
          placeholder="炎火点数"
          v-model:value="formState.kamura"
          :precision="0"
          :min="1"
          :max="99999999"
          allowClear
          :style="{ width: '100%' }"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="总游戏时间">
        <a-input-number
          placeholder="总游戏时间"
          v-model:value="formState.playDuration"
          :precision="0"
          :min="0"
          allowClear
          :style="{ width: '100%' }"
          addon-after="小时"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="获赞次数">
        <a-input-number
          placeholder="获赞次数"
          v-model:value="formState.like"
          :precision="0"
          :min="0"
          allowClear
          :style="{ width: '100%' }"
        ></a-input-number>
      </a-form-item>
      <a-form-item label="猎人等级">
        <a-select
          placeholder="猎人等级"
          v-model:value="formState.hunterRank"
          :options="GUILD_CARD_HUNTER_RANK_EXP_OPTIONS"
          optionFilterProp="label"
          showSearch
          labelInValue
          allowClear
        ></a-select>
      </a-form-item>
      <a-form-item label="大师等级">
        <a-select
          placeholder="大师等级"
          v-model:value="formState.masterRank"
          :options="GUILD_CARD_MASTER_RANK_EXP_OPTIONS"
          optionFilterProp="label"
          showSearch
          labelInValue
          allowClear
        ></a-select>
      </a-form-item>
      <a-form-item label="怪异研究等级">
        <a-select
          placeholder="怪异研究等级"
          v-model:value="formState.anomalyRank"
          :options="GUILD_CARD_ANOMALY_RANK_EXP_OPTIONS"
          optionFilterProp="label"
          showSearch
          labelInValue
          allowClear
        ></a-select>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useCheat } from '@/hooks/useCheat'
  import {
    GUILD_CARD_HUNTER_RANK_EXP,
    GUILD_CARD_MASTER_RANK_EXP,
    GUILD_CARD_ANOMALY_RANK_EXP,
  } from '@/database'
  import { parseSelectOptions } from '@/utils'
  import { BasicFormState } from './constant'

  export default defineComponent({
    name: 'BasicForm',
    setup() {
      const GUILD_CARD_HUNTER_RANK_EXP_OPTIONS = parseSelectOptions(GUILD_CARD_HUNTER_RANK_EXP)
      const GUILD_CARD_MASTER_RANK_EXP_OPTIONS = parseSelectOptions(GUILD_CARD_MASTER_RANK_EXP)
      const GUILD_CARD_ANOMALY_RANK_EXP_OPTIONS = parseSelectOptions(GUILD_CARD_ANOMALY_RANK_EXP)

      const formState = ref({
        hunterRank: null,
        masterRank: null,
        anomalyRank: null,
        zenny: null,
        overallZenny: null,
        kamura: null,
        playDuration: null,
        like: null,
      } as BasicFormState)

      const { genCheat } = useCheat()
      const onSubmit = () => {
        if (formState.value.hunterRank) {
          genCheat('HUNTER_RANK', formState.value)
        }
        if (formState.value.masterRank) {
          genCheat('MASTER_RANK', formState.value)
        }
        if (formState.value.anomalyRank) {
          genCheat('ANOMALY_RANK', formState.value)
        }
        if (formState.value.zenny && formState.value.overallZenny) {
          genCheat('ZENNY', formState.value)
        }
        if (formState.value.kamura) {
          genCheat('KAMURA_POINT', formState.value)
        }
        if (formState.value.playDuration) {
          genCheat('PLAY_DURATION', formState.value)
        }
        if (formState.value.like) {
          genCheat('PLAYER_LIKE_QTY', formState.value)
        }
      }

      return {
        formState,
        GUILD_CARD_HUNTER_RANK_EXP_OPTIONS,
        GUILD_CARD_MASTER_RANK_EXP_OPTIONS,
        GUILD_CARD_ANOMALY_RANK_EXP_OPTIONS,
        onSubmit,
      }
    },
  })
</script>
