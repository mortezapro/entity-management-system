<?php

namespace App\Helpers;

use Illuminate\Support\Facades\File;

class DirectoryManager
{
    /**
     * Create the directory if it doesn't exist.
     *
     * @param string $path The directory path to create
     * @return bool Whether the directory was created successfully
     */
    public static function createDirectory(string $path) :bool
    {
        return File::makeDirectory($path, $mode = 0777, true, true);
    }

    /**
     * Check if the directory exists.
     *
     * @param string $path The directory path to check
     * @return bool Whether the directory exists
     */
    public static function directoryExists(string $path) :bool
    {
        return File::exists($path) && is_dir($path);
    }
}
