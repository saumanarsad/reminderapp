import { Link, router } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';
import Layout from '../Layout';
import { PageProps, Reminder } from '@/types';

interface RemindersIndexProps extends PageProps {
    reminders: Reminder[];
}


export default function Index({ auth, reminders, flash }: RemindersIndexProps) {
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
    const notifiedRemindersRef = useRef<Set<number>>(new Set());
<button
  onClick={() => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification('Test Notification', { body: 'This is a test.' });
      } else {
        alert('Permission not granted');
      }
    });
  }}
>
  Test Notification
</button>
    useEffect(() => {
        // Request notification permission on mount
        if ('Notification' in window) {
            // Check current permission first
            if (Notification.permission === 'granted') {
                setNotificationPermission('granted');
            } else if (Notification.permission === 'denied') {
                setNotificationPermission('denied');
            } else {
                // Request permission
                Notification.requestPermission().then((permission) => {
                    setNotificationPermission(permission);
                });
            }
        }
    }, []);

    useEffect(() => {
        // Only set up interval if permission is granted
        if (notificationPermission !== 'granted') {
            return;
        }

        // Check for due reminders every 5 seconds (more frequent for better accuracy)
        const interval = setInterval(() => {
            const now = new Date();
            reminders.forEach((reminder) => {
                const dueDate = new Date(reminder.due_at);
                const timeDiff = dueDate.getTime() - now.getTime();
                
                // Check if reminder is due (within 1 minute window)
                // Allow notifications from 1 minute before to 1 minute after due time
                if (
                    timeDiff <= 60000 &&
                    timeDiff >= -60000 &&
                    !notifiedRemindersRef.current.has(reminder.id)
                ) {
                    try {
                        new Notification(`Reminder: ${reminder.title}`, {
                            body: reminder.description || 'Your reminder is due!',
                            icon: '/favicon.ico',
                            tag: `reminder-${reminder.id}`, // Prevent duplicate notifications
                        });
                        notifiedRemindersRef.current.add(reminder.id);
                        console.log('Notification sent for reminder:', reminder.title);
                    } catch (error) {
                        console.error('Error showing notification:', error);
                    }
                }
            });
        }, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, [reminders, notificationPermission]);

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this reminder?')) {
            router.delete(`/reminders/${id}`);
        }
    };

    return (
        <Layout auth={auth}>
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-gray-900">Reminders</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Manage your reminders and get notified when they're due.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <Link
                            href="/reminders/create"
                            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add reminder
                        </Link>
                    </div>
                </div>

                {flash?.success && (
                    <div className="mt-4 rounded-md bg-green-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {notificationPermission !== 'granted' && (
                    <div className="mt-4 rounded-md bg-yellow-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-yellow-800">
                                    Notifications are not enabled. Please enable them to receive reminders.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {notificationPermission === 'granted' && (
                    <div className="mt-4 rounded-md bg-blue-50 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm font-medium text-blue-800">
                                    Notifications enabled. You'll be notified when reminders are due.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {reminders.length === 0 ? (
                    <div className="mt-8 text-center">
                        <p className="text-gray-500">No reminders yet. Create one to get started!</p>
                    </div>
                ) : (
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th
                                                    scope="col"
                                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                >
                                                    Title
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    Description
                                                </th>
                                                <th
                                                    scope="col"
                                                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                >
                                                    Due Date
                                                </th>
                                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                    <span className="sr-only">Actions</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {reminders.map((reminder) => {
                                                const dueDate = new Date(reminder.due_at);
                                                const now = new Date();
                                                const isOverdue = dueDate < now;
                                                const isDueSoon = dueDate.getTime() - now.getTime() <= 3600000; // 1 hour

                                                return (
                                                    <tr key={reminder.id} className={isOverdue ? 'bg-red-50' : ''}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                            {reminder.title}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            {reminder.description || '-'}
                                                        </td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <span
                                                                className={
                                                                    isOverdue
                                                                        ? 'text-red-600 font-semibold'
                                                                        : isDueSoon
                                                                        ? 'text-yellow-600 font-semibold'
                                                                        : ''
                                                                }
                                                            >
                                                                {new Date(reminder.due_at).toLocaleString()}
                                                            </span>
                                                        </td>
                                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                            <Link
                                                                href={`/reminders/${reminder.id}/edit`}
                                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDelete(reminder.id)}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}

