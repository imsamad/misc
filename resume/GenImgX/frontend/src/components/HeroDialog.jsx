import React, { useState } from 'react'
import axios from 'axios'
import {
    DialogContent,
} from "@/components/ui/dialog"
import GoogleSignin from './GoogleSignin'
import { authSchema } from '@/util/validations/auth.validation'
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom";
export default function HeroDialog({ form }) {
    const { toast } = useToast()
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const onEmailChange = (e) => {
        setEmail(e.target.value)
        setError('')
    }
    const onPasswordChange = (e) => {
        setPassword(e.target.value)
        setError('')
    }
    const onSignupHandler = async () => {
        setLoading(true)
        const validPayload = authSchema.safeParse({ email, password })
        if (validPayload.error) {
            setError(validPayload.error.errors[0]['message'])
            setLoading(false)
            return
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL}/user/${form}`, { email, password })
            const token = res.data.token
            localStorage.setItem('token', token)
            if (form == 'Login') {
                toast({
                    description: 'Logged in successfully',
                    variant: 'success'
                })
            } else {
                toast({
                    description: 'Signed in successfully',
                    variant: 'success'
                })
            }
            navigate('/models')
        } catch (error) {
            if (error.response.status == 403) {
                setError("User already exist")
            }
            if (error.response.status == 404) {
                toast({
                    description: "User doesn't exist! or Incorrect password",
                    variant: 'destructive'
                })
            }
            else {
                toast({
                    description: 'Something went wrong',
                    variant: 'destructive',
                })
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <DialogContent>
            <div className="flex flex-col items-center justify-center">
                <p className="text-2xl text-light font-medium">{form}!</p>
                <p className="text-neutral-500 text-sm pt-2.5">Enter your details</p>
                <div className="w-full mt-8 flex flex-col items-center">
                    <div className="w-[80%] mb-0.5">
                        <label className='text-neutral-400 mr-auto text-sm'>Email</label>
                    </div>
                    <input onChange={onEmailChange} required type="email" placeholder='ansharora3839@gmail.com' className='bg-black border focus:outline-none pl-3 text-light focus:border-neutral-400 border-neutral-600 h-10 rounded-sm w-[80%] placeholder:text-neutral-600 placeholder:text-sm' />
                </div>
                <div className="w-full mt-4 flex flex-col items-center">
                    <div className="w-[80%] mb-0.5">
                        <label className='text-neutral-400 mr-auto text-sm'>Password</label>
                    </div>
                    <input onChange={onPasswordChange} required type="password" placeholder='*****' className='bg-black border focus:outline-none pl-3 text-light focus:border-neutral-400 border-neutral-600 h-10 rounded-sm w-[80%] placeholder:text-neutral-600 placeholder:text-sm' />
                    {error &&
                        <div className="w-[80%] flex justify-end mt-2">
                            <p className=" text-[#ed564c] opacity-95 text-xs">{error}</p>
                        </div>
                    }
                </div>
                <button disabled={loading} onClick={onSignupHandler} className="w-4/5 disabled:text-opacity-80 text-light bg-zinc-800 mt-8 py-2 rounded-md hover:opacity-90 border-neutral-500 flex items-center justify-center">
                    {loading &&
                        <div
                            className="animate-spin inline-block size-5 border-[3px] border-neutral-400 border-t-transparent rounded-full mr-3"
                            role="status"
                        ></div>
                    }
                    {form}
                </button>
                <div className="w-[90%] flex mt-8 items-center">
                    <div className="w-[45%] h-[1px] bg-neutral-400"></div>
                    <span className="text-neutral-300 opacity-90 mx-3 text-sm font-medium">or</span>
                    <div className="w-[45%] h-[1px] bg-neutral-400"></div>
                </div>
                <GoogleSignin form={form} />
            </div>
        </DialogContent>
    )
}

