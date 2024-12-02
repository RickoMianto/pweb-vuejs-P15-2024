<script lang="ts">
import BookCard from "../components/BookCard.vue";

interface BookObject {
  _id: string;
  title: string;
  author: string;
  tags: string[];
  coverImage: string;
  publishedDate: string;
  initialQty: number;
  qty: number;
  publisher: string;
}

export default {
  name: "HomeView",
  data() {
    return {
      booksData: [] as BookObject[],
      fetchError: false,
    };
  },
  async mounted() {
    try {
      const response = await fetch("http://localhost:3000/books");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      this.booksData = data.data;
    } catch (error) {
      console.error("Fetch error:", error);
      this.fetchError = true;
    }
  },
  components: {
    BookCard,
  },
};
</script>

<template>
  <main class="mt-10 mx-8 pb-24">
    <!-- Hero Section -->
    <section
      class="bg-blue-500 text-white py-10 px-8 rounded-lg shadow-md text-center"
    >
      <h1 class="font-bold text-4xl mb-4">
        Welcome to Library P15
      </h1>
      <p class="text-lg">
        Find Your Favorite Book
      </p>
    </section>

    <!-- Books Section -->
    <section class="mt-10">
      <h2 class="font-bold text-3xl text-center mb-6">Book Collection</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Display Books -->
        <BookCard
          v-if="booksData.length"
          v-for="book in booksData"
          :key="book._id"
          :book="book"
          class="shadow-lg rounded-lg overflow-hidden"
        />

        <!-- Fetch Error Message -->
        <div
          v-else-if="fetchError"
          class="col-span-full text-center text-red-500 font-semibold text-xl"
        >
          Failed to Fetch Books, Try Again.
        </div>

        <!-- Loading Placeholder -->
        <div v-else class="col-span-full flex justify-center items-center">
          <div class="flex items-center space-x-2">
            <div class="w-5 h-5 bg-blue-500 rounded-full animate-bounce"></div>
            <div
              class="w-5 h-5 bg-blue-500 rounded-full animate-bounce delay-150"
            ></div>
            <div
              class="w-5 h-5 bg-blue-500 rounded-full animate-bounce delay-300"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>