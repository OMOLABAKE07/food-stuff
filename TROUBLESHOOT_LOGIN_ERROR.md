# Troubleshooting 422 (Unprocessable Content) Error on Login

## Understanding the Error

The 422 error occurs when the server receives your request but cannot process it due to validation failures or business logic issues. In your case, this typically means:

1. Invalid email/password combination
2. Email format validation failed
3. Missing required fields
4. Database connectivity issues

## Common Causes and Solutions

### 1. Incorrect Credentials
- Make sure you're using the correct email and password
- Passwords are case-sensitive
- Check for extra spaces in email field

### 2. User Doesn't Exist
- Verify the user exists in the database
- Register a new user if needed

### 3. Database Connection Issues
- Check your database configuration in `.env` file
- Ensure MySQL service is running
- Verify database credentials

### 4. Validation Failures
- Email must be in valid format
- Password field is required

## Diagnostic Steps

### Step 1: Check Database Connection
Run the test script to verify database connectivity:
```bash
cd server
php test_login.php
```

### Step 2: Verify User Exists
Check if your user account exists in the database. The test script will list all users.

### Step 3: Test with Correct Credentials
Use the exact email from the database and the correct password.

### Step 4: Check Browser Console
Look at the Network tab in browser developer tools to see the exact error response:
- Request payload
- Response status and body
- Headers

## Debugging Tips

1. Enable Laravel debug mode by setting `APP_DEBUG=true` in your `.env` file
2. Check Laravel logs at `storage/logs/laravel.log` for detailed error information
3. Use browser developer tools to inspect the actual request/response

## If Still Having Issues

1. Clear your browser cache and cookies
2. Try registering a new user and logging in with those credentials
3. Check if there are any JavaScript errors in the console
4. Verify that your frontend is sending data in the correct format

## Backend Code Responsible for Error

In `app/Http/Controllers/AuthController.php`:
```php
public function login(Request $req)
{
    $credentials = $req->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    if (!Auth::attempt($credentials)) {
        return response()->json(['message' => 'Invalid credentials'], 422);
    }
    // ... rest of the code
}
```

The 422 error is returned when `Auth::attempt($credentials)` fails, which happens when:
- Email doesn't exist in database
- Password doesn't match the stored hash
- Validation rules aren't satisfied