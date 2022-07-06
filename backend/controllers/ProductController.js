const { Product, User, ProductImage } = require("../models");

class ProductController {
  static async getAllProducts(req, res, next) {
    try {
      let products = await Product.findAll({
        include: [User, ProductImage],
      });
      res.status(200).json(products);
    } catch (err) {
      next(err);
    }
  }
  //just for admin
  static async create(req, res, next) {
    try {
      const id = req.userData.id;
      const images = req.files;
      const {
        name,
        desc,
        price,
        stock,
        weight,
        brand,
        category,
        condition,
        totalSold,
        rating,
        views,
      } = req.body;

      const result = await Product.create({
        name,
        desc,
        price,
        stock,
        weight,
        brand,
        category,
        condition,
        totalSold,
        rating,
        views,
        UserId: id,
      });

      images.forEach(async (image, index) => {
        const isPrimary = index === 0 ? true : false;
        await ProductImage.create({
          filename: image.url,
          ProductId: result.id,
          fileType: image.mimetype,
          primary: isPrimary,
        });
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  //just for admin
  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const {
        name,
        desc,
        price,
        stock,
        weight,
        brand,
        category,
        condition,
        totalSold,
        rating,
        views,
      } = req.body;
      let result = await Product.update(
        {
          name,
          desc,
          price,
          stock,
          weight,
          brand,
          category,
          condition,
          totalSold,
          rating,
          views,
        },
        {
          where: { id },
        }
      );
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async getProductById(req, res, next) {
    const id = req.params.id;
    try {
      let result = await Product.findByPk(id, {
        include: [ProductImage],
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async addViews(req, res, next) {
    const id = req.params.id;
    try {

      let product = await Product.findByPk(id);
      let result = await Product.update({
        views: product.views + 1
      }, {
        where: { id }
      });
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
