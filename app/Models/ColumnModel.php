<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ColumnModel extends Model
{
    use HasFactory;
    protected $table = "columns";
    protected $primaryKey = "id";
    protected $fillable = [
        "name","type","collation","nullable","index","auto_increment","attribute", "default", "length","entity_id"
    ];

    public function entity()
    {
        return $this->belongsTo(EntityModel::class,"entity_id");
    }
}
