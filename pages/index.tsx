import React from 'react';
import { useQuery } from 'react-query';

const Home = (): JSX.Element => {
  const { isLoading, error, data, isFetching } = useQuery('repoData', () =>
    fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
      res.json()
    )
  );
  console.log(data);
  return <div>home</div>;
};

export default Home;
