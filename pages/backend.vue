<template>
  <div class="backend-container">
    <h1>Backend Ticket Dashboard</h1>
    <div class="tab-container">
      <button :class="{ active: currentTab === 'bewerbung' }" @click="currentTab = 'bewerbung'">Bewerbung</button>
      <button :class="{ active: currentTab === 'kontakt' }" @click="currentTab = 'kontakt'">Kontakt</button>
    </div>
    <div v-if="currentTab === 'bewerbung'">
      <!-- Bewerbung view -->
      <div class="sort-container">
        <label for="sortCriteria">Sort by:</label>
        <select id="sortCriteria" v-model="sortCriteria" @change="sortTickets">
          <option value="experience">Experience</option>
          <option value="education">Education</option>
        </select>
        <label for="sortOrder">Order:</label>
        <select id="sortOrder" v-model="sortOrder" @change="sortTickets">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div class="tickets-grid">
        <div
          v-for="ticket in sortedTickets"
          :key="ticket.id"
          class="ticket"
          @click="selectTicket(ticket)"
        >
          <div class="ticket-content">
            <h3>{{ ticket.firstname }} {{ ticket.lastname }}</h3>
            <div class="ticket-info">
              <div class="info-row">
                <p class="info-parameter">Email:</p>
                <p class="info-value truncate">{{ ticket.email }}</p>
              </div>
              <div class="info-row">
                <p class="info-parameter">Phone:</p>
                <p class="info-value truncate">{{ ticket.phone }}</p>
              </div>
              <div class="info-row">
                <p class="info-parameter">Experience:</p>
                <p class="info-value truncate">{{ ticket.experience }}</p>
              </div>
              <div class="info-row">
                <p class="info-parameter">Skills:</p>
                <p class="info-value truncate">{{ ticket.skills }}</p>
              </div>
              <div class="info-row">
                <p class="info-parameter">Education:</p>
                <p class="info-value truncate">{{ ticket.education }}</p>
              </div>
            </div>
          </div>
          <div class="ticket-actions">
            <button @click.stop="inviteTicket(ticket)">Invite</button>
            <button @click.stop="confirmDelete(ticket.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <!-- Kontakt view -->
      <div class="tickets-grid">
        <div
          v-for="ticket in kontaktTickets"
          :key="ticket.id"
          class="ticket"
          @click="selectKontaktTicket(ticket)"
        >
          <div class="ticket-content">
            <h3>{{ ticket.name }}</h3>
            <div class="ticket-info">
              <div class="info-row">
                <p class="info-parameter">Email:</p>
                <p class="info-value truncate">{{ ticket.email }}</p>
              </div>
              <div class="info-row">
                <p class="info-parameter">Subject:</p>
                <p class="info-value truncate">{{ ticket.subject }}</p>
              </div>
              <div class="info-row">
                <p class="info-parameter">Message:</p>
                <p class="info-value truncate">{{ ticket.message }}</p>
              </div>
            </div>
          </div>
          <div class="ticket-actions">
            <button @click.stop="confirmDeleteKontakt(ticket.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedTicket" class="modal-overlay" @click="clearSelection">
      <div class="modal" @click.stop>
        <h2>Details for {{ selectedTicket.firstname }} {{ selectedTicket.lastname }}</h2>
        <p>Email: {{ selectedTicket.email }}</p>
        <p>Phone: {{ selectedTicket.phone }}</p>
        <p>Experience: {{ selectedTicket.experience }}</p>
        <p>Skills: {{ selectedTicket.skills }}</p>
        <p>Education: {{ selectedTicket.education }}</p>
        <input type="datetime-local" v-model="selectedDate" />
        <button @click="sendInvitation">Send Invitation</button>
        <button @click="confirmDelete(selectedTicket.id)">Delete</button>
        <button @click="clearSelection">Close</button>
      </div>
    </div>
    <div v-if="selectedKontaktTicket" class="modal-overlay" @click="clearKontaktSelection">
      <div class="modal" @click.stop>
        <h2>Details for {{ selectedKontaktTicket.name }}</h2>
        <p>Email: {{ selectedKontaktTicket.email }}</p>
        <p>Subject: {{ selectedKontaktTicket.subject }}</p>
        <p>Message: {{ selectedKontaktTicket.message }}</p>
        <button @click="confirmDeleteKontakt(selectedKontaktTicket.id)">Delete</button>
        <button @click="clearKontaktSelection">Close</button>
      </div>
    </div>
    <div v-if="showConfirmDelete" class="confirm-modal-overlay">
      <div class="confirm-modal">
        <p>Are you sure you want to delete this ticket?</p>
        <button @click="deleteTicket(selectedTicketId)">Yes</button>
        <button @click="cancelDelete">No</button>
      </div>
    </div>
    <div v-if="showConfirmDeleteKontakt" class="confirm-modal-overlay">
      <div class="confirm-modal">
        <p>Are you sure you want to delete this contact ticket?</p>
        <button @click="deleteKontaktTicket(selectedKontaktTicketId)">Yes</button>
        <button @click="cancelDeleteKontakt">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import { supabase } from '@/supabase'
import axios from 'axios';

export default {
  data() {
    return {
      tickets: [],
      kontaktTickets: [],
      selectedTicket: null,
      selectedKontaktTicket: null,
      selectedDate: null,
      showConfirmDelete: false,
      showConfirmDeleteKontakt: false,
      selectedTicketId: null,
      selectedKontaktTicketId: null,
      sortCriteria: 'experience',
      sortOrder: 'asc',
      currentTab: 'bewerbung',
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
        case 'Andere':
          return 0;
        default:
          return 0;
      }
    },
    sortTickets() {
      this.tickets = [...this.tickets].sort((a, b) => {
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
    async deleteTicket(ticketId) {
      const { error } = await supabase
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
    async deleteKontaktTicket(ticketId) {
      const { error } = await supabase
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
    confirmDelete(ticketId) {
      this.selectedTicketId = ticketId;
      this.showConfirmDelete = true;
    },
    confirmDeleteKontakt(ticketId) {
      this.selectedKontaktTicketId = ticketId;
      this.showConfirmDeleteKontakt = true;
    },
    cancelDelete() {
      this.showConfirmDelete = false;
      this.selectedTicketId = null;
    },
    cancelDeleteKontakt() {
      this.showConfirmDeleteKontakt = false;
      this.selectedKontaktTicketId = null;
    },
    selectTicket(ticket) {
      this.selectedTicket = ticket;
    },
    selectKontaktTicket(ticket) {
      this.selectedKontaktTicket = ticket;
    },
    clearSelection() {
      this.selectedTicket = null;
      this.selectedDate = null;
    },
    clearKontaktSelection() {
      this.selectedKontaktTicket = null;
    },
    async sendInvitation() {
      const { email, firstname, lastname } = this.selectedTicket;
      const date = this.selectedDate;

      if (!date) {
        alert('Please select a date and time.');
        return;
      }

      try {
        const response = await axios.post('https://fh-kiel.com/api/mail.php', {
          email,
          firstname,
          lastname,
          date
        })

        if (response.status === 200) {
          alert('Invitation sent successfully.');
        } else {
          alert('Failed to send invitation.');
        }
      } catch (error) {
        console.error('Error sending invitation:', error);
        alert('An error occurred while sending the invitation.');
      }

      this.selectedTicket = null;
      this.selectedDate = null;
    },
    inviteTicket(ticket) {
      this.selectedTicket = ticket;
    }
  },
  async mounted() {
    await this.fetchTickets();
    await this.fetchKontaktTickets();
  }
}
</script>

<style scoped>
.backend-container {
  padding: 20px;
  background-color: #f9f9f9;
  max-width: 1200px;
  margin: auto;
  position: relative;
  box-sizing: border-box; /* Ensure padding is included in the width */
}

.tab-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

.tab-container button {
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  transition: background-color 0.2s ease;
}

.tab-container button.active {
  background-color: #0056b3;
}

.sort-container {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.sort-container label,
.sort-container select {
  flex: 1 1 100px; /* Allow flex items to shrink and grow */
}

.tickets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  box-sizing: border-box; /* Ensure padding is included in the width */
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
  cursor: pointer;
  overflow: hidden; /* Prevent content overflow */
  box-sizing: border-box; /* Ensure padding is included in the width */
}

.ticket:hover {
  transform: scale(1.05);
}

.ticket-content {
  flex-grow: 1;
}

.ticket-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* Allow content to wrap */
}

.info-parameter {
  font-weight: bold;
  flex: 1;
  min-width: 100px; /* Ensure minimum width to prevent overflow */
}

.info-value {
  flex: 2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ticket-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.ticket-actions button {
  pointer-events: all;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 101;
  box-sizing: border-box; /* Ensure padding is included in the width */
  max-width: 90%; /* Prevent modal from being too wide */
}

.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 102;
}

.confirm-modal {
  background: white;
  padding: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box; /* Ensure padding is included in the width */
  max-width: 90%; /* Prevent modal from being too wide */
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

.truncate {
  display: inline-block;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 320px) {
  .sort-container {
    flex-direction: column;
    align-items: stretch;
  }

  .sort-container label,
  .sort-container select {
    flex: 1 1 auto;
  }

  .tickets-grid {
    grid-template-columns: 1fr; /* Single column on very small screens */
  }

  .ticket {
    padding: 8px;
  }

  .info-row {
    flex-direction: column;
  }

  .info-parameter,
  .info-value {
    flex: 1 1 auto;
    min-width: auto;
  }
}
</style>
