import './style.scss';

import { Upload } from 'antd';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import React, { memo, useEffect, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';

interface IUploadListImage {
  value?: {
    id: string;
    path: string;
  }[];
  onChange?: (value: any) => void;
  setFilesRemove: (value: any) => void;
}

const UploadListImage: React.FC<IUploadListImage> = (props: IUploadListImage) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (!props.value) {
      return;
    }
    const newValue = props?.value?.map((it: any) => {
      if (!it.path) {
        return it;
      } else {
        return {
          uid: it.id,
          name: it.path,
          url: it.path,
        };
      }
    });
    setFileList(newValue);
  }, [props.value]);

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    setFileList(info.fileList);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    props?.onChange && props.onChange(info.fileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onRemove = (file: UploadFile) => {
    if (file.url) {
      props.setFilesRemove && props.setFilesRemove(oldArr => [...oldArr, file.uid]);
    }
  };

  return (
    <div className="upload-listImage">
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        beforeUpload={() => false}
        onChange={handleChange}
        onPreview={onPreview}
        maxCount={5}
        fileList={fileList}
        multiple
        onRemove={onRemove}
        accept={'image/*'}
      >
        {fileList.length < 5 && (
          <div className="wrap_icon">
            <UploadOutlined />
            <label>Upload</label>
          </div>
        )}
      </Upload>
    </div>
  );
};

export default memo(UploadListImage);
