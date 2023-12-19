<?php

namespace App\Listeners;

use App\Helpers\DirectoryManager;
use App\Helpers\Entity;
use App\Helpers\Traits\StubManipulator;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Pluralizer;

class CreateModel
{
    protected Filesystem $files;
    public function __construct()
    {
        $this->files = new Filesystem();
    }


    public function handle(object $event): void
    {
        $entityPascalName = Entity::pascalCase($event->entity->name);
        $columns = $event->entity->columns;
        $this->makeModel($entityPascalName,$columns);
    }

    public function makeModel(string $entityName,Collection $columns)
    {
        $fillable = $this->makeFillable($columns);
        $variables = $this->makeVariables($entityName,$fillable);
        $content = $this->files->get($this->getModelStub());
        $content = StubManipulator::makeContent($content,$variables);
        $path = $this->getModelPath($entityName);
        if (!$this->files->exists($path)) {
            $this->files->put($path, $content);
        }
    }

    public function makeFillable(Collection $columns) :string
    {
        return $columns->transform(function ($column) {
            return '"' . $column['name'] . '"';
        })->implode(',');
    }
    public function makeVariables(string $entityName,string $fillable) :array
    {
        return [
            'namespace' => 'App\\Models',
            'class' => $this->getSingularName($entityName)."Model",
            'fillable' => $fillable,
            'table' => strtolower($entityName),
            'primary_key' => "id",
        ];
    }

    public function getModelStub() :string
    {
        return base_path(). '/stubs/model.entity.stub';
    }
    public function getModelPath(string $entityName): string
    {
        return base_path('App\\Models\\') .$this->getSingularName($entityName)."Model.php";
    }
    public function getSingularName(string $name):string
    {
        return ucwords(Pluralizer::singular($name));
    }
}
