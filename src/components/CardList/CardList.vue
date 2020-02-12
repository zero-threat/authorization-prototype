<template>
    <div class="home-page">
        <div class="container sized">
            <Card v-for="(post) in allPosts" :key="post.id" :post="post" v-on:delete="deletePost"/>
        </div>
        <b-button
            v-if="getRole == 'writer'"
            tag="router-link"
            :to="{ name: 'create', params: { id: Math.random() } }"
            type="is-info"
        >Создать</b-button>
        <hr>
        <div class="pagination-wrapper">
            <b-pagination
                :total="allPosts.length"
                :per-page= 10
                :current.sync="currentPage"
                v-on:change="onChangePage(currentPage)"
            >
            </b-pagination>
        </div>
    </div>
</template>

<script>
    import "regenerator-runtime/runtime";
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import Card from '../Card/Card'
    
    export default {
        data() {
            return {
                currentPage: 1
            }
        },
        components: { Card },
        computed: {
            ...mapGetters(['allPosts', 'getRole']),
        },
        methods: {
            ...mapActions(['fetchPosts']),
            ...mapMutations(['createPosts', 'deletePost']),
            onChangePage(page) {
                this.fetchPosts(page)
                window.scrollTo(0, 0)
                console.log('this.currentPage :', this.currentPage);
            }
        },
        mounted() {
            this.fetchPosts();
        }
    }
</script>

<style scoped>
    .centered {
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-basis: unset;
        flex-grow: unset;
        flex-shrink: unset;
    }
    .fixed {
        margin-left: 80%;
        max-width: 20%;
    }
    .sized {
        width: 50%;
    }
    .home-page {
        margin-top: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .card {
        margin-bottom: 20px;
    }
    hr {
        width: 100%;
    }
    .pagination-wrapper {
        width: 20%;
        display: flex;
        justify-content: center;
    }
</style>