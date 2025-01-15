<template>
  <div>
    <q-splitter before-class="jedan" after-class="dogadaji"
    v-model="splitterModel"
      style="
        height: 90vh;
        font-family: 'Times New Roman', Times, serif;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      "
      class="responsive"
    >
      <template v-slot:before>
        <div class="q-pa-md map-container ">
          <div class="q-mb-md calendar-container">
            <q-date v-model="date" :events="events" event-color="yellow" />
          </div>

        </div>

      </template>

      <template v-slot:after>
        <q-tab-panels
          v-model="date"
          animated
          transition-prev="jump-up"
          transition-next="jump-up"

        >
          <q-tab-panel v-for="event in events" :name="event" :key="event">
            <div class="event-detail pocrnit">
              <div class="text-h4 q-mb-md">{{ event }}</div>
              <p>
                <strong>NAZIV DOGAĐAJA:</strong> {{ eventDetails[event].name }}
              </p>
              <p>
                <strong>MJESTO DOGAĐAJA:</strong>
                {{ eventDetails[event].location }}
              </p>
              <p>
                <strong>OPIS:</strong> {{ eventDetails[event].description }}
              </p>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </q-splitter>
    <div id="map" class="map"></div>
  </div>

</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  setup() {
    const splitterModel = ref(50);
    const date = ref("2024/11/05");
    const events = [
      "2024/11/05",
      "2024/09/30",
      "2025/01/28",
      "2025/05/05",
      "2024/12/16",
      "2025/03/10",
      "2025/06/22",
      "2024/12/05",
      "2024/12/10",
      "2024/12/15",
      "2025/01/10",
      "2025/01/19",
      "2025/01/20",
      "2025/02/03",
      "2025/02/10",
    ];

    const eventDetails = {
      "2024/11/05": {
        name: "Veterinarski seminar",
        location: "Zagreb, Park Zrinjevac",
        description: "Seminar o zdravstvenoj zaštiti kućnih ljubimaca.",
      },
      "2024/09/30": {
        name: "Obuka za vlasnike pasa",
        location: "Split, Dioklecijanova palača",
        description:
          "Interaktivna radionica za bolje razumijevanje ponašanja pasa.",
      },
      "2025/01/28": {
        name: "Predavanje o prehrani kućnih ljubimaca",
        location: "Rijeka, Korzo",
        description:
          "Stručnjaci dijele savjete o zdravoj prehrani za kućne ljubimce.",
      },
      "2025/05/05": {
        name: "Festival kućnih ljubimaca",
        location: "Osijek, Gradski park",
        description:
          "Dan ispunjen zabavnim aktivnostima za ljubimce i njihove vlasnike.",
      },
      "2024/12/16": {
        name: "Sajam opreme za kućne ljubimce",
        location: "Zagreb, Velesajam",
        description:
          "Prilika za kupnju najnovije opreme i dodataka za ljubimce.",
      },
      "2025/03/10": {
        name: "Trening spašavanja s psima",
        location: "Varaždin, Dravski park",
        description:
          "Demonstracija i obuka pasa za spašavanje u hitnim situacijama.",
      },
      "2025/06/22": {
        name: "Maraton s ljubimcima",
        location: "Zadar, Riva",
        description:
          "Humanitarna utrka s kućnim ljubimcima za pomoć napuštenim životinjama.",
      },
      "2024/12/05": {
        name: "Pet Fashion Show",
        location: "Zagreb, Trg bana Jelačića",
        description: "Prikaz najnovijih modnih trendova za kućne ljubimce.",
      },
      "2024/12/10": {
        name: "Božićna zabava za kućne ljubimce",
        location: "Osijek, Gradski park",
        description:
          "Zabava u kojoj se vlasnici kućnih ljubimaca mogu natjecati u raznim disciplinama sa svojim ljubimcima.",
      },
      "2024/12/15": {
        name: "Predavanje o očuvanju zdravlja pasa",
        location: "Rijeka, Kulturni centar",
        description:
          "Predavanje stručnjaka o važnosti preventivnih zdravstvenih pregleda i pravilne brige za pse.",
      },
      "2025/01/10": {
        name: "Winter Pet Walk",
        location: "Pula, Park Verudela",
        description:
          "Zimska šetnja za kućne ljubimce i njihove vlasnike s nagradama za najljepše obučene ljubimce.",
      },
      "2025/01/19": {
        name: "Zdravlje kućnih ljubimaca – radionica",
        location: "Split, Sportska dvorana",
        description:
          "Radionica o prevenciji bolesti i pravilnoj prehrani kućnih ljubimaca.",
      },
      "2025/01/20": {
        name: "Psi na ledu - natjecanje",
        location: "Zadar, Zimski kompleks",
        description: "Natjecanje pasa u sportskim disciplinama na ledu. ",
      },
      "2025/02/03": {
        name: "Izložba pasa i mačaka",
        location: "Varaždin, Sajamski centar",
        description:
          "Izložba različitih pasmina pasa i mačaka, natjecanje u ljepoti i poslušnosti.",
      },
      "2025/02/10": {
        name: "Trening za pse spasioce",
        location: "Osijek, Gradski centar",
        description:
          "Obuka za treniranje pasa za hitne situacije i intervencije.",
      },
    };

    onMounted(() => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCfwJdSGiDxHog7k4Sx576IzrjP32fM9no";
      script.async = true;
      script.onload = () => {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 45.815, lng: 15.981 },
          zoom: 10,
        });

        const geocoder = new google.maps.Geocoder();
        let marker = null;

        const updateMap = () => {
          const location = eventDetails[date.value]?.location;
          if (location) {
            geocoder.geocode({ address: location }, (results, status) => {
              if (status === "OK") {
                map.setCenter(results[0].geometry.location);
                if (marker) {
                  marker.setMap(null);
                }
                marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location,
                });
              }
            });
          }
        };

        watch(date, () => {
          updateMap();
        });

        updateMap();
      };

      document.head.appendChild(script);
    });

    return { date, events, splitterModel, eventDetails };
  },
};
</script>

<style scoped>

#map {
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.map{
  width:70vw;
  height:45vh !important;
  position: absolute !important;
  bottom: 0;
  left:20%;
  margin-left:5%;

}


.map-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.calendar-container {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.event-detail {
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.q-splitter__before {
  padding: 0;
}

.q-splitter__after {
  background-color: #f9fafb;
}

.q-splitter__handle {
  background-color: #e5e7eb;
}

.text-h4 {
  color: #374151;
  font-family: 'Times New Roman', Times, serif;
}
.p{
  font-size: medium;
  font-family: 'Times New Roman', Times, serif;
}

.q-mb-md {
  margin-bottom: 16px;
}

.q-pa-md {
  padding: 16px;
}


@media only screen and (max-width: 1000px) {
.responsive{
  display: grid;
  grid-template-columns: 1fr;
  height:80svh !important;
  margin-bottom: 0 !important;
  grid-template-rows: 60% 40% !important;
}
::v-deep(.jedan) {
  width:100vw !important;
}


.map{
  height:50svh !important;
  position: relative !important;
 width:100%;
 left:0;
 margin-left:0;
}

::v-deep(.dogadaji){
  grid-row-start: 2 !important;
}
}


@media only screen and (max-height: 800px) {
  .responsive{
  height:100svh !important;
}
}
</style>
