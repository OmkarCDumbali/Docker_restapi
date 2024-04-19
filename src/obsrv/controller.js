const pool = require("../../db");
const queries = require("./queries");
const Joi = require('joi');
const internalError ={
    error : "Internal Server Error",
    status : 500,
    message : "Please retry once again"
    }
const emptyerror = {
    error : "Empty Dataset" ,
    status: 404 ,
    message: "Dataset does not exist with this ID."
}
const success = {
    status : 200,
    message : "Database operation completed successfully."
}

const readAllDataset = (req, res) =>{
    pool.query(queries.readAllDataset, (error, results) =>{
        if (error) {
            console.log(`Error fetching datasets Table`,error);
            res.status(500).send(internal);
        }
        const noDataFound =!results.rows;
        if (noDataFound) {
            res.status(404).send(emptyerror);
        }
        else {
        res.status(200).json(results.rows);
        }
    });
};

const readDataset = (req, res) => {
    const id = req.params.id;
    pool.query(queries.readDataset, [id], (error, results) =>{
        if (error) {
            console.error(`Error fetching dataset:`, error);
            res.status(500).send(internalError);
        }
        const noDataFound = !results.rows.length;
        if (noDataFound) {
          res.status(404).send(emptyerror);
        }
        else{
            res.status(200).json(results.rows[0]);
        }
    });
};

const schema = Joi.object({
    id: Joi.string().required(),
    dataset_id: Joi.string().required(),
    type: Joi.string(),
    name: Joi.string().required(),
    validation_config: Joi.object().required(),
    extraction_config: Joi.object().required(),
    dedup_config: Joi.object().required(),
    data_schema: Joi.object().required(),
    denorm_config: Joi.object().required(),
    router_config: Joi.object().required(),
    dataset_config: Joi.object().required(),
    status: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    data_version: Joi.number().required(),
    created_by: Joi.string().required(),
    updated_by: Joi.string().required(),
    created_date: Joi.date().iso().required(),
    updated_date: Joi.date().iso().required(),
    published_date: Joi.date().iso().required()
});
const createDataset = (req, res) => {
    const {id, dataset_id, type, name, validation_config, extraction_config, dedup_config, data_schema, denorm_config, router_config, dataset_config, tags, data_version, status, created_by, updated_by, created_date, updated_date, published_date} = req.body;
    // Validate the request body against the defined schema
    const { error } = schema.validate(req.body);
    if (error) {
        console.error('Error in request body validation:', error.details);
        return res.status(400).send({
            status : 400,
            message : "Invalid input :Id is required"
        });
    }
    // check for id 
    pool.query(queries.checkIdExists, [id], (error, results) => {
        if (error) {
            console.error(`Error checking if ID exists:`, error);
            return res.status(500).send(internalError);
        }
        if (results.rows.length) {
            return res.status(419).send({
                status : 419,
                message : "page expired"
            });
        }
        // add data to database
        pool.query(queries.createDataset, [id, dataset_id, type, name, validation_config, extraction_config, dedup_config, data_schema, denorm_config, router_config, dataset_config, tags, data_version, status, created_by, updated_by, created_date, updated_date, published_date], (error, results) => {
            if (error) {
                console.error(`Error creating dataset:`, error);
                return res.status(500).send(internalError);
            }      
            res.status(201).send(success);
        });
    });
};

const deleteDataset = (req, res) => {
    const id = req.params.id;
    pool.query(queries.readDataset, [id], (error,results) => {
        const noDatafound = !results.rows.length;
        if (noDatafound) {
            res.status(404).send(emptyerror);
        }
        pool.query(queries.deleteDataset,[id], (error, results) => {
            if (error) {
                res.status(500).send(internalError);
            }
            res.status(200).send(success);
        })
    });
};

const updateDataset = (req,res) => {
    const id = req.params.id;
    const { dataset_id, type, name, validation_config, extraction_config, dedup_config, data_schema, denorm_config, router_config, dataset_config, tags, data_version, status, created_by, updated_by, created_date, updated_date, published_date } = req.body;
    pool.query(queries.readDataset,[id], (error, results) => {
        const noDataFound = !results.rows.length;
        if (noDataFound) {
          res.status(404).send(error);
        }
            pool.query(queries.updateDataset, [dataset_id, type, name, validation_config, extraction_config, dedup_config, data_schema, denorm_config, router_config, dataset_config, tags, data_version, status, created_by, updated_by, created_date, updated_date, published_date, id],(error, results) => {
            if (error) 
             res.status(500).send(internalError);
            res.status(200).send(success);
        })
    });
};

const patchDataset = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    pool.query(queries.readDataset, [id], (error, results) => {
        if (error) {
            return res.status(500).send(internalError);
        }
        const updateFields = [];
        const values = [];     
        // Construct SET part of the query dynamically
        Object.keys(body).forEach((key, index) => {
            updateFields.push(`${key} = $${index + 1}`);
            values.push(body[key]);
        });
        // Construct the UPDATE query
        const postgresQuery = `UPDATE datasets SET ${updateFields.join(', ')} WHERE id = $${values.length + 1};`;
        values.push(id); // Add id to the values array      
        // Execute the query
        pool.query(postgresQuery, values, (error, result) => {
            if (error) {
                return res.status(500).send(internalError);
            } else {
                res.send(success);
            }
        });
    });
};

module.exports = {
    readAllDataset,
    readDataset,
    createDataset,
    deleteDataset,
    updateDataset,
    patchDataset,
};