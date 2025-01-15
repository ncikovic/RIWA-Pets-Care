const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {path: "/o_nama", component: () => {return import("pages/ONamaPage.vue");}},
      {path: "/dogadaji",component: () => {return import("pages/DogadajiPage.vue");}},
      {path: "/popisVeterinara", component: () => {return import("pages/PopisVeterinaraPage.vue");}},
      {path: "/prijavaKorisnika",component: () => {return import("pages/PrijavaKorisnikaPage.vue");}},
      {path: "/registracijaKorisnika",component: () => {return import("pages/RegistracijaKorisnikaPage.vue");}},
      {path: "/postavke", component: () => {return import("pages/PostavkePage.vue");}},
      {path: "/mojRacun", component: () => {return import("pages/MojRacunPage.vue");}},
      {path: "/mojiLjubimci", component: () => {return import("pages/MojiLjubimciPage.vue");}},
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    children: [
      { path: "/admin", component: () => import("pages/IndexAdmin.vue") },
      {path: "/admin/Postavke", component: () => {return import("pages/AdminPostavke.vue");}},
      {path: "/admin/popisKorisnika", component: () => {return import("pages/PopisKorisnika.vue");}},
      {path: "/admin/popisVeterinara", component: () => {return import("pages/PopisVeterinara.vue");}},
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
