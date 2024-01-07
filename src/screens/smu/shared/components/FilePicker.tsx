import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';

import Icon from '../../../../shared/components/Icon';

interface Props {
  handleFiles: (files: FileList) => void;
  onFailure?: () => void;
  fileType?: string;
  customPlaceholder?: string;
}

const Wrapper = styled.div`
  label {
    display: inline-block;
    cursor: pointer;
    background-color: ${(props) => props.theme.appColor[90]};
    border-radius: 16px;
    width: 50%;
    max-width: 450px;
    padding: 1rem;
  }

  .message {
    display: flex;
    align-items: center;
    font-size: 16px;
    color: ${(props) => props.theme.textColor[10]};
    overflow: hidden;
    text-overflow: ellipsis;

    .text {
      font-weight: 500;
    }
  }

  .placeholder {
    color: ${(props) => props.theme.textColor[20]};
  }

  span {
    padding-right: 0.5rem;
  }

  &:hover {
    label {
      background-color: ${(props) => props.theme.primary[10]};
    }

    .placeholder {
      color: ${(props) => props.theme.primary[30]};
    }
  }
`;

const FilePicker: React.FC<Props> = (props) => {
  const { customPlaceholder, fileType, handleFiles, onFailure } = props;
  const [newLabel, setNewLabel] = useState<string | null>(null);
  const [labelClassName, setLabelClassName] = useState('');

  const placeholder = useMemo(() => {
    if (newLabel) {
      setLabelClassName('message');
      return newLabel;
    }
    setLabelClassName('message placeholder');
    return customPlaceholder
      ? customPlaceholder
      : 'Choose a file from your computer';
  }, [customPlaceholder, newLabel]);

  const handleSuccess = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (files === null || files.length === 0) {
        if (onFailure) {
          onFailure();
        }
        return;
      }

      if (files.length > 1) {
        setNewLabel(`${files.length} files`);
      }
      setNewLabel(files[0].name);

      handleFiles(files);
    },
    [handleFiles, onFailure]
  );

  return (
    <Wrapper>
      <input
        id="upload-file"
        type="file"
        placeholder={placeholder}
        onChange={handleSuccess}
        hidden
        accept={fileType}
      />
      <label htmlFor="upload-file">
        <span className={labelClassName}>
          <Icon name="file_upload" />
          <span className="text">{placeholder}</span>
        </span>
      </label>
    </Wrapper>
  );
};

export default FilePicker;
