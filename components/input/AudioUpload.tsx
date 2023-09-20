import React from 'react';

import { CldUploadWidget } from 'next-cloudinary';
import { useCallback } from 'react';
import {
  MusicalNoteIcon,
  PhotoIcon,
} from '@heroicons/react/24/solid';
import AudioPlayer from '../audioPlayer/AudioPlayer';

declare global {
  var cloudinary: any;
}

interface AudioUploadProps {
  onChange: (value: string) => void;
  value?: string;
}

const AudioUpload: React.FC<AudioUploadProps> = ({
  onChange,
  value,
}) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="h6ooi4xh"
      options={{
        maxFiles: 1,
        maxFileSize: 5000000,
      }}
    >
      {({ open }) => {
        return (
          <div>
            {value ? (
              <div className="">
                {value && (
                  <div className="flex flex-row gap-4 justify-between items-center">
                    <AudioPlayer url={value} />
                    <p
                      className="cursor-pointer text-primary"
                      onClick={() => open?.()}
                    >
                      Change
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div
                onClick={() => open?.()}
                className="relative rounded-xl cursor-pointer hover:opacity-70 border-dashed border-2  
              flex flex-row gap-4 justify-center items-center h-[50px] "
              >
                <MusicalNoteIcon className="h-5 w-5 text-primary" />
                <div className="text-primary">Click to upload</div>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default AudioUpload;
