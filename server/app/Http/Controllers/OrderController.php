<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use App\Notifications\OrderConfirmation;
use App\Notifications\NewOrderAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::where('user_id', Auth::id())
            ->with('items.product')
            ->latest()
            ->get();
            
        return response()->json($orders);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Not used for API
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'shipping_address' => 'required|array',
            'total_amount' => 'required|integer|min:1'
        ]);

        // Calculate order totals
        $subtotal = 0;
        $itemsData = [];
        
        foreach ($validated['items'] as $item) {
            $product = Product::find($item['product_id']);
            $itemTotal = $product->price * $item['quantity'];
            $subtotal += $itemTotal;
            
            $itemsData[] = [
                'product_id' => $item['product_id'],
                'qty' => $item['quantity'],
                'price' => $product->price,
                'total' => $itemTotal
            ];
        }
        
        // Calculate tax (7.5%) and shipping fee
        $tax = round($subtotal * 0.075);
        $shipping = 1000;
        $calculatedTotal = $subtotal + $tax + $shipping;
        
        // Verify that the frontend total matches our calculation
        if ($validated['total_amount'] != $calculatedTotal) {
            return response()->json([
                'message' => 'Order total mismatch',
                'expected' => $calculatedTotal,
                'received' => $validated['total_amount']
            ], 422);
        }

        // Create the order
        $order = Order::create([
            'user_id' => Auth::id(),
            'subtotal' => $subtotal,
            'tax' => $tax,
            'shipping' => $shipping,
            'total' => $calculatedTotal,
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'delivery_address' => $validated['shipping_address']
        ]);

        // Create order items
        foreach ($itemsData as $itemData) {
            OrderItem::create(array_merge(['order_id' => $order->id], $itemData));
        }

        // Update user profile with shipping address information
        $user = Auth::user();
        $shippingAddress = $validated['shipping_address'];
        
        $user->update([
            'phone' => $shippingAddress['phone'] ?? $user->phone,
            'address' => $shippingAddress['address'] ?? $user->address,
            'city' => $shippingAddress['city'] ?? $user->city,
            'state' => $shippingAddress['state'] ?? $user->state,
            'zip' => $shippingAddress['zip'] ?? $user->zip
        ]);

        // Load relationships for response and notifications
        $order->load('items.product', 'user');

        // Send notifications
        $order->user->notify(new OrderConfirmation($order));
        
        // Notify admin (assuming first user is admin for simplicity)
        $admin = User::first();
        if ($admin) {
            $admin->notify(new NewOrderAdmin($order));
        }

        return response()->json(['order' => $order], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $order->load('items.product');
        return response()->json($order);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        // Not used for API
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        // Not typically used for orders
        return response()->json(['message' => 'Method not allowed'], 405);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        if ($order->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        
        $order->delete();
        return response()->json(['message' => 'Order deleted']);
    }
    
    /**
     * Get user's orders
     */
    public function userOrders()
    {
        $orders = Order::where('user_id', Auth::id())
            ->with('items.product')
            ->latest()
            ->get();
            
        return response()->json($orders);
    }
}