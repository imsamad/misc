import React from 'react'
import HeroModelItem from './HeroModelItem'


export default function HeroModelList() {
    return (
        <div className="w-full flex flex-col px-5 gap-y-28 mt-8 md:mt-0">
            <HeroModelItem img={'beatsai'} header={'Beats AI'} text={"Embark on a journey of seamless transformation as our cutting-edge Text-to-Audio AI technology seamlessly converts your written words into captivating beats and melodies, transcending the boundaries of traditional communication and opening new avenues of creative expression."} />
            <HeroModelItem img={'textai'} className={'xl:flex-row-reverse'} header={'Story AI'} text={"Unleash creativity effortlessly: Text Completion AI generates fluent and contextually relevant text continuations, aiding in content creation with ease and accuracy."} />
            <HeroModelItem img={'imageai'} header={'Image AI'} text={"Embark on a transformative voyage into the realm of visual storytelling as our revolutionary Text-to-Image AI technology unlocks the power of imagination, translating textual descriptions into vivid, captivating visuals with unparalleled ingenuity and creativity."} />
        </div>
    )
}
