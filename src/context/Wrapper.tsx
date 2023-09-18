import RootLayout from "@/app/layout"
import { SessionProvider } from "next-auth/react"
import AuthProvider from "./AuthProvider"
import { Inter } from "next/font/google"

const Wrapper = ({children}:{children:React.ReactNode})=>{
    return (
        <html lang="en">
        <body >
          <AuthProvider>
                
          {children}
          </AuthProvider>
          </body>
      </html>
    )
}