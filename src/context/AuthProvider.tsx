'use client'
import {SessionProvider, useSession} from 'next-auth/react';
import { redirect } from 'next/navigation';
const AuthProvider = ({children}:{children : React.ReactNode}) => {
   
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthProvider