
// Generate a simple UUID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Format date to a readable string
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Sort items by date
export const sortByDate = <T extends { createdAt?: Date; uploadedAt?: Date; dueDate?: Date }>(
  items: T[],
  order: 'asc' | 'desc' = 'desc'
): T[] => {
  return [...items].sort((a, b) => {
    const dateA = a.createdAt || a.uploadedAt || a.dueDate || new Date();
    const dateB = b.createdAt || b.uploadedAt || b.dueDate || new Date();
    
    return order === 'asc' 
      ? dateA.getTime() - dateB.getTime() 
      : dateB.getTime() - dateA.getTime();
  });
};
