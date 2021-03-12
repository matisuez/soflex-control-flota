<?php 

    include_once "models/servicioTarea.model.php";

    $app->get('/servicio-tarea', function($request, $response, $args) {
        
        $db = SQL::connect();
        $model = new ServicioTarea();
        $results = $model->get($db);
        SQL::close($db);

        $payload = json_encode($results);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    }); 

    $app->get('/servicio-tarea/{id}', function ($request, $response, $args) {
        
        $id = $args['id'];
        $db = SQL::connect();
        $model = new ServicioTarea();
        $result = $model->getId($db, $id);
        SQL::close($db);

        $payload = json_encode($result);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

    $app->post('/servicio-tarea', function ($request, $response, $args) {
        $db = SQL::connect();
        $model = new ServicioTarea();
        $result = $model->post($db);
        SQL::close($db);

        $payload = json_encode($result);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

    $app->put('/servicio-tarea', function ($request, $response, $args) {
        $db = SQL::connect();
        $model = new ServicioTarea();
        $result = $model->put($db);
        SQL::close($db);

        $payload = json_encode($result);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

    $app->delete('/servicio-tarea/{id}', function ($request, $response, $args) {
        $id = $args['id'];
        $db = SQL::connect();
        $model = new ServicioTarea();
        $result = $model->delete($db, $id);
        SQL::close($db);

        $payload = json_encode($result);
        $response->getBody()->write($payload);

        return $response->withHeader('Content-Type', 'application/json');

    });

?>