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
        <button v-if="isAdmin" :class="{ 'bg-primary': currentTab === 'admin', 'bg-secondary': currentTab !== 'admin' }"
          class="px-4 py-2 text-white font-semibold rounded-full transition-colors"
          @click="currentTab = 'admin'">Admin</button>
      </div>

      <bewerbung v-if="currentTab === 'bewerbung'" :tickets="tickets" :calendarEvents="calendarEvents"
        @select-ticket="selectTicket" @invite-ticket="inviteTicket" @confirm-delete="confirmDeleteTicket" />
      <kontakt v-if="currentTab === 'kontakt'" :kontaktTickets="kontaktTickets" @select-ticket="selectKontaktTicket"
        @reply-to-ticket="replyToTicket" @confirm-delete-kontakt="confirmDeleteKontaktTicket" />
      <kalender v-if="currentTab === 'kalender'" :calendarEvents="calendarEvents"
        @confirm-delete-event="confirmDeleteEvent" />
      <div v-if="currentTab === 'admin'" class="grid gap-4">
        <div v-for="ticket in tickets" :key="ticket.id" class="p-4 border rounded-lg">
          <h2 class="text-lg font-semibold">{{ ticket.firstname }} {{ ticket.lastname }}</h2>
          <p>Email: {{ ticket.email }}</p>
          <button @click="editTicket(ticket)" class="mt-2 px-4 py-2 bg-primary text-white rounded-full">Edit</button>
        </div>
      </div>

      <div v-if="selectedTicket && currentTab === 'bewerbung'" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="clearSelection">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full" @click.stop>
          <h2 class="text-2xl font-bold">Details for {{ selectedTicket.firstname || selectedTicket.name }} {{
          selectedTicket.lastname || '' }}</h2>
          <label class="block mt-4">
            <span class="text-gray-light">Email:</span>
            <p class="mt-1 block w-full">{{ selectedTicket.email }}</p>
          </label>
          <label v-if="selectedTicket.phone !== undefined" class="block mt-4">
            <span class="text-gray-light">Phone:</span>
            <p class="mt-1 block w-full">{{ selectedTicket.phone }}</p>
          </label>
          <label v-if="selectedTicket.experience !== undefined" class="block mt-4">
            <span class="text-gray-light">Experience:</span>
            <p class="mt-1 block w-full">{{ selectedTicket.experience }}</p>
          </label>
          <label v-if="selectedTicket.skills !== undefined" class="block mt-4">
            <span class="text-gray-light">Skills:</span>
            <p class="mt-1 block w-full">{{ selectedTicket.skills }}</p>
          </label>
          <label v-if="selectedTicket.education !== undefined" class="block mt-4">
            <span class="text-gray-light">Education:</span>
            <p class="mt-1 block w-full">{{ selectedTicket.education }}</p>
          </label>
          <label v-if="selectedTicket.subject !== undefined" class="block mt-4">
            <span class="text-gray-light">Subject:</span>
            <p class="mt-1 block w-full">{{ selectedTicket.subject }}</p>
          </label>
          <label v-if="selectedTicket.message !== undefined" class="block mt-4">
            <span class="text-gray-light">Message:</span>
            <p class="mt-1 block w-full">{{ selectedTicket.message }}</p>
          </label>
          <div class="mt-4 flex flex-col space-y-2">
            <button @click="clearSelection" class="bg-gray-light text-white px-4 py-2 rounded-full">Close</button>
          </div>
        </div>
      </div>

      <div v-if="selectedTicket && currentTab === 'admin'" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="clearSelection">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full" @click.stop>
          <h2 class="text-2xl font-bold">Edit Details for {{ selectedTicket.firstname || selectedTicket.name }} {{
          selectedTicket.lastname || '' }}</h2>
          <label class="block mt-4">
            <span class="text-gray-light">Email:</span>
            <input v-model="selectedTicket.email" type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </label>
          <label v-if="selectedTicket.phone !== undefined" class="block mt-4">
            <span class="text-gray-light">Phone:</span>
            <input v-model="selectedTicket.phone" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </label>
          <label v-if="selectedTicket.experience !== undefined" class="block mt-4">
            <span class="text-gray-light">Experience:</span>
            <input v-model="selectedTicket.experience" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </label>
          <label v-if="selectedTicket.skills !== undefined" class="block mt-4">
            <span class="text-gray-light">Skills:</span>
            <input v-model="selectedTicket.skills" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </label>
          <label v-if="selectedTicket.education !== undefined" class="block mt-4">
            <span class="text-gray-light">Education:</span>
            <input v-model="selectedTicket.education" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </label>
          <label v-if="selectedTicket.subject !== undefined" class="block mt-4">
            <span class="text-gray-light">Subject:</span>
            <input v-model="selectedTicket.subject" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </label>
          <label v-if="selectedTicket.message !== undefined" class="block mt-4">
            <span class="text-gray-light">Message:</span>
            <textarea v-model="selectedTicket.message" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
          </label>
          <div class="mt-4 flex flex-col space-y-2">
            <button v-if="isAdmin" @click="saveTicket" class="bg-green text-white px-4 py-2 rounded-full">Save</button>
            <button @click="clearSelection" class="bg-gray-light text-white px-4 py-2 rounded-full">Close</button>
          </div>
        </div>
      </div>

      <div v-if="selectedKontaktTicket && currentTab === 'kontakt'" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="clearKontaktSelection">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full" @click.stop>
          <h2 class="text-2xl font-bold">Details for {{ selectedKontaktTicket.name }}</h2>
          <label class="block mt-4">
            <span class="text-gray-light">Email:</span>
            <p class="mt-1 block w-full">{{ selectedKontaktTicket.email }}</p>
          </label>
          <label class="block mt-4">
            <span class="text-gray-light">Subject:</span>
            <p class="mt-1 block w-full">{{ selectedKontaktTicket.subject }}</p>
          </label>
          <label class="block mt-4">
            <span class="text-gray-light">Message:</span>
            <p class="mt-1 block w-full">{{ selectedKontaktTicket.message }}</p>
          </label>
          <div class="mt-4 flex flex-col space-y-2">
            <button @click="clearKontaktSelection" class="bg-gray-light text-white px-4 py-2 rounded-full">Close</button>
          </div>
        </div>
      </div>

      <!-- Confirmation modal for deleting tickets -->
      <div v-if="showConfirmDelete" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full" @click.stop>
          <h2 class="text-2xl font-bold">Are you sure you want to delete this ticket?</h2>
          <div class="mt-4 flex justify-between">
            <button @click="deleteTicket(selectedTicketId)" class="bg-red text-white px-4 py-2 rounded-full">Delete</button>
            <button @click="cancelDelete" class="bg-gray-light text-white px-4 py-2 rounded-full">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Confirmation modal for deleting kontakt tickets -->
      <div v-if="showConfirmDeleteKontakt" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full" @click.stop>
          <h2 class="text-2xl font-bold">Are you sure you want to delete this kontakt ticket?</h2>
          <div class="mt-4 flex justify-between">
            <button @click="deleteKontaktTicket(selectedKontaktTicketId)" class="bg-red text-white px-4 py-2 rounded-full">Delete</button>
            <button @click="cancelDeleteKontakt" class="bg-gray-light text-white px-4 py-2 rounded-full">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Confirmation modal for deleting calendar events -->
      <div v-if="showConfirmDeleteEvent" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full" @click.stop>
          <h2 class="text-2xl font-bold">Are you sure you want to delete this event?</h2>
          <div class="mt-4 flex justify-between">
            <button @click="deleteCalendarEvent(selectedEventId)" class="bg-red text-white px-4 py-2 rounded-full">Delete</button>
            <button @click="cancelDeleteEvent" class="bg-gray-light text-white px-4 py-2 rounded-full">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Email reply window -->
      <div v-if="showEmailReplyWindow" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="showEmailReplyWindow = false">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full" @click.stop>
          <h2 class="text-2xl font-bold">Reply to {{ selectedKontaktTicket.name }}</h2>
          <label class="block mt-4">
            <span class="text-gray-light">Subject:</span>
            <input v-model="emailSubject" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
          </label>
          <label class="block mt-4">
            <span class="text-gray-light">Message:</span>
            <textarea v-model="emailBody" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
          </label>
          <div class="mt-4 flex justify-between">
            <button @click="sendReply" class="bg-green text-white px-4 py-2 rounded-full">Send</button>
            <button @click="showEmailReplyWindow = false" class="bg-gray-light text-white px-4 py-2 rounded-full">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Date picker for invitations -->
      <div v-if="showDatePicker" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="closeDatePicker">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full" @click.stop>
          <h2 class="text-2xl font-bold">Invite {{ selectedTicket.firstname }} {{ selectedTicket.lastname }}</h2>
          <label class="block mt-4">
            <span class="text-gray-light">Select Date and Time:</span>
            <flat-pickr v-model="selectedDate" :config="datePickerConfig" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></flat-pickr>
          </label>
          <div class="mt-4 flex justify-between">
            <button @click="sendInvitation" class="bg-green text-white px-4 py-2 rounded-full">Send Invitation</button>
            <button @click="closeDatePicker" class="bg-gray-light text-white px-4 py-2 rounded-full">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Loading screen -->
      <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full text-center">
          <h2 class="text-2xl font-bold">Processing...</h2>
          <p>Please wait while we process your request.</p>
        </div>
      </div>

      <!-- Success message -->
      <div v-if="showSuccessMessage" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-6 border shadow-lg rounded-lg max-w-lg w-full text-center">
          <h2 class="text-2xl font-bold">Success</h2>
          <p>{{ successMessage }}</p>
          <button @click="closeSuccessMessage" class="bg-gray-light text-white px-4 py-2 rounded-full mt-4">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bewerbung from '@/components/Bewerbung.vue';
import Kontakt from '@/components/Kontakt.vue';
import Kalender from '@/components/Kalender.vue';
import { supabase } from '@/supabase';
import axios from 'axios';
import FlatPickr from 'vue-flatpickr-component';
import dayjs from 'dayjs';
import 'flatpickr/dist/flatpickr.css';

export default {
  components: {
    Bewerbung,
    Kontakt,
    Kalender,
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
      currentTab: 'bewerbung',
      emailSubject: '',
      emailBody: '',
      showDatePicker: false,
      datePickerConfig: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true,
        static: true,
      },
      user: null,
      isAdmin: false,
      loading: false,
      showSuccessMessage: false,
      successMessage: '',
    };
  },
  methods: {
    async fetchTickets() {
      const { data, error } = await supabase
        .from('bewerbung')
        .select('id, created_at, lastname, email, phone, experience, skills, education, firstname');
      if (error) {
        console.error('Error fetching tickets:', error);
      } else {
        this.tickets = data;
      }
    },
    async fetchKontaktTickets() {
      const { data, error } = await supabase
        .from('kontakt')
        .select('id, created_at, name, email, subject, message');
      if (error) {
        console.error('Error fetching kontakt tickets:', error);
      } else {
        this.kontaktTickets = data;
      }
    },
    async fetchCalendarEvents() {
      const { data, error } = await supabase
        .from('kalender')
        .select('id, title, date, email');
      if (error) {
        console.error('Error fetching calendar events:', error);
      } else {
        this.calendarEvents = data;
      }
    },
    selectTicket(ticket) {
      this.selectedTicket = { ...ticket }; // create a copy of the ticket
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
      this.selectedTicket = { ...ticket };
      this.showDatePicker = true;
    },
    closeDatePicker() {
      this.showDatePicker = false;
      this.selectedTicket = null;
    },
    async sendInvitation() {
      if (!this.selectedTicket || !this.selectedDate) {
        console.error('No ticket selected or date not set');
        return;
      }

      this.loading = true;

      const formattedDate = dayjs(this.selectedDate).format('MMMM D, YYYY HH:mm');
      const fullName = `${this.selectedTicket.firstname} ${this.selectedTicket.lastname}`;
      const email = this.selectedTicket.email;
      const { data, error } = await supabase
        .from('kalender')
        .insert([{ title: fullName, date: this.selectedDate, email: email }]);

      if (error) {
        console.error('Error adding calendar event:', error);
      } else {
        console.log('Calendar event added successfully:', data);
      }

      try {
        const response = await axios.post('/api/send-email', {
          to: email,
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

      this.loading = false;
      this.showDatePicker = false;
      this.selectedTicket = null;
      this.successMessage = 'The invitation has been sent successfully.';
      this.showSuccessMessage = true;
    },
    confirmDeleteTicket(ticketId) {
      this.selectedTicketId = ticketId;
      this.showConfirmDelete = true;
    },
    async deleteTicket(ticketId) {
      const ticketToDelete = this.tickets.find(ticket => ticket.id === ticketId);
      if (!ticketToDelete) {
        console.error('Ticket not found');
        return;
      }

      const { error } = await supabase
        .from('bewerbung')
        .delete()
        .eq('id', ticketId);
      if (error) {
        console.error('Error deleting ticket:', error);
      } else {
        this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId);
        this.showConfirmDelete = false;
        this.selectedTicketId = null;

        try {
          const response = await axios.post('/api/send-email', {
            to: ticketToDelete.email,
            subject: 'Absage zu Ihrer Bewerbung',
            html: `<strong>Ihre Bewerbung wurde abgelehnt.</strong><br>Wir bedauern, Ihnen mitteilen zu müssen, dass Ihre Bewerbung abgelehnt wurde.<br>Best regards, TechInnovate Solutions`,
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
    cancelDelete() {
      this.showConfirmDelete = false;
      this.selectedTicketId = null;
    },
    confirmDeleteKontaktTicket(ticketId) {
      this.selectedKontaktTicketId = ticketId;
      this.showConfirmDeleteKontakt = true;
    },
    async deleteKontaktTicket(ticketId) {
      const { error } = await supabase
        .from('kontakt')
        .delete()
        .eq('id', ticketId);
      if (error) {
        console.error('Error deleting kontakt ticket:', error);
      } else {
        this.kontaktTickets = this.kontaktTickets.filter(ticket => ticket.id !== ticketId);
        this.showConfirmDeleteKontakt = false;
        this.selectedKontaktTicketId = null;
      }
    },
    cancelDeleteKontakt() {
      this.showConfirmDeleteKontakt = false;
      this.selectedKontaktTicketId = null;
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
      const { error } = await supabase
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
    replyToTicket(ticket) {
      this.selectedKontaktTicket = { ...ticket };
      this.showEmailReplyWindow = true;
    },
    async sendReply() {
      if (!this.emailSubject || !this.emailBody || !this.selectedKontaktTicket) {
        return;
      }

      this.loading = true;

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

      this.loading = false;
      this.showEmailReplyWindow = false;
      this.selectedKontaktTicket = null;
      this.successMessage = 'The reply has been sent successfully.';
      this.showSuccessMessage = true;
    },
    async editTicket(ticket) {
      if (this.isAdmin) {
        this.selectedTicket = { ...ticket }; // Create a copy of the ticket
      }
    },
    async saveTicket() {
      if (!this.selectedTicket) return;

      const { error } = await supabase
        .from('bewerbung')
        .update({
          email: this.selectedTicket.email,
          phone: this.selectedTicket.phone,
          experience: this.selectedTicket.experience,
          skills: this.selectedTicket.skills,
          education: this.selectedTicket.education,
          subject: this.selectedTicket.subject,
          message: this.selectedTicket.message,
        })
        .eq('id', this.selectedTicket.id);

      if (error) {
        console.error('Error updating ticket:', error);
      } else {
        const index = this.tickets.findIndex(t => t.id === this.selectedTicket.id);
        if (index !== -1) {
          // Vue 3 reactive state update
          this.tickets[index] = this.selectedTicket;
        }
        this.clearSelection();
      }
    },
    closeSuccessMessage() {
      this.showSuccessMessage = false;
    },
  },
  async mounted() {
    await this.fetchTickets();
    await this.fetchKontaktTickets();
    await this.fetchCalendarEvents();

    const { data: { user } } = await supabase.auth.getUser();
    this.user = user;
    if (user?.email === 'admin@fh-kiel.com') {
      this.isAdmin = true;
    }
  },
};
</script>

<style scoped>
/* Add Tailwind classes for styling */
</style>
