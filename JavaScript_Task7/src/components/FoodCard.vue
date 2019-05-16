<template>
  <div class="food-card">
    <h1>{{ title }}</h1>
    <h2 v-for="provider in providers">{{ provider }}</h2>
    <span>{{ price }}</span>
  </div>
</template>

<script>
  export default {
    name: "FoodCard",
    props: {
      title: String,
      providers: Array,
      price: String
    }
  }
</script>

<style scoped>
.food-card {
  background: aquamarine;
  margin-top: 30px;
  width: 30%;
}
</style>
