<?php
namespace App\Services\Base;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

abstract class BaseService implements BaseServiceInterface{

    public function store(array $data) :Model
    {
        return $this->model->create($data);
    }

    public function update(array $data, int $id) :bool
    {
        return $this->model->where("id",$id)->update($data);
    }

    public function prepareData(array $conditions) :mixed
    {
        return $this->model->where($conditions);
    }

    public function paginate(int $perPage,array $conditions = null):LengthAwarePaginator
    {
        return $this->prepareData($conditions)->paginate($perPage);
    }

    public function destroy(Model $model):bool
    {
        return $model->delete();
    }

    public function show(array $conditions) :?Model
    {
        return $this->prepareData($conditions)->first();
    }

    public function count(array $conditions) :int
    {
        return $this->model->where($conditions)->count();
    }

    public function find(int $id) :?Model
    {
        return $this->model->find($id);
    }

    public function truncate():mixed
    {
        return $this->model->truncate();
    }

}
