import { TiMicrophoneOutline } from "react-icons/ti";
import { LuListMusic } from "react-icons/lu";
import { RxImage } from "react-icons/rx";
import { MdShortText } from "react-icons/md";
import { CiTextAlignJustify } from "react-icons/ci";
import { RiEnglishInput } from "react-icons/ri";
export const projects = [
  {
    title: "Images AI",
    description:
      "Unlocking visual storytelling: Text-to-Image AI crafts vivid visuals from textual descriptions with unparalleled creativity.",
    page: "/image",
    icon: <RxImage className="h-5 w-5 text-light" />,
    experimental: false,
  },
  {
    title: "Beats AI",
    description:
      "Experience seamless transformation: Text-to-Audio AI effortlessly converts text into beats and music",
    page: "/beats",
    icon: <LuListMusic className="h-5 w-5 text-light" />,
    experimental: false,
  },
  {
    title: "Text Completion ",
    description:
      "Unleash creativity effortlessly: Text Completion AI generates fluent and contextually relevant text continuations, aiding in content creation with ease and accuracy.",
    page: "/completion",
    icon: <CiTextAlignJustify className="h-5 w-5 text-light" />,
    experimental: false,
  },

  {
    title: "Voice AI",
    description:
      "Empowering seamless communication: Text-to-Speech AI converts text into natural speech with clarity and fluidity.",
    page: "/voice",
    icon: <TiMicrophoneOutline className="h-5 w-5 text-light" />,
    experimental: true,
  },

  {
    title: "Summarization AI",
    description:
      "Condensing complexity: Text Summarization AI distills lengthy text into concise, insightful summaries with speed and accuracy",
    page: "/summary",
    icon: <MdShortText className="h-5 w-5 text-light" />,
    experimental: false,
  },

  {
    title: "Grammar AI",
    description:
      "Unleash creativity effortlessly: Text Completion AI generates fluent and contextually relevant text continuations, aiding in content creation with ease and accuracy",
    page: "/grammar",
    icon: <RiEnglishInput className="h-5 w-5 text-light" />,
    experimental: true,
  },
];
