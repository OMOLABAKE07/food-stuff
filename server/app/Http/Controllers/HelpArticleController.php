<?php

namespace App\Http\Controllers;

use App\Models\HelpArticle;
use Illuminate\Http\Request;

class HelpArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $articles = HelpArticle::with('topic')->orderBy('sort_order')->get();
        return response()->json($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'topic_id' => 'required|exists:help_topics,id',
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:help_articles',
            'content' => 'required|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $article = HelpArticle::create($validated);
        return response()->json($article, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(HelpArticle $helpArticle)
    {
        $article = HelpArticle::with('topic')->find($helpArticle->id);
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HelpArticle $helpArticle)
    {
        $validated = $request->validate([
            'topic_id' => 'exists:help_topics,id',
            'title' => 'string|max:255',
            'slug' => 'string|unique:help_articles,slug,' . $helpArticle->id,
            'content' => 'string',
            'sort_order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $helpArticle->update($validated);
        return response()->json($helpArticle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HelpArticle $helpArticle)
    {
        $helpArticle->delete();
        return response()->json(null, 204);
    }
}