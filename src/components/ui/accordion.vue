<template>
  <div class="flex flex-direction-column rnd-xs border">
    <div
      v-if="$slots.buttons"
      class="accordion-header flex full-x border"
      :class="{ 'rnd-t-xs': opened || $slots.sub, 'rnd-xs': !opened && !$slots.sub }"
    >
      <div class="py-s px-m">
        <h6
          v-if="$slots.section"
          class="cap-first accordion-section"
        >
          <slot name="section" />
        </h6>
        <h4 class="mb-0">
          <slot name="title" />
        </h4>
      </div>
      <div
        class="accordion-buttons flex flex-end flex-right"
      >
        <slot name="buttons" />
        <button
          v-if="$slots.default"
          class="btn-alt py-s px-m"
          @click="openToggle"
        >
          <i
            class="icon-24"
            :class="{
              [iconOpenedClass]: !opened,
              [iconClosedClass]: opened
            }"
          />
        </button>
      </div>
    </div>

    <button
      v-else-if="$slots.default && !$slots.buttons"
      :class="{ 'rnd-t-xs': opened || $slots.sub, 'rnd-xs': !opened && !$slots.sub }"
      class="accordion-header flex full-x btn-border py-s px-m"
      @click="openToggle"
    >
      <div>
        <h6
          v-if="$slots.section"
          class="cap-first accordion-section"
        >
          <slot name="section" />
        </h6>
        <h4 class="mb-0">
          <slot name="title" />
        </h4>
      </div>
      <div class="flex flex-right flex-end">
        <i
          class="icon-24"
          :class="{ [iconOpenedClass]: !opened, [iconClosedClass]: opened }"
        />
      </div>
    </button>

    <div
      v-else
      class="py-s px-m"
    >
      <h6
        v-if="$slots.section"
        class="cap-first accordion-section"
      >
        <slot name="section" />
      </h6>
      <h4 class="mb-0">
        <slot name="title" />
      </h4>
    </div>

    <div
      v-if="$slots.sub"
      :class="{'border-b-s': opened}"
    >
      <slot name="sub" />
    </div>

    <div class="overflow-hidden">
      <Transition name="slide">
        <slot v-if="opened" />
      </Transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiSytemAccordion',

  props: {
    iconOpenedClass: {
      type: String,
      default: 'icon-chevron-b'
    },

    iconClosedClass: {
      type: String,
      default: 'icon-chevron-t'
    }
  },

  data() {
    return {
      opened: false
    }
  },

  methods: {
    close() {
      this.opened = false
    },

    openToggle() {
      this.opened = !this.opened
      this.$emit('toggle', this.opened)
    }
  }
}
</script>
