<?php 

    class Servicio {
        public $table = 'Servicio';
        public $fields = '
            servId,
            servNombre,
            servDescripcion,
            servPeriodo,
            servKM,
            servFecha,
            CONVERT(VARCHAR, servFechaAlta, 126) servFechaAlta,
            servBorrado
        ';
        public $join = '';

        public function get($db) {
            $sql = "SELECT $this->fields FROM $this->table
                    WHERE servBorrado = 0";
            $params = null;
            $stmt = SQL::query($db, $sql, $params);
            $result = [];
            while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $results[] = $row;
            };
            return $results;
        }

        public function getId($db, $id) {
            $sql = "SELECT $this->fields FROM $this->table
                    $this->join
                    WHERE servId = ? AND servBorrado = 0;
                ";
            $stmt = SQL::query($db, $sql, [$id]);
            $result = [];
            while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
                $result[] = $row;
            }
            return $result;
        }

        public function post($db) {
            $sql = "INSERT INTO $this->table (
                        servNombre,
                        servDescripcion,
                        servPeriodo,
                        servKM,
                        servFecha,
                        servFechaAlta,
                        servBorrado
                    ) VALUES (?, ?, ?, ?, ?, GETDATE(), 0);
                    SELECT @@IDENTITY servId, CONVERT(VARCHAR, GETDATE(), 126) servFechaAlta;
                ";
            $stmt = SQL::query($db, $sql, [
                DATA["servNombre"],
                DATA["servDescripcion"],
                DATA["servPeriodo"],
                DATA["servKM"],
                DATA["servFecha"]
            ]);

            sqlsrv_fetch($stmt);
            sqlsrv_next_result($stmt);
            $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

            $results = DATA;
            $results["servId"] = $row["servId"];
            $results["servFechaAlta"] = $row["servFechaAlta"];
            $results["servBorrado"] = 0;

            return $results;

        }

        public function put($db) {
            $sql = "UPDATE $this->table
                    SET servNombre = ?,
                        servDescripcion = ?,
                        servPeriodo = ?,
                        servKM = ?,
                        servFecha = ?
                    WHERE servId = ?;
                ";
            $stmt = SQL::query($db, $sql, [
                DATA["servNombre"],
                DATA["servDescripcion"],
                DATA["servPeriodo"],
                DATA["servKM"],
                DATA["servFecha"],
                DATA["servId"]
            ]);

            sqlsrv_fetch($stmt);

            return DATA;

        }

        public function delete($db, $id) {
            $sql = "UPDATE $this->table
                    SET servBorrado = 1
                    WHERE servId = ?;
                ";
            $stmt = SQL::query($db, $sql, [
                $id
            ]);
            sqlsrv_fetch($stmt);
            return [];
        }

    }

?>