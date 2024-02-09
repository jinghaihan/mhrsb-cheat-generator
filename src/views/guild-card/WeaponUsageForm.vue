<template>
  <a-card title="武器使用次数" size="small">
    <a-space :size="[8, 8]" wrap>
      <a-popover
        v-for="weapon in GUILD_CARD_WEAPON_USAGE_WEAPON_TYPE_OPTIONS"
        :key="weapon.value"
        :title="weapon.label"
        placement="right"
        :trigger="['click']"
      >
        <a-card hoverable :style="{ width: '55px' }">
          <template #cover>
            <img :src="images[weapon.value]" :alt="weapon.label" />
          </template>
        </a-card>

        <template #content>
          <a-form :model="formState[weapon.value]">
            <a-form-item
              v-for="item in GUILD_CARD_WEAPON_USAGE_QUEST_TYPE_OPTIONS"
              :key="item.value"
              :label="item.label"
            >
              <a-input-number
                placeholder="使用次数"
                v-model:value="formState[weapon.value][item.value]"
                :precision="0"
                :min="0"
                allowClear
                :style="{ width: '100%' }"
              ></a-input-number>
            </a-form-item>
          </a-form>
        </template>
      </a-popover>
    </a-space>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useCheat } from '@/hooks/useCheat'
  import {
    GUILD_CARD_WEAPON_USAGE_WEAPON_TYPE,
    GUILD_CARD_WEAPON_USAGE_QUEST_TYPE,
  } from '@/database'
  import { isEmpty, parseSelectOptions } from '@/utils'
  import { WeaponUsageFormState } from './constant'

  export default defineComponent({
    name: 'WeaponUsageForm',
    setup() {
      const GUILD_CARD_WEAPON_USAGE_WEAPON_TYPE_OPTIONS = parseSelectOptions(
        GUILD_CARD_WEAPON_USAGE_WEAPON_TYPE,
      )
      const GUILD_CARD_WEAPON_USAGE_QUEST_TYPE_OPTIONS = parseSelectOptions(
        GUILD_CARD_WEAPON_USAGE_QUEST_TYPE,
        true,
      )

      const images = {} as Record<string, string>
      GUILD_CARD_WEAPON_USAGE_WEAPON_TYPE_OPTIONS.forEach((weapon) => {
        images[weapon.value] = require(`@/assets/images/weapon/${weapon.value}.jpeg`)
      })

      const formState = ref({
        '20': {},
        '28': {},
        '40': {},
        '44': {},
        '34': {},
        '48': {},
        '3C': {},
        '38': {},
        '24': {},
        '4C': {},
        '50': {},
        '2C': {},
        '30': {},
        '54': {},
      } as WeaponUsageFormState)

      const { genCheat } = useCheat()
      const onSubmit = () => {
        Object.keys(formState.value).forEach((weapon) => {
          Object.keys(formState.value[weapon]).forEach((quest) => {
            if (!isEmpty(formState.value[weapon][quest])) {
              genCheat('WEAPON_USAGE', {
                count: formState.value[weapon][quest],
                weapon: {
                  label: GUILD_CARD_WEAPON_USAGE_WEAPON_TYPE_OPTIONS.find(
                    (item) => item.value === weapon,
                  )?.label as string,
                  value: weapon,
                },
                quest: {
                  label: GUILD_CARD_WEAPON_USAGE_QUEST_TYPE[quest],
                  value: quest,
                },
              })
            }
          })
        })
      }

      return {
        GUILD_CARD_WEAPON_USAGE_WEAPON_TYPE_OPTIONS,
        GUILD_CARD_WEAPON_USAGE_QUEST_TYPE_OPTIONS,
        images,
        formState,
        onSubmit,
      }
    },
  })
</script>
