import {Flex, Typography} from 'antd';
import {FC} from 'react';
import {Crypto} from '../data';

interface CoinInfoProps {
  coin: Crypto;
  withSymbol: boolean;
}

const CoinInfo: FC<CoinInfoProps> = ({coin, withSymbol}) => {
  return (
    <Flex align='center' gap={10}>
      <img width={40} src={coin?.icon} alt={coin.name} />
      <Typography.Title level={2} style={{ margin: 0 }}>
        {withSymbol && `(${coin.symbol})`} {coin.name}
      </Typography.Title>
    </Flex>
  );
};

export default CoinInfo;
