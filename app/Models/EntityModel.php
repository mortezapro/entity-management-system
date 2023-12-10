<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EntityModel extends Model
{
    use HasFactory;
    protected $table = "entities";
    protected $primaryKey = "id";
    protected $fillable = [
        "name","storage_engine","collation","table_comments","has_controller","has_model","has_view", "has_request",
        "has_resource","has_service","has_routes","enable_caching","enable_soft_delete","enable_activity_log"
    ];

    public function columns()
    {
        return $this->hasMany(ColumnModel::class,"entity_id");
    }
    public function relations()
    {
        return $this->hasMany(RelationModel::class,"main_table_id");
    }
}
