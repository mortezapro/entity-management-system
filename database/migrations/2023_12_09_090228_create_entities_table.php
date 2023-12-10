<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('entities', function (Blueprint $table) {
            $table->id();
            $table->string("name",191);
            $table->string("storage_engine",191)->default("InnoDB");
            $table->string("collation",191)->default("utf8_general_ci");
            $table->longText("table_comments")->nullable();
            $table->boolean("has_controller")->default(1);
            $table->boolean("has_model")->default(1);
            $table->boolean("has_view")->default(1);
            $table->boolean("has_request")->default(1);
            $table->boolean("has_resource")->default(1);
            $table->boolean("has_service")->default(1);
            $table->boolean("has_routes")->default(1);
            $table->boolean("enable_caching")->default(1);
            $table->boolean("enable_soft_delete")->default(0);
            $table->boolean("enable_activity_log")->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entities');
    }
};
