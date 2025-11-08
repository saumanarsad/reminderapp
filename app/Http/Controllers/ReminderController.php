<?php

namespace App\Http\Controllers;

use App\Models\Reminder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReminderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reminders = Reminder::where('user_id', Auth::id())
            ->orderBy('due_at', 'asc')
            ->get()
            ->map(function ($reminder) {
                return [
                    'id' => $reminder->id,
                    'title' => $reminder->title,
                    'description' => $reminder->description,
                    'due_at' => $reminder->due_at->toIso8601String(),
                    'formatted_due' => $reminder->formatted_due,
                ];
            });

        return Inertia::render('Reminders/Index', [
            'reminders' => $reminders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Reminders/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_at' => 'required|date|after:now',
        ]);

        $reminder = Reminder::create([
            'user_id' => Auth::id(),
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'due_at' => $validated['due_at'],
        ]);

        return redirect()->route('reminders.index')
            ->with('success', 'Reminder created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reminder = Reminder::where('user_id', Auth::id())->findOrFail($id);

        return Inertia::render('Reminders/Edit', [
            'reminder' => [
                'id' => $reminder->id,
                'title' => $reminder->title,
                'description' => $reminder->description,
                'due_at' => $reminder->due_at->format('Y-m-d\TH:i'),
            ],
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $reminder = Reminder::where('user_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_at' => 'required|date|after:now',
        ]);

        $reminder->update([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'due_at' => $validated['due_at'],
        ]);

        return redirect()->route('reminders.index')
            ->with('success', 'Reminder updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reminder = Reminder::where('user_id', Auth::id())->findOrFail($id);
        $reminder->delete();

        return redirect()->route('reminders.index')
            ->with('success', 'Reminder deleted successfully.');
    }
}
