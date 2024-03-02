import {Layout, Typography} from 'antd';
import React, {FC} from 'react';
import {useCrypto} from '../../context/crypto-context';
import {Asset, Crypto} from '../../data';
import AssetsTable from '../AssetsTable/AssetsTable';
import PortfolioChart from '../PortfolioChart/PortfolioChart';


const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  color: '#fff',
  backgroundColor: '#001529',
  padding: '1rem',
};

interface Props {}

const App: FC<Props> = () => {
  const {assets, crypto}: {assets: Asset[]; crypto: Crypto[]} = useCrypto();
  const cryptoPriceMap: {[key: string]: number} = crypto.reduce((acc: {[key: string]: number}, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{textAlign: 'left', color: '#fff'}}>
        Portfolio:{' '}
        {assets
          .map(asset => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <div style={{maxHeight: 400}}>
        <PortfolioChart></PortfolioChart>
      </div>
      <AssetsTable></AssetsTable>
    </Layout.Content>
  );
};

export default App;
