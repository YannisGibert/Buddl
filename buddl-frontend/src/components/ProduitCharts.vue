<template>
    <div>
      <h2 class="text-center mb-4">Analyse des produits</h2>
  
      <div class="row mb-4">
        <div class="col-md-6">
          <label for="categorieFilter" class="form-label">Filtrer par catégorie :</label>
          <select id="categorieFilter" class="form-select" v-model="selectedCategorie">
            <option value="">Toutes les catégories</option>
            <option v-for="categorie in categories" :key="categorie" :value="categorie">{{ categorie }}</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="produitFilter" class="form-label">Filtrer par produit :</label>
          <select id="produitFilter" class="form-select" v-model="selectedProduit">
            <option value="">Tous les produits</option>
            <option v-for="produit in filteredProduits" :key="produit.id" :value="produit.id">{{ produit.nom }}</option>
          </select>
        </div>
      </div>
  
      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Revenus par produit</h5>
              <canvas ref="barChart"></canvas>
            </div>
          </div>
        </div>
  
        <div class="col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Répartition des revenus globaux</h5>
              <canvas ref="pieChartGlobal"></canvas>
            </div>
          </div>
        </div>
  
        <div class="col-md-6 mb-4" v-if="!selectedCategorie">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Répartition des revenus par catégorie</h5>
              <canvas ref="pieChartCategorie"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import { ref, onMounted, computed, watch } from 'vue';
import Chart from 'chart.js/auto';
import axios from 'axios';

export default {
  name: 'ProduitCharts',
  setup() {
    const barChart = ref(null);
    const pieChartGlobal = ref(null);
    const pieChartCategorie = ref(null);
    const produits = ref([]);
    const selectedCategorie = ref('');
    const selectedProduit = ref('');
    const barChartInstance = ref(null); 
    const pieChartGlobalInstance = ref(null); 
    const pieChartCategorieInstance = ref(null); 

    onMounted(async () => {
      try {
        const response = await axios.get('http://localhost:5000/produits');
        produits.value = response.data;
        updateCharts();
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error);
      }
    });

    const categories = computed(() => {
      const uniqueCategories = new Set(produits.value.map(p => p.categorie));
      return Array.from(uniqueCategories);
    });

    const filteredProduits = computed(() => {
      if (selectedCategorie.value) {
        return produits.value.filter(p => p.categorie === selectedCategorie.value);
      }
      return produits.value;
    });

    watch([selectedCategorie, selectedProduit], () => {
      updateCharts();
    });

    const updateCharts = () => {
      if (barChartInstance.value) {
        barChartInstance.value.destroy();
        barChartInstance.value = null;
      }
      if (pieChartGlobalInstance.value) {
        pieChartGlobalInstance.value.destroy();
        pieChartGlobalInstance.value = null;
      }
      if (pieChartCategorieInstance.value) {
        pieChartCategorieInstance.value.destroy();
        pieChartCategorieInstance.value = null;
      }

      const filteredData = selectedProduit.value
        ? produits.value.filter(p => p.id === selectedProduit.value)
        : filteredProduits.value;

      const labels = filteredData.map(p => p.nom);
      const revenus = filteredData.map(p => p.prix_vente * p.nombre_vendu);

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

      if (pieChartGlobal.value) {
        pieChartGlobalInstance.value = new Chart(pieChartGlobal.value.getContext('2d'), {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: 'Répartition des revenus',
              data: revenus,
              backgroundColor: [
                'rgba(74, 144, 226, 0.2)',
                'rgba(26, 42, 79, 0.2)',
                'rgba(255, 107, 107, 0.2)'
              ],
              borderColor: [
                'rgba(74, 144, 226, 1)',
                'rgba(26, 42, 79, 1)',
                'rgba(255, 107, 107, 1)'
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

      if (pieChartCategorie.value && !selectedCategorie.value) {
        const categoriesData = categories.value.map(cat => {
          const produitsCategorie = produits.value.filter(p => p.categorie === cat);
          return produitsCategorie.reduce((total, p) => total + (p.prix_vente * p.nombre_vendu), 0);
        });

        pieChartCategorieInstance.value = new Chart(pieChartCategorie.value.getContext('2d'), {
          type: 'pie',
          data: {
            labels: categories.value,
            datasets: [{
              label: 'Répartition des revenus par catégorie',
              data: categoriesData,
              backgroundColor: [
                'rgba(74, 144, 226, 0.2)',
                'rgba(26, 42, 79, 0.2)',
                'rgba(255, 107, 107, 0.2)'
              ],
              borderColor: [
                'rgba(74, 144, 226, 1)',
                'rgba(26, 42, 79, 1)',
                'rgba(255, 107, 107, 1)'
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
      pieChartGlobal,
      pieChartCategorie,
      produits,
      selectedCategorie,
      selectedProduit,
      categories,
      filteredProduits
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