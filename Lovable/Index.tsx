import { Helmet } from 'react-helmet-async';
import HopelessCatch from '@/components/HopelessCatch';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Hopeless Catch - A Cozy Fishing Horror Game</title>
        <meta name="description" content="Cast your line in peaceful waters by day, but beware what lurks beneath when night falls. A cozy fishing horror experience." />
        <meta name="keywords" content="fishing game, horror game, cozy game, pixel art, indie game" />
      </Helmet>
      <HopelessCatch />
    </>
  );
};

export default Index;
