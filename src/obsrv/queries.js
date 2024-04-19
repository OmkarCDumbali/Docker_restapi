const  updateobsrv = require("./controller");

const readAllDataset = "SELECT * FROM datasets;";
const readDataset = "SELECT * FROM datasets WHERE id = $1";
const checkIdExists = "SELECT * FROM datasets WHERE id = $1";
const createDataset = "INSERT INTO datasets (id, dataset_id, type, name, validation_config, extraction_config, dedup_config, data_schema, denorm_config, router_config, dataset_config, tags, data_version, status, created_by, updated_by, created_date, updated_date, published_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)";
const deleteDataset = "DELETE FROM datasets WHERE id =$1";
const updateDataset = "UPDATE datasets SET dataset_id= $1,  type= $2,  name= $3,  validation_config= $4,  extraction_config= $5,  dedup_config= $6,  data_schema= $7,  denorm_config= $8,  router_config= $9,  dataset_config= $10,  tags= $11,  data_version= $12,  status= $13,  created_by= $14,  updated_by= $15,  created_date= $16,  updated_date= $17,  published_date= $18 WHERE id = $19";
//const patchDataset = "UPDATE datasets SET $1 WHERE id = $2";

module.exports = {
    readAllDataset,
    readDataset,
    checkIdExists,
    createDataset,
    deleteDataset,
    updateDataset,
    //patchDataset,
};



//["id", "dataset_id", "type", "name", "validation_config", "extraction_config", "dedup_config", "data_schema", "denorm_config", "router_config", "dataset_config", "tags", "data_version", "status", "created_by", "updated_by", "created_date", "updated_date", "published_date"]