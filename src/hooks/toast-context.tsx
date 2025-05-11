
import * as React from "react"
import { ToastActionElement, ToastProps } from "@/components/ui/toast"

// Define toast types
export type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

// Define the context interface
interface ToastContextType {
  toasts: ToasterToast[]
  toast: (props: Omit<ToasterToast, "id">) => string
  dismiss: (toastId?: string) => void
}

// Create the context
export const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

// Create the hook to access the context
export function useToast() {
  const context = React.useContext(ToastContext)

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return context
}

// Create a standalone toast function
export const toast = (props: Omit<ToasterToast, "id">) => {
  const { toast: toastFn } = useToast()
  return toastFn(props)
}
