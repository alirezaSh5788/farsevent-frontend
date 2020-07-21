<template>
  <div class="d-flex justify-content-center align-items-center container-box">
          <div class="box">
              <h3>خرید شما با موفقیت انجام شد</h3>
              <p>شماره رسید : {{getRegNumber()}}</p>
              <p> {{countDown}} ثانیه بعد به صفحه اصلی انتقال پیدا میکنید  </p>
          </div>
      </div>
</template>
<script>
export default {
  data() {
    return {
      countDown: 10
    };
  },
  methods: {
    getRegNumber: function() {
      return this.$store.getters.getRegisterNumber;
    },
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      } else {
        this.$router.push({ path: "/" });
      }
    }
  },
  created() {
    //setTimeout(() => this.$router.push({ path: "/" }), 20000);
    this.countDownTimer();
  }
};
</script>
<style scoped>
.container-box {
  height: 100vh;
}
.box {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 45%;
  height: 55%;
  border: 0.1rem solid #ddd;
  box-shadow: 1px 1px 20px rgba(200, 200, 200, 0.6);
  text-align: center;
}
.box h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #444;
}
.box p {
  font-size: 1rem;
  color: #888;
  margin-top: 2rem;
  text-align: center;
}
</style>