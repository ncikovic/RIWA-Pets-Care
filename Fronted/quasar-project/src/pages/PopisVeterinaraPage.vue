<template>
  <q-page padding>
    <h1 class="text-center">Popis Veterinara</h1>
    <p class="text-center">
      Ovdje možete pronaći popis svih veterinara koji su dostupni u našem
      sustavu.
    </p>

    <!-- Tražilica za veterinare -->
    <q-input
      v-model="searchQuery"
      label="Pretraži veterinare"
      placeholder="Upišite ime, prezime, specijalizaciju ili specijalizaciju za životinje"
      debounce="300"
      class="q-mb-md"
    />

    <q-table
      :rows="filteredVeterinarians"
      :columns="columns"
      row-key="id"
      class="q-my-md"
    />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "", // Promjenjiva za pretragu

      veterinarians: [
        {
          id: 1,
          ime: "Marko",
          prezime: "Horvat",
          lokacija: "Zagreb",
          radno_vrijeme: "Pon - Pet: 08:00 - 16:00",
          specijalizacija: "Opća praksa",
          kontakt_email: "marko.horvat@email.com",
          kontakt_telefon: "091 234 5678",
          specijalizacija_za: "Klasične ljubimce",
        },
        {
          id: 2,
          ime: "Ana",
          prezime: "Kovač",
          lokacija: "Split",
          radno_vrijeme: "Pon - Pet: 09:00 - 17:00",
          specijalizacija: "Kirurgija",
          kontakt_email: "ana.kovac@email.com",
          kontakt_telefon: "098 765 4321",
          specijalizacija_za: "Psi, Mačke",
        },
        {
          id: 3,
          ime: "Ivana",
          prezime: "Petrović",
          lokacija: "Rijeka",
          radno_vrijeme: "Pon - Pet: 08:30 - 15:30",
          specijalizacija: "Dermatologija",
          kontakt_email: "ivana.petrovic@email.com",
          kontakt_telefon: "091 112 2334",
          specijalizacija_za: "Male životinje",
        },
        {
          id: 4,
          ime: "Luka",
          prezime: "Simek",
          lokacija: "Osijek",
          radno_vrijeme: "Pon - Pet: 10:00 - 18:00",
          specijalizacija: "Stomatologija",
          kontakt_email: "luka.simek@email.com",
          kontakt_telefon: "099 334 4556",
          specijalizacija_za: "Psi, Mačke, Zečevi",
        },
        {
          id: 5,
          ime: "Petra",
          prezime: "Jurić",
          lokacija: "Rijeka",
          radno_vrijeme: "Pon - Pet: 08:00 - 14:00",
          specijalizacija: "Interna medicina",
          kontakt_email: "petra.juric@email.com",
          kontakt_telefon: "091 654 9876",
          specijalizacija_za: "Psi, Mačke, Zmije",
        },
        {
          id: 6,
          ime: "Ivan",
          prezime: "Tomić",
          lokacija: "Pula",
          radno_vrijeme: "Pon - Pet: 09:00 - 16:00",
          specijalizacija: "Kardiologija",
          kontakt_email: "ivan.tomic@email.com",
          kontakt_telefon: "098 123 4567",
          specijalizacija_za: "Hrčci, Zamorci, Zečevi",
        },
        {
          id: 7,
          ime: "Maja",
          prezime: "Zorić",
          lokacija: "Dubrovnik",
          radno_vrijeme: "Pon - Pet: 08:30 - 17:00",
          specijalizacija: "Zoološki veterinar",
          kontakt_email: "maja.zoric@email.com",
          kontakt_telefon: "091 555 6677",
          specijalizacija_za: "Egzotične vrste",
        },
        {
          id: 8,
          ime: "Nikola",
          prezime: "Ivić",
          lokacija: "Zagreb",
          radno_vrijeme: "Pon - Pet: 10:00 - 18:00",
          specijalizacija: "Onkologija",
          kontakt_email: "nikola.ivic@email.com",
          kontakt_telefon: "099 666 7777",
          specijalizacija_za: "Psi, Mačke",
        },
        {
          id: 9,
          ime: "Jana",
          prezime: "Lukić",
          lokacija: "Osijek",
          radno_vrijeme: "Pon - Pet: 08:00 - 16:00",
          specijalizacija: "Medicina egzotičnih životija",
          kontakt_email: "jana.lukic@email.com",
          kontakt_telefon: "091 789 1234",
          specijalizacija_za: "Egzotične ljubimce",
        },
        {
          id: 10,
          ime: "Karla",
          prezime: "Šarić",
          lokacija: "Zadar",
          radno_vrijeme: "Pon - Pet: 09:00 - 15:00",
          specijalizacija: "Neurologija",
          kontakt_email: "karla.saric@email.com",
          kontakt_telefon: "098 234 5678",
          specijalizacija_za: "Psi, Mačke, Zmije",
        },
      ],

      columns: [
        { name: "id", label: "ID", field: "id", align: "left" },
        { name: "ime", label: "Ime", field: "ime", align: "left" },
        { name: "prezime", label: "Prezime", field: "prezime", align: "left" },
        {
          name: "lokacija",
          label: "Lokacija",
          field: "lokacija",
          align: "left",
        },
        {
          name: "radno_vrijeme",
          label: "Radno vrijeme",
          field: "radno_vrijeme",
          align: "left",
        },
        {
          name: "specijalizacija",
          label: "Specijalizacija",
          field: "specijalizacija",
          align: "left",
        },
        {
          name: "kontakt_email",
          label: "Kontakt (E-mail)",
          field: "kontakt_email",
          align: "left",
        },
        {
          name: "kontakt_telefon",
          label: "Kontakt (Telefon)",
          field: "kontakt_telefon",
          align: "left",
        },
        {
          name: "specijalizacija_za",
          label: "Specijalizacija za",
          field: "specijalizacija_za",
          align: "left",
        },
      ],
    };
  },
  computed: {
    filteredVeterinarians() {
      const query = this.searchQuery.toLowerCase();
      return this.veterinarians.filter((vet) => {
        return (
          vet.ime.toLowerCase().includes(query) ||
          vet.prezime.toLowerCase().includes(query) ||
          vet.specijalizacija.toLowerCase().includes(query) ||
          vet.specijalizacija_za.toLowerCase().includes(query)
        );
      });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2.5rem;
  color: #422c50;
  margin-bottom: 20px;
}

p {
  font-size: 1.25rem;
  color: #7f8c8d;
  margin-bottom: 40px;
}

.q-table {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.q-table th,
.q-table td {
  padding: 12px;
  text-align: left;
}

.q-table th {
  background-color: #8537cf;
  color: #34495e;
}

.q-table td {
  color: #7f8c8d;
}

.q-my-md {
  margin-top: 40px;
  margin-bottom: 40px;
}

.text-center {
  text-align: center;
}

.q-btn {
  background: #7434db;
  color: rgb(148, 85, 231);
  border-radius: 8px;
}
</style>
