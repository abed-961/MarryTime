<?php

namespace App\DTO;
class Response
{
  

    public static function success($description, $httpCode = 200)
    {
        return self::to_json_response(true, $description, $httpCode);
    }
    public static function failure($description, $httpCode = 400)
    {
        return self::to_json_response(false, $description, $httpCode);
    }

    public static function to_json_response($status, $description, $httpCode)
    {
        return response()->json(['status' => $status, 'description' => $description, 'code' => $httpCode]);
    }
}