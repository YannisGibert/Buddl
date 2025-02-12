<template>
    <div>
      <ProduitCharts />
    </div>
  </template>
  
  <script>
  import ProduitCharts from '../components/ProduitCharts.vue'; 
  
  export default {
    name: 'ProduitView',
    components: {
      ProduitCharts
    }
  };
  </script>