<template>
  <div>
    <h2 class="text-center mb-4">Graphiques de ventes</h2>
    <div class="row mb-4">
      <div class="col-md-6">
        <label for="periodeFilter" class="form-label">Période :</label>
        <select id="periodeFilter" class="form-select" v-model="selectedPeriode">
          <option value="annuel">Annuel</option>
          <option value="mensuel">Mensuel</option>
        </select>
      </div>
      <div class="col-md-6" v-if="selectedPeriode === 'mensuel'">
        <label for="anneeFilter" class="form-label">Année :</label>
        <select id="anneeFilter" class="form-select" v-model="selectedAnnee">
          <option v-for="annee in annees" :key="annee" :value="annee">{{ annee }}</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Revenus par {{ selectedPeriode === 'annuel' ? 'année' : 'mois' }}</h5>
            <canvas ref="barChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Évolution des revenus</h5>
            <canvas ref="lineChart"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Répartition des revenus</h5>
            <canvas ref="pieChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  name: 'VenteCharts',
  setup() {
    const barChart = ref(null);
    const lineChart = ref(null);
    const pieChart = ref(null);
    const selectedPeriode = ref('annuel');
    const selectedAnnee = ref('');
    const ventes = ref([]);
    const barChartInstance = ref(null);
    const lineChartInstance = ref(null); 
    const pieChartInstance = ref(null); 

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:5000/data');
        ventes.value = response.data;
        updateCharts();
      } catch (error) {
        console.error('Erreur lors de la récupération des ventes :', error);
      }
    });

    const annees = computed(() => {
      const uniqueAnnees = new Set(ventes.value.map(v => v.annee));
      return Array.from(uniqueAnnees).sort();
    });

    watch([selectedPeriode, selectedAnnee], () => {
      updateCharts();
    });

    const updateCharts = () => {
      if (barChartInstance.value) {
        barChartInstance.value.destroy();
        barChartInstance.value = null;
      }
      if (lineChartInstance.value) {
        lineChartInstance.value.destroy();
        lineChartInstance.value = null;
      }
      if (pieChartInstance.value) {
        pieChartInstance.value.destroy();
        pieChartInstance.value = null;
      }

      const data = selectedPeriode.value === 'annuel'
        ? ventes.value.reduce((acc, vente) => {
            const annee = vente.annee;
            if (!acc[annee]) acc[annee] = 0;
            acc[annee] += vente.revenus;
            return acc;
          }, {})
        : ventes.value
            .filter(v => selectedAnnee.value ? v.annee === selectedAnnee.value : true)
            .reduce((acc, vente) => {
              const mois = vente.mois;
              if (!acc[mois]) acc[mois] = 0;
              acc[mois] += vente.revenus;
              return acc;
            }, {});

      const labels = Object.keys(data);
      const revenus = Object.values(data);

      if (barChart.value) {
        barChartInstance.value = new Chart(barChart.value.getContext('2d'), {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Revenus',
              data: revenus,
              backgroundColor: 'rgba(74, 144, 226, 0.2)',
              borderColor: 'rgba(74, 144, 226, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            animation: false 
          }
        });
      }

      if (lineChart.value) {
        lineChartInstance.value = new Chart(lineChart.value.getContext('2d'), {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Revenus',
              data: revenus,
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            animation: false 
          }
        });
      }

      if (pieChart.value) {
        pieChartInstance.value = new Chart(pieChart.value.getContext('2d'), {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Répartition des revenus',
              data: revenus,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            animation: false 
          }
        });
      }
    };

    return {
      barChart,
      lineChart,
      pieChart,
      selectedPeriode,
      selectedAnnee,
      ventes,
      annees
    };
  }
};
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>