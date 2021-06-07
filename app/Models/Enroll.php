<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
class Enroll extends Model
{
    use HasFactory;
    protected $fillable = [
        'lesson_id',
        'user_id',
    ];
    public function student()
    {
        return $this->hasOne(User::class,'id','user_id');
    }
}
