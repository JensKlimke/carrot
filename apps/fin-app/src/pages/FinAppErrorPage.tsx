import {useTranslation} from "react-i18next";
import ErrorPage from "@carrot/theme/src/shared/ErrorPage.tsx";
export default function FinAppErrorPage() {

  const { t } = useTranslation();

  return (
    <ErrorPage
      title={t('general.error_page.title')}
      text={t('general.error_page.404_text')}
      backLinkText={t('general.error_page.back_link_text')}
    />
  );
};

