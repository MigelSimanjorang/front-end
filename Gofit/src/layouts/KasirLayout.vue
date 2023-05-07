<template>
  <q-layout view="hhh lpR fFf">
    <q-header reveal elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title >
          <div class="row">
            <div class="col-md-auto">
              <q-avatar>
                <q-img src="../assets/gyms.png" width="200px" />
              </q-avatar>
            </div>
            <div class="col-md-auto">
              <div class="text-h6" >GOFIT</div>
            </div>
          </div>
        </q-toolbar-title>
        <div class="column">
          <q-btn round padding="none">
            <q-avatar
              size="40px"
              class="absolute-center shadow-15 q-mt-xs q-pt-xs"
            >
              <img src="../assets/kasir.svg" />
            </q-avatar>
            <q-menu transition-show="slide-left" transition-hide="slide-right">
              <q-item class="text-center q-mt-xs text-h6" dense>
                <q-item-section>pricell valencia</q-item-section>
              </q-item>
              <q-item class="text-center text-overline" dense>
                <q-item-section> Kasir </q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable>
                <q-item-section>Reset Password</q-item-section>
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
          <q-item clickable v-ripple to="/kasir">
            <q-item-section avatar>
              <q-icon name="account_circle" />
            </q-item-section>
            <q-item-section> Kasir </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();

    const handleLogout = () => {
      localStorage.removeItem('token');
      router.push('/');
    };

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout
    };
  },
};
</script>
