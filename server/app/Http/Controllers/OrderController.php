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

        // Create the order
        $order = Order::create([
            'user_id' => Auth::id(),
            'subtotal' => $validated['total_amount'] - 1000, // Assuming 1000 is shipping fee
            'shipping' => 1000,
            'total' => $validated['total_amount'],
            'status' => 'pending',
            'payment_status' => 'unpaid',
            'delivery_address' => $validated['shipping_address']
        ]);

        // Create order items
        foreach ($validated['items'] as $item) {
            $product = Product::find($item['product_id']);
            
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $item['product_id'],
                'qty' => $item['quantity'],
                'price' => $product->price,
                'total' => $product->price * $item['quantity']
            ]);
        }

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