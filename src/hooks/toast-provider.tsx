
import * as React from "react"
import { ToastProvider as RadixToastProvider } from "@/components/ui/toast"
import { 
  ToastContext, 
  ToasterToast 
} from "./toast-context"
import { 
  reducer, 
  genId, 
  toastTimeouts, 
  TOAST_REMOVE_DELAY, 
  State, 
  Action 
} from "./toast-reducer"

export function ToastProvider({ children }: { children: React.ReactNode }) {
  // Create a function to add to remove queue
  function addToRemoveQueue(toastId: string) {
    if (toastTimeouts.has(toastId)) {
      return
    }

    const timeout = setTimeout(() => {
      toastTimeouts.delete(toastId)
      dispatch({
        type: "REMOVE_TOAST",
        toastId: toastId,
      })
    }, TOAST_REMOVE_DELAY)

    toastTimeouts.set(toastId, timeout)
  }
  
  // Create a customized reducer that uses our addToRemoveQueue
  const reducerWithQueue = React.useCallback((state: State, action: Action) => {
    return reducer(state, action, addToRemoveQueue)
  }, [])
  
  const [state, dispatch] = React.useReducer(reducerWithQueue, {
    toasts: [],
  })

  React.useEffect(() => {
    return () => {
      toastTimeouts.forEach((timeout) => {
        clearTimeout(timeout)
      })
    }
  }, [])

  const toast = React.useCallback(
    (props: Omit<ToasterToast, "id">) => {
      const id = genId()

      dispatch({
        type: "ADD_TOAST",
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open) => {
            if (!open) dismiss(id)
          },
        },
      })

      return id
    },
    [dispatch]
  )

  const dismiss = React.useCallback(
    (toastId?: string) => {
      dispatch({
        type: "DISMISS_TOAST",
        toastId,
      })
    },
    [dispatch]
  )

  return (
    <ToastContext.Provider
      value={{
        ...state,
        toast,
        dismiss,
      }}
    >
      <RadixToastProvider>
        {children}
      </RadixToastProvider>
    </ToastContext.Provider>
  )
}
