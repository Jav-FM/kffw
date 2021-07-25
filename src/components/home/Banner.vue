<template>
  <div id="banner">
    <div id="brand">
      <img
        id="banner__logo"
        src="../../assets/logokffwtransparente.png"
        alt="logo"
        class="mr-2"
      />
      <h1>Kung Fu <br>Fashion Wear</h1>
    </div>
    <div id="bannerBottom" class=" d-flex justify-content-end align-items-end">
      <p class="mb-0 mr-1">
        Illustration Designed By 幻影笑笑 From
        <a
          href="https://es.lovepik.com/image-401525967/new-chinese-landscape.html"
          >LovePik.com</a
        >
      </p>
    </div>
  </div>
</template>

<script>
// export default {
//    data() {
//     return {
//       slide: 0,
//       sliding: null
//     }
//   },
//   methods: {
//     onSlideStart(slide) {
//       this.sliding = true
//     },
//     onSlideEnd(slide) {
//       this.sliding = false
//     }
//   }
// }
</script>

<style scoped>
#banner {
  height: 400px;
  width: 100%;
  background-image: url("../../assets/banner.jpg");
  background-position-y: center;
  background-repeat: no-repeat;
  background-size: cover;
}

#brand {
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
}
#brand img {
  width: 120px;
}

#brand h1 {
  color: white;
  text-shadow: 2px 2px #000000;
}

#bannerBottom {
  color: white;
  text-shadow: 1px 1px #000000;
  font-size: 13px;
  height: 10%;
}

#bannerBottom a{
  color: white;
  text-decoration: none;
}

@media screen and (max-width: 600px) {
  #brand {
  flex-direction: column;
  text-align: center;
  }
}
</style>

