<?php
include_once "models/grupo.php";


$app->get('/grupo', function ($request, $response, $args) {
    //$token = G::Autenticar($request, "ADMIN_VER");

    $db = SQL::connect();
    $model = new Grupo();

    $results = $model->get($db);
    SQL::close($db);

    $payload = json_encode($results);

    $response->getBody()->write($payload);
    return $response
              ->withHeader('Content-Type', 'application/json');
    });


$app->delete('/grupo/{id}', function ($request, $response, $args) {

    $id = $args['id'];

    $db = SQL::connect();
    $model = new Grupo();

    $results = $model->delete($db, $id);
    SQL::close($db);

    $payload = json_encode($results);

    $response->getBody()->write($payload);
    return $response
              ->withHeader('Content-Type', 'application/json');
    });

$app->put('/grupo', function ($request, $response, $args) {
        //$token = G::Autenticar($request, "ADMIN_MODIFICAR");
    
        $db = SQL::connect();
        $model = new Grupo();
    
        $results = $model->put($db);

        SQL::close($db);

        $payload = json_encode($results);
    
        $response->getBody()->write($payload);
        return $response
                  ->withHeader('Content-Type', 'application/json');
});

$app->post('/grupo', function ($request, $response, $args) {
    //$token = G::Autenticar($request, "ADMIN_MODIFICAR");

    $db = SQL::connect();
    $model = new Grupo();

    $results = $model->post($db);

    SQL::close($db);

    $payload = json_encode($results);

    $response->getBody()->write($payload);
    return $response
              ->withHeader('Content-Type', 'application/json');
});

?>