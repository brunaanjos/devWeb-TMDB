<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const links = ref([{name:'Filmes', path: 'Movies'}, {name:'Séries', path: 'Series'}]);

const inputSearch = ref('');

function goToSearch() {
    console.log(inputSearch.value);
    router.push({ name: 'Search', params: { query: inputSearch.value } });
    inputSearch.value = '';
    // window.location.reload();   
}
 
function changeLinksResize() {
    const width = document.documentElement.clientWidth;
    console.log(width)
    if(width < 820 ) {
        links.value = [{name: 'Início', path: 'Home'} ,{name:'Filmes', path: 'Movies'}, {name:'Séries', path: 'Series'}]
    }

    else {
        links.value = [{name:'Filmes', path: 'Movies'}, {name:'Séries', path: 'Series'}]
    }
}

onMounted(()=> {   
    console.log(route)
    changeLinksResize()
})



window.addEventListener('resize', ()=> {
    changeLinksResize()
})
</script>

<template>
    <header>
        <router-link to="/">
            <img src="/logo.png" alt="" class="logo">
        </router-link>

        <div class="links">
            <router-link v-for="link in links" :key="link" :to="{ name: link.path}">
            <span class="link" :class="route.name == link.path ? 'active' : ''">
                <p>{{ link.name }}</p>
            </span>
            </router-link>
        </div>

        <div class="actions">
            <div class="search">
                <input type="text" required v-model="inputSearch" @keydown.enter="goToSearch">
                <p>Pesquise por séries, filmes ou atores...</p>
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="icon" @click="goToSearch"/>
            </div>
        </div>
    </header>
</template>

<style scoped>
    header {
        position: relative;
        width: 100%;
        height: 60px;
        background-color: var(--background-header);
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: var(--background-header) 0px 1px 10px 0px;
    }

    img {
        position: relative;
        left: 50px;
    }

    .links {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 20%;
        position: relative;
        min-width: 200px;
    }

    .link {
        font-size: 1.8rem;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 0.1rem;
        transition: .3s all;
        cursor: pointer;
    }

    .links .link:hover {
        color: var(--secondary);
    }

    .actions {
        display: flex;
        gap: 30px;
        position: relative;
        align-items: center;
        right: 30px;
    }

    .search {
        position: relative;
        display: flex;
        align-items: center;
        width: 300px;
        height: 30px;
        background-color: var(--background);
        border-radius: 10px;
        right: 40px;
        min-width: 100px;
    }

    .search input {
        width: 100%;
        height: 30px;
        outline: 0;
        background-color: transparent;
        border: none;
        color: var(--text);
        padding: 0 4%;
        z-index: 2;
    }

    .search p {
        position: absolute;
        left: 4%;
        font-size: 1.3rem;
        z-index: 1;
        transition: .2s all;
    }

    .search .icon {
        position: absolute;
        right: 5%;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 3;
    }

    .search input:valid ~ p {
        opacity: 0;
    }

    .search input:focus ~ .search {
        width: 1000px !important; 
        background-color: red !important;
    }

    .account, .list {
        position: relative;
        display: flex;
        gap: 10px;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .account .icon, .list .icon {
        font-size: 1.8rem;
    }

    .account p, .list p {
        font-size: 1.3rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 2px;
    }

    a {
        text-transform: none;
        text-decoration: none;
        color: var(--text);
    }

    .active {
        color: var(--secondary);
    }

    @media screen and (max-width: 820px) {
        .logo {
            display: none;
        }

        .links {
            justify-content: space-around;
            gap: 20px;
        }
    }

    @media screen and (max-width: 690px) {
        header {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 80px;
            gap: 10px;
        }

        .search {
            right: -30px;
        }
    }
</style>