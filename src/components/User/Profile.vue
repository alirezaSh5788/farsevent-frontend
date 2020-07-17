<template>
  <div class="container pt-3 my-3">
    <ul class="nav nav-pills" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="pill" href="#profile">پروفایل کاربری</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#blits">بلیط ها</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#gheire">غیره</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="container tab-pane active pt-3 my-3 border" id="profile">
        <h4>پروفایل کابری</h4>
        <br />
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>نام</label>
              <input type="text" class="form-control" placeholder="علی" />
            </div>
            <div class="form-group">
              <label>نام خانوادگی</label>
              <input type="password" class="form-control" placeholder="ملک" />
            </div>
            <div class="form-group">
              <label>ایمیل</label>
              <input type="password" class="form-control" placeholder="alimalek@gmail.com" disabled />
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>شماره تلفن</label>
                  <input type="number" class="form-control" placeholder="0912123456" disabled />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>شهر</label>
                  <select class="form-control">
                    <option>تهران</option>
                    <option>مشهد</option>
                    <option>شیراز</option>
                    <option>اصفهان</option>
                  </select>
                </div>
              </div>
            </div>
            <h6>تغییر رمز عبور</h6>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>رمز عبور فعلی</label>
                  <input type="text" class="form-control" placeholder="******" />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>رمز عبور جدید</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>تکرار رمز عبور</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <img src="download2.jpg" class="float-right" width="200" height="200" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <input type="file" class="form-control-file" />
          </div>
        </div>
      </div>
      <div class="container tab-pane fade pt-3 my-3 border" id="blits">
        <h4>بلیط های خریداری شد</h4>
        <br />
      </div>
      <div class="container tab-pane fade pt-3 my-3 border" id="gheire">
        <h4>غیره</h4>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      infoPage: {
          city:[]
      }
    };
  },
  beforeRouteEnter: function(to, from, next) {
    function getEventCity() {
      return axios.get("http://localhost:8000/auth/all-cities", {
        responseType: "json"
      });
    }
    axios.all([getEventCity()]).then(
      axios.spread(function(type, category, city) {
        next(vm => {
          vm.setCity(city);
        });
      })
    );
  },
  methods: {
    setCity: function(response) {
      for (let key in response.data) {
        this.infoPage.city.push(response.data[key]);
      }
      console.log("city", response.data);
    }
  }
};
</script>

<style scoped>
</style>