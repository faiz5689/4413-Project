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
        let sortingParam = req.query.sort;

        // + is ascending sort, - is descending
        // eg.(-price = highest to lowest price)
        //    ( price = lowest to highest price)
        //    ( name  = A -> Z)
        //    (-name  = Z -> A)

        let dbQuery = [];

        if (sortingParam === undefined)
        {
            sortingParam = { $natural: 1 };
        }

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
            var returnProducts;
            
            if (dbQuery.length == 0)
            {
                returnProducts = await Inventory.find({}).sort(sortingParam);
            }
            else
            {
                returnProducts = await Inventory.find({ $and: dbQuery }).sort(sortingParam);
            }
    
            res.status(201).json({
                success: true,
                returnProducts
            })
    
        } catch (error) {
            console.log(error);
            console.log(dbQuery);
            console.log(sortingParam);
            next(error);
    
        }


    })
);

inventoryRouter.get(
    '/recommended',
    expressAsyncHandler(async (req, res, next) => {
        const recommendedItems = await Inventory.find({}).sort({rating: -1}).limit(5);
        res.send(recommendedItems);
    })
);

export default inventoryRouter;
