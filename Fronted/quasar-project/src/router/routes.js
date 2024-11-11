const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      {path: '/o_nama', component: () => { return import('pages/ONamaPage.vue')}},
      {path: '/dogadaji', component: () => { return import('pages/DogadajiPage.vue')}},
      {path: '/popisVeterinara', component: () => { return import('pages/PopisVeterinaraPage.vue')}},
      {path: '/prijavaKorisnika', component: () => { return import('pages/PrijavaKorisnikaPage.vue')}},
      {path: '/registracijaKorisnika', component: () => { return import('pages/RegistracijaKorisnikaPage.vue')}},
      {path: '/postavke', component: () => { return import('pages/PostavkePage.vue')}}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
