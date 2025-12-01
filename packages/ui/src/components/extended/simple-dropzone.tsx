// packages/ui/src/components/extended/simple-dropzone.tsx
'use client';

import * as React from 'react';
import {UploadCloudIcon, XIcon} from 'lucide-react';

import {cn} from '../../lib/utils';
import {Button} from '../shadcn/button';

interface SimpleDropzoneProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onDrop'
> {
  accept?: string;
  disabled?: boolean;
  onFileChange: (file: File | null) => void;
}

export const SimpleDropzone = React.forwardRef<
  HTMLDivElement,
  SimpleDropzoneProps
>(({className, accept, disabled, onFileChange, ...props}, ref) => {
  const [isDragActive, setIsDragActive] = React.useState(false);
  const [fileName, setFileName] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      setFileName(files[0].name);
      onFileChange(files[0]);
    } else {
      setFileName(null);
      onFileChange(null);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleFileChange(e.target.files);
  };

  const handleClearFile = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setFileName(null);
    onFileChange(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors',
        isDragActive
          ? 'border-primary bg-primary/10'
          : 'border-input hover:border-primary/50',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      {...props}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        disabled={disabled}
        onChange={handleChange}
        className="hidden"
      />
      {fileName ? (
        <div className="bg-muted flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium">
          <span>{fileName}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={handleClearFile}
            aria-label="Clear file"
          >
            <XIcon className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <UploadCloudIcon className="text-muted-foreground h-8 w-8" />
          <p className="text-muted-foreground text-sm">
            Sleep hier een bestand of klik om te selecteren
          </p>
        </>
      )}
    </div>
  );
});
SimpleDropzone.displayName = 'SimpleDropzone';
