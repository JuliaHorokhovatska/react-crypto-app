import {Button, DatePicker, Divider, Form, InputNumber, Result, Select, Space} from 'antd';
import {FC, useRef, useState} from 'react';
import {useCrypto} from '../../context/crypto-context';
import {Crypto} from '../../data';
import CoinInfo from '../CoinInfo';

interface AddAssetsFormProps {
  onClose: () => void;
}

type FieldType = {
  amount?: number;
  price?: number;
  date?: any;
  total?: number;
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be greater than 0!',
  },
};

const AddAssetsForm: FC<AddAssetsFormProps> = ({onClose}) => {
  const [form] = Form.useForm();
  const {crypto, addAsset} = useCrypto();
  const [coin, setCoin] = useState<Crypto | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const assetRef = useRef<{
    id: string;
    amount: number;
    price: number;
    date: any;
  } | null>();

  function onFinish(values: FieldType) {
    if (!coin) return;
    const newAsset = {
      id: coin?.id,
      amount: values.amount ?? 0,
      price: values.price ?? 0,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
    addAsset?.(newAsset);
  }

  function handleAmountChange(value: number | null) {
    if (value) {
      const price = form.getFieldValue('price');
      const total = +(value * price).toFixed(2);
      if (total) form.setFieldValue('total', total);
    }
  }

  function handlePriceChange(value: number | null) {
    if (value) {
      const amount = form.getFieldValue('amount');
      const total = +(amount * value).toFixed(2);
      if (total) form.setFieldValue('total', total);
    }
  }

  if (!coin) {
    return (
      <Select
        style={{width: '100%'}}
        placeholder='Select coin'
        optionLabelProp='label'
        onSelect={value => setCoin(crypto.find(c => c.id === value) || null)}
        options={crypto.map(c => ({label: c.name, value: c.id, icon: c.icon}))}
        optionRender={option => (
          <Space>
            <img width={20} height={20} src={option.data.icon} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />
    );
  }

  if (submitted) {
    return (
      <Result
        status='success'
        title='New Asset Added!'
        subTitle={`Added ${assetRef?.current?.amount} of ${coin.name} by price ${assetRef?.current?.price}`}
        extra={[
          <Button type='primary' key='console' onClick={onClose}>
            Console
          </Button>,
        ]}
      />
    );
  }
  return (
    <>
      <CoinInfo coin={coin} withSymbol={false}></CoinInfo>
      <Divider></Divider>
      <Form
        form={form}
        name='basic'
        labelCol={{span: 4}}
        wrapperCol={{span: 10}}
        style={{maxWidth: 600}}
        initialValues={{price: +coin.price.toFixed(2)}}
        onFinish={onFinish}
        validateMessages={validateMessages}
      >
        <Form.Item<FieldType> label='Amount' name='amount' rules={[{required: true, type: 'number', min: 0}]}>
          <InputNumber placeholder='Enter coin amount' onChange={handleAmountChange} style={{width: '100%'}} />
        </Form.Item>

        <Form.Item<FieldType> label='Price' name='price'>
          <InputNumber style={{width: '100%'}} onChange={handlePriceChange} />
        </Form.Item>

        <Form.Item<FieldType> label='Date & Tame' name='date'>
          <DatePicker showTime style={{width: '100%'}} />
        </Form.Item>

        <Form.Item<FieldType> label='Total' name='total'>
          <InputNumber disabled style={{width: '100%'}} />
        </Form.Item>

        <Form.Item wrapperCol={{offset: 7, span: 16}}>
          <Button type='primary' htmlType='submit'>
            Add Asset
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddAssetsForm;
