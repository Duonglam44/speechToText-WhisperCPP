import React from 'react';
import router from 'next/router'
import { useTranslation } from 'i18next-config';

import { CookieService } from 'configs/cookies';
import { PRIVATE_PATH, ROUTER } from 'constants/router';

interface IRootHOC {
  children: React.ReactElement;
  pathname?: string;
}

const RootHOC: React.FC<IRootHOC> = ({ children, pathname }) => {
  const cookieService = CookieService.getInstance();
  const [t] = useTranslation('common');
  const isAccess = cookieService.accessToken;

  if (PRIVATE_PATH.includes(router.pathname) && !isAccess) {
    router.push(ROUTER.login);

    return <>{`${t('loading')}...`}</>;
  }

  return <>{children}</>;
};

export default RootHOC;
