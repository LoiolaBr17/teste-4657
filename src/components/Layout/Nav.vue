<script setup>
import { ref, computed, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const productTyped = ref(null);
const itsLoading = ref(true);
const cor = ref("black");
const categoriesBase = ref([
  {
    name: "VIAGENS",
    children: [
      { name: "VIAGEM 1", children: [] },
      { name: "VIAGEM 2", children: [] },
      { name: "VIAGEM 3", children: [] },
      { name: "VIAGEM 4", children: [] },
      { name: "VIAGEM 5", children: [] }
    ]
  }
]);

const props = defineProps({
  dynamicStyle: {
    type: Object,
    default: () => {}
  }
});

const correctStyle = computed(() => {
  if (props.dynamicStyle) return props.dynamicStyle;
  return { color: "" };
});

function redirectToSearchPage () {
  if (productTyped.value) {
    const url = "/pesquisa/" + productTyped.value;
    router.push(url);
  }
}

async function searchCategories () {
  try {
    const data = await axios.get("https://babyemommy.com.br/api/ecommerce/categoriaAutoRelacionada/getAllCategorias").then(e => e.data);
    if (data.length) {
      categoriesBase.value = data.map(row => {
        return { ...row, name: row.descricao, children: [...row.subCategoria], foto: row.fotoUrl };
      });
    }
  } catch (e) {
    console.error(e);
  }
}

async function openCategoryPage (category) {
  if (category.id) {
    const url = "/categorias/" + category.id;
    await router.push(url);
    window.location.reload();
  }
}

function MudarCores () {
  if (route.path === "/") {
    cor.value = "white";
  } else {
    cor.value = "black";
  }
}

function limparbusca () {
  if (productTyped.value != null) {
    productTyped.value = null;
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const opacityThreshold = 0;

  if (scrollPosition > opacityThreshold) {
    cor.value = "black";
  } else {
    cor.value = "white";
  }
};

onBeforeMount(async () => {
  itsLoading.value = true;
  await searchCategories();
  MudarCores();
  itsLoading.value = false;
});

onMounted(() => {
  if (route.path === "/") {
    window.addEventListener("scroll", handleScroll);
  }
});

onBeforeUnmount(() => {
  if (route.path === "/") {
    window.removeEventListener("scroll", handleScroll);
  }
});

</script>

<template lang="pug">
q-toolbar.nav.q-px-md.col.q-pt-sm(
  v-show="!itsLoading"
)
  div.row.col.justify-evenly
    template(
      v-for="categorie in categoriesBase"
      :key="categorie.name"
    )
      p.cursor-pointer.row(
        @click="openCategoryPage(categorie)"
        style=" font-size: 14px;"
        :color="cor"
      ) {{ categorie.name }}
      div.col
  div.col-2.row
    q-input.text-black.busca.q-pb-md.col-12(
      v-model="productTyped"
      type="search"
      label
      dense
      :color="cor"
      @keypress.enter="redirectToSearchPage()"
      ref="inputRef"
    )
      template(v-slot:label)
        .textobusca.q-pr-sm(
          :style="correctStyle"
          :color="cor"
      ) O QUE ESTÁ BUSCANDO
      template(v-slot:append)
        q-icon(
          v-show="productTyped != null"
          size="xs"
          @click="limparbusca()"
          :color="cor"
          name="close"
          style="transition: 1s; cursor:pointer"
        )
        q-icon(
          size="xs"
          @click="redirectToSearchPage()"
          :color="cor"
          name="search"
          style="transition: 1s; cursor:pointer"
        )
</template>
<style scoped>
a{
  cursor: pointer;
  font-weight: bold;
}
.menu{
  font-weight:bolder;
}
.textobusca{
  transition: 1s;
  font-size:14px;
}
.nav{
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  flex-grow: 1;
  max-width: 85%;
  margin: 0 auto;
  flex-wrap: nowrap;
  position: relative;
  justify-content: center;
  text-align: center;
  align-items: center;
  box-sizing:border-box;
}
@media screen and (max-width: 1240px) {
  .textobusca{
    font-size:13px
  }
}
@media screen and (max-width: 1176px) {
  .textobusca{
    font-size:12px
  }
}
@media screen and (max-width: 1150px) {
  .nav{
    display: none;
  }
}
</style>
