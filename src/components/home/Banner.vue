<template>
  <div id="banner">
    <div id="brand">
      <img
        id="banner__logo"
        src="../../assets/logofinal.png"
        alt="logo"
        class="mr-2"
      />
      <h1 id="brandName">Kung Fu <br />Fashion Wear</h1>
    </div>
    <div id="bannerBottom" class="d-flex justify-content-end align-items-end">
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

#brandName {
  color: rgb(253, 253, 253);
  text-shadow: 3px 3px #000000;
  font-size: 50px;
}

#bannerBottom {
  color: white;
  text-shadow: 1px 1px #000000;
  font-size: 13px;
  height: 10%;
}

#bannerBottom a {
  color: white;
  text-decoration: none;
}

@media screen and (max-width: 599px) {
  #brand {
    flex-direction: column;
    text-align: center;
  }
}
</style>

