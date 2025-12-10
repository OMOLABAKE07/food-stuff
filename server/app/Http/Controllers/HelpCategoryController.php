<?php

namespace App\Http\Controllers;

use App\Models\HelpCategory;
use Illuminate\Http\Request;

class HelpCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = HelpCategory::orderBy('sort_order')->get();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:help_categories',
            'description' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $category = HelpCategory::create($validated);
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(HelpCategory $helpCategory)
    {
        return response()->json($helpCategory);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, HelpCategory $helpCategory)
    {
        $validated = $request->validate([
            'name' => 'string|max:255',
            'slug' => 'string|unique:help_categories,slug,' . $helpCategory->id,
            'description' => 'nullable|string',
            'sort_order' => 'integer',
            'is_active' => 'boolean'
        ]);

        $helpCategory->update($validated);
        return response()->json($helpCategory);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HelpCategory $helpCategory)
    {
        $helpCategory->delete();
        return response()->json(null, 204);
    }
}