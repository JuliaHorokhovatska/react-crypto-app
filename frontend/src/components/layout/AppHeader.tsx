import {Button, Drawer, Layout, Modal, Select, SelectProps, Space} from 'antd';
import {FC, useEffect, useState} from 'react';
import {useCrypto} from '../../context/crypto-context';
import CoinInfoModal from '../CoinInfoModal/CoinInfoModal';
import {Crypto} from '../../data';
import AddAssetsForm from '../AddAssetsForm.tsx/AddAssetsForm';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

interface AppHeaderProps {}

const AppHeader: FC<AppHeaderProps> = () => {
  const [selected, setSelected] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [coin, setCoin] = useState<Crypto | null>(null);
  const [drawer, setDrawer] = useState<boolean>(false);
  const {crypto} = useCrypto();

  useEffect(() => {
    const keypress = (e: KeyboardEvent) => {
      if (e.key === '/') {
        setSelected(prev => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  const handleSelect: SelectProps['onSelect'] = value => {
    console.log(value);
    setModal(true);
    setCoin(crypto.find(c => c.id === value) || null);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{width: 250}}
        open={selected}
        value={['press / to open']}
        optionLabelProp='label'
        onSelect={handleSelect}
        onClick={() => setSelected(prev => !prev)}
        options={crypto.map(c => ({label: c.name, value: c.id, icon: c.icon}))}
        optionRender={option => (
          <Space>
            <img width={20} height={20} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />
      <Button type='primary' onClick={() => setDrawer(true)}>
        Primary Button
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin}></CoinInfoModal>
      </Modal>

      <Drawer width={600} title='Basic Drawer' onClose={() => setDrawer(false)} open={drawer} destroyOnClose>
        <AddAssetsForm onClose={() => setDrawer(false)}></AddAssetsForm>
      </Drawer>
    </Layout.Header>
  );
};

export default AppHeader;
