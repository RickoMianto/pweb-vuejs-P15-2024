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
      fields: [
        { id: "title", label: "Title", model: "title", inputType: "text", placeholder: "Enter the book title" },
        { id: "author", label: "Author", model: "author", inputType: "text", placeholder: "Enter the author's name" },
        { id: "publishedDate", label: "Published Date", model: "publishedDate", inputType: "date" },
        { id: "publisher", label: "Publisher", model: "publisher", inputType: "text", placeholder: "Enter the publisher" },
        { id: "description", label: "Description", model: "description", inputType: "textarea", placeholder: "Write a brief description of the book", rows: 4 },
        { id: "coverImage", label: "Cover Image URL", model: "coverImage", inputType: "url", placeholder: "Paste the cover image URL" },
        { id: "ratingAverage", label: "Rating Average", model: "ratingAverage", inputType: "number", placeholder: "Enter the average rating", step: 0.1 },
        { id: "ratingCount", label: "Rating Count", model: "ratingCount", inputType: "number", placeholder: "Enter the number of ratings" },
        { id: "tags", label: "Tags (comma separated)", model: "tags", inputType: "text", placeholder: "Enter tags separated by commas" },
        { id: "initialQty", label: "Initial Quantity", model: "initialQty", inputType: "number", placeholder: "Enter the initial stock quantity" },
        { id: "qty", label: "Quantity", model: "qty", inputType: "number", placeholder: "Enter the current stock quantity" },
      ],
    };
  },
  methods: {
    formatDate(date: string): string {
      return format(new Date(date), "dd MMMM yyyy");
    },
    async addBook() {
      try {
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

        const response = await fetch("http://localhost:3000/book", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBook),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add book");
        }

        alert("Book added successfully!");
        this.error = false;
        this.$router.push("/");
      } catch (error) {
        this.error = true;
        this.errorMsg = (error as Error).message.includes("duplicate")
          ? "Book already exists!"
          : (error as Error).message;
      }
    },
  },
});
</script>

<template>
  <main class="mt-10 mx-8 pb-24">
    <!-- Header -->
    <h1 class="font-bold text-3xl text-center mb-6 text-gray-100">
      Add New Book
    </h1>

    <!-- Form -->
    <form
      @submit.prevent="addBook"
      class="max-w-3xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700"
    >
      <!-- Input Fields -->
      <div
        v-for="field in fields"
        :key="field.id"
        class="mb-6"
      >
        <label
          :for="field.id"
          class="block text-gray-100 font-semibold mb-2"
        >
          {{ field.label }}
        </label>
        <component
          :is="field.inputType === 'textarea' ? 'textarea' : 'input'"
          v-model.lazy="this[field.model]"
          :id="field.id"
          :type="field.inputType !== 'textarea' ? field.inputType : undefined"
          :rows="field.rows"
          class="w-full px-4 py-3 bg-gray-700 text-gray-100 border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          :placeholder="field.placeholder"
          required
        />
      </div>

      <!-- Error Message -->
      <h5 v-if="error" class="font-bold text-lg text-red-500 mb-8 text-center">
        {{ errorMsg }}
      </h5>

      <!-- Submit Button -->
      <div class="flex justify-center">
        <button
          type="submit"
          class="px-6 py-3 bg-indigo-700 text-gray-100 font-semibold rounded-lg shadow-md hover:bg-indigo-800 transition duration-200"
        >
          Add Book
        </button>
      </div>
    </form>
  </main>
</template>
