<template>
  <q-layout view="hhh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <div class="row">
            <div class="col-md-auto">
              <q-avatar >
                <q-img src="../assets/gyms.png" width="200px" />
              </q-avatar>
            </div>
            <div class="col-md-auto">
              <div class="text-h6" >
                GOFIT
              </div>
            </div>
          </div>
        </q-toolbar-title>
        <div class="column">
          <q-btn round padding="none">
            <q-avatar
              size="40px"
              class="absolute-center shadow-15 q-mt-xs q-pt-xs"
            >
              <img src="../assets/instruktur_image.svg" />
            </q-avatar>
            <q-menu transition-show="slide-left" transition-hide="slide-right">
              <q-item class="text-center q-mt-xs text-h6" dense>
                <q-item-section>migel simanjorang</q-item-section>
              </q-item>
              <q-item class="text-center text-overline" dense>
                <q-item-section> Admin</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable @click="EditPassword = true">
                <q-item-section>Edit Password</q-item-section>
              </q-item>
              <q-item clickable @click="handleLogout">
                  <q-item-section>Logout</q-item-section>
              </q-item>
            </q-menu>
          </q-btn>
                  
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <q-scroll-area class="fit">
        <q-list>
          <q-item clickable v-ripple to="/instruktur">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section> Instrukturs </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <q-dialog v-model="EditPassword">
    <q-card>
      <q-form @submit.prevent="updatePassword">
        <q-input
        v-model="passOld"
        label="passwor lama"

        >
        </q-input>
        <q-input v-model="newPass"
        label="password baru"
        ></q-input>
        <q-input v-model="konfPass"
        label="ulang password baru"
        :rules="[val => val === newPass || 'password tidak sama dengan yang baru']"
        ></q-input>

        <q-btn class="float-right" label="simpan"
        color="primary"
        type="submit"
        >

        </q-btn>
      </q-form>
    </q-card>



  </q-dialog>
</template>

<style>


</style>

<script lang="ts">
import { api } from 'src/boot/axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

export default {
  setup() {
    const $q = useQuasar();
    const leftDrawerOpen = ref(false);
    const router = useRouter();
    const EditPassword = ref(false);
    const passOld = ref('');
    const newPass = ref('');
    const konfPass = ref('');

    function updatePassword() {
      api.post('/api/updatePassword', {
        id_user: JSON.parse(localStorage.getItem('user') || '').data.id_user,
        password: passOld.value,
        passwordNew: newPass.value
      })
        .then((res) => {
          $q.notify({
            color: 'positive',
            message: 'Password berhasil diubah',
            icon: 'check'
          });
          console.log(res);
        })
        .catch((err) => {
          $q.notify({
            color: 'negative',
            message: 'Password gagal diubah',
            icon: 'warning'
          });
          console.log(err);
        });
    }

    const handleLogout = () => {
      localStorage.removeItem('token');
      router.push('/');
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      EditPassword,
      passOld,
      newPass,
      konfPass,
      handleLogout,
      updatePassword
    };
  },
};
</script>

