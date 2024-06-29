import React from 'react';

import { useSelector } from 'react-redux';
import AppMessageView from '@crema/core/AppMessageView';
import AppLoader from '@crema/core/AppLoader';
import { AppState } from '../../../redux/store';

const AppInfoView = () => {
  const { error, loading, message } = useSelector<AppState, AppState['common']>(({ common }) => common);
  console.log('messagemessage', message);

  const showMessage = () => {
    return <AppMessageView variant='success' message={message} />;
  };

  const showError = () => {
    return <AppMessageView variant='error' message={error} />;
  };

  return (
    <>
      {loading && <AppLoader />}

      {message && showMessage()}
      {error && showError()}
    </>
  );
};

export default AppInfoView;
