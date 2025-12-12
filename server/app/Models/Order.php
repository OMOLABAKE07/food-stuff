<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id','subtotal','tax','shipping','total','status','payment_status','delivery_address'
    ];

    protected $casts = [
        'delivery_address' => 'array'
    ];

    public function items()
    { 
        return $this->hasMany(OrderItem::class); 
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}