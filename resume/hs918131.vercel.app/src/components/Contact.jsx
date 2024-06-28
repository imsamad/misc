import React from 'react'

const Contact = () => {
  return (
    <div className='md:my-48'>
        <div name="contact" className="h-8 lg:h-28">
      </div>
    <div className='w-full h-screen bg-[#f0da4e] flex justify-center items-center p-4'>
        <form method='POST' action="https://getform.io/f/panrrkza" className='flex flex-col max-w-[600px] w-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-gray-800 text-gray-800'>Contact</p>
                <p className='text-gray-800 py-4'>// Submit the form below or send me a mail</p>
            </div>
            <input className='bg-[#313131] text-[#f0da4e] p-2' type="text" placeholder='Name' name='name' />
            <input className='my-4 p-2 bg-[#313131] text-[#f0da4e]' type="email" placeholder='Email' name='email' />
            <textarea className='bg-[#313131] text-[#f0da4e] p-2'  name="message" rows="10" placeholder='Message'></textarea>
            <button className='text-[#313131] border-2 border-[#f0da4e] hover:bg-[#f0da4e] hover:border-gray-800 px-4 py-3 my-8 mx-auto flex items-center'>Submit</button>
        </form>
    </div>
    </div>
  )
}

export default Contact
