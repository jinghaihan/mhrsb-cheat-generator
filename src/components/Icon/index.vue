<template>
  <div :class="prefixCls">
    <Component :is="componentType" :type="type" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, computed } from 'vue'
  import SvgIcon from './SvgIcon/index.vue'

  export default defineComponent({
    name: 'Icon',
    props: {
      type: {
        type: String,
        required: true,
      },
    },
    components: {
      SvgIcon,
    },
    setup(props) {
      return {
        prefixCls: `${inject('PREFIX_CLS')}-icon`,
        componentType: computed(() => {
          return props.type.startsWith('svg-') ? 'SvgIcon' : props.type
        }),
      }
    },
  })
</script>
