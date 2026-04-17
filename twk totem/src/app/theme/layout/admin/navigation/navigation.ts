export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  // {
  //   id: 'dashboard',
  //   title: 'Calendario',
  //   type: 'collapse',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'default',
  //       title: 'Calendario',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/default',
  //       icon: 'ti ti-calendar',
  //       breadcrumbs: false
  //     }
  //   ]
  // },
  // {
  //   id: 'page',
  //   title: 'Pages',
  //   type: 'group',
  //   icon: 'icon-navigation',
  //   children: [
  //     {
  //       id: 'Authentication',
  //       title: 'Authentication',
  //       type: 'collapse',
  //       icon: 'ti ti-key',
  //       children: [
  //         {
  //           id: 'login',
  //           title: 'Login',
  //           type: 'item',
  //           url: '/guest/login',
  //           target: true,
  //           breadcrumbs: false
  //         },
  //         {
  //           id: 'register',
  //           title: 'Register',
  //           type: 'item',
  //           url: '/guest/register',
  //           target: true,
  //           breadcrumbs: false
  //         }
  //       ]
  //     }
  //   ]
  // },


  // {
  //   id: 'elementtable',
  //   title: 'Registro Autovetture',
  //   type: 'collapse',
  //   icon: 'icon-navigation',
  //   url: '/elementtable',
  //   children: [
  //     {
  //       id: 'Auto',
  //       title: 'Auto',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/elementtable/auto',
  //       icon: 'ti ti-car',
  //       //target: true,
  //       breadcrumbs: false
  //     },
  //     {
  //       id: 'Clienti',
  //       title: 'Clienti',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/elementtable/clienti',
  //       icon: 'ti ti-user',
  //       //target: true,
  //       breadcrumbs: false
  //     }, {
  //       id: 'Localita',
  //       title: 'Localita',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/elementtable/localita',
  //       icon: 'ti ti-location-pin',
  //       //target: true,
  //       breadcrumbs: false
  //     }, {
  //       id: 'Tecnici',
  //       title: 'Tecnici',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/elementtable/tecnici',
  //       icon: 'ti ti-headset',
  //       //target: true,
  //       breadcrumbs: false
  //     }, {
  //       id: 'Viaggi',
  //       title: 'Viaggi',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/elementtable/viaggi',
  //       icon: 'ti ti-calendar',
  //       //target: true,
  //       breadcrumbs: false
  //     },
  //     {
  //       id: 'Prenotazioni',
  //       title: 'Prenotazioni',
  //       type: 'item',
  //       classes: 'nav-item',
  //       url: '/elementtable/prenotazioni',
  //       icon: 'ti ti-calendar',
  //       //target: true,
  //       breadcrumbs: false
  //     },

  //   ]
  // },
];
