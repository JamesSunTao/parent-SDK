import Vue from 'vue'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Raven.config('https://79cf9c13ec2b49b4927fc5e717a05069@sentry.vipkid.com.cn/182').addPlugin(RavenVue, Vue).install()
