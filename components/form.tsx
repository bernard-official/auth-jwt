'use client'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { z } from 'zod'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'


export default function Form() {
const router = useRouter();

    const handleSubmit= async(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        const payload = {
            username: event.currentTarget.username.value,
            password: event.currentTarget.password.value
        }

        // make a post req with axios
        try {
            // const response =  await axios.post('/api/auth/login', payload)
            const {data } =  await axios.post('/api/auth/login', payload)

            alert(JSON.stringify(data))
            // redirect user to dashboard
            router.push('/dashboard') 
        } catch (e) {
            const error =  e as AxiosError   
            alert(error.message)
        }

    }

  return (
    <section className='absolute inset-0 flex flex-col justify-center items-center p-24'>
        {/* form */}
      <form onSubmit={handleSubmit} className='mt-12 p-12 border  w-[40%]' >
        
      <div className="grid gap-2 space-y-6 ">
              <div className="grid gap-1 space-y-6">
                <label className="font-light  justify-center " htmlFor="username">
                  Username
                </label>
                <input
                  className="border rounded-md border-black/50 dark:border-white/50"
                  id="username"
                  placeholder="Enter username"
                  type="text"
                  required
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </div>

              <div className="grid gap-1 space-y-6">
                <label className="font-light justify-center" htmlFor="password">
                  Password
                </label>
                <input
                  className="border rounded-md border-black/50 dark:border-white/50"
                  id="password"
                  required
                  placeholder="Enter Password"
                  type="password"
                />
                <Link href="login/resetPassword">
                  <div>
                    <p className=" flex justify-end font-light text-blue-600 ">
                      Forgot Password?
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className=" flex flex-col justify-center items-center space-y-6">
            <button 
    className=" w-full md:w-[362px]"
    type="submit"
    >
      Log In
    </button>
              {/* <p>
          Dont have an account?{" "}
          <Link href='/signup'>
          <span className="text-blue-600 font-light">sign up</span>{" "}
          </Link>
        </p> */}
            </div>
            <div className=" flex flex-col justify-center items-center space-y-6">
              {/* <span className=" font-light md:space-y-6">Or</span>
        <button className=" w-full md:w-[362px]">
          <span>
        <Link href={"login/phone"}>
          Sign in with Phone
        </Link>
          </span>
        </button> */}
            </div>

      </form>
    </section>
    
  )
}
