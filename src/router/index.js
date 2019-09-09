import Vue from 'vue';
import Router from 'vue-router';

import gameCenter from './map/game-center';

import userCenter from './map/user-center';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/index'),
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('../views/home/index/index'),
        },
        gameCenter,
        {
          path: 'activity',
          name: 'activity',
          component: () => import('../views/home/activity/index'),
        },
        {
          path: 'download',
          name: 'download',
          component: () => import('../views/home/download/index'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/home/register/index.vue'),
          children: [
            {
              path: 'commen',
              name: 'commen',
              component: () =>
                import('../views/home/register/components/commen.vue'),
            },
            {
              path: 'email',
              name: 'email',
              component: () =>
                import('../views/home/register/components/email.vue'),
            },
            {
              path: 'phone',
              name: 'phone',
              component: () =>
                import('../views/home/register/components/phone.vue'),
            },
            {
              path: 'forget',
              name: 'forget',
              component: () =>
                import('../views/home/register/components/forget/index.vue'),
            },
          ],
        },
      ],
    },
    userCenter,
    {
      path: '/cashier',
      name: 'cashier',
      component: () => import('../views/cashier/index.vue'),
      meta: {
        hideFooter: true,
      },
    },
    {
      path: '/play-game/:gameId/:gamePlatformId',
      name: 'play-game',
      component: () => import('../views/play-game/index.vue'),
      meta: {
        hideFooter: true,
      },
    },
  ],
});
