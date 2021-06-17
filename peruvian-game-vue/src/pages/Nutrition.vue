<template>
  <article>
    <h1>Nutrition Info:</h1>

    <h2>Eating</h2>

    <!--<p class = "p1">{{ $t('nutrition1') }}</p>-->
    <p class = "p1">
      {{ $t('nutrition.nutrition1') }}
    </p>

    <span id = "image1">
        <img src="../assets/pyramid.jpg">
    </span>

    <ul>
      <li>{{ $t('nutrition.nutrition2') }}</li>
      <li>{{ $t('nutrition.nutrition3') }}</li>
      <li>{{ $t('nutrition.nutrition4') }}</li>
    </ul>

    <p id = "p2">
      {{ $t('nutrition.nutrition5') }}<br>{{ $t('nutrition.nutrition6') }}
    </p>

    <h2>{{ $t('nutrition.nutrition7') }}</h2>

    <h3>{{ $t('nutrition.nutrition8') }}</h3>

    <span class = "image2">
      <img src="../assets/vegetables.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      {{ $t('nutrition.nutrition9') }}
    </p>

    <h3>{{ $t('nutrition.nutrition10') }}</h3>

    <span class = "image2">
      <img src="../assets/fruits.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      {{ $t('nutrition.nutrition11') }}
    </p>

    <h3>{{ $t('nutrition.nutrition12') }}</h3>

    <span class = "image2">
      <img src="../assets/wheat.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      {{ $t('nutrition.nutrition13') }}
    </p>

    <h3>{{ $t('nutrition.nutrition14') }}</h3>

    <span class = "image2">
      <img src="../assets/protein.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      {{ $t('nutrition.nutrition15') }}
    </p>

    <h3>{{ $t('nutrition.nutrition16') }}</h3>

    <span class = "image2">
      <img src="../assets/dairy.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      {{ $t('nutrition.nutrition17') }}
    </p>

    <h3>{{ $t('nutrition.nutrition18') }}</h3>

    <span class = "image2">
      <img src="../assets/oil.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      {{ $t('nutrition.nutrition19') }}
    </p>

    <p class = "p3">
      {{ $t('nutrition.nutrition20') }}
      <a href="https://www.freepik.com/free-photos-vectors/food" v-html="$t('nutrition.nutrition21')" />,
      <a href="https://www.freepik.com/free-photos-vectors/food" v-html="$t('nutrition.nutrition22')" />,
      <a href="https://www.freepik.com/free-photos-vectors/banner" v-html="$t('nutrition.nutrition23')" />,
      <a href="http://thenutritionsource.org/" v-html="$t('nutrition.nutrition24')" />,
    </p>

    <p id = "p4">
      {{ $t('nutrition.nutrition5') }}<br>{{ $t('nutrition.nutrition25') }}
    </p>
  </article>
</template>

<script>
export default {
  components: { 

   },
  name: 'HelloWorld',
  props: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .p1{
      position: relative;
      margin: 20px;
      width: 50%;
      font-size: 20px;
      margin-bottom: 30px;
  }
  #p2{
    padding: 40px;
    margin: 20px;
    border: 2px solid aqua;
    display: block;
    width: 60%;
  }
  .p3{
    margin-left: 20px;
    margin-top: 150px;
    font-size: 10px;
  }

  #p4{
    border: 2px solid aqua;
    display: block;
    padding: 40px;
    margin: 20px;
    width: 20%;
    position: absolute;
    right: 5px;
    top: 1000px
  }

  #image1{
      position: absolute;
      right: 10px;
  }

  .image2{
      position: absolute;
      right: 500px;
  }

  ul{
    margin: 20px;
  }
  h2{
    margin: 20px;
  }
  h3{
    margin: 20px;
    margin-top: 40px;
  }
  h1{
    margin: 20px;
  }
</style>