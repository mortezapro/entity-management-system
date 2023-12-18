<?php
namespace App\Helpers;


class Entity{
    protected mixed $files;

    public static function pascalCase(string $name):string
    {
        return ucwords(strtolower($name));
    }
}
