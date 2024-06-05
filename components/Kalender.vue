<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="event in calendarEvents" :key="event.id"
            class="border p-4 bg-white rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer flex flex-col justify-between">
            <div>
                <h3 class="text-xl font-semibold">{{ event.title }}</h3>
                <div class="mt-2 space-y-2">
                    <div class="flex justify-between">
                        <p class="font-bold">Date:</p>
                        <p class="truncate">{{ formatDate(event.date) }}</p>
                    </div>
                </div>
                <div class="mt-2 space-y-2">
                    <div class="flex justify-between">
                        <p class="font-bold">E-Mail:</p>
                        <p class="truncate">{{ event.email }}</p>
                    </div>
                </div>
            </div>
            <div class="mt-4 flex justify-between">
                <button @click="confirmDelete(event.id)"
                    class="bg-red text-white px-4 py-2 rounded-full">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from 'dayjs';

export default {
    props: {
        calendarEvents: Array,
    },
    methods: {
        formatDate(dateString) {
            const date = dayjs(dateString);
            return date.format('dddd MMMM D, YYYY');
        },
        confirmDelete(eventId) {
            this.$emit('confirm-delete-event', eventId);
        }
    }
};
</script>

<style scoped></style>