<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    //
    protected $fillable = [
        'title',
        'content',
        'price',
        'stock_qty',
        'sku_number',
    ];
}
