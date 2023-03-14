import { Select, SelectProps } from 'antd';
import React, { memo, useEffect, useState } from 'react';

import { PaginationEntity } from '@core/pagination/entity';

interface IOption {
  value: string;
  label: string;
}

interface ISelectApiComponent extends SelectProps {
  apiServices?: (...params: any) => Promise<{ data: Array<IOption>; info?: PaginationEntity }>;
}

const SelectApiComponent: React.FC<ISelectApiComponent> = (props: ISelectApiComponent) => {
  const [option, setOption] = useState<IOption[]>([]);
  useEffect(() => {
    if (!props.apiServices) {
      return;
    }
    props.apiServices({}, {}).then(res => {
      setOption(res.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.apiServices]);

  return <Select options={option} {...props} />;
};

export default memo(SelectApiComponent);
