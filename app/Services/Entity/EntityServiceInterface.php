<?php
namespace App\Services\Entity;

use App\Services\Base\BaseServiceInterface;

interface EntityServiceInterface extends BaseServiceInterface{
    public function createSuperEntity(array $data);
}
