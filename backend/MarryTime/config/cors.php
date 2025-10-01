<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:4200'], // Angular app
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];