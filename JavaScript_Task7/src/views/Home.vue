<template>
  <div class="home">
    <div class="title-bar">
      <h1>Food app</h1>
      <button v-on:click="changeLanguage('est')">Eesti</button>
      <button v-on:click="changeLanguage('eng')">English</button>
    </div>
    <div class="food-item-list">
      <food-card
        v-for="foodItem in foodItems"
        :title="language === 'est' ? foodItem.name_est : foodItem.name_eng"
        :providers="foodItem.providers"
        :price="foodItem.price"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import FoodCard from '@/components/FoodCard.vue'

export default {
  name: 'home',
  components: {
    FoodCard
  },
  data () {
    return {
      foodItems: null,
      language: 'est'
    }
  },
  methods: {
    changeLanguage: function (language) {
      console.log(language)
      this.language = language
    }
  },
  mounted() {
    this.$http.get('https://api.fuud.ituk.ee/daily').then(res => {
      this.foodItems = res.body.data
    })
  }
}
</script>
