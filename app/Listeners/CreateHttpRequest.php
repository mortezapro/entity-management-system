<?php
namespace App\Listeners;
use App\Helpers\DirectoryManager;
use App\Helpers\Entity;
use App\Helpers\Traits\StubManipulator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Filesystem\Filesystem;

class CreateHttpRequest
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
        $directoryPath = base_path('App\\Http\\Requests') .'\\' .$entityPascalName;
        if(!DirectoryManager::directoryExists($directoryPath)){
            DirectoryManager::createDirectory($directoryPath);
        }
        $this->makeRequest("Store".$entityPascalName."Request",$entityPascalName,$columns);
        $this->makeRequest("Update".$entityPascalName."Request",$entityPascalName,$columns);
    }

    public function makeRequest(string $className,string $entityName,Collection $columns)
    {
        $content = $this->files->get($this->getRequestStub());
        $rules = $this->MakeRules($columns);
        $variables = $this->makeVariables($className,$entityName,$rules);
        $content = StubManipulator::makeContent($content,$variables);

        $path = $this->getRequestPath($entityName,$className.".php");
        if (!$this->files->exists($path)) {
            $this->files->put($path, $content);
        }
    }

    public function makeRules(Collection $columns) :string
    {
        $rules= "";
        $rule = "'"."required";
        foreach ($columns as $column) {
            if(in_array($column->type,["VARCHAR","TEXT","LONGTEXT"])){
                $rule .= "|string";
            } elseif(in_array($column->type,["INT","TINYINT","SMALLINT","MEDIUMINT,BIGINT"])){
                $rule .= "|numeric";
            }
            $rules.= "'".$column->name."'=>".$rule."'".",\n            ";
            $rule = "'"."required";
        }
        return $rules;
    }

    public function makeVariables(string $className, string $name,string $rules) :array
    {
        return [
            'namespace' => 'App\\Http\\Requests\\'.$name,
            'class' => $className,
            'rules' => $rules,
        ];
    }

    public function getRequestStub()
    {
        return base_path(). '/stubs/request.entity.stub';
    }

    public static function getRequestVariables(string $name): array
    {
        return [
            'namespace' => 'App\\Http\\Requests\\'.$name,
            'name' => $name,
        ];
    }

    public function getRequestPath(string $entityName,$fileName): string
    {
        return base_path('App\\Http\\Requests\\') .$entityName.'\\'. $fileName;
    }
}
