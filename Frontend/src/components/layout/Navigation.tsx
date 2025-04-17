import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import ListIcon from '@mui/icons-material/List'; 
import CategoryIcon from '@mui/icons-material/Category';

import { type Navigation } from '@toolpad/core/AppProvider';

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Menu Principal',
  },
  {
    segment: 'home',
    title: 'Home',
    icon: <HomeIcon />,
  },
  {
    segment: 'transacoes',
    title: 'Transações',
    icon: <PaidIcon />,
    children: [
      {
        segment: 'list',
        title: 'Minhas transações',
        icon: <ListIcon />, 
      }
    ],
  },
  {
    segment: 'categorias',
    title: 'Categorias',
    icon: <CategoryIcon />,
    children: [
      {
        segment: 'list',
        title: 'Categorias',
        icon: <ListIcon />, 
      }
    ],
  },
];

export default NAVIGATION;
