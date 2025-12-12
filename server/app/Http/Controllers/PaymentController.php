<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    /**
     * Initialize a payment for an order
     */
    public function initialize(Request $request)
    {
        $validated = $request->validate([
            'order_id' => 'required|exists:orders,id'
        ]);

        $order = Order::findOrFail($validated['order_id']);

        // Check if user owns the order
        if ($order->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Generate unique reference
        $reference = 'txn_' . Str::random(10) . '_' . time();

        // Create payment record
        $payment = Payment::create([
            'order_id' => $order->id,
            'reference' => $reference,
            'amount' => $order->total,
            'status' => 'pending'
        ]);

        // Prepare data for Paystack
        // Convert Naira to Kobo (1 Naira = 100 Kobo)
        $data = [
            "amount" => $order->total * 100,  // Convert to kobo for Paystack
            "reference" => $reference,
            "email" => Auth::user()->email,
            "currency" => "NGN",
            "callback_url" => url('/payment/callback'),
            "metadata" => [
                "order_id" => $order->id,
                "user_id" => Auth::id()
            ]
        ];

        return response()->json([
            'payment' => $payment,
            'paystack_data' => $data
        ]);
    }

    /**
     * Handle Paystack callback
     */
    public function callback(Request $request)
    {
        // Verify transaction with Paystack
        $reference = $request->reference;
        
        // In a real implementation, you would verify with Paystack API
        // For now, we'll simulate a successful payment
        
        $payment = Payment::where('reference', $reference)->first();
        
        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        // Update payment and order status
        $payment->update(['status' => 'successful']);
        $payment->order->update([
            'payment_status' => 'paid',
            'status' => 'processing'
        ]);

        return response()->json([
            'message' => 'Payment successful',
            'payment' => $payment
        ]);
    }

    /**
     * Verify payment status
     */
    public function verify($reference)
    {
        $payment = Payment::where('reference', $reference)->first();
        
        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        return response()->json([
            'payment' => $payment,
            'order' => $payment->order
        ]);
    }
}