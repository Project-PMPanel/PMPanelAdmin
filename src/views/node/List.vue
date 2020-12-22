<template>
  <div>
    <div>
      <a-button type="primary" style="margin-bottom: 10px" @click="openAddDrawer">{{ $i18n.t('setting.add') }}</a-button>
      <a-drawer
        :title="this.$i18n.t('node.list.addNode')"
        placement="right"
        width="60%"
        :visible="addDrawer"
        @close="onClose"
      >
        <a-form layout="vertical">
          <a-form-item :label="$t('node.list.name')">
            <a-input v-model="newNode.name"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.server')">
            <a-input v-model="newNode.server"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.sort')">
            <a-select :value="newNode.sort" @change="handleSelectType">
              <a-select-option :value="0">SS(R)</a-select-option>
              <a-select-option :value="11">V2ray</a-select-option>
            </a-select>
          </a-form-item>
          <div v-if="newNode.sort === 0">
            <!--            <a-form-item :label="$t('node.list.port')">
              <a-input v-model="newNode.port"/>
            </a-form-item>-->
            <a-form-item :label="$t('node.list.passwd')">
              <a-input v-model="newNode.passwd"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.method')">
              <a-input v-model="newNode.method"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.protocol')">
              <a-input v-model="newNode.protocol"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.obfs')">
              <a-input v-model="newNode.obfs"/>
            </a-form-item>
            <a-form-item :label="$t('node.list.isMultiUser')">
              <a-select :value="newNode.isMultiUser" @change="handleSelectIsMultiUser">
                <a-select-option :value="1">ProtocolMode</a-select-option>
                <a-select-option :value="2">ObfsMode</a-select-option>
              </a-select>
            </a-form-item>
          </div>
          <a-form-item :label="$t('node.list.info')">
            <a-input v-model="newNode.info"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.trafficRate')">
            <a-input v-model="newNode.trafficRate"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.nodeGroup')">
            <a-input v-model="newNode.nodeGroup"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.class')">
            <a-input v-model="newNode.nodeClass"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.speedlimit')">
            <a-input v-model="newNode.nodeSpeedlimit"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.type')">
            <a-switch v-model="newNode.show">
              <a-icon slot="checkedChildren" type="check" />
              <a-icon slot="unCheckedChildren" type="close" />
            </a-switch>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block @click="addNode">{{ $i18n.t('setting.add') }}</a-button>
          </a-form-item>
        </a-form>
      </a-drawer>
    </div>
    <a-card :body-style="{padding: '0'}" :bordered="false">
      <s-table ref="table" size="default" rowKey="id" :columns="nodeColumns" :data="loadNodeData">
        <span slot="port" slot-scope="text, record">
          {{ record.sort === 0 ? record.port : (record.sort === 11 ? record.server.split(";")[1] : 0) }}
        </span>
        <span slot="sort" slot-scope="text, record">
          {{ text === 0 ? ( record.obfs.startsWith('simple_obfs') ? 'SS' : 'SSR' ) : ( text === 11 ? 'V2ray' : 'Unknown') }}
        </span>
        <span slot="type" slot-scope="text">
          <a-badge v-if="text === 1" status="success" />
          <a-badge v-else status="error" />
          <span v-if="$i18n.locale === 'zh-CN'">
            {{ text === 1 ? '启用' : '停用' }}
          </span>
          <span v-else>
            {{ text === 1 ? 'Enable' : 'Disable' }}
          </span>
        </span>
        <span slot="nodeHeartbeat" slot-scope="text">
          <a-badge v-if="text > (Date.parse(new Date())/1000 - 90)" status="success" />
          <a-badge v-else status="error" />
          <span v-if="$i18n.locale === 'zh-CN'">
            {{ text > (Date.parse(new Date())/1000 - 120) ? '在线' : '离线' }}
          </span>
          <span v-else>
            {{ text > (Date.parse(new Date())/1000 - 120) ? 'Online' : 'Offline' }}
          </span>
        </span>
        <span slot="online" slot-scope="text, record">
          <span v-if="text === 0">
            {{ text }}
          </span>
          <span v-else>
            <router-link :to="{path: '/admin/node/online/' + record.id}">{{ text }}</router-link>
          </span>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="openEditDrawer(record)">{{ $t('setting.change') }}</a>
            <a-divider type="vertical" />
            <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deleteNodeById(record.id)">
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
      :visible="editDrawer"
      @close="editOnClose"
    >
      <a-form layout="vertical">
        <a-form-item :label="$t('node.list.name')">
          <a-input v-model="editOldNode.name"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.server')">
          <a-input v-model="editOldNode.server"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.sort')">
          <a-select :value="editOldNode.sort" @change="handleSelectEditType">
            <a-select-option :value="0">SS(R)</a-select-option>
            <a-select-option :value="11">V2ray</a-select-option>
          </a-select>
        </a-form-item>
        <div v-if="editOldNode.sort === 0">
          <!--          <a-form-item :label="$t('node.list.port')">
            <a-input v-model="editOldNode.port"/>
          </a-form-item>-->
          <a-form-item :label="$t('node.list.passwd')">
            <a-input v-model="editOldNode.passwd"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.method')">
            <a-input v-model="editOldNode.method"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.protocol')">
            <a-input v-model="editOldNode.protocol"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.obfs')">
            <a-input v-model="editOldNode.obfs"/>
          </a-form-item>
          <a-form-item :label="$t('node.list.isMultiUser')">
            <a-select :value="editOldNode.isMultiUser" @change="handleSelectIsMultiUser">
              <a-select-option :value="1">ProtocolMode</a-select-option>
              <a-select-option :value="2">ObfsMode</a-select-option>
            </a-select>
          </a-form-item>
        </div>
        <a-form-item :label="$t('node.list.info')">
          <a-input v-model="editOldNode.info"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.trafficRate')">
          <a-input v-model="editOldNode.trafficRate"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.nodeGroup')">
          <a-input v-model="editOldNode.nodeGroup"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.class')">
          <a-input v-model="editOldNode.nodeClass"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.speedlimit')">
          <a-input v-model="editOldNode.nodeSpeedlimit"/>
        </a-form-item>
        <a-form-item :label="$t('node.list.type')">
          <a-switch v-model="editOldNode.show">
            <a-icon slot="checkedChildren" type="check" />
            <a-icon slot="unCheckedChildren" type="close" />
          </a-switch>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" block @click="submitEditNode">{{ $i18n.t('setting.change') }}</a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
import { getNode, addNode, submitEditNode, deleteNodeById } from '@/api/node'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      addDrawer: false,
      editDrawer: false,
      newNode: {
        sort: '',
        isMultiUser: ''
      },
      editOldNode: {
        sort: '',
        isMultiUser: ''
      },
      nodeColumns: [
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
          dataIndex: 'nodeClass'
        },
        {
          title: this.$i18n.t('node.list.port'),
          align: 'center',
          dataIndex: 'port',
          scopedSlots: { customRender: 'port' }
        },
        {
          title: this.$i18n.t('node.list.sort'),
          align: 'center',
          dataIndex: 'sort',
          scopedSlots: { customRender: 'sort' }
        },
        {
          title: this.$i18n.t('node.list.info'),
          align: 'center',
          dataIndex: 'info'
        },
        {
          title: this.$i18n.t('node.list.type'),
          align: 'center',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: this.$i18n.t('node.list.heartbeat'),
          align: 'center',
          dataIndex: 'nodeHeartbeat',
          scopedSlots: { customRender: 'nodeHeartbeat' }
        },
        {
          title: this.$i18n.t('node.list.online'),
          align: 'center',
          dataIndex: 'online',
          scopedSlots: { customRender: 'online' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadNodeData: parameter => {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        console.log('loadData request parameters:', requestParameters)
        return getNode(Object.assign(requestParameters))
          .then(res => {
            console.log(res.data.data)
            return res.data
          })
      }
    }
  },
  watch: {
    '$i18n.locale' () {
      this.nodeColumns = [
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
          dataIndex: 'nodeClass'
        },
        {
          title: this.$i18n.t('node.list.port'),
          align: 'center',
          dataIndex: 'port',
          scopedSlots: { customRender: 'port' }
        },
        {
          title: this.$i18n.t('node.list.sort'),
          align: 'center',
          dataIndex: 'sort',
          scopedSlots: { customRender: 'sort' }
        },
        {
          title: this.$i18n.t('node.list.info'),
          align: 'center',
          dataIndex: 'info'
        },
        {
          title: this.$i18n.t('node.list.type'),
          align: 'center',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: this.$i18n.t('node.list.heartbeat'),
          align: 'center',
          dataIndex: 'nodeHeartbeat',
          scopedSlots: { customRender: 'nodeHeartbeat' }
        },
        {
          title: this.$i18n.t('node.list.online'),
          align: 'center',
          dataIndex: 'online',
          scopedSlots: { customRender: 'online' }
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
    openAddDrawer () {
      this.addDrawer = true
    },
    openEditDrawer (value) {
      if (value.type === 1) {
        value.show = true
      } else {
        value.show = false
      }
      this.editOldNode = JSON.parse(JSON.stringify(value))
      this.editDrawer = true
    },
    onClose () {
      this.addDrawer = false
      this.newNode = {
        'sort': '',
        'isMultiUser': ''
      }
    },
    editOnClose () {
      this.editDrawer = false
      this.editOldNode = {
        'sort': '',
        'isMultiUser': ''
      }
    },
    handleSelectType (value) {
      console.log(value)
      this.newNode.sort = value
    },
    handleSelectEditType (value) {
      console.log(value)
      this.editOldNode.sort = value
    },
    handleSelectIsMultiUser (value) {
      console.log(value)
      this.newNode.isMultiUser = value
    },
    async addNode () {
      if (this.newNode.show) {
        this.newNode.type = 1
      } else {
        this.newNode.type = 0
      }
      if (this.newNode.sort === 11) {
        this.newNode.isMultiUser = null
      }
      const result = await addNode(this.newNode)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.addDrawer = false
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async submitEditNode () {
      if (this.editOldNode.show) {
        this.editOldNode.type = 1
      } else {
        this.editOldNode.type = 0
      }
      if (this.editOldNode.sort === 11) {
        this.editOldNode.isMultiUser = null
      }
      const result = await submitEditNode(this.editOldNode)
      if (result.code === 200) {
        this.editDrawer = false
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async deleteNodeById (id) {
      const result = await deleteNodeById(id)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
