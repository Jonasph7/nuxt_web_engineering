<template>
  <div class="backend-container">
    <h1>Backend Ticket Dashboard</h1>
    <div class="tickets-grid">
      <div
        v-for="ticket in tickets"
        :key="ticket.id"
        class="ticket"
      >
        <div class="ticket-content">
          <h3>{{ ticket.firstname }} {{ ticket.lastname }}</h3>
          <p>Email: {{ ticket.email }}</p>
          <p>Phone: {{ ticket.phone }}</p>
          <p>Experience: {{ ticket.experience }}</p>
          <p>Skills: {{ ticket.skills }}</p>
          <p>Education: {{ ticket.education }}</p>
        </div>
        <div class="ticket-actions">
          <button @click="selectTicket(ticket)">Invite</button>
          <button @click="deleteTicket(ticket.id)">Delete</button>
        </div>
      </div>
    </div>
    <div v-if="selectedTicket" class="modal">
      <h2>Invite {{ selectedTicket.firstname }} {{ selectedTicket.lastname }}</h2>
      <input type="datetime-local" v-model="selectedDate" />
      <button @click="sendInvitation">Send Invitation</button>
      <button @click="clearSelection">Close</button>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase'

export default {
  data() {
    return {
      tickets: [],
      selectedTicket: null,
      selectedDate: null
    }
  },
  methods: {
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
    async deleteTicket(ticketId) {
      const { error } = await supabase
        .from('bewerbung')
        .delete()
        .eq('id', ticketId)
      
      if (error) {
        console.error('Error deleting ticket:', error)
      } else {
        this.tickets = this.tickets.filter(ticket => ticket.id !== ticketId)
      }
    },
    selectTicket(ticket) {
      this.selectedTicket = ticket
    },
    clearSelection() {
      this.selectedTicket = null
      this.selectedDate = null
    },
    async sendInvitation() {
      const { email, firstname, lastname } = this.selectedTicket
      const date = this.selectedDate

      if (!date) {
        alert('Please select a date and time.')
        return
      }

      try {
        const response = await this.$axios.post('/api/send-invitation', {
          email,
          firstname,
          lastname,
          date
        })

        if (response.status === 200) {
          alert('Invitation sent successfully.')
        } else {
          alert('Failed to send invitation.')
        }
      } catch (error) {
        console.error('Error sending invitation:', error)
        alert('An error occurred while sending the invitation.')
      }

      this.selectedTicket = null
      this.selectedDate = null
    }
  },
  async mounted() {
    await this.fetchTickets()
  }
}
</script>

<style scoped>
.backend-container {
  padding: 20px;
  background-color: #f9f9f9;
  max-width: 1200px; /* Erhöhte max-width */
  margin: auto;
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.ticket {
  border: 1px solid #ddd;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ticket:hover {
  transform: scale(1.05);
}

.ticket-content {
  flex-grow: 1;
}

.ticket-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
