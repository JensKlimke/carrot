import type { Navigation } from '@toolpad/core/AppProvider';
import { Dashboard, RequestPage } from '@mui/icons-material';
import { TFunction } from 'i18next';


export const nav = (t : TFunction) : Navigation => ([
  {
    kind: 'header',
    title: t('nav.main_items'),
  },
  {
    title: t('nav.home'),
    icon: <Dashboard />,
  },
  {
    segment: 'contracts',
    title: t('nav.contracts'),
    icon: <RequestPage />,
    pattern: 'contracts{/:id}',
  },
]);