import { createRouter, createWebHistory } from 'vue-router';
import VentesView from '../views/VentesView.vue';
import ProduitView from '../views/ProduitView.vue'; 

const routes = [
  {
    path: '/ventes',
    component: VentesView 
  },
  {
    path: '/produits',
    component: ProduitView 
  },
  {
    path: '/',
    redirect: '/ventes'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;