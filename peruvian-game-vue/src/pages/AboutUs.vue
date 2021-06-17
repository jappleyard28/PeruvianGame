<template>
  <div>
    <h1>{{ $t('aboutUs.aboutUs1') }}</h1>
    <h2>{{ $t('aboutUs.aboutUs2') }}</h2> <!--make it so that when the user clicks on each picture (of that person) it will show some text underneath about them-->
    <p>{{ $t('aboutUs.aboutUs3') }}</p>
    <div class="row">
      <div class="column">
        <img src="../assets/jack.jpg" alt="Jack" style="width:100%" @click="showInfo('jack')">
        <b>Jack Appleyard</b>
        <p class="people" id="jack" style="visibility: hidden">
          {{ $t('aboutUs.aboutUs4') }}
        </p>
      </div>
      <div class="column">
        <img src="../assets/usama.jpg" alt="Usama" style="width:100%" @click="showInfo('usama')">
        <b>Usama Imtiaz</b>
        <p class="people" id="usama" style="visibility: hidden">
          {{ $t('aboutUs.aboutUs5') }}
        </p>
      </div>
      <div class="column">
        <img src="../assets/yan.jpg" alt="Yan" style="width:100%" @click="showInfo('yan')">
        <b>Yan Pfister</b>
        <p class="people" id="yan" style="visibility: hidden">
          {{ $t('aboutUs.aboutUs6') }}
        </p>
      </div>
      <div class="column">
        <img src="../assets/tiger.jpg" alt="Kathapet" style="width:100%" @click="showInfo('kathapet')">
        <b>Kathapet Nawongs</b>
        <p class="people" id="kathapet" style="visibility: hidden">
          {{ $t('aboutUs.aboutUs7') }}
        </p>
      </div>
      <div class="column">
        <img src="../assets/nathan.jpg" alt="Nathan" style="width:100%" @click="showInfo('nathan')">
        <b>Nathan Davis</b>
        <p class="people" id ="nathan" style="visibility: hidden">
          {{ $t('aboutUs.aboutUs8') }}
        </p>
      </div>
    </div><br><br>
    
    <h2>{{ $t('aboutUs.aboutUs9') }}</h2>
    <p class="section">
      {{ $t('aboutUs.aboutUs10') }}
    </p> 
    
    <br><br>  
    <h2>{{ $t('aboutUs.aboutUs11') }}</h2>
    <p class="section">{{ $t('aboutUs.aboutUs12') }}</p>
    <a href="https://nutritionfacts.org/" v-html="$t('aboutUs.aboutUs13')" /><br>
    <a href="https://www.bbcgoodfood.com/recipes/collection/quick-and-healthy-recipes" v-html="$t('aboutUs.aboutUs14')" /><br>
    <a href="https://www.nrdc.org/stories/renewable-energy-clean-facts" v-html="$t('aboutUs.aboutUs15')" /><br>
    <a href="https://www.bbc.co.uk/bitesize/examspecs/z9p3mnb" v-html="$t('aboutUs.aboutUs16')" /><br>
    <a href="https://www.bbc.co.uk/bitesize/subjects/zpm6fg8" v-html="$t('aboutUs.aboutUs17')" /><br>
    <a href="https://www.bbc.co.uk/bitesize/subjects/zs6hvcw" v-html="$t('aboutUs.aboutUs18')" /><br> 
    <a href="https://www.bbc.co.uk/bitesize/examspecs/zpgcbk7" v-html="$t('aboutUs.aboutUs19')" /><br>
    <a href="https://www.duolingo.com/courses/es" v-html="$t('aboutUs.aboutUs20')" /><br>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
  components: {},
  methods:{
    changeVisibility:function(num)
    {
      const people = ["jack", "usama", "yan", "kathapet", "nathan"];
      for (var i = 0; i < people.length; i++)
      {
        if (i == num)
        {
          document.getElementById(people[i]).style.visibility='visible';
        }
        else
        {
          document.getElementById(people[i]).style.visibility='hidden';
        }
      }
    },
    showInfo:function(person)
    {
      if (person == "jack")
      {
        this.changeVisibility(0);
      }
      else if (person == "usama")
      {
        this.changeVisibility(1);
      }
      else if (person == "yan")
      {
        this.changeVisibility(2);
      }
      else if (person == "kathapet")
      {
        this.changeVisibility(3);
      }
      else if (person == "nathan")
      {
        this.changeVisibility(4);
      }
    },
  }
}
</script>
<style scoped>
  img {
    text-align: center;
    width: 200px;
    height: 200px;
  }

  .row {
    display: flex;
  }

  .column {
    flex: 15%;
    padding: 5px;
  }

  .people {
    padding-left: 5%;
  }

  .section {
    padding-left: 10%;
    padding-right: 10%;
  }
</style>
