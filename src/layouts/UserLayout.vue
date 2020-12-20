<template>
  <div id="userLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <select-lang style="float: right" />
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <span class="title"> {{ this.title }} </span>
          </a>
        </div>
      </div>

      <router-view />

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
  mounted () {
    document.body.classList.add('userLayout')
    this.title = config.title
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
      padding: 110px 0 144px;
      position: relative;

      a {
        text-decoration: none;
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
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
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
