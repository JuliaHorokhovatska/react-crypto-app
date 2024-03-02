import React, {FC, useContext} from 'react';
import {Card, Layout, List, Statistic, Tag, Typography} from 'antd';
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {capitalize} from '../../utils';
import CryptoContext from '../../context/crypto-context';

const siderStyle: React.CSSProperties = {
  padding: '1rem',
};

interface AppSiderProps {}

const AppSider: FC<AppSiderProps> = () => {
  const {assets} = useContext(CryptoContext);

  return (
    <Layout.Sider width='25%' style={siderStyle}>
      {assets.map((asset, index) => (
        <Card key={index} style={{marginBottom: '1rem'}}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{color: asset.grow ? '#3f8600' : '#cf1322'}}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix='$'
          />
          <List
            size='small'
            style={{backgroundColor: '#fff'}}
            dataSource={[
              {title: 'Total Profit', value: asset.totalProfit, withTag: true},
              {title: 'Asset Amount', value: asset.amount, isPlain: true},
            ]}
            renderItem={item => (
              <List.Item>
                <span>{item.title}</span>

                <span>
                  {item.withTag && <Tag color={asset.grow ? 'green' : 'red'}>{asset.growPercent}%</Tag>}
                  {item.isPlain && item.value.toFixed(2)}
                  {!item.isPlain && (
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      <span>{item.value?.toFixed(2)}$</span>
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
};

export default AppSider;
