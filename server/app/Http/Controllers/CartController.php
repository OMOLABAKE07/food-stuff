<?php

namespace App\Http\Controllers;

use App\Models\Cart;

use Illuminate\Http\Request;

class CartController extends Controller
{
    public function createCart(Request $request)
    {
        // dd($request->all());
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $items = $request->items;

        foreach ($items as $item) {
            Cart::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'product_id' => $item['product_id'],
                ],
                [
                    'quantity' => $item['quantity'],
                ]
            );
        }
        return response()->json([
            'message' => 'Guest cart merged successfully!',
            'cart_items_count' => Cart::where('user_id', $user->id)->sum('quantity')
        ]);
    }
}
