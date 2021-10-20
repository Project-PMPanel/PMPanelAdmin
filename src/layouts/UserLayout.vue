<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="container">
      <div>
        <a-card class="container-wrap">
          <span class="title"> {{ this.title }} Admin </span>
          <select-lang style="float: right" />
          <router-view />
        </a-card>
      </div>

      <div class="footer">
        <div class="links">
          <!--<a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>-->
        </div>
        <div class="copyright">
          Copyright &copy; {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'
import storage from 'store'
import { getSiteConfig } from '@/api/auth'
import config from '@/config/defaultSettings'

export default {
  components: {
    config
  },
  name: 'UserLayout',
  mixins: [deviceMixin],
  data () {
    return {
      title: ''
    }
  },
  watch: {
    '$i18n.locale' () {
      document.title = this.$i18n.locale === 'zh-CN' ? '登录 - ' + this.title : 'Login - ' + this.title
    }
  },
  async created () {
    // get config
    if (storage.get('SITE_TITLE') === undefined) {
      const result = await getSiteConfig()
      if (result.code === 200) {
        storage.set('SITE_TITLE', result.data.panelSiteTitle)
        this.title = result.data.panelSiteTitle
      }
    } else {
      this.title = config.title
    }
    document.title = this.$i18n.locale === 'zh-CN' ? '登录 - ' + this.title : 'Login - ' + this.title
    document.body.classList.add('userLayout')
  },
  beforeDestroy () {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/background.svg) no-repeat 50%;
    background-size: 100%;
    display:flex;
    justify-content:center;  //子元素水平居中
    align-items:center;      //子元素垂直居中

    /deep/ .ant-form-item{
      margin-bottom: 10px;
    }

    a {
      text-decoration: none;
    }

    .container-wrap {
      width: 320px;
      border-radius: 4px;
    }

    .title {
      text-align: center;
      vertical-align: text-bottom;
      font-size: 30px;
      display: inline-block;
      font-weight: 600;
      color: #1790fe;
      background-image: linear-gradient(
        -20deg
        ,#6e45e2,#88d3ce);
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .title {
          font-size: 33px;
          color: rgb(70, 150, 230);
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
    }

    .main {
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
