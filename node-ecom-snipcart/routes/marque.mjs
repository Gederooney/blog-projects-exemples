import { Router } from 'express';
import ProductsListByBrandModel from '../models/ProductsListByBrand.mjs';

const brandsRoutes = Router();

brandsRoutes.get('/', function (req, res, next) {
  res.render('toutesMarques', { title: 'marques - mes bons prix' });
});

brandsRoutes.get('/:brandName', async function (req, res, next) {
  const { brandName, brandId } = req.params;
  try {
    const brandWithProducts = await ProductsListByBrandModel.aggregate([
      {
        $match: {
          brandName,
        },
      },
      {
        $project: {
          products: {
            $slice: [
              '$products', // Array field to paginate
              0, // Skip the previous pages
              20, // Limit the number of products per page
            ],
          },
        },
      },
    ]);

    res.render('marque', {
      title: `${brandName} - mes bons prix`,
      brandName,
      products: brandWithProducts[0].products,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

export default brandsRoutes;
