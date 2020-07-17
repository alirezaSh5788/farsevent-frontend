<template>
  <div class="container row my-5">
    <div class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
      <ul>
        <app-popular-event-table-row></app-popular-event-table-row>
        <app-popular-event-table-row></app-popular-event-table-row>
      </ul>
    </div>
    <app-event-card></app-event-card>
    <app-event-card></app-event-card>
  </div>
</template>
<script>
import EventCard from "./PopularEvent/EvantCard.vue";
import PopularEventTableRow from "./PopularEvent/PopularEventTableRow.vue";
export default {
  components: {
    appEventCard: EventCard,
    appPopularEventTableRow: PopularEventTableRow
  }
};
</script>
<style scoped>
</style>