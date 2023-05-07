<template>
  <q-layout
    class="fit column justify-center"
    style="
      background-image: url('src/assets/background.jpg');
      background-size: cover;
      background-position: center;
    "
  >
    <div class="row justify-center">
      <q-card
        v-bind:style="$q.screen.lt.sm ? { width: '40%' } : { width: '20%' }"
      >
        <q-form @submit="loginProcess" class="q-gutter-md">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-15">
              <img src="~assets/fitness-svgrepo-com.svg" alt="avatar" />
            </q-avatar>
          </q-card-section>

          <q-card-section>
            <Center>
              <h6 class="q-ma-md">LOGIN</h6>
            </Center>

            <q-input
              class="q-mb-md"
              outlined
              v-model="loginData.email.value"
              label="Email"
              :rules="[
                (val, rules) =>
                  rules.email(val) || 'Please enter a valid email address',
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="mail" />
              </template>
            </q-input>

            <q-input
              :type="showPassword ? 'password' : 'text'"
              class="q-mb-sm"
              outlined
              v-model="loginData.password.value"
              label="Password"
              :rules="[(val) => val.length > 0 || 'Please enter a password']"
            >
              <template v-slot:prepend>
                <q-icon name="lock" />
              </template>

              <template v-slot:append>
                <q-icon
                  :name="showPassword ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="showPassword = !showPassword"
                />
              </template>
            </q-input>

            <q-checkbox v-model="rememberMe" label="Remember me" />
            <div class="row justify-end">
              <q-btn
                class="full-width"
                color="primary"
                type="submit"
                label="Login"
              />
            </div>
          </q-card-section>
        </q-form>
      </q-card>
    </div>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'LoginPage',
  setup() {
    const $q = useQuasar();
    const loginData = {
      email: ref(''),
      password: ref(''),
    };
    let rememberMe = ref(false);
          function loginProcess() {
            api
              .post('/api/login', {
                email: loginData.email.value,
                password: loginData.password.value,
              })
              .then((response) => {
                $q.notify({
                  message: 'Berhasil Login sebagai ' + response.data.data.ROLE +  ' !',
                  color: 'positive',
                  icon: 'check_circle',
                  position: 'top-right',
                });
                localStorage.setItem('pegawai', JSON.stringify(response.data));
                if (response.data.data['ROLE'] == 'admin') {
                  window.location.href = '#/adminbaru';
                } else if (response.data.data['ROLE'] == 'kasir') {
                  window.location.href = '#/kasir';
                } else {
                  window.location.href = '#/manajer';
                }
              })
              .catch(() => {
                $q.notify({
                  message: 'Email or password is incorrect!',
                  color: 'negative',
                  icon: 'error',
                  position: 'top-right',
                });
              });
          }
    let showPassword = ref(true);
    return {
      loginData,
      rememberMe,
      loginProcess,
      showPassword,
    };
  },
});
</script>
