<template>
  <div class="locale-changer">
    <button id="languageButton1" @click.prevent="setLocale('en')">English</button>
    <button id="languageButton2" @click.prevent="setLocale('es')">Spanish</button>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['en', 'es'] }
  },
  methods:{
    setLocale(locale)
    {
      this.$i18n.locale = locale
      this.$router.push({
        params: { lang: locale }
      })
    }
  }
}
</script>
<style scoped>
  #languageButton1 {
    position: absolute;
    top: 0;
    right: 102px;
    border: 0px;
    background-color: green;
    font-weight: bold;
    width: 100px;
    height: 30px;
  }
  #languageButton2 {
    position: absolute;
    top: 0;
    right: 0;
    border: 0px;
    background-color: orange;
    font-weight: bold;
    width: 100px;
    height: 30px;
  }
</style>