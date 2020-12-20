<template>
  <div>
    <div>
      <div>
        <a-button type="primary" style="margin-bottom: 10px" @click="openAddDrawer">{{ $i18n.t('setting.add') }}</a-button>
        <a-drawer
          :title="this.$i18n.t('detect.list.addDetect')"
          placement="right"
          width="60%"
          :destroyOnClose="true"
          :visible="addDrawer"
          @close="onClose"
        >
          <a-form layout="vertical">
            <a-form-item :label="$t('detect.list.name')">
              <a-input v-model="newDetect.name"/>
            </a-form-item>
            <a-form-item :label="$t('detect.list.regex')">
              <a-textarea v-model="newDetect.regex" :auto-size="{ minRows: 2, maxRows: 6 }"/>
            </a-form-item>
            <a-form-item :label="$t('detect.list.type')">
              <a-select :value="newDetect.type" @change="handleSelectType">
                <a-select-option :value="1">{{ $i18n.locale === 'zh-CN' ? '明文' : 'Text' }}</a-select-option>
                <a-select-option :value="2">{{ $i18n.locale === 'zh-CN' ? '数据包' : 'Hex' }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" block @click="addDetect">{{ $i18n.t('setting.add') }}</a-button>
            </a-form-item>
          </a-form>
        </a-drawer>
      </div>
      <a-card :body-style="{padding: '0'}" :bordered="false">
        <s-table
          ref="table"
          size="default"
          rowKey="id"
          :columns="detectColumns"
          :data="loadDetectData"
        >
          <span slot="type" slot-scope="text">
            <span v-if="$i18n.locale === 'zh-CN'">
              <a-tag v-if="text === 1" color="pink">
                {{ text === 1 ? '明文' : '数据包' }}
              </a-tag>
              <a-tag v-else color="green">
                {{ text === 1 ? '明文' : '数据包' }}
              </a-tag>
            </span>
            <span v-else>
              <a-tag v-if="text === 1" color="pink">
                {{ text === 1 ? 'Text' : 'Hex' }}
              </a-tag>
              <a-tag v-else color="green">
                {{ text === 1 ? 'Text' : 'Hex' }}
              </a-tag>
            </span>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="openEditDrawer(record)">{{ $t('setting.change') }}</a>
              <a-divider type="vertical" />
              <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deleteDetectById(record.id)">
                <a>{{ $t('setting.delete') }}</a>
              </a-popconfirm>
            </template>
          </span>
        </s-table>
      </a-card>
      <a-drawer
        :title="this.$i18n.t('detect.list.editDetect')"
        placement="right"
        width="60%"
        :destroyOnClose="true"
        :visible="editDrawer"
        @close="editOnClose"
      >
        <a-form layout="vertical">
          <a-form-item :label="$t('detect.list.name')">
            <a-input v-model="editOldDetect.name"/>
          </a-form-item>
          <a-form-item :label="$t('detect.list.regex')">
            <a-textarea v-model="editOldDetect.regex" :auto-size="{ minRows: 2, maxRows: 6 }"/>
          </a-form-item>
          <a-form-item :label="$t('detect.list.type')">
            <a-select :value="editOldDetect.type" @change="handleEditSelectType">
              <a-select-option :value="1">{{ $i18n.locale === 'zh-CN' ? '明文' : 'Text' }}</a-select-option>
              <a-select-option :value="2">{{ $i18n.locale === 'zh-CN' ? '数据包' : 'Hex' }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" block @click="submitEditDetect">{{ $i18n.t('setting.change') }}</a-button>
          </a-form-item>
        </a-form>
      </a-drawer>
    </div>
    <!--#########################################-->
    <div>
      <div style="color: rgba(0, 0, 0, 0.85);font-size: 20px;font-weight: 500;line-height: 28px;margin: 12px 0;">
        <div>
          <span>{{ $i18n.t('detect.list.nodeWithDetects') }}</span>
        </div>
        <div>
          <a-button type="primary" style="margin: 10px 0" @click="openAddNodeWithDetectDrawer">{{ $i18n.t('setting.add') }}</a-button>
          <a-drawer
            :title="this.$i18n.t('detect.list.addDetect')"
            placement="right"
            width="60%"
            :destroyOnClose="true"
            :visible="addNodeWithDetectDrawer"
            @close="nodeWithDetectsClose"
          >
            <a-form layout="vertical">
              <a-form-item :label="$t('detect.list.oneNode')">
                <a-select style="width: 100%" :value="addNodeWithDetectNodeId" @change="handleNodeChange">
                  <a-select-option v-for="(node) in allNodes" :key="node.id">
                    {{ node.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item :label="$t('detect.list.manyDetects')">
                <a-select style="width: 100%" mode="multiple" @change="handleDetectChange">
                  <a-select-option v-for="(detect) in allDetects" :key="detect.id">
                    {{ detect.name }}
                  </a-select-option>
                </a-select>
              </a-form-item>

              <a-form-item>
                <a-button type="primary" block @click="addNodeWithDetect">{{ $i18n.t('setting.add') }}</a-button>
              </a-form-item>
            </a-form>
          </a-drawer>
        </div>
        <a-card :body-style="{padding: '0'}" :bordered="false">
          <s-table
            ref="table"
            size="default"
            rowKey="nodeId"
            :columns="nodeWithDetectsColumns"
            :data="loadNodeWithDetectsData"
          >
            <span slot="nodeId" slot-scope="text">
              <span v-if="text === node.id" :key="node.id" v-for="(node) in detectNodeList" color="cyan">
                {{ node.name }}
              </span>
            </span>
            <span slot="data" slot-scope="record">
              <a-tag :key="detect.id" v-for="(detect) in record" color="cyan">
                {{ detect.name }}
              </a-tag>
            </span>
            <span slot="action" slot-scope="text, record">
              <template>
                <a @click="openNodeWithDetectEditDrawer(record)">{{ $t('setting.change') }}</a>
                <a-divider type="vertical" />
                <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deleteNodeWithDetectById(record.nodeId)">
                  <a>{{ $t('setting.delete') }}</a>
                </a-popconfirm>
              </template>
            </span>
          </s-table>
        </a-card>
        <a-drawer
          :title="this.$i18n.t('detect.list.editDetect')"
          placement="right"
          width="60%"
          :destroyOnClose="true"
          :visible="editNodeWithDetectDrawer"
          @close="editNodeWithDetectsClose"
        >
          <a-form layout="vertical">
            <a-form-item :label="$t('detect.list.oneNode')">
              <a-select style="width: 100%" :value="editNodeWithDetectNodeId" @change="handleNodeChange">
                <a-select-option v-if="node.id === editNodeWithDetectNodeId" v-for="(node) in detectNodeList" :key="node.id">
                  {{ node.name }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item :label="$t('detect.list.manyDetects')">
              <a-select style="width: 100%" mode="multiple" :default-value="editNodeWithDetectDetectList" @change="handleEditDetectChange">
                <a-select-option v-for="(detect) in allDetects" :key="detect.id">
                  {{ detect.name }}
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item>
              <a-button type="primary" block @click="submitEditNodeWithDetect">{{ $i18n.t('setting.change') }}</a-button>
            </a-form-item>
          </a-form>
        </a-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllNodes, getAllDetects, getDetect, addDetect, submitEditDetect, deleteDetectById, getNodeWithDetect, addNodeWithDetect, submitEditNodeWithDetect, deleteNodeWithDetectById } from '@/api/detect'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      allNodes: [],
      detectNodeList: [],
      allDetects: [],
      addDrawer: false,
      editDrawer: false,
      newDetect: {
        'type': ''
      },
      editOldDetect: {
        'type': ''
      },
      detectColumns: [
        {
          title: '#',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('detect.list.name'),
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: this.$i18n.t('detect.list.regex'),
          align: 'center',
          width: '50%',
          dataIndex: 'regex',
          scopedSlots: { customRender: 'regex' }
        },
        {
          title: this.$i18n.t('detect.list.type'),
          align: 'center',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: this.$i18n.t('detect.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadDetectData: parameter => {
        return getDetect(Object.assign(parameter))
          .then(res => {
            // console.log(res)
            return res.data
          })
      },
      /* ########################## */
      addNodeWithDetectDrawer: false,
      editNodeWithDetectDrawer: false,
      addNodeWithDetectNodeId: '',
      addNodeWithDetectDetectList: [],
      editNodeWithDetectNodeId: '',
      editNodeWithDetectDetect: {},
      editNodeWithDetectDetectList: [],
      nodeWithDetectsColumns: [
        {
          title: this.$i18n.t('detect.list.nodeName'),
          align: 'center',
          dataIndex: 'nodeId',
          scopedSlots: { customRender: 'nodeId' }
        },
        {
          title: this.$i18n.t('detect.list.detects'),
          align: 'center',
          width: '70%',
          dataIndex: 'data',
          scopedSlots: { customRender: 'data' }
        },
        {
          title: this.$i18n.t('detect.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadNodeWithDetectsData: parameter => {
        return getNodeWithDetect(Object.assign(parameter))
          .then(res => {
            // console.log(res)
            return res.data
          })
      }
    }
  },
  watch: {
    '$i18n.locale' () {
      this.detectColumns = [
        {
          title: '#',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('detect.list.name'),
          align: 'center',
          dataIndex: 'name'
        },
        {
          title: this.$i18n.t('detect.list.regex'),
          align: 'center',
          width: '50%',
          dataIndex: 'regex',
          scopedSlots: { customRender: 'regex' }
        },
        {
          title: this.$i18n.t('detect.list.type'),
          align: 'center',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: this.$i18n.t('detect.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
      this.nodeWithDetectsColumns = [
        {
          title: this.$i18n.t('detect.list.nodeId'),
          align: 'center',
          dataIndex: 'nodeId'
        },
        {
          title: this.$i18n.t('detect.list.detects'),
          align: 'center',
          dataIndex: 'data',
          scopedSlots: { customRender: 'data' }
        },
        {
          title: this.$i18n.t('detect.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  async created () {
    const allNodesResult = await getAllNodes()
    if (allNodesResult.code === 200) {
      this.allNodes = allNodesResult.data.allNodes
      this.detectNodeList = allNodesResult.data.detectNodeList
    }
    const allDetectsResult = await getAllDetects()
    if (allDetectsResult.code === 200) {
      this.allDetects = allDetectsResult.data.allDetects
    }
  },
  methods: {
    openAddDrawer () {
      this.addDrawer = true
    },
    handleSelectType (value) {
      this.newDetect.type = value
    },
    handleEditSelectType (value) {
      this.editOldDetect.type = value
    },
    async addDetect () {
      const result = await addDetect(this.newDetect)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.addDrawer = false
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    onClose () {
      this.addDrawer = false
      this.newDetect = {
        'type': ''
      }
    },
    openEditDrawer (value) {
      this.editOldDetect = JSON.parse(JSON.stringify(value))
      this.editDrawer = true
    },
    async submitEditDetect () {
      const result = await submitEditDetect(this.editOldDetect)
      if (result.code === 200) {
        this.editDrawer = false
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    editOnClose () {
      this.editDrawer = false
      this.editOldDetect = {
        'type': ''
      }
    },
    async deleteDetectById (id) {
      const result = await deleteDetectById(id)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    /* ##################################### */
    openAddNodeWithDetectDrawer () {
      this.addNodeWithDetectDrawer = true
    },
    handleNodeChange (value) {
      console.log(`selected ${value}`)
      this.addNodeWithDetectNodeId = value
    },
    handleDetectChange (value) {
      console.log(`selected ${value}`)
      const list = value.toString().split(',')
      this.addNodeWithDetectDetectList = []
      for (let i = 0; i < list.length; i++) {
        this.addNodeWithDetectDetectList.push(list[i])
      }
    },
    async addNodeWithDetect () {
      const params = {
        'nodeId': this.addNodeWithDetectNodeId,
        'detectIds': this.addNodeWithDetectDetectList
      }
      const result = await addNodeWithDetect(params)
      if (result.code === 200) {
        // 将该id从allNodes转移到detectNodes
        this.allNodes.forEach((node, i, arr) => {
          if (arr[i].id === this.addNodeWithDetectNodeId) {
            this.detectNodeList.push(arr[i])
            arr.splice(i, 1)
          }
        })
        // 对detectNodeList重新排序
        this.detectNodeList.sort(function (a, b) {
          return a.id - b.id
        })
        this.addNodeWithDetectNodeId = ''
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.addNodeWithDetectDrawer = false
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    nodeWithDetectsClose () {
      this.addNodeWithDetectDrawer = false
    },
    openNodeWithDetectEditDrawer (value) {
      this.editNodeWithDetectNodeId = value.nodeId
      this.editNodeWithDetectDetect = JSON.parse(JSON.stringify(value))
      // 初始化已选择的审计,重新设置
      this.editNodeWithDetectDetectList = []
      for (let i = 0; i < this.allDetects.length; i++) {
        for (let j = 0; j < value.data.length; j++) {
          if (this.allDetects[i].id === value.data[j].id) {
            this.editNodeWithDetectDetectList.push(this.allDetects[i].id)
          }
        }
      }
      this.editNodeWithDetectDrawer = true
    },
    handleEditDetectChange (value) {
      console.log(`selected ${value}`)
      const list = value.toString().split(',')
      this.editNodeWithDetectDetectList = []
      for (let i = 0; i < list.length; i++) {
        this.editNodeWithDetectDetectList.push(list[i])
      }
    },
    async submitEditNodeWithDetect () {
      const params = {
        'nodeId': this.editNodeWithDetectNodeId,
        'detectIds': this.editNodeWithDetectDetectList
      }
      const result = await submitEditNodeWithDetect(params)
      if (result.code === 200) {
        this.editNodeWithDetectNodeId = ''
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.editNodeWithDetectDrawer = false
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    editNodeWithDetectsClose () {
      this.editNodeWithDetectDrawer = false
    },
    async deleteNodeWithDetectById (id) {
      const result = await deleteNodeWithDetectById(id)
      if (result.code === 200) {
        // 将该id从detectNodes转移到allNodes
        this.detectNodeList.forEach((node, i, arr) => {
          if (arr[i].id === id) {
            this.allNodes.push(arr[i])
            arr.splice(i, 1)
          }
        })
        // 对allNodes重新排序
        this.allNodes.sort(function (a, b) {
          return a.id - b.id
        })
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
