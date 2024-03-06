import { COOKIE_NAME } from '@/constants';
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import React from 'react'

const MAX_AGE = 60 * 60 * 24

export async function POST(request: Request) {
 const body = await request.json();

 const { username,password } =  body;

 if(username !== 'admin' || password !== 'admin'){
    return NextResponse.json(
        {
            message: 'Unauthorized',
        },{
            status: 401
        }
    )
 }
 
 //alwss check for secret
 const secret = process.env.JWT_SECRET || ''

 //sign
 const token = sign(
    {
        username,
    },
    secret, {
        expiresIn: MAX_AGE
    }
 );

 //serialize it to create a cookie
 const serialized = serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: MAX_AGE,
    path:'/'
 });

 const response = {
    message:'Authenitcated!'
 }

 return new Response(JSON.stringify(response),{
    status: 200,
    headers: {'Set-Cookie': serialized},
 })
}