<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ChatMessage;
use App\Models\User;

class ChatController extends Controller
{
    /**
     * Get chat history for the authenticated user
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getMessages()
    {
        $user = Auth::user();
        
        $messages = ChatMessage::where('user_id', $user->id)
            ->orWhere('is_system_message', true)
            ->orderBy('created_at', 'asc')
            ->get();
        
        return response()->json($messages);
    }
    
    /**
     * Send a new message
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendMessage(Request $request)
    {
        $validatedData = $request->validate([
            'message' => 'required|string|max:1000'
        ]);
        
        $user = Auth::user();
        
        $message = ChatMessage::create([
            'user_id' => $user->id,
            'message' => $validatedData['message'],
            'sender_type' => 'user',
            'is_read' => false
        ]);
        
        // Simulate auto-response from support agent
        $this->sendAutoResponse($user, $message);
        
        return response()->json($message, 201);
    }
    
    /**
     * Send an automatic response from the support agent
     *
     * @param User $user
     * @param ChatMessage $userMessage
     * @return void
     */
    private function sendAutoResponse($user, $userMessage)
    {
        $responseText = $this->generateAutoResponse($userMessage->message);
        
        ChatMessage::create([
            'user_id' => $user->id,
            'message' => $responseText,
            'sender_type' => 'agent',
            'is_read' => false
        ]);
    }
    
    /**
     * Generate an automatic response based on user message
     *
     * @param string $message
     * @return string
     */
    private function generateAutoResponse($message)
    {
        $message = strtolower($message);
        
        if (strpos($message, 'order') !== false) {
            return "I can help you with your order. Could you please provide your order number so I can look up the details for you?";
        } elseif (strpos($message, 'return') !== false) {
            return "For returns, you'll need your order number and the reason for the return. Would you like me to guide you through the return process?";
        } elseif (strpos($message, 'payment') !== false) {
            return "I can assist with payment issues. Could you tell me more about the problem you're experiencing with your payment?";
        } elseif (strpos($message, 'refund') !== false) {
            return "Refunds typically process within 3-7 business days after approval. Do you have a specific question about your refund?";
        } elseif (strpos($message, 'shipping') !== false || strpos($message, 'delivery') !== false) {
            return "Shipping usually takes 1-3 business days for standard delivery. Do you have a specific question about your shipment?";
        } elseif (strpos($message, 'hello') !== false || strpos($message, 'hi') !== false) {
            return "Hello! Welcome to FoodStuff customer support. How can I assist you today?";
        } else {
            return "Thanks for reaching out! One of our support agents will respond to you shortly. In the meantime, you can check our Help Center for answers to common questions.";
        }
    }
    
    /**
     * Mark messages as read
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function markAsRead(Request $request)
    {
        $user = Auth::user();
        
        ChatMessage::where('user_id', $user->id)
            ->where('is_read', false)
            ->update(['is_read' => true]);
        
        return response()->json(['message' => 'Messages marked as read']);
    }
}