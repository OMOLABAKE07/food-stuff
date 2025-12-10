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

    $user = User::create([
        'name' => $data['name'],
        'email' => $data['email'],
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

    public function logout(Request $req)
    {
        // Revoke all tokens for the user
        Auth::user()->tokens()->delete();
        
        Auth::logout();
        
        if ($req->hasSession()) {
            $req->session()->invalidate();
            $req->session()->regenerateToken();
        }
        
        return response()->json(['message' => 'Logged out']);
    }
}