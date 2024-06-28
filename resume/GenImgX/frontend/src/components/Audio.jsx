import React from 'react';
import ActionButton from './ActionButton';
import Loader from './Loader';

export default function Audio({ loading, audioBlob }) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = audioBlob;
    link.download = 'audio_file.mp3';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {audioBlob && !loading && (
        <>
          <p className="text-light md:text-xl text-lg">Output</p>
          <audio controls src={audioBlob}></audio>
          <ActionButton text={'Download'} onClick={handleDownload} />
        </>
      )}
      {loading && <Loader size={30} />}
    </>
  );
}
