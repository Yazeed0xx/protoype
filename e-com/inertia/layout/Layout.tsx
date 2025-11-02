import { ReactNode, useEffect } from 'react'
import { usePage } from '@inertiajs/react'
import { toast } from 'sonner'
import { Toaster } from '~/components/ui/sonner'
import Header from './Header'
import AuthHeader from './AuthHeader'

interface LayoutProps {
  children: ReactNode
}

interface User {
  id: number
  email: string
  fullName: string
  createdAt: string
  updatedAt: string
}

interface PageProps {
  user?: User
  flash?: {
    success?: string
    error?: string
    info?: string
    warning?: string
  }
  [key: string]: any
}

export default function Layout({ children }: LayoutProps) {
  const { props } = usePage<PageProps>()
  const isAuthenticated = !!props.user

  // Handle flash messages
  useEffect(() => {
    if (props.flash) {
      if (props.flash.success) {
        toast.success(props.flash.success)
      }
      if (props.flash.error) {
        toast.error(props.flash.error)
      }
      if (props.flash.info) {
        toast.info(props.flash.info)
      }
      if (props.flash.warning) {
        toast.warning(props.flash.warning)
      }
    }
  }, [props.flash])

  return (
    <div className="min-h-screen">
      {isAuthenticated ? <Header /> : <AuthHeader />}
      {children}
      <Toaster />
    </div>
  )
}
