<template>
  <transition
    :name="transitionName"
    :mode="transitionMode"
    :enter-active-class="transitionEnterActiveClass"
  >
    <slot />
  </transition>
</template>

<script>
const DEFAULT_TRANSITION = "slide-left";
const DEFAULT_TRANSITION_MODE = "out-in";

export default {
  name: "TransitionPage",
  data() {
    return {
      prevHeight: 0,
      transitionName: DEFAULT_TRANSITION,
      transitionMode: DEFAULT_TRANSITION_MODE,
      transitionEnterActiveClass: ""
    };
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;

      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      this.transitionMode = DEFAULT_TRANSITION_MODE;
      this.transitionEnterActiveClass = `${this.transitionName}-enter-active`;

      next();
    });
  }
};
</script>

<style lang="scss">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
