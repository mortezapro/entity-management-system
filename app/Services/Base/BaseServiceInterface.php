<?php
namespace App\Services\Base;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface BaseServiceInterface{
    public function store(array $data) :Model;
    public function update(array $data, int $id) :bool;
    public function paginate(int $perPage,array $conditions = null):LengthAwarePaginator;
    public function destroy(Model $model) :bool;
    public function show(array $conditions) :?Model;
    public function count(array $conditions) :int;
    public function find(int $id) :?Model;
    public function truncate():mixed;
}
