import {FC} from 'react';
import {Crypto} from '../../data';
import {Divider, Tag, Typography} from 'antd';
import CoinInfo from '../CoinInfo';

interface CoinInfoModalProps {
  coin: Crypto | null;
}

const CoinInfoModal: FC<CoinInfoModalProps> = ({ coin }) => {
  if (!coin) return null;
  return (
    <>
      <CoinInfo coin={coin} withSymbol={true}></CoinInfo>
      <Divider></Divider>

      <Typography.Paragraph>
        <Typography.Text strong style={{marginRight: 10}}>
          1 hour:
        </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>{coin?.priceChange1h}</Tag>

        <Typography.Text strong style={{marginRight: 10}}>
          1 day:
        </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>{coin?.priceChange1h}</Tag>

        <Typography.Text strong style={{marginRight: 10}}>
          1 week:
        </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>{coin?.priceChange1h}</Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong style={{marginRight: 10}}>
          Price:
        </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong style={{marginRight: 10}}>
          Price BTC:
        </Typography.Text>
        {coin.priceBtc.toFixed(2)}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong style={{marginRight: 10}}>
          MArket Cap:
        </Typography.Text>
        {coin.marketCap.toFixed(2)}$
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong style={{marginRight: 10}}>
            Contract Address:
          </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </>
  );
};

export default CoinInfoModal;
