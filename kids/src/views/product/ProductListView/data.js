import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    createdAt: '27/03/2019',
    description: 'Pakistan Agricutlure Research Council booklet',
    media: '/static/images/products/product_1.jpg',
    title: 'PARC',
    totalDownloads: '594'
  },
  {
    id: uuid(),
    createdAt: '31/03/2019',
    description: 'Zaraat Nama for Farmers',
    media: '/static/images/products/product_2.jpg',
    title: 'Zaraat Nama',
    totalDownloads: '625'
  },
  {
    id: uuid(),
    createdAt: '03/04/2019',
    description: 'Agro Digest Yearly Booklet',
    media: '/static/images/products/product_3.jpg',
    title: 'Agro Digest',
    totalDownloads: '857'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'Types of rice in Pakistan booklet',
    media: '/static/images/products/product_4.jpg',
    title: 'Rice',
    totalDownloads: '406'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'booklet by Agri Pak',
    media: '/static/images/products/product_5.jpg',
    title: 'Agri Pak',
    totalDownloads: '835'
  },
  {
    id: uuid(),
    createdAt: '04/04/2019',
    description: 'Booklet by BSCR',
    media: '/static/images/products/product_6.jpg',
    title: 'BSCR Compost',
    totalDownloads: '835'
  }
];
