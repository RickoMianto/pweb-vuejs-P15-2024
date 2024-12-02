<script lang="ts">
import { defineComponent } from "vue";

interface Rating {
  average: number;
  count: number;
}

interface BookDetail {
  rating: Rating;
  _id: string;
  title: string;
  author: string;
  publishedDate: string;
  publisher: string;
  description: string;
  coverImage: string;
  tags: string[];
  initialQty: number;
  qty: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default defineComponent({
  name: "DetailBookView",
  data: () => ({
    bookDetail: {} as BookDetail,
    fetchError: false,
  }),
  async mounted() {
    try {
      const response = await fetch(
        `http://localhost:3000/book/${this.$route.params.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch book data");
      }
      const data = await response.json();
      this.bookDetail = { ...data.data };
    } catch (error) {
      console.error(error);
      this.fetchError = true;
    }
  },
  methods: {
    async deleteBook() {
      const response = await fetch(
        `http://localhost:3000/book/${this.$route.params.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
      alert("Book has been removed!");
      this.$router.push("/");
    },
  },
  computed: {
    starRating(): string {
      const stars = Math.floor(this.bookDetail.rating.average);
      return "⭐".repeat(stars);
    },
  },
});
</script>

<template>
  <main class="mt-14 mx-8 pb-14">
    <!-- Back to Home Button -->
    <RouterLink
      to="/"
      class="px-4 text-white py-2 lg:ml-24 bg-blue-500 font-semibold rounded-xl inline-block hover:bg-blue-600 transition duration-200"
      >⬅️ Back to Home</RouterLink
    >

    <!-- Error Message -->
    <div v-if="fetchError" class="mt-8">
      <h1 class="font-bold text-3xl text-center text-red-500">
        Failed to load book data
      </h1>
    </div>

    <!-- Book Details -->
    <div v-else-if="bookDetail.title" class="mt-8">
      <div class="flex lg:ml-24 gap-x-10 flex-col lg:flex-row items-start">
        <!-- Book Cover -->
        <div class="w-full md:w-4/6 lg:w-[500px] lg:flex-shrink-0">
          <img
            :src="bookDetail.coverImage"
            class="rounded-xl w-full shadow-md"
            alt="Book Cover"
          />
        </div>

        <!-- Book Information -->
        <div class="mt-10 lg:mt-0 lg:pr-24 flex-grow">
          <h1 class="font-bold text-xl md:text-2xl lg:text-3xl text-white">
            Buku "{{ bookDetail.title }}" by {{ bookDetail.author }}
          </h1>
          <div class="flex items-center space-x-2 mt-2">
            <h5 class="text-sm text-white-500 font-bold">
              {{ bookDetail.rating.average }}
            </h5>
            <span class="text-yellow-400">{{ starRating }}</span>
            <span class="text-sm text-white-500">
              ({{ bookDetail.rating.count }} reviews)
            </span>
          </div>
          <hr class="border-t border-gray-300 my-4" />

          <!-- Book Description -->
          <h3 class="text-md md:text-lg text-white-700 leading-relaxed">
            <span class="font-bold">About:</span> {{ bookDetail.description }}
          </h3>

          <!-- Published Date and Publisher -->
          <h3 class="text-md md:text-lg text-white-700 mt-4">
            <span class="font-bold">Published:</span>
            {{ bookDetail.publishedDate }} by {{ bookDetail.publisher }}
          </h3>

          <!-- Categories -->
          <h3 class="text-md md:text-lg text-white-700 mt-2">
            <span class="font-bold">Category:</span>
            {{ bookDetail.tags.join(", ") }}
          </h3>

          <!-- Stock Information -->
          <h3 class="text-md md:text-lg text-white-700 mt-2">
            <span class="font-bold">Stock:</span>
            {{ bookDetail.qty }} of {{ bookDetail.initialQty }} books available
          </h3>
        </div>
      </div>

      <!-- Remove Book Button -->
      <div class="lg:ml-24 flex justify-center lg:justify-start mt-8">
        <button
          @click="deleteBook"
          class="px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition duration-200"
        >
          Remove Book
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="mt-8">
      <h1 class="font-bold text-3xl text-center">Loading...</h1>
    </div>
  </main>
</template>