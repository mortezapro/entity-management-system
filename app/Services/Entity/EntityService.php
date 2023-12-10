<?php
namespace App\Services\Entity;
use App\Models\EntityModel;
use App\Services\Base\BaseService;
use Illuminate\Support\Facades\Artisan;

class EntityService extends BaseService implements EntityServiceInterface{
    public function __construct(protected EntityModel $model){}

    public function createSuperEntity(array $data)
    {
        $entity = $this->store($data);
        $entity->columns()->createMany($data["columns"]);
        $entity->relations()->createMany($data["relations"]);

//        Artisan::call("make:full_request");
//        Artisan::call("make:full_controller");
//        Artisan::call("make:full_model");
//        Artisan::call("make:full_service");

    }
}
