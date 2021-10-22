<template>
  <div>
    <a-button type="primary" style="margin-bottom: 10px" @click="openAddSsDrawer">{{ $i18n.t('setting.add') }}</a-button>
    <a-drawer
      :title="this.$i18n.t('node.list.addNode')"
      placement="right"
      width="60%"
      :visible="addSsDrawer"
      @close="onSsDrawerClose"
    >
      <a-form layout="vertical">
        <a-form-item :label="$t('node.list.name')">
          <a-input v-model="newSsNode.name"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.outServer')">
          <a-input v-model="newSsNode.outServer"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.outPort')">
          <a-input v-model="newSsNode.outPort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.subServer')">
          <a-input v-model="newSsNode.subServer"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.subPort')">
          <a-input v-model="newSsNode.subPort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.method')">
          <a-select :value="newSsNode.method" @change="handleSelectMethod">
            <a-select-option value="aes-128-gcm">aes-128-gcm</a-select-option>
            <a-select-option value="aes-192-gcm">aes-192-gcm</a-select-option>
            <a-select-option value="aes-256-gcm">aes-256-gcm</a-select-option>
            <a-select-option value="chacha20-ietf-poly1305">chacha20-ietf-poly1305</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('node.list.trafficRate')">
          <a-input v-model="newSsNode.trafficRate"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.class')">
          <a-input v-model="newSsNode.clazz"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.speedlimit')">
          <a-input v-model="newSsNode.speedlimit"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.sort')">
          <a-input v-model="newSsNode.sort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.flag')">
          <a-switch v-model="newSsNode.flag">
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" block @click="addSsNode">{{ $i18n.t('setting.add') }}</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
    <a-card :body-style="{padding: '0'}" :bordered="false">
      <s-table ref="ss_table" size="default" rowKey="id" :columns="ssColumns" :data="loadSsNode">
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
          <a-badge v-if="Date.parse(new Date(text))/1000 > (Date.parse(new Date())/1000 - 120)" status="success" />
          <a-badge v-else status="error" />
          <span v-if="$i18n.locale === 'zh-CN'">
            {{ Date.parse(new Date(text))/1000 > (Date.parse(new Date())/1000 - 120) ? '在线' : '离线' }}
          </span>
          <span v-else>
            {{ Date.parse(new Date(text))/1000 > (Date.parse(new Date())/1000 - 120) ? 'Online' : 'Offline' }}
          </span>
        </span>
        <span slot="onlineCount" slot-scope="text, record">
          <span v-if="text === 0">
            {{ text }}
          </span>
          <span v-else>
            <router-link :to="{path: '/admin/manage/node/online/ss/' + record.id}">{{ text }}</router-link>
          </span>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="openEditSsDrawer(record)">{{ $t('setting.change') }}</a>
            <a-divider type="vertical" />
            <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deleteNodeByTypeAndId('ss', record.id)">
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
      :visible="editSsDrawer"
      @close="editOnSsDrawerClose"
    >
      <a-form layout="vertical">
        <a-form-item :label="$t('node.list.name')">
          <a-input v-model="editOldSsNode.name"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.outServer')">
          <a-input v-model="editOldSsNode.outServer"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.outPort')">
          <a-input v-model="editOldSsNode.outPort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.subServer')">
          <a-input v-model="editOldSsNode.subServer"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.subPort')">
          <a-input v-model="editOldSsNode.subPort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.method')">
          <a-select :value="editOldSsNode.method" @change="handleSelectEditMethod">
            <a-select-option value="aes-128-gcm">aes-128-gcm</a-select-option>
            <a-select-option value="aes-192-gcm">aes-192-gcm</a-select-option>
            <a-select-option value="aes-256-gcm">aes-256-gcm</a-select-option>
            <a-select-option value="chacha20-ietf-poly1305">chacha20-ietf-poly1305</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label="$t('node.list.trafficRate')">
          <a-input v-model="editOldSsNode.trafficRate"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.class')">
          <a-input v-model="editOldSsNode.clazz"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.speedlimit')">
          <a-input v-model="editOldSsNode.speedlimit"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.sort')">
          <a-input v-model="editOldSsNode.sort"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.flag')">
          <a-switch v-model="editOldSsNode.flag">
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" block @click="submitEditSsNode">{{ $i18n.t('setting.change') }}</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
import {
  getSsNode,
  addSsNode,
  submitEditSsNode,
  deleteNodeByTypeAndId
} from '@/api/node'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      // ss
      addSsDrawer: false,
      editSsDrawer: false,
      newSsNode: {
        method: 'aes-256-gcm'
      },
      editOldSsNode: {
        method: 'aes-256-gcm'
      },
      ssColumns: [
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
      loadSsNode: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getSsNode(Object.assign(requestParameters))
          .then(res => {
            console.log(res.data.data)
            return res.data
          })
      }
    }
  },
  watch: {
    '$i18n.locale' () {
      this.ssColumns = [
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
    // ss
    openAddSsDrawer () {
      this.addSsDrawer = true
    },
    openEditSsDrawer (value) {
      this.editOldSsNode = JSON.parse(JSON.stringify(value))
      this.editSsDrawer = true
    },
    onSsDrawerClose () {
      this.addSsDrawer = false
      this.newSsNode = {}
    },
    editOnSsDrawerClose () {
      this.editSsDrawer = false
      this.editOldSsNode = {}
    },
    handleSelectMethod (value) {
      console.log(value)
      this.newSsNode.method = value
    },
    handleSelectEditMethod (value) {
      console.log(value)
      this.editOldSsNode.method = value
    },
    async addSsNode () {
      const result = await addSsNode(this.newSsNode)
      if (result.code === 200) {
        this.$refs.ss_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.addSsDrawer = false
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async submitEditSsNode () {
      const result = await submitEditSsNode(this.editOldSsNode)
      if (result.code === 200) {
        this.editSsDrawer = false
        this.$refs.ss_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    // common delete
    async deleteNodeByTypeAndId (type, id) {
      const result = await deleteNodeByTypeAndId(type, id)
      if (result.code === 200) {
        this.$refs.ss_table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
