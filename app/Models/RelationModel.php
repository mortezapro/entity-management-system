<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RelationModel extends Model
{
    use HasFactory;
    protected $table = "relations";
    protected $primaryKey = "id";
    protected $fillable = [
        "primary_key","foreign_key","main_table_id","reference_table_id"
    ];
}
