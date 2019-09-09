export default {
  path: 'game-center',
  name: 'game-center',
  redirect: '/game-center/game-list/1',
  component: ()=> import('../../views/home/game-center/index'),
  children: [
    {
      path: 'game-list/:id',
      name: 'game-list',
      component: ()=> import('../../views/home/game-center/game-list/index'),
    }
  ]
};


