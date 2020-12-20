<template>
  <page-header-wrapper :breadcrumb="{}">
    <div v-if="loading" style="text-align: center;margin: 40px 0">
      <a-spin size="large" tip="Loading..." :spinning="loading"/>
    </div>
    <div v-else>
      <div>
        <a-input v-model="tutorial.name" style="width: 160px" :placeholder="$i18n.locale === 'zh-CN' ? '名称' : 'Name'" />
        <a-select v-model="tutorial.type" style="width: 160px;margin-left: 7px" :placeholder="$i18n.locale === 'zh-CN' ? '请选择' : 'Please select'" @change="handleSelectType">
          <a-select-option :value="'Windows'">Windows</a-select-option>
          <a-select-option :value="'Android'">Android</a-select-option>
          <a-select-option :value="'Mac'">Mac</a-select-option>
          <a-select-option :value="'iOS'">iOS</a-select-option>
        </a-select>
      </div>
      <div>
        <div v-if="!edit">
          <a-button type="primary" block style="margin-top: 10px;width: 327px" @click="addTutorial">{{ $i18n.t('setting.add') }}</a-button>
        </div>
        <div v-else>
          <a-button type="primary" block style="margin-top: 10px;width: 160px" @click="updateTutorialById">{{ $i18n.t('setting.save') }}</a-button>
          <a-button type="danger" block style="margin-top: 10px;width: 160px;margin-left: 7px" @click="cancelUpdate">{{ $i18n.t('setting.cancel') }}</a-button>
        </div>
      </div>

      <div id="editor">
        <v-md-editor v-model="tutorial.markdownContent" style="height: 100%"/>
      </div>

      <a-card :body-style="{padding: '0'}" :bordered="false">
        <s-table ref="table" size="default" rowKey="id" :columns="nodeColumns" :data="loadData">
          <span slot="enable" slot-scope="text">
            <a-badge v-if="text === true" status="success" />
            <a-badge v-else status="error" />
            <span v-if="$i18n.locale === 'zh-CN'">
              {{ text === true ? '启用' : '禁用' }}
            </span>
            <span v-else>
              {{ text === true ? 'Enable' : 'Disable' }}
            </span>
          </span>
          <span slot="action" slot-scope="text, record">
            <template>
              <a @click="editTutorial(record)">{{ $t('setting.change') }}</a>
              <a-divider type="vertical" />
              <a-popconfirm :title="$t('setting.deleteConfirm')" :ok-text="$t('setting.yes')" :cancel-text="$t('setting.no')" @confirm="deleteTutorialById(record.id)">
                <a>{{ $t('setting.delete') }}</a>
              </a-popconfirm>
            </template>
          </span>
        </s-table>
      </a-card>
    </div>
  </page-header-wrapper>
</template>

<script>
import { getTutorial, addTutorial, updateTutorialById, deleteTutorialById } from '@/api/tutorial'
import { STable } from '@/components'

export default {
  components: {
    STable
  },
  data () {
    return {
      loading: true,
      tutorial: {},
      edit: false,
      nodeColumns: [
        {
          title: '#',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('detect.list.name'),
          align: 'center',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: this.$i18n.t('detect.list.type'),
          align: 'center',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
        },
        {
          title: this.$i18n.t('node.list.operation'),
          align: 'center',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      loadData: parameter => {
        return getTutorial(Object.assign(parameter))
          .then(res => {
            return res.data
          })
      }
    }
  },
  created () {
    setTimeout(() => {
      this.loading = false
    }, 300)
  },
  watch: {
    '$i18n.locale' () {
      this.nodeColumns = [
        {
          title: '#',
          align: 'center',
          dataIndex: 'id'
        },
        {
          title: this.$i18n.t('detect.list.name'),
          align: 'center',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: this.$i18n.t('detect.list.type'),
          align: 'center',
          dataIndex: 'type',
          scopedSlots: { customRender: 'type' }
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
    handleSelectType (value) {
      this.tutorial.type = value
    },
    editTutorial (value) {
      this.edit = true
      this.tutorial = value
    },
    cancelUpdate () {
      this.edit = false
      this.tutorial = {}
    },
    async addTutorial () {
      if (this.tutorial.name === '' || this.tutorial.name === undefined || this.tutorial.name === null || this.tutorial.type === '' || this.tutorial.type === undefined || this.tutorial.type === null) {
        this.$i18n.locale === 'zh-CN' ? this.$message.info('请输入信息') : this.$message.info('Please input the info')
        return
      }
      const result = await addTutorial(this.tutorial)
      if (result.code === 200) {
        this.tutorial = {}
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async updateTutorialById () {
      const result = await updateTutorialById(this.tutorial)
      if (result.code === 200) {
        this.tutorial = {}
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    },
    async deleteTutorialById (id) {
      const result = await deleteTutorialById(id)
      if (result.code === 200) {
        this.$refs.table.refresh() // refresh() 不传参默认值 false 不刷新到分页第一页
        this.$i18n.locale === 'zh-CN' ? this.$message.success(result.message) : this.$message.success(result.messageEnglish)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  #editor {
    margin: 20px auto;
    height: 400px;
  }
  .v-note-wrapper {
    z-index: 1;
  }
</style>
