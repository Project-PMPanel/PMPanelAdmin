<template>
  <div>
    <a-card :bodyStyle="{padding: 0}" :bordered="false">
      <span v-for="(item, index) in info.onlineIps" :key="index">
        userId: {{ item.userId }} - ip: {{ item.ip }}<br>
      </span>
    </a-card>
  </div>
</template>

<script>
import { getNodeInfoByNodeId } from '@/api/node'

export default {
  name: 'NodeOnline',
  components: {
  },
  data () {
    return {
      info: {}
    }
  },
  async created () {
    const nodeId = this.$route.params.nodeId
    const result = await getNodeInfoByNodeId(nodeId)
    if (result.code === 200) {
      this.info = result.data.info
      console.log(this.info)
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
