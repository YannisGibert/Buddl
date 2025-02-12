import { createRouter, createWebHistory } from 'vue-router';
import VentesView from '../views/VentesView.vue'; // Utilise VentesView
import ProduitView from '../views/ProduitView.vue'; // Utilise ProduitView

const routes = [
  {
    path: '/ventes',
    component: VentesView // Utilise VentesView
  },
  {
    path: '/produits',
    component: ProduitView // Utilise ProduitView
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