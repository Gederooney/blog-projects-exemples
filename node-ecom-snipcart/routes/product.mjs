import { Router } from 'express';
import ProductsListByBrandModel from '../models/ProductsListByBrand.mjs';
import ProductsDetailListByBrandModel from '../models/ProductsDetails.mjs';
const productRoutes = Router();

productRoutes.get(
  '/:brandName/:productId/:slug',
  async function (req, res, next) {
    const { brandName, productId, slug } = req.params;
    try {
      const [foundProducts] = await ProductsListByBrandModel.aggregate([
        {
          $match: {
            brandName: brandName,
          },
        },
        {
          $project: {
            products: {
              $filter: {
                input: '$products',
                as: 'product',
                cond: { $eq: ['$$product.id', parseInt(productId)] },
              },
            },
          },
        },
      ]);

      const queryResponse = await ProductsDetailListByBrandModel.aggregate([
        {
          $match: {
            brandName: brandName,
          },
        },
        {
          $project: {
            productsDetails: {
              $filter: {
                input: '$productsDetails',
                as: 'product',
                cond: { $eq: ['$$product.productId', productId] },
              },
            },
          },
        },
      ]);
      const { details, extraDetails } = queryResponse[0].productsDetails[0];
      res.render('productDetails', {
        title: `${foundProducts.products[0].seo}}`,
        product: foundProducts.products[0],
        details: details,
        extraDetails: extraDetails,
        brandName: brandName,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export default productRoutes;
