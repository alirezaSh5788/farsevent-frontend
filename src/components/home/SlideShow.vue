<template>
    <!--<div class="featured-events d-flex flex-column mt-5">
      <div class="row">
        <div
          class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mx-auto position-relative"
        >
          <img src="img/soltan.jpg" alt />
          <div class="register-event d-inline mx-5 my-3">
            <button class="btn">ثبت نام</button>
            <div class="d-flex flex-column text-events">
              <h3>تحول فروش در آخرین سال قرن</h3>
              <div class="d-flex justify-content-start">
                <p class="ml-3 mb-2">آنلاین</p>
                <span class="ml-3 dat"></span>
                <span>تا 15 خرداد</span>
              </div>
              <p>85000 تومن</p>
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <hooper>
    <slide>
      slide 1
    </slide>
    <slide>
      slide 2
    </slide>
  </hooper>
</template>
<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
   components: {
    Hooper,
    Slide
  }
};
</script>
<style scoped></style>
