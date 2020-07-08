import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Přehled',
    link: '/pages/dashboard',
    icon: 'layers-outline',
    home: true,
  },
  {
    title: 'Produkty',
    link: '/pages/products/dashboard',
    icon: 'archive-outline',
  }, {
    title: 'Novinky',
    link: '/pages/news',
    icon: 'message-square-outline',
  }, {
    title: 'Akce',
    link: '/pages/offers',
    icon: 'alert-triangle-outline'
  },{
    title: 'Reference',
    link: '/pages/references/dashboard',
    icon: 'edit-2-outline',
  }, {
    title: 'Produktová videa',
    link: '/pages/videos',
    icon: 'video-outline',
  }, {
    title: 'Fotografie z akcí',
    link: '/pages/gallery',
    icon: 'camera-outline',
  }, {
    title: 'Penzion CAIUS',
    link: '/pages/pension',
    icon: 'home-outline',
  }
];
