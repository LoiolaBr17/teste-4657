<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

const router = useRouter();
const $q = useQuasar();

const sejaRevendedor = ref({});
const termoUso = ref({});
const termo = ref({});
const politicaPrivacidade = ref({});
const garantia = ref({});
const frete = ref({});
const perguntasSite = ref({});
const perguntasMobile = ref({});
const protecaoDados = ref({});
const quemSomos = ref({});
const servico = ref({});
const reembolso = ref({});
const trocas = ref({});
const sustentabilidade = ref({});

const cartId = $q.localStorage.getItem("cartIdBackend");
const linkcarrinho = `https://babyemommy.elevarone.com.br/checkout?idCart=${cartId}`;

const infosLinks = ref({
  city: "Fortaleza",
  cnpj: "28463426000109",
  complement: "",
  district: "Meireles",
  email: "LOJAbabyemommy@GMAIL.COM",
  id: 5,
  name: "MITA COMERCIO VAREJISTA DE ARTEFATOS DE COURO LTDA",
  nomeFantasia: "Baby & Mommy Oficial",
  number: 705,
  phone: "85991742677",
  site: "https://babyemommy.com.br/elevarloja.com.br",
  state: "CE",
  street: "Avenida Dom Luís",
  zipcode: "60160230",
  socialNetwork: []
});

function maskPhoneNumber (phoneNumber) {
  if (phoneNumber && phoneNumber.length >= 2) {
    return `(${phoneNumber.substring(0, 2)}) ${phoneNumber.substring(2)}`;
  }
  return phoneNumber;
};

async function searchSocialMedia () {
  try {
    const infos = await axios.get("https://babyemommy.com.br/api/empresaService/ecommerce/nomeTenant").then(e => e.data);
    infosLinks.value = infos;
  } catch (e) {
    console.error(e);
  }
}

async function getTerms () {
  await axios.get("https://babyemommy.com.br/api/termoUsoService/hasTerms").then(e => percorreTermos(e.data));
}

function percorreTermos (arr) {
  arr.forEach(e => {
    if (e.tipoDocumento === "TERMO") {
      termo.value = e;
    }
    if (e.tipoDocumento === "POLITICA") {
      politicaPrivacidade.value = e;
    }
    if (e.tipoDocumento === "GARANTIA") {
      garantia.value = e;
    }
    if (e.tipoDocumento === "FRETE") {
      frete.value = e;
    }
    if (e.tipoDocumento === "PERGUNTAS SITE") {
      perguntasSite.value = e;
    }
    if (e.tipoDocumento === "PERGUNTAS MOBILE") {
      perguntasMobile.value = e;
    }
    if (e.tipoDocumento === "PROTECAO DADOS") {
      protecaoDados.value = e;
    }
    if (e.tipoDocumento === "QUEM SOMOS") {
      quemSomos.value = e;
    }
    if (e.tipoDocumento === "SERVICO") {
      servico.value = e;
    }
    if (e.tipoDocumento === "REVENDEDOR") {
      sejaRevendedor.value = e;
    }
    if (e.tipoDocumento === "REEMBOLSO") {
      reembolso.value = e;
    }
    if (e.tipoDocumento === "TROCAS") {
      trocas.value = e;
    }
    if (e.tipoDocumento === "SUSTENTABILIDADE") {
      sustentabilidade.value = e;
    }
    if (e.tipoDocumento === "TERMOS") {
      termoUso.value = e;
    }
  });
}

function redirectToHTMLPage () {
  const url = "/trocas/";
  router.push(url);
}

function redirectToHTMLPage2 () {
  const url = "/politicas/";
  router.push(url);
}

function redirectToQuemSomos (params) {
  const url = "/quem-somos/";
  const queryParameters = { info: params };
  router.push({ path: url, query: queryParameters });
}

function redirectToHTMLPage4 () {
  const url = "/sustentabilidade/";
  router.push(url);
}

onBeforeMount(async () => {
  await getTerms();
  await searchSocialMedia();
});

</script>

<template lang="pug">
div.rodape.row.justify-center.col-10.q-pa-md.q-gutter-sm(style="flex-wrap:nowrap")
  div.Institucional.column.col-2(style="padding-left: 4px;")
    p.principal Sobre nós
    p.secundario(@click="redirectToQuemSomos('Sobre nós')") Quem somos
    p.secundario(@click="redirectToQuemSomos('Nossas lojas')") Nossas lojas
    p.secundario(v-if="sejaRevendedor?.ativo" @click="redirectToQuemSomos('seja-revendedor')") Seja um Revendedor
  div.MeusDados.column.col-2
    p.principal Políticas da empresa
    p.secundario(v-if="politicaPrivacidade?.ativo" @click="redirectToQuemSomos('politicas-de-privacidade')") Políticas de Privacidade
    p.secundario(v-if="garantia?.ativo" @click="redirectToQuemSomos('Políticas de Garantia')") Políticas de Garantia
    p.secundario(v-if="protecaoDados?.ativo" @click="redirectToQuemSomos('política-de-proteção-de-dados')") Política de Proteção de Dados
    p.secundario(v-if="frete?.ativo" @click="redirectToQuemSomos('politicas-de-frete')") Política de Frete
    p.secundario(v-if="trocas?.ativo" @click="redirectToQuemSomos('politicas-de-trocas')") Trocas e devoluções
    p.secundario(v-if="reembolso?.ativo" @click="redirectToQuemSomos('politicas-de-reembolso')") Políticas de Reembolso
    p.secundario(v-if="sustentabilidade?.ativo" @click="redirectToQuemSomos('sustentabilidade')") Políticas de Sustentabilidade
    p.secundario(v-if="termoUso?.ativo" @click="redirectToQuemSomos('termo-uso')") Termos de Uso
  div.Suporte.column.col-2
    p.principal Atendimento
    p.secundarionotcursor Precisa de ajuda com um pedido ou informações sobre um produto?
    p.secundario {{ maskPhoneNumber(infosLinks.phone) }}
  div.Contato.column.col-2
    p.principal Ajuda
  div.Redes.column.col-2
    p.principal Nossas redes sociais
    div.row.q-gutter-sm
      template(
        v-if="infosLinks.socialNetwork.facebook"
      )
        a(
          target="_blank"
          :href="infosLinks.socialNetwork.facebook"
        )
          q-icon(
            size="md"
            name="fa-brands fa-square-facebook"
          )
      template(
        v-if="infosLinks.socialNetwork.instagram"
      )
        a(
          target="_blank"
          :href="infosLinks.socialNetwork.instagram"
        )
          q-icon(
            size="md"
            name="fa-brands fa-instagram"
          )
      template(
        v-if="infosLinks.socialNetwork.linkedin"
      )
        a(
          target="_blank"
          :href="infosLinks.socialNetwork.linkedin"
        )
          q-icon(
            size="md"
            name="fa-brands fa-linkedin"
          )
      template(
        v-if="infosLinks.socialNetwork.twitter"
      )
        a(
          target="_blank"
          :href="infosLinks.socialNetwork.twitter"
        )
          q-icon(
            size="md"
            name="fa-brands fa-x-twitter"
          )
      template(
        v-if="infosLinks.socialNetwork.youtube"
      )
        a(
          target="_blank"
          :href="infosLinks.socialNetwork.youtube"
        )
          q-icon(
            size="md"
            name="fa-brands fa-square-youtube"
          )
    div
      p.principal Certificados
      div.row.q-gutter-sm.column
        img(src="../../assets/imgs/cripto.png" style="width:100px")
        img(src="../../assets/imgs/google.png" style="width:100px")
div.rodape2.col.column
  div.containerrodape2
    q-expansion-item.listas(
      expand-separator
      label="Sobre nós"
    )
      q-card.listas
        q-card-section
          a.cursor-pointer(@click="redirectToQuemSomos('Sobre nós')") Quem somos
        q-card-section
          a.cursor-pointer(@click="redirectToQuemSomos('Nossas lojas')") Nossas lojas
        q-card-section
          a.cursor-pointer(v-if="sejaRevendedor?.ativo" @click="redirectToQuemSomos('seja-revendedor')") Seja um Revendedor
    q-expansion-item.listas(
      expand-separator
      label="Políticas da empresa"
    )
      q-card.listas
        q-card-section
          a.cursor-pointer(v-if="politicaPrivacidade?.ativo" @click="redirectToQuemSomos('politicas-de-privacidade')") Políticas de Privacidade
        q-card-section
          a.cursor-pointer(v-if="garantia?.ativo" @click="redirectToQuemSomos('Políticas de Garantia')") Políticas de Garantia
        q-card-section
          a.cursor-pointer(v-if="protecaoDados?.ativo" @click="redirectToQuemSomos('política-de-proteção-de-dados')") Política de Proteção de Dados
        q-card-section
          a.cursor-pointer(v-if="frete?.ativo" @click="redirectToQuemSomos('politicas-de-frete')") Política de Frete
        q-card-section
          a.cursor-pointer(v-if="trocas?.ativo" @click="redirectToQuemSomos('politicas-de-trocas')") Trocas e devoluções
        q-card-section
          a.cursor-pointer(v-if="reembolso?.ativo" @click="redirectToQuemSomos('politicas-de-reembolso')") Políticas de Reembolso
        q-card-section
          a.cursor-pointer(v-if="sustentabilidade?.ativo" @click="redirectToQuemSomos('sustentabilidade')")  Políticas de Sustentabilidade
        q-card-section
          a.cursor-pointer(v-if="termoUso?.ativo" @click="redirectToQuemSomos('termo-uso')") Termos de Uso
    q-expansion-item.listas(
      expand-separator
      label="Minha Conta"
    )
      q-card.listas
        q-card-section
          a.cursor-pointer(href="#") Perfil
        q-card-section
          a.cursor-pointer(:href="linkcarrinho") Meus pedidos
        q-card-section
          a.cursor-pointer(:href="linkcarrinho") Meu carrinho
    q-expansion-item.listas(
      expand-separator
      label="Ajuda e suporte"
    )
      q-card.listas
        q-card-section
          a(href="#") Nosso chat
    q-expansion-item.listas(
      expand-separator
      label="Contato"
    )
      q-card.listas
        q-card-section
          p atendimento@mita.com.br
        q-card-section
          p (00)00000-0000
        q-card-section
          p Atendimento: <br> Segunda à sexta, de 9h as 17h.
div.text-black.justify-center.text-center.row(style="color: #000;text-align: center;font-family: Catamaran;font-size: 14px;font-style: normal;font-weight: 300;line-height: normal;")
  p MITA C V A DE C LTDA.
  p(v-if="infosLinks.street") &nbsp; | {{ infosLinks.street }}
  p(v-if="infosLinks.number") , {{ infosLinks.number }}
  p(v-if="infosLinks.district") , {{ infosLinks.district }}
  p(v-if="infosLinks.city") , {{ infosLinks.city }}
  p(v-if="infosLinks.state") , {{ infosLinks.state }}
  p(v-if="infosLinks.zipcode") &nbsp; | CEP: &nbsp; {{ infosLinks.zipcode }}
  p(v-if="infosLinks.cnpj") &nbsp; | CNPJ: &nbsp; {{ infosLinks.cnpj }}
div.copyright
  a.row(
    style="text-align: center; align-items: center; margin: 0 auto"
  )
    p Tecnologia
    img(
      src="/images/elevar.png"
      style="display: block; padding-bottom: 12px; padding-left: 5px;"
    )
</template>

<style scoped>
a{
  text-decoration: none;
}
*{
  color:black
}
.principal{
  color: #000;
  font-family: Catamaran;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
.secundario{
  color: #000;
  font-family: Catamaran;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  cursor: pointer;
  line-height: 20px; /* 153.846% */
}
.secundarionotcursor{
  color: #000;
  font-family: Catamaran;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  cursor: default;
  line-height: 20px;
}
.listas{
  box-shadow:none
}
.containerrodape2{
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 87%;
}
.copyright {
  display: flex;
}
@media screen and (min-width: 1025px) {
  .rodape2{
    display:none;
    padding: 20px;
  }
}
@media screen and (max-width: 1025px) {
  .rodape{
    display:none;
    flex-direction: column;
  }
  .secundario{
    font-weight: bold;
    font-size: 17px;
  }
  .primario{
    font-weight: bolder;
    font-size: 20px;
  }
}
</style>
