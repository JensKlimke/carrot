import {useTranslation} from "react-i18next";
import ErrorPage from "@carrot/theme/src/ErrorPage.tsx";

export default function AuthErrorPage() {

  const { t } = useTranslation();

  return (
    <ErrorPage
      title={t('auth.labels.error_page_title')}
      text={t('auth.labels.error_page_404_text')}
      backLinkText={t('auth.labels.error_page_back_link_text')}
    />
  );
};
