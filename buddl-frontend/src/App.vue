<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #1A2A4F;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="@/assets/buddlLogo.jpg" alt="Logo Buddl" style="height: 40px;">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/ventes" class="nav-link">Ventes</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/produits" class="nav-link">Produits</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="#">Comment ça marche?</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Tarifs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Clients</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Blog</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">A propos</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Demandez une démo</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Se connecter</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main class="container my-5">
      <router-view></router-view>
    </main>
    <footer class="bg-dark text-white text-center py-3">
      <p>&copy; 2023 BuddI. Tous droits réservés.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
}

footer {
  margin-top: auto;
}

.navbar {
  padding: 1rem 2rem;
}

.navbar-brand img {
  margin-right: 10px;
}

.nav-link {
  color: #FFFFFF !important; 
  font-weight: 500; 
  margin: 0 10px; 
}

.nav-link:hover {
  color: #4A90E2 !important; 
}
</style>