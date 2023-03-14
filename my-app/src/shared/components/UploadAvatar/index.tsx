import { Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import React, { useEffect, useState } from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import * as Icon from 'react-feather';
import './style.scss';

interface IUploadAvatar {
  value?: any;
  onChange?: (value: any) => void;
}

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const UploadAvatar: React.FC<IUploadAvatar> = (props: IUploadAvatar) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    setImageUrl(props.value);
  }, [props.value]);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    getBase64(info.file as RcFile, url => {
      setLoading(false);
      setImageUrl(url);
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    props?.onChange && props.onChange(info.file);
  };

  const uploadButton = (
    <div className="upload">
      {loading ? <LoadingOutlined /> : <Icon.Camera />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      accept={'image/*'}
      showUploadList={false}
      beforeUpload={() => false}
      onChange={handleChange}
    >
      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
  );
};
