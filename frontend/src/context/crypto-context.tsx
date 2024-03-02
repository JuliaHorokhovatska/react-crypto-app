import {ReactNode, createContext, useContext, useEffect, useState} from 'react';
import {Asset, Crypto} from '../data';
import {fakeAssets, fakeFetchCrypto} from '../api';
import {percentDifference} from '../utils';

interface CryptoContextProps {
  assets: Asset[];
  crypto: Crypto[];
  loading: boolean;
  addAsset?: (newAsset: Asset) => void;
}

const CryptoContext = createContext<CryptoContextProps>({
  assets: [],
  crypto: [],
  loading: false,
});

interface CryptoContextProviderProps {
  children: ReactNode;
}

export function CryptoContextProvider({children}: CryptoContextProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<Crypto[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  
  function mapAssets(assets: Asset[], result: Crypto[]) {
    return assets.map(asset => {
      const coin = result.find(c => c.id === asset.id) as Crypto;
      return {
        ...asset,
        grow: asset.price < coin?.price,
        growPercent: percentDifference(asset.price, coin?.price),
        totalAmount: asset.price * coin?.price,
        totalProfit: asset.price * coin?.price - asset.amount * asset.price,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const {result} = await fakeFetchCrypto();
      const assets = await fakeAssets();

      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);
  
  function addAsset(newAsset: Asset) {
    setAssets(prev => mapAssets([...prev, newAsset], crypto));
  }
  
  return <CryptoContext.Provider value={{assets, crypto, loading, addAsset}}>{children}</CryptoContext.Provider>;
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}