import React, { useState } from "react";
import Suggestion from "@/components/Suggestion";
import { Textarea } from "@/components/ui/textarea";
import ModelButton from "@/components/ModelButton";
import ModelHeader from "@/components/ModelHeader";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast"
import { models } from "@/lib/models";
import { credit } from "@/stores/atoms/credit";
import { useRecoilState } from "recoil";
import explicitWords from '../lib/negativeWords.json'
export default function Prompt({
  heading,
  placeholder,
  button,
  model,
  responseType,
  suggestions,
  type,
  setModelLoading,
  textClassName,
  obj,
  text,
  setText,
  setApiOutput,
}) {
  const { toast } = useToast()
  const aiModel = models.find((item) => item.model == model);
  const [loading, setLoading] = useState(false);
  const [prevPrompt, setPrevPrompt] = useState('')
  const [credits, setCredits] = useRecoilState(credit)
  const API = aiModel.url;
  const explicitWordsArray = explicitWords.map(word => word.toLowerCase())
  const onFetchClick = async () => {
    setLoading(true);
    if (!(text.split(' ').length > 2)) {
      setLoading(false);
      toast({
        description: "Prompt must be longer than 2 words",
        variant: 'destructive'
      })
      return
    }
    const containsExplicitWord = explicitWordsArray.some(word => text.toLowerCase().includes(word));
    if (containsExplicitWord) {
      setLoading(false);
      toast({
        description: "You've used explicit language",
        variant: "destructive",
      });
      return;
    }
    if (prevPrompt == text) {
      toast({
        title: "Same output!",
        description: "Same prompt will result in same output due to caching.Hint: Change prompt letter case",
      })
    }
    setPrevPrompt(text)
    setModelLoading(true);
    try {
      const res = await axios.post(
        API,
        { inputs: text },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_KEY}`,
          },
          responseType: responseType,
        }
      );
      if (prevPrompt != text) {
        const tokenRes = await axios.post(`${import.meta.env.VITE_URL}/credit/generate`,
          { credits: 5 }, {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        })
        setCredits((prev) => prev - 5)
      }
      if (responseType === "blob") {
        const blob = new Blob([res.data], { type: type });
        const assetUrl = URL.createObjectURL(blob);
        setApiOutput(assetUrl);
      } else {
        setApiOutput(res.data[0][obj]);
      }
    } catch (error) {
      console.log(error)
      if (error.response.status == 400) {
        toast({
          description: "You dont have sufficent balance",
          variant: 'destructive'
        })
        setPrevPrompt('')
      }
      else {
        toast({
          title: "Something went wrong",
          description: "Uh-Oh! something went wrong",
          variant: 'destructive'
        })
        setPrevPrompt('')
      }
    } finally {
      setLoading(false);
      setModelLoading(false);
    }
  };
  return (
    <>
      <ModelHeader heading={heading}></ModelHeader>
      <Textarea
        onChange={(e) => setText(e.target.value)}
        placeholder={placeholder}
        value={text}
        className={textClassName}
      ></Textarea>
      <ModelButton loading={loading} onClick={onFetchClick} text={button} />
      <Suggestion setText={setText} prompts={suggestions} />
    </>
  );
}
