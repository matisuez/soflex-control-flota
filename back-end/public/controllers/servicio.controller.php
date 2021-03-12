<?php 

    include_once "models/servicio.model.php";

    $app->get('/servicio', function($request, $response, $args) {

        $db = SQL::connect();
        $model = new Servicio();

        $results = $model->get($db);
        SQL::close($db);

        $payload = json_encode($results);

        $response->getBody()->write($payload);
        
        return $response->withHeader('Content-Type', 'application/json');

    });

    $app->get('/servicio/{id}', function($request, $response, $args) {
        
        $id = $args['id'];
        $db = SQL::connect();
        $model = new Servicio();
        $result = $model->getId($db, $id);
        
        SQL::close($db);

        $payload = json_encode($result);

        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

    $app->delete('/servicio/{id}', function($request, $response, $args){
        $id = $args['id'];
        $db = SQL::connect();
        $model = new Servicio();

        $result = $model->delete($db, $id);
        SQL::close($db);

        $payload = json_encode($result);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

    $app->put('/servicio', function($request, $response, $args){
        $db = SQL::connect();
        $model = new Servicio();
        $result = $model->put($db);
        SQL::close($db);
        $payload = json_encode($result);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });

    $app->post('/servicio', function($request, $response, $args) {
        $db = SQL::connect();
        $model = new Servicio();
        $result = $model->post($db);
        SQL::close($db);
        $payload = json_encode($result);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    });

?>