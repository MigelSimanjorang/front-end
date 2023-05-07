import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

  {
    path: '/',
    component: () => import('pages/LoginPage.vue')
  },
  {
    path: '/adminbaru',
    component: () => import('src/layouts/AdminLayout.vue'),

    children: [{
        path: '/instruktur',
        component: () => import('components/InstrukturComponent.vue'),
      },
    ]

  },

  {
    path: '/adminMO',
    component: () => import('src/layouts/ManajerLayout.vue'),

    children: [{
        path: '/manajer',
        component: () => import('components/ManajerComponent.vue'),
      },
    ]

  },

  {
    path: '/adminKasir',
    component: () => import('src/layouts/KasirLayout.vue'),

    children: [{
        path: '/kasir',
        component: () => import('components/KasirComponent.vue'),
      },
    ]

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
