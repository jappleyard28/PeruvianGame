<template>
  <div class="main">
    <h1>Contact Us</h1><br><br> 
    <div>
      <form>
        <fieldset>
          <legend>Contact info:</legend>
          <label for="contactFirstName" class="userInfo">First name:</label>
          <input type="text" id="contactFirstName" required><br>
          
          <label for="contactSurname" class="userInfo">Surname:</label>
          <input type="text" id="contactSurname" required><br>
          
          <label for="contactEmail" class="userInfo">Email:</label>
          <input type="email" id="contactEmail" required><br>
          
          <label for="contactPhoneNumber" class="userInfo">Phone number:</label>
          <input type="text" id="contactPhoneNumber" required><br>
          
          <label for="message" class="userInfo">Message:</label>
          <textarea rows="5" cols="40" id="message"></textarea>
        </fieldset>
      </form>
    </div>
    <h2></h2>
    <h2></h2>
    <h2></h2>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
  components: {}
}
</script>

<style scoped>

  .userInfo {
    width: 90px;
  }

  form {
    width : 40%;
    height : 100%;
    background-color: white;
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
</style>
