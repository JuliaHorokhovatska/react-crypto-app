import {Table} from 'antd';
import type {TableColumnsType} from 'antd';
import {Asset} from '../../data';
import {useCrypto} from '../../context/crypto-context';

interface DataType {
  key: React.Key;
  name: string;
  price: number;
  amount: number;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
];

const AssetsTable: React.FC = () => {
  const {assets}: { assets: Asset[]} = useCrypto();
  
  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.id,
    price: asset.price,
    amount: asset.amount,
  }));
  
  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default AssetsTable;
