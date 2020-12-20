<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <!--<a href="https://www.github.com/vueComponent/pro-layout" target="_blank">Pro Layout</a>
      <a href="https://www.github.com/vueComponent/ant-design-vue-pro" target="_blank">Github</a>
      <a href="https://www.github.com/sendya/" target="_blank">@Sendya</a>-->
    </template>
    <template v-slot:copyright>
      <a href="/admin/dashboard"> {{ title }} </a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'
import config from '@/config/defaultSettings'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter,
    config
  },
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    document.body.classList.add('userLayout')
    this.title = config.title
  }
}
</script>
