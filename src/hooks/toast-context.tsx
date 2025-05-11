
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

// Create the context with a default empty object (but properly typed as undefined)
export const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Create the hook to access the context
export function useToast() {
  const context = React.useContext(ToastContext)

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return context
}

// Create a standalone toast function that properly checks for context
export const toast = (props: Omit<ToasterToast, "id">) => {
  try {
    const { toast: toastFn } = useToast()
    return toastFn(props)
  } catch (error) {
    console.error("Toast error:", error)
    return "-1" // Return a fallback ID
  }
}
