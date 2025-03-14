import { DashboardLayout, SidebarFooterProps, ThemeSwitcher } from '@toolpad/core/DashboardLayout';
import {Outlet} from 'react-router';
import {Button, ButtonGroup, LinearProgress, Stack} from '@mui/material';
import Typography from '@mui/material/Typography';
import {useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import {useSession} from "@toolpad/core";
import {UserSession} from "../contexts/SessionContext.ts";
import AuthFormWrapper from "@carrot/theme/src/shared/AuthFormWrapper.tsx";
import {branding} from "../config/branding.tsx";

export default function Layout() {

  const session = useSession<UserSession>()
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback((lng : string) => {
    i18n.changeLanguage(lng).then(() => console.info('Language changed to', lng));
  }, [i18n])

  const redirect = useCallback(() => {
    return new Promise<undefined>((resolve) => {
      window.location.href = `http://localhost:3030/?redirect=${window.location.href}`;
      resolve(undefined)
    })
  }, [])

  if (!session)
    return <LinearProgress />

  if (!session.user)
    return (
      <AuthFormWrapper
        logo={branding(t).logo}
        title={'You are not logged in'}
        callback={redirect}
        buttonText={'Login'}
      >
        <></>
      </AuthFormWrapper>
    )

  // TODO: remove and use browser default or settings (via cookie)
  function ToolbarActionsSearch() {
    return (
      <Stack direction="row" spacing={2} >
        <ButtonGroup size={'small'} variant="text">
          <Button onClick={() => changeLanguage('en')}>EN</Button>
          <Button onClick={() => changeLanguage('de')}>DE</Button>
        </ButtonGroup>
        <ThemeSwitcher />
      </Stack>
    );
  }

  function SidebarFooter({ mini }: SidebarFooterProps) {
    return (
      <Typography
        align='center'
        variant="caption"
        sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
      >
        {mini ? t('copyright.short') : t('copyright.normal')}
      </Typography>
    );
  }

  return (
    <DashboardLayout
      slots={{
        // appTitle: CustomAppTitle,
        toolbarActions: ToolbarActionsSearch,
        sidebarFooter: SidebarFooter,
      }}
    >
      <Outlet />
    </DashboardLayout>
  );
}
