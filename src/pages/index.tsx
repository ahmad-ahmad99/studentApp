import { authRouteConfig } from './auth';
import { initialUrl } from 'shared/constants/AppConst';
import Error403 from './errorPages/Error403';
import React from 'react';
import { errorPagesConfigs } from './errorPages';
import { samplePagesConfigs } from './sample';
import { profilePage } from './profile';
import { studentsPagesConfigs } from './students';

const authorizedStructure = {
  fallbackPath: '/signin',
  unAuthorizedComponent: <Error403 />,

  routes: [...samplePagesConfigs, ...studentsPagesConfigs, , ...profilePage],
};

const unAuthorizedStructure = {
  fallbackPath: initialUrl,
  routes: authRouteConfig,
};

const anonymousStructure = {
  routes: errorPagesConfigs,
};

export { authorizedStructure, unAuthorizedStructure, anonymousStructure };
