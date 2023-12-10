<?php

namespace App\Http\Controllers;

use App\Http\Requests\EntityRequest;
use App\Models\EntityModel;
use App\Services\Entity\EntityServiceInterface;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;

class EntityController extends Controller
{
    public EntityServiceInterface $entityService;

    public function __construct()
    {
        $this->entityService = App::make(EntityServiceInterface::class);
    }
    public function create()
    {
        return Inertia::render('Entity/Create');
    }

    public function store(EntityRequest $request)
    {
        $this->entityService->createSuperEntity($request->all());

    }
}
