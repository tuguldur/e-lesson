<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Lesson extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'created_by'
    ];
    public function owner()
    {
        return $this->hasOne(User::class,'id','created_by');
    }
}
