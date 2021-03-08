<?php

    class Tarea {
        public $table = 'Tarea';
        public $fields = '
                        tareId,
                        tareNombre,
                        tareDescripcion,
                        tareUnidadMedida,
                        tareCantidad,
                        tareCosto,
                        CONVERT(VARCHAR, tareFechaAlta, 126) tareFechaAlta,
                        tareBorrado';
        public $join = "";

        public function get($db) {
            $sql = "SELECT $this->fields FROM $this->table
                    $this->join
                    WHERE tareBorrado = 0";
            $stmt = SQL::query($db, $sql, null);
            $result = [];

            while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $result[] = $row;
            }

            return $result;
            
        }

        public function post($db) {
            
            $sql = "INSERT INTO $this->table (
                    tareNombre,
                    tareDescripcion,
                    tareUnidadMedida,
                    tareCantidad,
                    tareCosto,
                    tareFechaAlta,
                    tareBorrado
                ) VALUES (?, ?, ?, ?, ?, GETDATE(), 0);
            
                SELECT @@IDENTITY tareId, CONVERT(VARCHAR, GETDATE(), 126) tareFechaAlta;
            ";
            
            $stmt = SQL::query($db, $sql, [
                DATA["tareNombre"],
                DATA["tareDescripcion"],
                DATA["tareUnidadMedida"],
                DATA["tareCantidad"],
                DATA["tareCosto"]
            ]);

            sqlsrv_fetch($stmt); // Execute the insert
            sqlsrv_next_result($stmt); // Select the second result
            $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

            $results = DATA;
            $results["tareId"] = $row["tareId"];
            $results["tareFechaAlta"] = $row["tareFechaAlta"];
            $results["tareBorrado"] = 0;

            return $results;

        }

        public function put($db) {
            
            $sql = "UPDATE $this->table
                SET tareNombre = ?,
                    tareDescripcion = ?,
                    tareUnidadMedida = ?,
                    tareCantidad = ?,
                    tareCosto = ?
                WHERE tareId = ?;
            ";

            $stmt = SQL::query($db, $sql, [
                DATA["tareNombre"],
                DATA["tareDescripcion"],
                DATA["tareUnidadMedida"],
                DATA["tareCantidad"],
                DATA["tareCosto"],
                DATA["tareId"]
            ]);

            sqlsrv_fetch($stmt);

            return DATA;

        }

        public function delete($db, $id) {
            
            $sql = "UPDATE $this->table
                SET tareBorrado = 1 - tareBorrado
                WHERE tareId = ?;
            ";

            $stmt = SQL::query($db, $sql, [
                $id
            ]);

            sqlsrv_fetch($stmt);

            return [];

        }

    }

?>