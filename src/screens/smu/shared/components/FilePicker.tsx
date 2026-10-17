import React, { useCallback, useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Icon from '@/shared/components/Icon';

interface Props {
  handleFiles: (files: FileList) => void;
  onFailure?: () => void;
  fileType?: string;
  customPlaceholder?: string;
}

const FilePicker: React.FC<Props> = (props) => {
  const { customPlaceholder, fileType, handleFiles, onFailure } = props;
  const [newLabel, setNewLabel] = useState<string | null>(null);

  const placeholder = useMemo(() => {
    if (newLabel) {
      return newLabel;
    }
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
    <div>
      <Input
        id="upload-file"
        type="file"
        placeholder={placeholder}
        onChange={handleSuccess}
        hidden
        accept={fileType}
      />
      <Label
        htmlFor="upload-file"
        className={cn(
          // neutralise shadcn Label defaults (flex, gap, text-sm, leading-none, font-medium)
          'inline-block gap-0 text-base leading-normal font-normal',
          'cursor-pointer rounded-2xl',
          'bg-gray-200 dark:bg-gray-700',
          'w-1/2 max-w-md p-4',
          'hover:bg-theme-100'
        )}
      >
        <span
          className={cn(
            'flex items-center text-base pr-2',
            'text-gray-700 dark:text-gray-200',
            'overflow-hidden text-ellipsis',
            !newLabel && 'text-gray-500 dark:text-gray-300',
            !newLabel && 'hover:text-theme-300'
          )}
        >
          <Icon name="upload" />
          <span className="font-medium pr-2">{placeholder}</span>
        </span>
      </Label>
    </div>
  );
};

export default FilePicker;
