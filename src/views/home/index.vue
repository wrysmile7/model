<!-- home -->
<template>
  <div class="home">
    <HeaderComponent />
    <!-- home -->
    <div class="content scroll-none">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HeaderComponent from '../header/index'

export default {
  name: 'home',
  components: {
    HeaderComponent
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.home {

}
</style>
