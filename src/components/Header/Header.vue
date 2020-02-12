<template>
    <div class="container is-fluid">
        <div class="notification">
            <nav class="level">
                <div class="level-left"></div>
                <div class="level-right">
                    <router-link to="/login" v-if="getRole == 'unloged'" class="hdr-link" tag="li">
                        <b-button class="level-item" type="is-light">Логин</b-button>
                    </router-link>
                    <router-link to="/" v-if="getRole != 'unloged'" class="hdr-link" tag="li">
                        <b-button @click="reloadPage" class="level-item" type="is-light">Выйти</b-button>
                    </router-link>
                    <router-link to="/" class="hdr-link" tag="li">
                        <b-button class="level-item" type="is-light">Главная</b-button>
                    </router-link>
                    <router-link to="/login" v-if="cardEditPage" class="hdr-link" tag="li">
                        <b-button class="level-item" type="is-light">Логин</b-button>
                    </router-link>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    
    export default {
        computed: {
            ...mapGetters(['getRole']),
            logPage() {
                return this.$route.path === '/login';
            },
            cardEditPage() {
                return this.$route.path === '/edit';
            }
        },
        methods: {
            reloadPage() {
                location.reload()
                this.$route.path != '/' ? this.$router.push('/') : null 
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hdr-link {
        display: block;
        text-decoration: none;
    }

    .container.is-fluid {

        @media screen and (min-width: 300px) {
            margin: 0;
        }
    }
</style>
