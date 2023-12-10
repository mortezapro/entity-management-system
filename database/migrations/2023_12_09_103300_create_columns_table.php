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
        Schema::create('columns', function (Blueprint $table) {
            $table->id();
            $table->string("name",191);
            $table->string("type",191);
            $table->boolean("nullable")->default(0);
            $table->string("index",191)->comment("primary,unique,index,fulltext,spatial")->nullable();
            $table->boolean("auto_increment")->default(0);
            $table->string("attribute",191)->default("binary,unsigned zerofill,unsigned,on update current_timestamp")->nullable();
            $table->string("collation",191)->default("utf8_general_ci");
            $table->string("default")->nullable();
            $table->string("length")->nullable();
            $table->unsignedBigInteger("entity_id");

            $table->foreign("entity_id")->references("id")->on("entities");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('columns');
    }
};
