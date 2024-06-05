<template>
  <div class="bg-white py-16">
    <div class="container mx-auto max-w-screen-xl px-4 relative">
      <h1 class="text-5xl font-bold mb-4 text-center md:text-left">Backend Ticket Dashboard</h1>
      <div class="mb-8 flex justify-center md:justify-start space-x-2">
        <button :class="{ 'bg-primary': currentTab === 'bewerbung', 'bg-secondary': currentTab !== 'bewerbung' }"
          class="px-4 py-2 text-white font-semibold rounded-full transition-colors"
          @click="currentTab = 'bewerbung'">Bewerbung</button>
        <button :class="{ 'bg-primary': currentTab === 'kontakt', 'bg-secondary': currentTab !== 'kontakt' }"
          class="px-4 py-2 text-white font-semibold rounded-full transition-colors"
          @click="currentTab = 'kontakt'">Kontakt</button>
        <button :class="{ 'bg-primary': currentTab === 'kalender', 'bg-secondary': currentTab !== 'kalender' }"
          class="px-4 py-2 text-white font-semibold rounded-full transition-colors"
          @click="currentTab = 'kalender'">Kalender</button>
      </div>
      <div v-if="currentTab === 'bewerbung'">
        <div class="mb-4 flex flex-wrap gap-2">
          <label for="sortCriteria" class="w-full sm:w-auto">Sort by:</label>
          <select id="sortCriteria" v-model="sortCriteria" @change="sortTickets"
            class="w-full sm:w-auto p-2 border rounded-lg">
            <option value="experience">Experience</option>
            <option value="education">Education</option>
          </select>
          <label for="sortOrder" class="w-full sm:w-auto">Order:</label>
          <select id="sortOrder" v-model="sortOrder" @change="sortTickets"
            class="w-full sm:w-auto p-2 border rounded-lg">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="ticket in sortedTickets" :key="ticket.id"
            class="border p-4 bg-white rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer flex flex-col justify-between"
            @click="selectTicket(ticket)">
            <div>
              <h3 class="text-xl font-semibold">{{ ticket.firstname }} {{ ticket.lastname }}</h3>
              <div class="mt-2 space-y-2">
                <div class="flex justify-between">
                  <p class="font-bold">Email:</p>
                  <p class="truncate">{{ ticket.email }}</p>
                </div>
                <div class="flex justify-between">
                  <p class="font-bold">Phone:</p>
                  <p class="truncate">{{ ticket.phone }}</p>
                </div>
                <div class="flex justify-between">
                  <p class="font-bold">Experience:</p>
                  <p class="truncate">{{ ticket.experience }}</p>
                </div>
                <div class="flex justify-between">
                  <p class="font-bold">Skills:</p>
                  <p class="truncate">{{ ticket.skills }}</p>
                </div>
                <div class="flex justify-between">
                  <p class="font-bold">Education:</p>
                  <p class="truncate">{{ ticket.education }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4 flex justify-between">
              <button @click.stop="inviteTicket(ticket)" :disabled="isNameInCalendar(ticket)"
                :class="{ 'bg-gray-light': isNameInCalendar(ticket), 'bg-primary': !isNameInCalendar(ticket) }"
                class="text-white px-4 py-2 rounded-full">
                {{ isNameInCalendar(ticket) ? 'Invited' : 'Invite' }}
              </button>
              <button @click.stop="confirmDelete(ticket.id)"
                class="bg-red text-white px-4 py-2 rounded-full">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentTab === 'kalender'">
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
              <button @click="confirmDeleteEvent(event.id)"
                class="bg-red text-white px-4 py-2 rounded-full">Delete</button>

            </div>
          </div>
        </div>
      </div>
      <div v-if="currentTab === 'kontakt'">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="ticket in kontaktTickets" :key="ticket.id"
            class="border p-4 bg-white rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer flex flex-col justify-between"
            @click="selectTicket(ticket)">
            <div>
              <h3 class="text-xl font-semibold">{{ ticket.name }}</h3>
              <div class="mt-2 space-y-2">
                <div class="flex justify-between">
                  <p class="font-bold">Email:</p>
                  <p class="truncate">{{ ticket.email }}</p>
                </div>
                <div class="flex justify-between">
                  <p class="font-bold">Subject:</p>
                  <p class="truncate">{{ ticket.subject }}</p>
                </div>
                <div class="flex justify-between">
                  <p class="font-bold">Message:</p>
                  <p class="truncate">{{ ticket.message }}</p>
                </div>
              </div>
            </div>
            <div class="mt-4 flex justify-between">
              <button @click.stop="replyToTicket(ticket)"
                class="bg-primary text-white px-4 py-2 rounded-full">Reply</button>
              <button @click.stop="confirmDeleteKontakt(ticket.id)"
                class="bg-red text-white px-4 py-2 rounded-full">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedTicket" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="clearSelection">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full" @click.stop>
          <h2 class="text-2xl font-bold">Details for {{ selectedTicket.firstname || selectedTicket.name }} {{
          selectedTicket.lastname || '' }}</h2>
          <p>Email: {{ selectedTicket.email }}</p>
          <p v-if="selectedTicket.phone">Phone: {{ selectedTicket.phone }}</p>
          <p v-if="selectedTicket.experience">Experience: {{ selectedTicket.experience }}</p>
          <p v-if="selectedTicket.skills">Skills: {{ selectedTicket.skills }}</p>
          <p v-if="selectedTicket.education">Education: {{ selectedTicket.education }}</p>
          <p v-if="selectedTicket.subject">Subject: {{ selectedTicket.subject }}</p>
          <p v-if="selectedTicket.message">Message: {{ selectedTicket.message }}</p>
          <div class="mt-4 flex flex-col space-y-2">
            <button @click="clearSelection" class="bg-gray-light text-white px-4 py-2 rounded-full">Close</button>
          </div>
        </div>
      </div>
      <div v-if="showConfirmDelete" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full">
          <p>Are you sure you want to delete this ticket?</p>
          <div class="mt-4 flex space-x-4">
            <button @click="deleteTicket(selectedTicketId)"
              class="bg-red text-white px-4 py-2 rounded-full">Yes</button>
            <button @click="cancelDelete" class="bg-gray-light text-white px-4 py-2 rounded-full">No</button>
          </div>
        </div>
      </div>
      <div v-if="showConfirmDeleteKontakt"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full">
          <p>Are you sure you want to delete this ticket?</p>
          <div class="mt-4 flex space-x-4">
            <button @click="deleteKontaktTicket(selectedKontaktTicketId)"
              class="bg-red text-white px-4 py-2 rounded-full">Yes</button>
            <button @click="cancelDeleteKontakt" class="bg-gray-light text-white px-4 py-2 rounded-full">No</button>
          </div>
        </div>
      </div>
      <div v-if="showConfirmDeleteEvent"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full">
          <p>Are you sure you want to delete this event?</p>
          <div class="mt-4 flex space-x-4">
            <button @click="deleteCalendarEvent(selectedEventId)"
              class="bg-red text-white px-4 py-2 rounded-full">Yes</button>
            <button @click="cancelDeleteEvent" class="bg-gray-light text-white px-4 py-2 rounded-full">No</button>
          </div>
        </div>
      </div>
      <!-- Datepicker -->
      <div v-if="showDatePicker" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full relative" @click.stop>
      <h2 class="text-2xl font-bold mb-4">Choose Date and Time</h2>
      <div class="space-y-4">
        <div ref="datepickerContainer" class="relative">
          <flat-pickr class="border border-gray-light w-full p-2 rounded-lg mb-4 align-middle" v-model="selectedDate" :config="datePickerConfig"></flat-pickr>
        </div>
        <div class="flex space-x-4">
          <button @click="sendInvitation" :disabled="!selectedDate" class="bg-green text-white px-4 py-2 rounded-full flex-1" :class="{ 'opacity-50 cursor-not-allowed': !selectedDate }">Send Invitation</button>
          <button @click="closeDatePicker" class="bg-gray-light text-white px-4 py-2 rounded-full flex-1">Cancel</button>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
  <div v-if="showEmailReplyWindow" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full">
      <h2 class="text-2xl font-bold">Reply to {{ selectedKontaktTicket.name }}</h2>
      <div class="mt-4 flex flex-col space-y-2">
        <input v-model="emailSubject" type="text" placeholder="Subject" class="border rounded-lg px-3 py-2">
        <textarea v-model="emailBody" placeholder="Your message" class="border rounded-lg px-3 py-2"></textarea>
        <button @click="sendReply" class="bg-primary text-white px-4 py-2 rounded-full">Send</button>
        <button @click="showEmailReplyWindow = false"
          class="bg-gray-light text-white px-4 py-2 rounded-full">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase'
import axios from 'axios';
import FlatPickr from 'vue-flatpickr-component';
import dayjs from 'dayjs';

import 'flatpickr/dist/flatpickr.css';

export default {
  components: {
    FlatPickr,
  },
  data() {
    return {
      tickets: [],
      kontaktTickets: [],
      calendarEvents: [],
      selectedTicket: null,
      selectedKontaktTicket: null,
      selectedDate: null,
      showConfirmDeleteEvent: false,
      selectedEventId: null,
      showEmailReplyWindow: false,
      showConfirmDelete: false,
      showConfirmDeleteKontakt: false,
      selectedTicketId: null,
      selectedKontaktTicketId: null,
      datePickerOpen: false,
      sortCriteria: 'experience',
      sortOrder: 'asc',
      currentTab: 'bewerbung',
      emailSubject: '',
      emailBody: '',
      showDatePicker: false,
      datePickerConfig: {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        time_24hr: true,
        static: true // Use static positioning
      },
    }
  },
  computed: {
    sortedTickets() {
      return this.tickets.sort((a, b) => {
        let valueA, valueB;

        if (this.sortCriteria === 'experience') {
          valueA = this.experienceValue(a.experience);
          valueB = this.experienceValue(b.experience);
        } else if (this.sortCriteria === 'education') {
          valueA = this.educationValue(a.education);
          valueB = this.educationValue(b.education);
        }

        if (this.sortOrder === 'asc') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      });
    }
  },
  methods: {
    formatDate(dateString) {
      const date = dayjs(dateString);
      return date.format('dddd MMMM D, YYYY');
    },
    async fetchTickets() {
      const { data, error } = await supabase
        .from('bewerbung')
        .select('id, created_at, lastname, email, phone, experience, skills, education, firstname')

      if (error) {
        console.error('Error fetching tickets:', error)
      } else {
        this.tickets = data
      }
    },
    async fetchKontaktTickets() {
      const { data, error } = await supabase
        .from('kontakt')
        .select('id, created_at, name, email, subject, message')

      if (error) {
        console.error('Error fetching kontakt tickets:', error)
      } else {
        this.kontaktTickets = data
      }
    },
    async fetchCalendarEvents() {
      const { data, error } = await supabase
        .from('kalender')
        .select('id, title, date, email')

      if (error) {
        console.error('Error fetching calendar events:', error)
      } else {
        this.calendarEvents = data
      }
    },
    experienceValue(experience) {
      switch (experience) {
        case '0':
          return 0;
        case '1-3':
          return 2;
        case '4-10':
          return 7;
        case '>10':
          return 11;
        default:
          return 0;
      }
    },
    educationValue(education) {
      switch (education) {
        case 'Bachelor':
          return 1;
        case 'Master':
          return 2;
        case 'Doktor':
          return 3;
        default:
          return 0;
      }
    },
    sortTickets() {
      this.tickets.sort((a, b) => {
        let valueA, valueB;

        if (this.sortCriteria === 'experience') {
          valueA = this.experienceValue(a.experience);
          valueB = this.experienceValue(b.experience);
        } else if (this.sortCriteria === 'education') {
          valueA = this.educationValue(a.education);
          valueB = this.educationValue(b.education);
        }

        if (this.sortOrder === 'asc') {
          return valueA - valueB;
        } else {
          return valueB - valueA;
        }
      });
    },
    selectTicket(ticket) {
      this.selectedTicket = ticket;
    },
    selectKontaktTicket(ticket) {
      this.selectedKontaktTicket = ticket;
    },
    clearSelection() {
      this.selectedTicket = null;
    },
    clearKontaktSelection() {
      this.selectedKontaktTicket = null;
    },
    inviteTicket(ticket) {
      if (this.currentTab === 'bewerbung' && !this.datePickerOpen) {
        this.selectedTicket = ticket;
        this.showDatePicker = true;
        this.datePickerOpen = true;
      }
    },
    closeDatePicker() {
      this.showDatePicker = false;
      this.datePickerOpen = false;
    },
    async sendInvitation() {
      if (!this.selectedTicket) {
        console.error('No ticket selected');
        return;
      }

      const formattedDate = dayjs(this.selectedDate).format('MMMM D, YYYY HH:mm');
      const fullName = `${this.selectedTicket.firstname} ${this.selectedTicket.lastname}`;
      const email = this.selectedTicket.email;
      const { data, error } = await supabase
        .from('kalender')
        .insert([{ title: fullName, date: this.selectedDate, email: email}]);

      if (error) {
        console.error('Error adding calendar event:', error);
      } else {
        console.log('Calendar event added successfully:', data);
      }

      try {
        const response = await axios.post('/api/send-email', {
          to: this.selectedTicket.email,
          subject: 'Invitation',
          html: `<strong>You are invited!</strong><br>Date and Time: ${formattedDate} <br>We are looking forward to seeing you!<br>You can join the meeting <a href="https://example.com/meeting">here</a>.<br>Best regards, TechInnovate Solutions`,
        });

        if (response.data.error) {
          console.error('Error sending email:', response.data.error);
        } else {
          console.log('Email sent successfully:', response.data);
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }

      this.showDatePicker = false;
      this.datePickerOpen = false;
      this.selectedTicket = null; // Set to null after processing
    },
    confirmDelete(ticketId) {
      if (this.currentTab === 'bewerbung') {
        this.selectedTicketId = ticketId;
        this.showConfirmDelete = true;
      } else if (this.currentTab === 'kontakt') {
        this.selectedKontaktTicketId = ticketId;
        this.showConfirmDeleteKontakt = true;
      }
    },
    async deleteTicket(ticketId) {
      const { data, error } = await supabase
        .from('bewerbung')
        .delete()
        .eq('id', ticketId)

      if (error) {
        console.error('Error deleting ticket:', error)
      } else {
        this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId)
        this.showConfirmDelete = false;
        this.selectedTicket = null;
      }
    },
    cancelDelete() {
      this.showConfirmDelete = false;
      this.selectedTicketId = null;
    },
    confirmDeleteKontakt(ticketId) {
      this.selectedKontaktTicketId = ticketId;
      this.showConfirmDeleteKontakt = true;
    },
    async deleteKontaktTicket(ticketId) {
      const { data, error } = await supabase
        .from('kontakt')
        .delete()
        .eq('id', ticketId)

      if (error) {
        console.error('Error deleting kontakt ticket:', error)
      } else {
        this.kontaktTickets = this.kontaktTickets.filter(ticket => ticket.id !== ticketId)
        this.showConfirmDeleteKontakt = false;
        this.selectedKontaktTicket = null;
      }
    },
    cancelDeleteKontakt() {
      this.showConfirmDeleteKontakt = false;
      this.selectedKontaktTicketId = null;
    },
    replyToTicket(ticket) {
      if (this.currentTab === 'kontakt') {
        this.selectedKontaktTicket = ticket;
        this.showEmailReplyWindow = true;
      }
    },
    async sendReply() {
      if (!this.emailSubject || !this.emailBody || !this.selectedKontaktTicket) {
        return;
      }

      try {
        const response = await axios.post('/api/send-email', {
          to: this.selectedKontaktTicket.email,
          subject: this.emailSubject,
          html: this.emailBody,
        });

        if (response.data.error) {
          console.error('Error sending email:', response.data.error);
        } else {
          console.log('Email sent successfully:', response.data);
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }

      this.showEmailReplyWindow = false;
    },
    confirmDeleteEvent(eventId) {
      this.selectedEventId = eventId;
      this.showConfirmDeleteEvent = true;
    },
    async deleteCalendarEvent(eventId) {
    const event = this.calendarEvents.find(event => event.id === eventId);
    
    if (!event) {
      console.error('Event not found');
      return;
    }

    const { data, error } = await supabase
      .from('kalender')
      .delete()
      .eq('id', eventId);

    if (error) {
      console.error('Error deleting event:', error);
    } else {
      this.calendarEvents = this.calendarEvents.filter(event => event.id !== eventId);
      this.showConfirmDeleteEvent = false;
      this.selectedEventId = null;

      try {
        const formattedDate = dayjs(event.date).format('MMMM D, YYYY HH:mm');
        const response = await axios.post('/api/send-email', {
          to: event.email,
          subject: 'Absage des Termins',
          html: `<strong>Ihr Termin wurde abgesagt.</strong><br>Termin: ${formattedDate} <br>Wir bedauern, Ihnen mitteilen zu müssen, dass Ihr Termin abgesagt wurde.<br>Best regards, TechInnovate Solutions`,
        });

        if (response.data.error) {
          console.error('Error sending email:', response.data.error);
        } else {
          console.log('Cancellation email sent successfully:', response.data);
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }
  },
    cancelDeleteEvent() {
      this.showConfirmDeleteEvent = false;
      this.selectedEventId = null;
    },
    isNameInCalendar(ticket) {
      const fullName = `${ticket.firstname} ${ticket.lastname}`;
      return this.calendarEvents.some(event => event.title === fullName);
    }
  },
  async mounted() {
    await this.fetchTickets();
    await this.fetchKontaktTickets();
    await this.fetchCalendarEvents();
  }
}
</script>

<style scoped>

</style>
