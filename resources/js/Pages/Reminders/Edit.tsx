import { Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import Layout from '../Layout';
import { PageProps, Reminder } from '@/types';

interface RemindersEditProps extends PageProps {
    reminder: {
        id: number;
        title: string;
        description: string | null;
        due_at: string;
    };
}

export default function Edit({ auth, reminder }: RemindersEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        title: reminder.title,
        description: reminder.description || '',
        due_at: reminder.due_at,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/reminders/${reminder.id}`);
    };

    return (
        <Layout auth={auth}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900">Edit Reminder</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Update your reminder details.
                        </p>
                    </div>
                </div>

                <div className="mt-8 max-w-3xl">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                required
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.title && (
                                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="due_at" className="block text-sm font-medium text-gray-700">
                                Due Date & Time
                            </label>
                            <input
                                type="datetime-local"
                                name="due_at"
                                id="due_at"
                                required
                                value={data.due_at}
                                onChange={(e) => setData('due_at', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                            {errors.due_at && (
                                <p className="mt-2 text-sm text-red-600">{errors.due_at}</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href="/reminders"
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Reminder'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

