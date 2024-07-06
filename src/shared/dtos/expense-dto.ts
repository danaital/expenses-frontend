
export interface Expense {
    id: number;
    userId: number;
    expenseTypeId: number;
    title: string;
    amount: number;
    description: string;
    expenseDate: Date;
    paidTo: string;
    metadata: Record<string, any>;
  }
  