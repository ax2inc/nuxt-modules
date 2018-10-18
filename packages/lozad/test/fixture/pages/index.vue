<template>
<div>
  Works!
  <img class="lozad" data-src="https://placekitten.com/200/300" />
</div>
</template>

<script>
export default {
  mounted () {
    this.$lozad.observe();
  },
};
</script>
