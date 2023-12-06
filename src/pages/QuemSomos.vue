<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const html = ref(null);
const itsLoading = ref(true);
const router = useRouter();
const BASE_URL = "https://babyemommy.com.br/api";

async function getPoliticas (typePolitica) {
  try {
    const requisicao = await axios.get(`${BASE_URL}/termoUsoService/getPolitica/${typePolitica}`).then(e => e.data);
    html.value = requisicao.termo;
  } catch (e) {
    console.error(e);
  }
}

async function getColigadas () {
  try {
    const requisicao = await axios.get(`${BASE_URL}/coligadaService/allLojas`).then(e => e.data);
    html.value = requisicao.termo;
  } catch (e) {
    console.error(e);
  }
}

async function getQuemSomos () {
  try {
    const requisicao = await axios.get(`${BASE_URL}/empresaService/ecommerce/quemSomos`).then(e => e.data);
    html.value = requisicao.termo;
  } catch (e) {
    console.error(e);
  }
}

async function getServicoById (typePolitica) {
  try {
    const id = await router.currentRoute._value.query.id;
    const requisicao = await axios.get(`${BASE_URL}/termoUsoService/getServico/${id}`).then(e => e.data);
    html.value = requisicao.termo;
  } catch (e) {
    console.error(e);
  }
}

async function verifyTypeInfo (info) {
  switch (info) {
  case "politicas-de-frete":
    await getPoliticas("FRETE");
    break;
  case "politicas-de-privacidade":
    await getPoliticas("POLITICA");
    break;
  case "Políticas de Garantia":
    await getPoliticas("GARANTIA");
    break;
  case "Nossas lojas":
    await getColigadas();
    break;
  case "Sobre nós":
    await getQuemSomos();
    break;
  case "Perguntas frequentes":
    await getPoliticas("PERGUNTAS SITE");
    break;
  case "Dúvidas":
    await getPoliticas("DUVIDAS");
    break;
  case "política-de-proteção-de-dados":
    await getPoliticas("PROTECAO DADOS");
    break;
  case "servicos":
    await getServicoById();
    break;
  case "seja-revendedor":
    await getPoliticas("REVENDEDOR");
    break;
  case "politicas-de-reembolso":
    await getPoliticas("REEMBOLSO");
    break;
  case "politicas-de-trocas":
    await getPoliticas("TROCAS");
    break;
  case "sustentabilidade":
    await getPoliticas("SUSTENTABILIDADE");
    break;
  case "termo-uso":
    await getPoliticas("TERMOS");
    break;
  }
}

onBeforeMount(async () => {
  itsLoading.value = true;
  const typePolitica = await router.currentRoute._value.query.info;
  await verifyTypeInfo(typePolitica);
  itsLoading.value = false;
});
</script>

<template lang="pug">
q-page-container
    div.container(
        v-show="!itsLoading"
    )
        .conteudo(
            v-html="html"
        )
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
}
.conteudo {
  padding: 1rem;
  width: 90%;
  margin: 0 auto;
}
</style>
