<template>
  <div>
    <a-button type="primary" style="margin-bottom: 10px" @click="openAddTrojanDrawer">{{ $i18n.t('setting.add') }}</a-button>
    <a-drawer
      :title="this.$i18n.t('node.list.addNode')"
      placement="right"
      width="60%"
      :visible="addTrojanDrawer"
      @close="onTrojanDrawerClose"
    >
      <a-form layout="vertical">
        <a-form-item :label="$t('node.list.name')">
          <a-input v-model="newTrojanNode.name"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.outServer')">
          <a-input v-model="newTrojanNode.outServer"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.outPort')">
          <a-input v-model="newTrojanNode.outPort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.subServer')">
          <a-input v-model="newTrojanNode.subServer"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.subPort')">
          <a-input v-model="newTrojanNode.subPort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.sni')">
          <a-input v-model="newTrojanNode.sni"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.grpc')">
          <a-switch v-model="newTrojanNode.grpc">
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </a-form-item>
        <a-form-item :label="$t('node.list.trafficRate')">
          <a-input v-model="newTrojanNode.trafficRate"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.class')">
          <a-input v-model="newTrojanNode.clazz"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.speedlimit')">
          <a-input v-model="newTrojanNode.speedlimit"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.sort')">
          <a-input v-model="newTrojanNode.sort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.flag')">
          <a-switch v-model="newTrojanNode.flag">
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" block @click="addTrojanNode">{{ $i18n.t('setting.add') }}</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
    <a-card :body-style="{padding: '0'}" :bordered="false">
      <s-table ref="trojan_table" size="default" rowKey="id" :columns="trojanColumns" :data="loadTrojanNode">
        <span slot="grpc" slot-scope="text">
          <a-badge v-if="text === true" status="success" />
          <a-badge v-else status="error" />
          {{ text === true ? '启用' : '停用' }}
        </span>
        <span slot="flag" slot-scope="text">
          <a-badge v-if="text === true" status="success" />
          <a-badge v-else status="error" />
          <span v-if="$i18n.locale === 'zh-CN'">
            {{ text === true ? '启用' : '停用' }}
          </span>
          <span v-else>
            {{ text === true ? 'Enable' : 'Disable' }}
          </span>
        </span>
        <span slot="heartbeat" slot-scope="text">
          <a-badge v-if="text !== null && Date.parse(new Date(text.split('-').join('/')))/1000 > (Date.parse(new Date())/1000 - 120)" status="success" />
          <a-badge v-else status="error" />
          <span v-if="$i18n.locale === 'zh-CN'">
            {{ text !== null && Date.parse(new Date(text.split('-').join('/')))/1000 > (Date.parse(new Date())/1000 - 120) ? '在线' : '离线' }}
          </span>
          <span v-else>
            {{ text !== null && Date.parse(new Date(text.split('-').join('/')))/1000 > (Date.parse(new Date())/1000 - 120) ? 'Online' : 'Offline' }}
          </span>
        </span>
        <span slot="onlineCount" slot-scope="text, record">
          <span v-if="text === 0">
            {{ text }}
          </span>
          <span v-else>
            <router-link :to="{path: '/admin/manage/node/online/trojan/' + record.id}">{{ text }}</router-link>
          </span>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="openEditTrojanDrawer(record)">{{ $t('setting.change') }}</a>
            <a-divider type="vertical" />
            <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deleteNodeByTypeAndId('trojan', record.id)">
              <a>{{ $t('setting.delete') }}</a>
            </a-popconfirm>
          </template>
        </span>
      </s-table>
    </a-card>
    <a-drawer
      :title="this.$i18n.t('node.list.editNode')"
      placement="right"
      width="60%"
      :visible="editTrojanDrawer"
      @close="editOnTrojanDrawerClose"
    >
      <a-form layout="vertical">
        <a-form-item :label="$t('node.list.name')">
          <a-input v-model="editOldTrojanNode.name"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.outServer')">
          <a-input v-model="editOldTrojanNode.outServer"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.outPort')">
          <a-input v-model="editOldTrojanNode.outPort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.subServer')">
          <a-input v-model="editOldTrojanNode.subServer"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.subPort')">
          <a-input v-model="editOldTrojanNode.subPort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.sni')">
          <a-input v-model="editOldTrojanNode.sni"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.grpc')">
          <a-switch v-model="editOldTrojanNode.grpc">
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </a-form-item>
        <a-form-item :label="$t('node.list.trafficRate')">
          <a-input v-model="editOldTrojanNode.trafficRate"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.class')">
          <a-input v-model="editOldTrojanNode.clazz"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.speedlimit')">
          <a-input v-model="editOldTrojanNode.speedlimit"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.sort')">
          <a-input v-model="editOldTrojanNode.sort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.flag')">
          <a-switch v-model="editOldTrojanNode.flag">
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" block @click="submitEditTrojanNode">{{ $i18n.t('setting.change') }}</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
import {
  getTrojanNode,
  addTrojanNode,
  submitEditTrojanNode,
  deleteNodeByTypeAndId
} from '@/api/node'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      // trojan
      addTrojanDrawer: false,
      editTrojanDrawer: false,
      newTrojanNode: {},
      editOldTrojanNode: {},
      trojanColumns: [
        {
          title: '#',
          align: 'center',
          sorter: true,
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('node.list.name'),
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: this.$i18n.t('node.list.class'),
          align: 'center',
          dataIndex: 'clazz'
        },
        {
          title: this.$i18n.t('node.list.outServer'),
          align: 'center',
          dataIndex: 'outServer'
        },
        {
          title: this.$i18n.t('node.list.outPort'),
          align: 'center',
          dataIndex: 'outPort'
        },
        {
          title: this.$i18n.t('node.list.subServer'),
          align: 'center',
          dataIndex: 'subServer'
        },
        {
          title: this.$i18n.t('node.list.subPort'),
          align: 'center',
          dataIndex: 'subPort'
        },
        {
          title: this.$i18n.t('node.list.grpc'),
          align: 'center',
          dataIndex: 'grpc',
          scopedSlots: { customRender: 'grpc' }
        },
        {
          title: this.$i18n.t('node.list.flag'),
          align: 'center',
          dataIndex: 'flag',
          scopedSlots: { customRender: 'flag' }
        },
        {
          title: this.$i18n.t('node.list.heartbeat'),
          align: 'center',
          dataIndex: 'heartbeat',
          scopedSlots: { customRender: 'heartbeat' }
        },
        {
          title: this.$i18n.t('node.list.online'),
          align: 'center',
          dataIndex: 'onlineCount',
          scopedSlots: { customRender: 'onlineCount' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadTrojanNode: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getTrojanNode(Object.assign(requestParameters))
          .then(res => {
            console.log(res.data.data)
            return res.data
          })
      }
    }
  },
  watch: {
    '$i18n.locale' () {
      this.trojanColumns = [
        {
          title: '#',
          align: 'center',
          sorter: true,
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('node.list.name'),
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: this.$i18n.t('node.list.class'),
          align: 'center',
          dataIndex: 'clazz'
        },
        {
          title: this.$i18n.t('node.list.outServer'),
          align: 'center',
          dataIndex: 'outServer'
        },
        {
          title: this.$i18n.t('node.list.outPort'),
          align: 'center',
          dataIndex: 'outPort'
        },
        {
          title: this.$i18n.t('node.list.subServer'),
          align: 'center',
          dataIndex: 'subServer'
        },
        {
          title: this.$i18n.t('node.list.subPort'),
          align: 'center',
          dataIndex: 'subPort'
        },
        {
          title: this.$i18n.t('node.list.grpc'),
          align: 'center',
          dataIndex: 'grpc',
          scopedSlots: { customRender: 'grpc' }
        },
        {
          title: this.$i18n.t('node.list.flag'),
          align: 'center',
          dataIndex: 'flag',
          scopedSlots: { customRender: 'flag' }
        },
        {
          title: this.$i18n.t('node.list.heartbeat'),
          align: 'center',
          dataIndex: 'heartbeat',
          scopedSlots: { customRender: 'heartbeat' }
        },
        {
          title: this.$i18n.t('node.list.online'),
          align: 'center',
          dataIndex: 'onlineCount',
          scopedSlots: { customRender: 'onlineCount' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  methods: {
    // trojan
    openAddTrojanDrawer () {
      this.addTrojanDrawer = true
    },
    openEditTrojanDrawer (value) {
      this.editOldTrojanNode = JSON.parse(JSON.stringify(value))
      this.editTrojanDrawer = true
    },
    onTrojanDrawerClose () {
      this.addTrojanDrawer = false
      this.newTrojanNode = {}
    },
    editOnTrojanDrawerClose () {
      this.editTrojanDrawer = false
      this.editOldTrojanNode = {}
    },
    async addTrojanNode () {
      const result = await addTrojanNode(this.newTrojanNode)
      if (result.code === 200) {
        this.$refs.trojan_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.addTrojanDrawer = false
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async submitEditTrojanNode () {
      const result = await submitEditTrojanNode(this.editOldTrojanNode)
      if (result.code === 200) {
        this.editTrojanDrawer = false
        this.$refs.trojan_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    // common delete
    async deleteNodeByTypeAndId (type, id) {
      const result = await deleteNodeByTypeAndId(type, id)
      if (result.code === 200) {
        this.$refs.ss_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$refs.v2ray_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$refs.trojan_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
