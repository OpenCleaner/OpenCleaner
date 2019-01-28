import { MenuItemConstructorOptions } from 'electron';

export const template: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        click: () => {},
        label: 'Text',
      },
    ],
  },
];
