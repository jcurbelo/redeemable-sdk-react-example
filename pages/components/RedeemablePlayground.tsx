import { LoadingButton } from '@mui/lab';
import { Box, Checkbox, FormControlLabel, Grid, Input } from '@mui/material';
import Redeemable from '@niftykit/redeemable';
import { RedeemableData } from '@niftykit/redeemable/dist/types/types/redeemable';
import React, { useCallback, useState } from 'react';
import { useSigner } from 'wagmi';

const RedeemablePlayground: React.FC<{}> = () => {
  const { data: signer } = useSigner();
  const [address, setAddress] = useState('');
  const [isDev, setIsDev] = useState<boolean>(false);
  const [signature, setSignature] = useState('');
  const [tokenId, setTokenId] = useState<number | null>(null);
  const [burnTokenId, setBurnTokenId] = useState<number | null>(null);
  const [redeemTokenId, setRedeemTokenId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [nft, setNft] = useState<RedeemableData | null>(null);
  const [drop, setDrop] = useState<Redeemable | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleStartClick = useCallback(async () => {
    try {
      setLoading(true);
      const d = await Redeemable.create(signer!, address, isDev);
      setDrop(d);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }, [address, signer, isDev]);

  const handleGetRedeemableClick = useCallback(async () => {
    try {
      if (!drop || tokenId === null) {
        return;
      }
      setLoading(true);
      const nft = await drop.getRedeemable(tokenId!);
      setNft(nft);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }, [drop, tokenId]);

  const handleBurnClick = useCallback(async () => {
    try {
      if (!drop || burnTokenId === null) {
        return;
      }
      setLoading(true);
      await drop.burn(burnTokenId!);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }, [drop, burnTokenId]);

  const handleRedeemClick = useCallback(async () => {
    try {
      if (!signature || !drop || redeemTokenId === null || quantity === null) {
        return;
      }
      setLoading(true);
      await drop.redeem(redeemTokenId!, quantity!, signature);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  }, [drop, signature, redeemTokenId]);

  return (
    <>
      <h3>Playground</h3>

      {!drop && (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Input
              placeholder="Contract Address"
              style={{ width: '100%' }}
              value={address}
              onChange={(e) => setAddress(e.target.value)}></Input>
          </Grid>
          <Grid item xs={2}>
            <FormControlLabel
              label="Dev"
              control={
                <Checkbox
                  style={{ width: '100%' }}
                  value={isDev}
                  onChange={(e) => setIsDev(e.target.checked)}
                />
              }
            />
          </Grid>
          <Grid item>
            <LoadingButton
              variant="contained"
              loading={loading}
              onClick={handleStartClick}>
              Start
            </LoadingButton>
          </Grid>
        </Grid>
      )}

      {drop && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Input
                placeholder="Token Id"
                type="number"
                style={{ width: '100%' }}
                value={tokenId}
                onChange={(e) => setTokenId(Number(e.target.value))}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                loading={loading}
                onClick={handleGetRedeemableClick}>
                Get Redeemable
              </LoadingButton>
            </Grid>
          </Grid>
          <Box m={4} />
          {nft && (
            <pre style={{ textAlign: 'left' }}>
              {JSON.stringify(nft, null, 4)}
            </pre>
          )}
          <Box m={4} />
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Input
                placeholder="Token Id"
                type="number"
                style={{ width: '100%' }}
                value={redeemTokenId}
                onChange={(e) => setRedeemTokenId(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                placeholder="Quantity"
                type="number"
                style={{ width: '100%' }}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={3}>
              <Input
                placeholder="Signature"
                style={{ width: '100%' }}
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                loading={loading}
                onClick={handleRedeemClick}>
                Redeem
              </LoadingButton>
            </Grid>
          </Grid>
          <Box m={4} />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Input
                placeholder="Token Id"
                type="number"
                style={{ width: '100%' }}
                value={burnTokenId}
                onChange={(e) => setBurnTokenId(Number(e.target.value))}
              />
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                loading={loading}
                onClick={handleBurnClick}>
                Burn NFT
              </LoadingButton>
            </Grid>
          </Grid>
        </>
      )}

      {errorMsg && <p>Error: {errorMsg}</p>}
    </>
  );
};

export default RedeemablePlayground;
