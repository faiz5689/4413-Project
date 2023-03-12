import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Inventory from '../models/inventory.model.js';


const inventoryRouter = express.Router();

// TODO: We need to make sure that the frontend passes the appropriate filtering query to the backend (category + color or color + brand etc.)
// the router below will get all products and display them (filtered if specified, all if filter not specified from the frontend)
inventoryRouter.get(
    '/products',
    expressAsyncHandler(async (req, res, next) => {

        // get filters from request
        let filterColour = req.query.colour;
        let filterBrand = req.query.brand;
        let filterCategory = req.query.cat;

        let dbQuery = [];

        if (filterColour !== undefined)
        {
            dbQuery.push({colour: { $eq: filterColour}});
        }
        if (filterBrand !== undefined)
        {
            dbQuery.push({brand: { $eq: filterBrand}});
        }
        if (filterCategory !== undefined)
        {
            dbQuery.push({category: { $eq: filterCategory}});
        }

        try {
            const returnProducts = await Inventory.find({ $and: dbQuery });
    
            res.status(201).json({
                success: true,
                returnProducts
            })
    
        } catch (error) {
            console.log(error);
            console.log(dbQuery);
            next(error);
    
        }


    })
);

export default inventoryRouter;
