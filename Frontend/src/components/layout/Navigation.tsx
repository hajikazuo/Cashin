import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import ListIcon from '@mui/icons-material/List'; 
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';

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
      },
      {
        segment: 'add',
        title: 'Adicionar transação',
        icon: <AddIcon />, 
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
      },
      {
        segment: 'add',
        title: 'Adicionar categoria',
        icon: <AddIcon />, 
      }
    ],
  },
];

export default NAVIGATION;
