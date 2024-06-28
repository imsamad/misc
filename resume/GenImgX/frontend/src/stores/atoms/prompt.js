import { atom } from "recoil";

export const voicePrompt = atom({
    key: 'Prompt',
    default: ''
})
export const beatsPrompt = atom({
    key: 'beatsPrompt',
    default: ''
})
export const imagePrompt = atom({
    key: 'imagePrompt',
    default: ''
})
export const grammarPrompt = atom({
    key: 'grammarPrompt',
    default: ''
})
export const completionPrompt = atom({
    key: 'completionPrompt',
    default: ''
})
export const summaryPrompt = atom({
    key: 'summaryPrompt',
    default: ''
})