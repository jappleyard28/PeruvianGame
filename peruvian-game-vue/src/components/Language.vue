<template>
    <div>
      <button v-on:click="languageButton()">Language</button>
      <nav class="container mb-4 mt-4">
        <div class="row">
          <div class="col-9"></div>
          <div class="col-3">
          <select class="custom-select" v-model="lang" @change="handleChange($event)">
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>
          </div>
        </div>
      </nav>
    
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  computed: {
    lang: () => localStorage.getItem("lang") || "en"
  },
  methods:{
    /*languageButton()
    {
      alert("test");
    }*/
    handleChange(event)
    {
      localStorage.setItem('lang', event.target.value);
      window.location.reload();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
