<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $req)
    {
        $data = $req->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6|confirmed', // automatically checks password_confirmation
        ]);

        // Check if this is the first user (make them admin)
        $userCount = User::count();
        $isAdmin = $userCount === 0;
        
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'role' => $isAdmin ? 'admin' : 'customer',
            'password' => Hash::make($data['password'])
        ]);

        // Create a Sanctum token for the user
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function login(Request $req)
    {
        $credentials = $req->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 422);
        }

        // Create a Sanctum token for the user
        $user = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;

        if ($req->hasSession()) {
            $req->session()->regenerate();
        }
        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out'
        ]);
    }

    /**
     * Update the authenticated user's profile
     */
    public function updateProfile(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip' => 'nullable|string|max:20'
        ]);

        $user->update($validated);

        return response()->json(['user' => $user, 'message' => 'Profile updated successfully']);
    }
}
