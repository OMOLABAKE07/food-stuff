<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\HelpCategory;
use App\Models\HelpTopic;
use App\Models\HelpArticle;

class HelpController extends Controller
{
    /**
     * Get help menu items
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMenu()
    {
        $topics = HelpTopic::where('is_active', true)
            ->orderBy('sort_order')
            ->get(['title', 'slug'])
            ->toArray();

        $menuItems = [];
        foreach ($topics as $index => $topic) {
            $menuItems[] = [
                'label' => $topic['title'],
                'path' => '/help/' . $topic['slug']
            ];
            
            // Add divider after the 5th item (before Live Chat)
            if ($index == 4) {
                $menuItems[] = ['isDivider' => true];
            }
        }
        
        // Add Live Chat item
        $menuItems[] = [
            'label' => 'Live Chat',
            'path' => '/live-chat'
        ];

        return response()->json($menuItems);
    }

    /**
     * Get help topic content
     *
     * @param string $topicSlug
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTopic($topicSlug)
    {
        $topic = HelpTopic::where('slug', $topicSlug)
            ->where('is_active', true)
            ->first();

        if (!$topic) {
            return response()->json(['message' => 'Topic not found'], 404);
        }

        // Get articles for this topic
        $articles = HelpArticle::where('topic_id', $topic->id)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();

        return response()->json([
            'title' => $topic->title,
            'description' => $topic->description,
            'content' => $topic->content,
            'articles' => $articles
        ]);
    }

    /**
     * Get all help topics
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getAllTopics()
    {
        $topics = HelpTopic::where('is_active', true)
            ->with('category')
            ->orderBy('sort_order')
            ->get();

        $formattedTopics = [];
        foreach ($topics as $topic) {
            $formattedTopics[$topic->slug] = [
                'title' => $topic->title,
                'description' => $topic->description,
                'path' => '/help/' . $topic->slug,
                'action' => 'View guide',
                'category' => $topic->category ? $topic->category->name : null
            ];
        }

        return response()->json($formattedTopics);
    }
    
    /**
     * Get help categories with topics
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCategoriesWithTopics()
    {
        $categories = HelpCategory::where('is_active', true)
            ->with(['topics' => function($query) {
                $query->where('is_active', true)->orderBy('sort_order');
            }])
            ->orderBy('sort_order')
            ->get();

        return response()->json($categories);
    }
}