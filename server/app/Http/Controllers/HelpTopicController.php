<?php

namespace App\Http\Controllers;

use App\Models\HelpTopic;
use Illuminate\Http\Request;

class HelpTopicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $topics = HelpTopic::with('category')->orderBy('sort_order')->get();
        return response()->json($topics);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:help_categories,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:help_topics',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'icon' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
            'is_featured' => 'boolean'
        ]);

        $topic = HelpTopic::create($validated);
        return response()->json($topic, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(HelpTopic $helpTopic)
    {
        $topic = HelpTopic::with('category', 'articles')->find($helpTopic->id);
        return response()->json($topic);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HelpTopic $helpTopic)
    {
        $validated = $request->validate([
            'category_id' => 'exists:help_categories,id',
            'title' => 'string|max:255',
            'slug' => 'string|unique:help_topics,slug,' . $helpTopic->id,
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'icon' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean',
            'is_featured' => 'boolean'
        ]);

        $helpTopic->update($validated);
        return response()->json($helpTopic);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HelpTopic $helpTopic)
    {
        $helpTopic->delete();
        return response()->json(null, 204);
    }
}