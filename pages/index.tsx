import { Container, Grid } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import styles from '../styles/Home.module.css';
import RedeemablePlayground from './components/RedeemablePlayground';
import Wallet from './components/Wallet';

const Home: NextPage = () => {
  const { address } = useAccount();
  return (
    <>
      <Head>
        <title>Redeemable SDK React example</title>
        <meta name="description" content="Redeemable SDK example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container className={styles.main} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid className={styles.center} item xs={12}>
            <Wallet />
          </Grid>
          {address && (
            <Grid className={styles.center} item xs={12}>
              <RedeemablePlayground />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default Home;
