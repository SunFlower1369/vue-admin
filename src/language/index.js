import Vue from 'vue'
import Element from 'element-ui'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)


const messages = {
    zh: {
        navMenu: {
            home: '首页',
            ...zhLocale 
        }
    },
    en: {
        navMenu: {
            home: 'home',
            ...enLocale
        }
    }
}

// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'zh', // 设置地区
    messages, // 设置地区信息
    silentTranslationWarn:true //去除国际化警告
})
//兼容写法
// Vue.use(Element, {
//     i18n: (key, value) => i18n.t(key, value)
//   })

// 通过 `i18n` 选项创建 Vue 实例
// new Vue({ i18n }).$mount('#app')
export default i18n

  // 现在应用程序已经准备好了！