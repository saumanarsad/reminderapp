import { Link, useForm } from '@inertiajs/react';
import { PageProps } from '@/types';

interface LayoutProps {
    children: React.ReactNode;
    auth: PageProps['auth'];
}

export default function Layout({ children, auth }: LayoutProps) {
    const { post } = useForm();

    const handleLogout = () => {
        post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/reminders" className="text-xl font-bold text-gray-900">
                                    Reminder App
                                </Link>
                            </div>
                        </div>
                        {auth.user && (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">{auth.user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
            </main>
        </div>
    );
}

