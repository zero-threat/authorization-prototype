<template>
    <div class="login">
        <div class="tile is-parent">
            <article class="tile is-child notification centered">
                <p class="title">Пожалуйста, войдите</p>
                <div class="content">
                    <form>
                        <section class="form-centered">
                            <b-field label="Email">
                                <b-input 
                                    type="email"
                                    placeholder="Введите email"
                                    maxlength="30"
                                    icon="account"
                                    v-model="login"
                                >
                                </b-input>
                            </b-field>
                            <b-field
                                label="Пароль"
                                v-if="password != '123456'"
                            >
                                <b-input
                                    type="password"
                                    placeholder="Введите пароль"
                                    password-reveal
                                    v-model="password"
                                >
                                </b-input>
                            </b-field>
                            <b-field
                                message="Правильно!"
                                label="Пароль"
                                type="is-success"
                                v-else
                            >
                                <b-input
                                    placeholder="Введите пароль"
                                    password-reveal
                                    v-model="password"
                                >
                                </b-input>
                            </b-field> 
                            <b-button
                                @click.prevent="submit"
                            >
                                Войти
                            </b-button>
                        </section>
                    </form>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        data() {
            return {
                login: "",
                password: "",
                isLoginError: false,
            };
        },
        computed: mapGetters(['getLoginStatus']),
        methods: {
            ...mapActions(['fetchUser']),
            submit() {
              console.log('123', 123)
                this.fetchUser({
                  login: this.login,
                  password: +this.password,
                }).then(() => {
                  console.log('this.getLoginStatus', this.getLoginStatus)
                  this.getLoginStatus ? this.$router.push('/') : this.isLoginError = true
                })
            }
        },
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
    .is-parent {
        justify-content: center;
    }
    .form-centered {
        text-align: center;
    }
</style>