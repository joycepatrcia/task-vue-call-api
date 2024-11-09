<template>
  <b-container class="mt-5">
    <b-row class="justify-content-center">
      <b-col cols="8">
        <h1 class="text-center text-light">Account Registered</h1><br>
        <div v-if="accounts.length > 0">
          <b-list-group>
            <b-list-group-item v-for="account in accounts" :key="account.account_id" class="account-item">
              <b-row>
                <b-col cols="4"><strong class="text-light">Account ID:</strong> {{ account.account_id }}</b-col>
                <b-col cols="4"><strong class="text-light">Name:</strong> {{ account.name }}</b-col>
                <b-col cols="4"><strong style="color: #FFD700;">Balance:</strong> {{ formatCurrency(account.balance) }}</b-col>
              </b-row>
            </b-list-group-item>
          </b-list-group><br>
          <div class="summary text-center mt-4 text-light">
            <p><strong>Total Accounts:</strong> {{ totalAccounts }}</p>
            <p><strong>Total Balance:</strong> {{ formatCurrency(totalBalance) }}</p>
            <p><strong>Average Balance:</strong> {{ formatCurrency(averageBalance) }}</p>
          </div>
        </div>
        <div v-else>
          <p class="text-center text-light">No accounts found.</p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      accounts: [],
      error: null,
    };
  },
  computed: {
    totalAccounts() {
      return this.accounts.length;
    },
    totalBalance() {
      return this.accounts.reduce((acc, account) => acc + account.balance, 0);
    },
    averageBalance() {
      return this.totalBalance / this.totalAccounts || 0;
    },
  },
  methods: {
    async fetchAccounts() {
      try {
        const response = await axios.get('http://localhost:8081/account/list');
        this.accounts = response.data.data;
      } catch (error) {
        this.error = error.message || 'An error occurred';
      }
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    },
  },
  created() {
    this.fetchAccounts();
  },
};
</script>

<style scoped>
.summary {
  font-weight: bold;
}

.text-center {
  text-align: center;
}

b-list-group-item {
  background-color: #001f3f; /* Dark blue (dongker) background for items */
  color: #ffffff; /* Light text color for readability */
  margin-bottom: 5px;
}

b-col {
  padding: 5px;
}

.account-item {
  background-color: #001f3f; /* Dark blue background for account items */
  color: #ffffff; /* Light text color */
}
</style>
