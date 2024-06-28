import Audio from '@/components/Audio';
import Navbar from '@/components/Navbar';
import Prompt from '@/components/Prompt';
import { prompts } from '@/lib/prompts/tts.prompts';
import { voiceOutput } from '@/stores/atoms/output';
import { voicePrompt } from '@/stores/atoms/prompt';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

export default function Voice() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useRecoilState(voicePrompt);
  const [apiOutput, setApiOutput] = useRecoilState(voiceOutput);

  return (
    <div className="min-h-screen min-w-screen bg-black bg-grid-small-white/[0.1] md:bg-grid-small-white/[0.2]  relative flex items-start md:items-center justify-center overflow-x-hidden">
      <Navbar />
      <div className="h-full w-[80%] md:w-[70%] lg:w-[50%] flex flex-col justify-around md:mt-20 md:py-0 py-32">
        <Prompt
          heading={'Text to Speech'}
          placeholder={'Enter your text ...'}
          button={'Generate'}
          model={'tts'}
          suggestions={prompts}
          responseType={'blob'}
          setModelLoading={setLoading}
          type={'audio/mpeg'}
          text={text}
          setText={setText}
          setApiOutput={setApiOutput}
        />
        <div className="md:mt-8 mt-5 flex flex-col md:flex-row items-center justify-center md:gap-10 gap-5">
          <Audio audioBlob={apiOutput} loading={loading} />
        </div>
      </div>
      <div className="absolute bottom-1 w-full hidden xl:flex justify-center">
        <p className="text-sm text-neutral-600">
          This is an experimental model might generate wrong content!
        </p>
      </div>
    </div>
  );
}
