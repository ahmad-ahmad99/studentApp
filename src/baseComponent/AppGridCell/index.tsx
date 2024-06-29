import React from 'react';

const AppGridCell: React.FC<{ value: string }> = (props) => {
  return <div>{props?.value ? props?.value : '-'}</div>;
};

export default AppGridCell;
