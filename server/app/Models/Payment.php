<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $fillable = [
        'order_id', 'reference', 'status', 'type', 'amount', 'metadata'
    ];

    protected $casts = [
        'amount' => 'integer',
        'metadata' => 'array'
    ];

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}