<?php 

    include_once "models/grupo-servicio.model.php";

    $app->get('/grupo-servicio', function($request, $response, $args) {

        $db = SQL::connect();
        $model = new GrupoServicio();
        $results = $model->get($db);
        SQL::close($db);

        $payload = json_encode($results);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

    $app->get('/grupo-servicio/{id}', function($request, $response, $args) {
        
        $id = $args['id'];
        $db = SQL::connect();
        $model = new GrupoServicio();
        $result = $model->getId($db, $id);
        SQL::close($db);

        $payload = json_encode($result);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

    $app->post('/grupo-servicio', function($request, $response, $args) {

        $db = SQL::connect();
        $model = new GrupoServicio();
        $result = $model->post($db);
        SQL::close($db);

        $payload = json_encode($result);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

    $app->put('/grupo-servicio', function ($request, $response, $args) {

        $db = SQL::connect();
        $model = new GrupoServicio();
        $result = $model->put($db);
        SQL::close($db);

        $payload = json_encode($result);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

    $app->delete('/grupo-servicio/{id}', function ($request, $response, $args) {

        $id = $args['id'];
        $db = SQL::connect();
        $model = new GrupoServicio();
        $result = $model->delete($db, $id);
        SQL::close($db);

        $payload = json_encode($result);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

?>