export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Reminder {
    id: number;
    title: string;
    description: string | null;
    due_at: string;
    formatted_due: string;
}

export interface PageProps {
    auth: {
        user: User | null;
    };
    flash?: {
        success?: string;
        error?: string;
    };
}

