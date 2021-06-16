<template>
  <article class="main">
    <h1>Nutrition Info:</h1>

    <h2>Eating</h2>

    <p class = "p1">
      The Healthy Eating pyramid represents how much of the type of food should be eaten by the size of
      its part in the pyramid. 
    </p>

    <span id = "image1">
        <img src="../assets/pyramid.jpg">
    </span>

    <ul>
      <li>Vegetables, fruits, whole grains, healthy oils, and healthy proteins like nuts, beans, fish, and chicken eaten as often as possible.</li>
      <li>Diary products eaten smaller portions.</li>
      <li>Red meat, butter and white bread, rice and pasta eaten as little as possible.</li>
    </ul>

    <p id = "p2">
      Tip!<br>Goal milk has more calcium, potassium and vitamin A than cow milk so it is healthier and more nutrious
    </p>

    <h2>Food groups</h2>

    <h3>Vegetables</h3>

    <span class = "image2">
      <img src="../assets/vegetables.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      They are an important source of vitamins, minerals and fiber. There are four different groups - dark-green vegetables (brocolli, spinach), 
      red (tomato) and orange (carrot) vegetables, legumes (beans and peas) and starchy (corn and green peas) vegetables.
    </p>

    <h3>Fruits</h3>

    <span class = "image2">
      <img src="../assets/fruits.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      There are citrus fruits like oranges and grapefruits, many type of berries, and others. Some of them give fiber that helps keep your
      digestive moving. 
    </p>

    <h3>Grains</h3>

    <span class = "image2">
      <img src="../assets/wheat.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      There are whole grains, which contain the entire kernel, and refined grains. Whole grains include whole wheat, oatmeal, and brown rice
      which provide iron, vitamin B and fiber. Some refined grains are white flour, white bread, and white rice. 
    </p>

    <h3>Proteins</h3>

    <span class = "image2">
      <img src="../assets/protein.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      Protein can come from animals (seafood, meat, poultry and eggs) and plants (nuts, beans and peas, seeds and soy products). It is best
      to choose lean meats and poultry because they have low fat. It is also recommended to eat seafood rich in omega-3 fatty acids,
       such as salmon, trout and herring. 
    </p>

    <h3>Dairy</h3>

    <span class = "image2">
      <img src="../assets/dairy.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      They are from drinking milk, eating yoghurt and cheese, or if you prefer non-animal like soybeans. Low-fat or fat-free dairy
      products are better as they give imporant vitamans and minerals, as well as less fat.
    </p>

    <h3>Oil</h3>

    <span class = "image2">
      <img src="../assets/oil.jpg" style="width:150px;height:150px;">
    </span>

    <p class = "p1">
      Oils are high in calories, but they contain important nutrients like vitamin E. 
    </p>

    <p class = "p3">
      Images from <a href="https://www.freepik.com/free-photos-vectors/food">Food vector created by valadzionak_volha - www.freepik.com</a>, 
      <a href="https://www.freepik.com/free-photos-vectors/food">Food vector created by pch.vector - www.freepik.com</a>, 
      <a href="https://www.freepik.com/free-photos-vectors/banner">Banner vector created by macrovector - www.freepik.com</a>, 
      <a href="http://thenutritionsource.org/">www.thenutritionsource.org</a>

    </p>

    <p id = "p4">
      Tip!<br>Canned foods and fresh products like fruits can be kept outside of the fridge. 
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