<template>
  <div>
    <h1>{{ $t('nav.contactUs') }}</h1><br><br> 
    <h2>{{ $t('contactUs.contactUs1') }}</h2>
    <a href="mailto:lochinn@gmail.com" class="flexItem">lochinn@gmail.com</a><br>
    <h2>{{ $t('contactUs.contactUs2') }}</h2>
		<a href="tel:+01244123456" class="flexItem">01244 123456</a>
    <p>{{ $t('contactUs.contactUs3') }}</p>
    <div id="form">
      <form>
            <fieldset>
          <legend>{{ $t('contactUs.contactUs4') }}</legend><br><br>
          <label for="contactFirstName" class="userInfo">{{ $t('contactUs.contactUs5') }}</label>
          <input type="text" id="contactFirstName" class="textBox" required><br><br>
          
          <label for="contactSurname" class="userInfo">{{ $t('contactUs.contactUs6') }}</label>
          <input type="text" id="contactSurname" class="textBox" required><br><br>
          
          <label for="contactEmail" class="userInfo">{{ $t('contactUs.contactUs7') }}</label>
          <input type="email" id="contactEmail" class="textBox" required><br><br>
          
          <label for="contactPhoneNumber" class="userInfo">{{ $t('contactUs.contactUs8') }}</label>
          <input type="text" id="contactPhoneNumber" class="textBox" required><br><br>
          
          <label for="message" class="userInfo">{{ $t('contactUs.contactUs9') }}</label>
          <textarea rows="5" cols="40" id="message" class="textBox"></textarea>
        </fieldset>
        <input type="submit" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  components: {}
}
</script>

<style scoped>
  #form {
    text-align: left;
  }

  .userInfo {
    width: 90px;
  }

  form {
    width : 50%;
    height : 100%;
    margin: auto;
  }

  fieldset {
    border-color: gray;
  }

  form {
    padding: 10px;
    border: 2px solid black;
  }

  legend {
    height: 35px;
    text-align: center;
    font-size: 200%;
  }

  input, textarea {
    margin: 5px;
  }

  label {
    display: inline-block;
    float: left;
    clear: left;
    width: 250px;
    text-align: left;
  }

  .textBox {
    width: 85%;
  }
</style>
