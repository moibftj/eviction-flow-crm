
// Importing the actual implementation from the shadcn/ui toast component
import { useToast as useShadcnToast } from "@/components/ui/use-toast";

// Re-export the hook to maintain compatibility
export const useToast = useShadcnToast;

// Export the types if needed
export type { Toast } from "@/components/ui/use-toast";
