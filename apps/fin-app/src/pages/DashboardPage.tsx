import Typography from '@mui/material/Typography';
import { PageContainer } from '@toolpad/core';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <Typography>{t('Welcome to React')}</Typography>
    </PageContainer>
  );
}