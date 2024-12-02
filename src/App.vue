<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink, RouterView } from "vue-router";

export default defineComponent({
  name: "App",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
  components: {
    RouterLink,
    RouterView,
  },
});
</script>

<template>
  <nav class="bg-gray-800 p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo Section -->
      <div class="flex items-center space-x-4">
        <h3 class="text-white font-bold text-lg">Library P15</h3>
      </div>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-6">
        <RouterLink
          to="/"
          class="text-white hover:text-blue-300 transition-colors duration-200"
          >Home
        </RouterLink>
        <RouterLink
          to="/add-book"
          class="text-white hover:text-blue-300 transition-colors duration-200"
          >Add New Book
          </RouterLink>
      </div>

      <!-- Mobile Navigation Toggle -->
      <div class="md:hidden">
        <button
          @click="toggleMenu"
          class="text-white focus:outline-none hover:text-blue-300 transition-colors duration-200"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu -->
  <div
    :class="{
      'translate-x-full': !isMenuOpen,
      'translate-x-0': isMenuOpen,
    }"
    class="fixed top-0 right-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-300 ease-in-out md:hidden shadow-lg z-50"
  >
    <button
      @click="closeMenu"
      class="absolute top-4 right-4 text-white focus:outline-none hover:text-blue-300 transition-colors duration-200"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
    <div class="mt-16 flex flex-col items-center space-y-6">
      <RouterLink
        to="/"
        class="text-white hover:text-blue-300 transition-colors duration-200"
        @click="closeMenu"
        >Home</RouterLink
      >
      <RouterLink
        to="/add-book"
        class="text-white hover:text-blue-300 transition-colors duration-200"
        @click="closeMenu"
        >Add New Book</RouterLink
      >
    </div>
  </div>

  <!-- Main Content -->
  <RouterView />
</template>