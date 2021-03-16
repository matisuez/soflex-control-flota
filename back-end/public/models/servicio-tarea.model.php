<?php

    class ServicioTarea {
        public $table = 'ServicioTarea';
        public $fields = '
            setaId,
            setaServId,
            setaTareId,
            CONVERT(VARCHAR, setaFechaAlta, 126) setaFechaAlta,
            setaBorrado,
            tareNombre';
        public $join = 'LEFT OUTER JOIN Tarea ON setaTareId = tareId
                        LEFT OUTER JOIN Servicio ON setaServId = servId';

        public function get($db) {

            $sql = "SELECT $this->fields FROM $this->table
                    $this->join
                    WHERE setaBorrado = 0";
            
            $params = null;
            if(isset($_GET["setaServId"])){
                $params = [$_GET["setaServId"]];
                $sql = $sql . " AND setaServId = ? ";
            }

            $stmt = SQL::query($db, $sql, $params);
            $results = [];

            while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $results[] = $row;
            }

            return $results;

        }

        public function getId($db, $id) {
            $sql = "SELECT $this->fields FROM $this->table
                    $this->join
                    WHERE setaId = ? AND setaBorrado = 0";
            $stmt = SQL::query($db, $sql, [$id]);
            $result = [];
            while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
                $result[] = $row;
            }
            return $result;
        }

        public function post($db) {
            $sql = "INSERT INTO $this->table (
                        setaServId,
                        setaTareId,
                        setaFechaAlta,
                        setaBorrado
                    ) VALUES ( ?, ?, GETDATE(), 0);
                    SELECT @@IDENTITY setaId, CONVERT(VARCHAR, GETDATE(), 126) setaFechaAlta;";
            $stmt = SQL::query($db, $sql, [
                DATA["setaServId"],
                DATA["setaTareId"]
            ]);

            sqlsrv_fetch($stmt);
            sqlsrv_next_result($stmt);

            $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
            $results = DATA;
            $results["setaId"] = $row["setaId"];
            $results["setaFechaAlta"] = $row["setaFechaAlta"];
            $results["setaBorrado"] = 0;

            return $results;

        }

        public function put($db) {
            $sql = "UPDATE $this->table
                    SET setaServId = ?,
                        setaTareId = ?
                    WHERE setaId = ?";
            $stmt = SQL::query($db, $sql, [
                DATA["setaServId"],
                DATA["setaTareId"],
                DATA["setaId"]
            ]);

            sqlsrv_fetch($stmt);

            return DATA;

        }

        public function delete($db, $id) {
            $sql = "UPDATE $this->table
                    SET setaBorrado = 1
                    WHERE setaId = ?;
                ";
            $stmt = SQL::query($db, $sql, [$id]);
            sqlsrv_fetch($stmt);
            return [];
        }

    }

?>