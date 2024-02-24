import express from 'express';
import brandsRoutes from './marque.mjs';
import ProductsListByBrandModel from '../models/ProductsListByBrand.mjs';
import productsRoutes from './product.mjs';

const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const zaraProduts = await ProductsListByBrandModel.aggregate([
      {
        $match: {
          brandName: 'zara',
        },
      },
      {
        $project: {
          products: {
            $slice: [
              '$products', // Array field to paginate
              0, // Skip the previous pages
              4, // Limit the number of products per page
            ],
          },
        },
      },
    ]);

    const hmProduts = await ProductsListByBrandModel.aggregate([
      {
        $match: {
          brandName: 'zara',
        },
      },
      {
        $project: {
          products: {
            $slice: [
              '$products', // Array field to paginate
              5, // Skip the previous pages
              4, // Limit the number of products per page
            ],
          },
        },
      },
    ]);
    res.render('index', {
      title: 'Express',
      featuredProducts: {
        zara: zaraProduts[0].products,
        hm: hmProduts[0].products,
      },
    });
  } catch (error) {
    next(error);
  }
});

// marques
router.use('/marque', brandsRoutes);

// produits
router.use('/produit', productsRoutes);
export default router;
