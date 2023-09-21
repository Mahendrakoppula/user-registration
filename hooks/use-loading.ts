import React from 'react';

const useLoading = () => {
  const [loading, setLoading] = React.useState(false);

  const onLoading = React.useCallback((loading: boolean) => {
    setLoading(loading);
  }, []);

  return { loading, onLoading };
};
export default useLoading;
