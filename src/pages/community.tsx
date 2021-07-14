import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import DefaultLayout from '../layouts/DefaultLayout';
import List from '../components/List';

const Container = styled.div`
  width: 100%;
  padding: 12px;
  border: 3px solid #2b2b2b;
  box-sizing: border-box;
`;

const Loader = styled.div`
  margin: 0 auto;
  border: 8px solid #dcdcdc;
  border-top: 8px solid #e4a925;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export const Community: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState({
    telegram: [
      {
        title: '',
        link: '',
      },
    ],
    instagram: [
      {
        title: '',
        link: '',
      },
    ],
    websites: [
      {
        title: '',
        link: '',
      },
    ],
  });

  useEffect(() => {
    const load = async () => {
      const link = await fetch('/temp/community.json').then((r) => {
        return r.json();
      });
      setLinks(link);
      setLoading(false);
    };

    load();
  }, []);

  return (
    <DefaultLayout title="Community">
      <Container>
        {loading ? (
          <Loader />
        ) : (
          <>
            <List title="Telegram" data={links.telegram} />
            <List title="Instagram" data={links.instagram} />
            <List title="Websites" data={links.websites} />
          </>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default Community;
