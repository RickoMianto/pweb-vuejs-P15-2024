<script lang="ts">
import { defineComponent } from "vue";
import { format } from "date-fns";

export default defineComponent({
  name: "AddBookView",
  data() {
    return {
      title: "",
      author: "",
      publishedDate: "",
      publisher: "",
      description: "",
      coverImage: "",
      ratingAverage: 0,
      ratingCount: 0,
      tags: "",
      initialQty: 0,
      qty: 0,
      error: false,
      errorMsg: "",
    };
  },
  methods: {
    formatDate(date: string): string {
      return format(new Date(date), "dd MMMM yyyy");
    },
    async addBook() {
      const newBook = {
        title: this.title,
        author: this.author,
        publishedDate: this.formatDate(this.publishedDate),
        publisher: this.publisher,
        description: this.description,
        coverImage: this.coverImage,
        rating: {
          average: this.ratingAverage,
          count: this.ratingCount,
        },
        tags: this.tags.split(",").map((tag) => tag.trim()),
        initialQty: this.initialQty,
        qty: this.qty,
      };

      const response = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });

      if (response.ok) {
        alert("Book added successfully!");
        this.error = false;
        this.$router.push("/");
      } else {
        this.error = true;
        const data = await response.json();
        if (data.message.includes("duplicate")) {
          this.errorMsg = "Book already exists!";
        } else {
          this.errorMsg = data.message;
        }
      }
    },
  },
});
</script>

<template>
  <main class="mt-10 mx-8 pb-24">
    <!-- Header -->
    <h1 class="font-bold text-3xl text-center mb-6 text-white">
      Add New Book
    </h1>
    
    <!-- Form -->
    <form
      @submit.prevent="addBook"
      class="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200"
    >
      <!-- Input: Title -->
      <div class="mb-6">
        <label for="title" class="block text-black font-semibold mb-2">
          Title
        </label>
        <input
          v-model="title"
          id="title"
          type="text"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Enter the book title"
          required
        />
      </div>

      <!-- Input: Author -->
      <div class="mb-6">
        <label for="author" class="block text-black font-semibold mb-2">
          Author
        </label>
        <input
          v-model="author"
          id="author"
          type="text"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Enter the author's name"
          required
        />
      </div>

      <!-- Input: Published Date -->
      <div class="mb-6">
        <label for="publishedDate" class="block text-black font-semibold mb-2">
          Published Date
        </label>
        <input
          v-model="publishedDate"
          id="publishedDate"
          type="date"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          required
        />
      </div>

      <!-- Input: Publisher -->
      <div class="mb-6">
        <label for="publisher" class="block text-black font-semibold mb-2">
          Publisher
        </label>
        <input
          v-model="publisher"
          id="publisher"
          type="text"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Enter the publisher"
          required
        />
      </div>

      <!-- Input: Description -->
      <div class="mb-6">
        <label for="description" class="block text-black font-semibold mb-2">
          Description
        </label>
        <textarea
          v-model="description"
          id="description"
          rows="4"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Write a brief description of the book"
          required
        ></textarea>
      </div>

      <!-- Input: Cover Image URL -->
      <div class="mb-6">
        <label for="coverImage" class="block text-black font-semibold mb-2">
          Cover Image URL
        </label>
        <input
          v-model="coverImage"
          id="coverImage"
          type="url"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Paste the cover image URL"
          required
        />
      </div>

      <!-- Input: Rating Average -->
      <div class="mb-6">
        <label for="ratingAverage" class="block text-black font-semibold mb-2">
          Rating Average
        </label>
        <input
          v-model="ratingAverage"
          id="ratingAverage"
          type="number"
          step="0.1"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Enter the average rating"
          required
        />
      </div>

      <!-- Input: Rating Count -->
      <div class="mb-6">
        <label for="ratingCount" class="block text-black font-semibold mb-2">
          Rating Count
        </label>
        <input
          v-model="ratingCount"
          id="ratingCount"
          type="number"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Enter the number of ratings"
          required
        />
      </div>

      <!-- Input: Tags -->
      <div class="mb-6">
        <label for="tags" class="block text-black font-semibold mb-2">
          Tags (comma separated)
        </label>
        <input
          v-model="tags"
          id="tags"
          type="text"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Enter tags separated by commas"
          required
        />
      </div>

      <!-- Input: Initial Quantity -->
      <div class="mb-6">
        <label for="initialQty" class="block text-black font-semibold mb-2">
          Initial Quantity
        </label>
        <input
          v-model="initialQty"
          id="initialQty"
          type="number"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Enter the initial stock quantity"
          required
        />
      </div>

      <!-- Input: Quantity -->
      <div class="mb-6">
        <label for="qty" class="block text-black font-semibold mb-2">
          Quantity
        </label>
        <input
          v-model="qty"
          id="qty"
          type="number"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          placeholder="Enter the current stock quantity"
          required
        />
      </div>

      <!-- Error Message -->
      <h5
        class="font-bold text-lg text-red-500 mb-8 text-center"
        v-show="error"
      >
        {{ errorMsg }}
      </h5>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          type="submit"
          class="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Add Book
        </button>
      </div>
    </form>
  </main>
</template>