<template>
  <div class="container">
    <app-corona-box></app-corona-box>
    <app-title-popular-events></app-title-popular-events>
    <app-popular-events-table></app-popular-events-table>
    <app-popular-category-title></app-popular-category-title>
    <app-popular-category></app-popular-category>
  </div>
</template>
<script>
import CoronaBox from "./contentComponents/CoronaBox";
import TitlePopularEvents from "./ContentComponents/TitlePopularEvents";
import PopularEventsTable from "./contentComponents/PopularEventsTable";
import PopularCategoryTitle from "./contentComponents/PopularCategory/PopularCategoryTitle";
import PopularCategory from "./contentComponents/PopularCategory/PopularCategory";
export default {
  components: {
    appCoronaBox: CoronaBox,
    appTitlePopularEvents: TitlePopularEvents,
    appPopularEventsTable: PopularEventsTable,
    appPopularCategoryTitle: PopularCategoryTitle,
    appPopularCategory: PopularCategory
  }
};
</script>
<style scoped>
</style>