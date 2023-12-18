<?php

namespace App\Helpers\Traits;


class StubManipulator{
    public static function makeContent($stub , $stubVariables = [])
    {
        foreach ($stubVariables as $search => $replace)
        {
            $stub = str_replace('{{'.$search.'}}' , $replace, $stub);
            $stub = str_replace('{{ '.$search.' }}' , $replace, $stub);
        }
        return $stub;
    }
}
