<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Analytics</h1>
      <div class="flex space-x-2">
        <button
          @click="setDateRange('week')"
          :class="['px-3 py-1 text-sm rounded-md', dateRange === 'week' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700']"
        >
          Week
        </button>
        <button
          @click="setDateRange('month')"
          :class="['px-3 py-1 text-sm rounded-md', dateRange === 'month' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700']"
        >
          Month
        </button>
        <button
          @click="setDateRange('year')"
          :class="['px-3 py-1 text-sm rounded-md', dateRange === 'year' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700']"
        >
          Year
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <div class="overflow-hidden bg-white rounded-lg shadow">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <ShoppingCart class="w-6 h-6 text-gray-400" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ analytics.totalOrders }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-hidden bg-white rounded-lg shadow">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <DollarSign class="w-6 h-6 text-gray-400" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">${{ analytics.totalRevenue }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-hidden bg-white rounded-lg shadow">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Users class="w-6 h-6 text-gray-400" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Customers</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ analytics.totalCustomers }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-hidden bg-white rounded-lg shadow">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <Package class="w-6 h-6 text-gray-400" />
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Products Sold</dt>
                <dd class="flex items-baseline">
                  <div class="text-2xl font-semibold text-gray-900">{{ analytics.totalProductsSold }}</div>
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <!-- Revenue Chart -->
      <div class="overflow-hidden bg-white rounded-lg shadow">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Revenue Over Time</h3>
          <div class="mt-4">
            <canvas ref="revenueChart" height="300"></canvas>
          </div>
        </div>
      </div>

      <!-- Orders Chart -->
      <div class="overflow-hidden bg-white rounded-lg shadow">
        <div class="px-4 py-5 sm:p-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Orders Over Time</h3>
          <div class="mt-4">
            <canvas ref="ordersChart" height="300"></canvas>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Products -->
    <div class="overflow-hidden bg-white rounded-lg shadow">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Top Selling Products</h3>
        <p class="mt-1 text-sm text-gray-500">Most popular products based on sales volume</p>
      </div>
      <div class="border-t border-gray-200">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Product</th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Units Sold</th>
              <th scope="col" class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">Revenue</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(product, index) in topProducts" :key="index">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ product.units_sold }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">${{ product.revenue }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ShoppingCart, DollarSign, Users, Package } from 'lucide-vue-next'
import Chart from 'chart.js/auto'
import api from '../../services/api'

export default {
  name: 'AdminAnalytics',
  components: {
    ShoppingCart,
    DollarSign,
    Users,
    Package
  },
  data() {
    return {
      dateRange: 'month',
      analytics: {
        totalOrders: 0,
        totalRevenue: 0,
        totalCustomers: 0,
        totalProductsSold: 0
      },
      revenueChartData: {
        labels: [],
        datasets: []
      },
      ordersChartData: {
        labels: [],
        datasets: []
      },
      topProducts: [],
      revenueChartInstance: null,
      ordersChartInstance: null
    }
  },
  async mounted() {
    await this.fetchAnalytics()
  },
  beforeUnmount() {
    if (this.revenueChartInstance) {
      this.revenueChartInstance.destroy()
    }
    if (this.ordersChartInstance) {
      this.ordersChartInstance.destroy()
    }
  },
  methods: {
    setDateRange(range) {
      this.dateRange = range
      this.fetchAnalytics()
    },
    async fetchAnalytics() {
      try {
        // In a real application, you would pass the date range to the backend
        // For now, we'll simulate the data
        this.analytics = {
          totalOrders: 124,
          totalRevenue: 12450,
          totalCustomers: 89,
          totalProductsSold: 342
        }

        // Simulate chart data
        this.revenueChartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [1200, 1900, 3000, 5000, 2300, 4200],
            backgroundColor: 'rgba(79, 70, 229, 0.5)',
            borderColor: 'rgb(79, 70, 229)',
            borderWidth: 1
          }]
        }

        this.ordersChartData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Orders',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            borderColor: 'rgb(16, 185, 129)',
            borderWidth: 1
          }]
        }

        // Simulate top products
        this.topProducts = [
          { name: 'Organic Avocado', units_sold: 42, revenue: 1260 },
          { name: 'Whole Grain Bread', units_sold: 38, revenue: 760 },
          { name: 'Greek Yogurt', units_sold: 35, revenue: 875 },
          { name: 'Almond Milk', units_sold: 32, revenue: 640 },
          { name: 'Quinoa', units_sold: 28, revenue: 560 }
        ]

        this.renderCharts()
      } catch (error) {
        console.error('Error fetching analytics:', error)
      }
    },
    renderCharts() {
      // Destroy existing charts if they exist
      if (this.revenueChartInstance) {
        this.revenueChartInstance.destroy()
      }
      if (this.ordersChartInstance) {
        this.ordersChartInstance.destroy()
      }

      // Render revenue chart
      const revenueCtx = this.$refs.revenueChart.getContext('2d')
      this.revenueChartInstance = new Chart(revenueCtx, {
        type: 'bar',
        data: this.revenueChartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })

      // Render orders chart
      const ordersCtx = this.$refs.ordersChart.getContext('2d')
      this.ordersChartInstance = new Chart(ordersCtx, {
        type: 'line',
        data: this.ordersChartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    }
  }
}
</script>