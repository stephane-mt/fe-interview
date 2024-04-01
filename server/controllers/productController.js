const { Router } = require("express");
const router = Router();
const { cloudinary } = require("../config/cloudinary");
const isAuth = require("../middlewares/isAuth");
const Product = require("../models/Product");
const User = require("../models/User");
const moment = require("moment");

const productService = require("../services/productService");

const PRODUCTS = [
  {
    "_id": "61870b46872b3e594316f213",
    "title": "Fancy Desk Lamp",
    "category": "home",
    "description": "This sleek and modern desk lamp will brighten up any workspace. With adjustable brightness settings and a minimalist design, it's perfect for both home and office use.",
    "price": 39.99,
    "city": "New York",
    "image": "https://liquicontracts.com/wp-content/uploads/2018/02/liqui-contracts-commercial-office-lighting-british-made-aluminium-bamboo-cell-desk-lamp-6.jpg",
    "addedAt": "2024-03-08T10:00:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5c8",
    "likes": ["6186f8f061e82b39e4b2f5c9", "6186f90561e82b39e4b2f5ca"],
    "active": true
  },
  {
    "_id": "61870b46872b3e594316f214",
    "title": "Vintage Bookshelf",
    "category": "home",
    "description": "Add a touch of elegance to your living room with this vintage bookshelf. Crafted from high-quality wood, it provides ample storage space for your favorite books and decor.",
    "price": 149.99,
    "city": "Los Angeles",
    "image": "https://i5.walmartimages.com/asr/7f7197ca-9afe-4c2b-85ab-755dfdac23b0.c12b6ac17ec3626695373a8e590d80a2.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    "addedAt": "2024-03-09T09:30:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5c9",
    "likes": ["6186f8f061e82b39e4b2f5cb", "6186f90561e82b39e4b2f5cc"],
    "active": true
  },
  {
    "_id": "61870b46872b3e594316f215",
    "title": "Smart Thermostat",
    "category": "electronics",
    "description": "Take control of your home's climate with this smart thermostat. With Wi-Fi connectivity and intuitive controls, you can easily adjust the temperature from anywhere.",
    "price": 129.99,
    "city": "Chicago",
    "image": "https://georgiapowermarketplace.com/dw/image/v2/BDDP_PRD/on/demandware.static/-/Sites-masterCatalog/default/dwd0bd0ca7/Products/I-NST3RDGEN-01-BRSS-XXXX-V1.jpg?sw=800&sh=800",
    "addedAt": "2024-03-10T11:45:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5ca",
    "likes": ["6186f8f061e82b39e4b2f5cd", "6186f90561e82b39e4b2f5ce"],
    "active": true
  },
  {
    "_id": "61870b46872b3e594316f216",
    "title": "Gourmet Coffee Beans",
    "category": "home",
    "description": "Indulge in the rich aroma and flavor of these gourmet coffee beans. Sourced from the finest regions, they are perfect for brewing your favorite cup of coffee.",
    "price": 19.99,
    "city": "San Francisco",
    "image": "https://cablevey.com/wp-content/uploads/2020/09/Where-Do-Specialty-Coffee-Beans-Come-From.jpg",
    "addedAt": "2024-03-11T08:00:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5cb",
    "likes": ["6186f8f061e82b39e4b2f5cf", "6186f90561e82b39e4b2f5d0"],
    "active": true
  },
  {
    "_id": "61870b46872b3e594316f217",
    "title": "Yoga Mat",
    "category": "toys",
    "description": "Enhance your yoga practice with this high-quality yoga mat. With its non-slip surface and comfortable cushioning, it provides stability and support during every pose.",
    "price": 29.99,
    "city": "Seattle",
    "image": "https://target.scene7.com/is/image/Target/GUEST_1d93dbc6-91a7-4e4c-906f-012f420a1d27?wid=488&hei=488&fmt=pjpeg",
    "addedAt": "2024-03-12T14:20:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5cc",
    "likes": ["6186f8f061e82b39e4b2f5d1", "6186f90561e82b39e4b2f5d2"],
    "active": true
  },
  {
    "_id": "61870b46872b3e594316f218",
    "title": "Wireless Earbuds",
    "category": "electronics",
    "description": "Experience true wireless freedom with these Bluetooth earbuds. With premium sound quality and long battery life, they are perfect for music lovers on the go.",
    "price": 79.99,
    "city": "Miami",
    "image": "https://cdn11.bigcommerce.com/s-uod0rcncsw/images/stencil/960w/products/1898/6394/EM-DE031_RedemptionANC-2_1000x1000_SB-MAIN__91848__85665__62943.1700602653.png",
    "addedAt": "2024-03-13T12:45:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5cd",
    "likes": ["6186f8f061e82b39e4b2f5d3", "6186f90561e82b39e4b2f5d4"],
    "active": true
  },
  {
    "_id": "61870b46872b3e594316f219",
    "title": "Portable Blender",
    "category": "home",
    "description": "Blend your favorite smoothies and shakes on the go with this portable blender. Compact and lightweight, it's perfect for travel, work, or the gym.",
    "price": 49.99,
    "city": "Houston",
    "image": "https://m.media-amazon.com/images/I/71seN8995YL.jpg",
    "addedAt": "2024-03-14T09:00:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5ce",
    "likes": ["6186f8f061e82b39e4b2f5d5", "6186f90561e82b39e4b2f5d6"],
    "active": true
  },
  {
    "_id": "61870b46872b3e594316f21a",
    "title": "Smartwatch",
    "category": "electronics",
    "description": "Stay connected and organized with this stylish smartwatch. With fitness tracking, notifications, and customizable watch faces, it's the perfect companion for your busy lifestyle.",
    "price": 159.99,
    "city": "Dallas",
    "image": "https://www.fitbit.com/global/content/dam/fitbit/global/pdp/devices/google-pixel-watch/hero-static/charcoal/google-pixel-watch-charcoal-device-3qt-left.png",
    "addedAt": "2024-03-15T10:30:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5cf",
    "likes": ["6186f8f061e82b39e4b2f5d7", "6186f90561e82b39e4b2f5d8"],
    "active": true
  },
  {
    "_id": "61870b46872b3e594316f21b",
    "title": "Cooking Utensil Set",
    "category": "home",
    "description": "Upgrade your kitchen with this comprehensive cooking utensil set. Made from durable materials, it includes everything you need to prepare delicious meals with ease.",
    "price": 34.99,
    "city": "Atlanta",
    "image": "https://m.media-amazon.com/images/I/71yxPx0ekLS.jpg",
    "addedAt": "2024-03-16T11:00:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5d0",
    "likes": ["6186f8f061e82b39e4b2f5d9", "6186f90561e82b39e4b2f5da"],
    "active": true
  },
  {
    "_id": "61870b46872b3e594316f21c",
    "title": "Gaming Mouse",
    "category": "electronics",
    "description": "Get the competitive edge with this high-performance gaming mouse. With customizable buttons and precision tracking, it's perfect for gamers of all levels.",
    "price": 49.99,
    "city": "Boston",
    "image": "https://c1.neweggimages.com/productimage/nb640/26-197-390-S01.jpg",
    "addedAt": "2024-03-17T12:15:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5d1",
    "likes": ["6186f8f061e82b39e4b2f5db", "6186f90561e82b39e4b2f5dc"],
    "active": true
  },
  {
    "_id": "52970b46872b3e594316f21c",
    "title": "Gigantic House With Two Pools",
    "category": "properties",
    "description": "Not one, but two pools.",
    "price": 1000000.00,
    "city": "Boston",
    "image": "https://i.pinimg.com/originals/7e/69/e2/7e69e2383742de1a19ed780c26f944da.jpg",
    "addedAt": "2024-03-17T12:15:00.000Z",
    "seller": "6186f84e61e82b39e4b2f5d1",
    "likes": ["6186f8f061e82b39e4b2f5db", "6186f90561e82b39e4b2f5dc"],
    "active": true
  }
]

router.get("/", async (req, res) => {
  const { page, search } = req.query;
  try {
    let products;
    if (search !== "" && search !== undefined) {
      products = PRODUCTS;
      products = products.filter((x) => x.active == true);
      products = products.filter(
        (x) =>
          x.title.toLowerCase().includes(search.toLowerCase()) ||
          x.city.toLowerCase().includes(search.toLowerCase()),
      );
      res.status(200).json({ products: products, pages: products.pages });
    } else {
      products = PRODUCTS.slice((page - 1) * 5, ((page - 1) * 5) + 5)
      res.status(200).json({ products: products });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:category", async (req, res) => {
  const { page } = req.query;
  const { category } = req.params;
  try {
    let products = await PRODUCTS;
    res.status(200).json({ products: products.filter((x) => x.category == category).slice((page - 1) * 5, ((page - 1) * 5) + 5) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/specific/:id", async (req, res) => {
  try {
    let product = await (await Product.findById(req.params.id)).toJSON();
    let seller = await (await User.findById(product.seller)).toJSON();
    product.addedAt = moment(product.addedAt).format("d MMM YYYY (dddd) HH:mm");
    let jsonRes = {
      ...product,
      name: seller.name,
      phoneNumber: seller.phoneNumber,
      email: seller.email,
      createdSells: seller.createdSells.length,
      avatar: seller.avatar,
      sellerId: seller._id,
      isAuth: false,
    };
    if (req.user) {
      let user = await User.findById(req.user._id);
      jsonRes.isSeller = Boolean(req.user._id == product.seller);
      jsonRes.isWished = user.wishedProducts.includes(req.params.id);
      jsonRes.isAuth = true;
    }
    res.status(200).json(jsonRes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", async (req, res) => {
  let { title, price, description, city, category, image } = req.body;
  try {
    let errors = [];
    if (title.length < 3 || title.length > 50)
      errors.push(
        "Title should be at least 3 characters long and max 50 characters long; ",
      );
    if (isNaN(Number(price))) errors.push("Price should be a number; ");
    if (description.length < 10 || description.length > 1000)
      errors.push(
        "Description should be at least 10 characters long and max 1000 characters long; ",
      );
    if (/^[A-Za-z]+$/.test(city) == false)
      errors.push("City should contains only english letters; ");
    if (!image.includes("image"))
      errors.push("The uploaded file should be an image; ");
    if (!category) errors.push("Category is required; ");

    if (errors.length >= 1) throw { message: [errors] };

    let compressedImg = await productService.uploadImage(image);
    let product = new Product({
      title,
      price,
      description,
      city,
      category,
      image: compressedImg,
      addedAt: new Date(),
      seller: req.user._id,
    });

    await product.save();
    await productService.userCollectionUpdate(req.user._id, product);

    res.status(201).json({ productId: product._id });
  } catch (err) {
    console.error(err);
    res.status(404).json({ error: err.message });
  }
});

router.patch("/edit/:id", isAuth, async (req, res) => {
  //TODO: Rewrite this
  let { title, price, description, city, category, image } = req.body;
  try {
    let user = await productService.findUserById(req.user._id);
    let product = await productService.findById(req.params.id);
    let errors = [];
    if (user._id.toString() !== product.seller.toString()) {
      errors.push("You have no permission to perform this action! ");
    }

    if (title.length < 3 || title.length > 50)
      errors.push(
        "Title should be at least 3 characters long and max 50 characters long; ",
      );
    if (isNaN(Number(price))) errors.push("Price should be a number; ");
    if (description.length < 10 || description.length > 1000)
      errors.push(
        "Description should be at least 10 characters long and max 1000 characters long; ",
      );
    if (/^[A-Za-z]+$/.test(city) == false)
      errors.push("City should contains only english letters; ");
    if (req.body.image) {
      if (!req.body.image.includes("image"))
        errors.push("The uploaded file should be an image; ");
    }
    if (!category || category == "Choose...")
      errors.push("Category is required; ");

    if (errors.length >= 1) throw { message: [errors] };

    if (req.body.image) {
      let compressedImg = await productService.uploadImage(req.body.image);
      await productService.edit(req.params.id, {
        title,
        price,
        description,
        city,
        category,
        image: compressedImg,
      });
    } else {
      await productService.edit(req.params.id, {
        title,
        price,
        description,
        city,
        category,
      });
    }
    res.status(201).json({ message: "Updated!" });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.get("/sells/active/:id", async (req, res) => {
  try {
    let userId = "";
    if (req.params.id) {
      userId = req.params.id;
    } else {
      userId = req.user_id;
    }
    let user = await (
      await User.findById(userId).populate("createdSells")
    ).toJSON();
    res
      .status(200)
      .json({ sells: user.createdSells.filter((x) => x.active), user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/sells/archived", async (req, res) => {
  try {
    let user = await (
      await User.findById(req.user._id).populate("createdSells")
    ).toJSON();
    res
      .status(200)
      .json({
        sells: user.createdSells.filter((x) => x.active == false),
        user,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/enable/:id", async (req, res) => {
  try {
    await Product.updateOne({ _id: req.params.id }, { active: true });
    res.status(200).json({ msg: "Activated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/archive/:id", async (req, res) => {
  try {
    await Product.updateOne({ _id: req.params.id }, { active: false });
    res.status(200).json({ msg: "Archived" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/wish/:id", async (req, res) => {
  try {
    let user = await User.findById(req.user._id);

    if (!user.wishedProducts.includes(req.params.id)) {
      await User.updateOne(
        { _id: req.user._id },
        { $push: { wishedProducts: req.params.id } },
      );
      await Product.updateOne(
        { _id: req.params.id },
        { $push: { likes: user } },
      );

      res.status(200).json({ msg: "wished" });
    } else {
      await User.updateOne(
        { _id: req.user._id },
        { $pull: { wishedProducts: req.params.id } },
      );
      await Product.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.user._id } },
      );

      res.status(200).json({ msg: "unwished" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/wishlist/:id", async (req, res) => {
  try {
    let user = await (
      await User.findById(req.user._id).populate("wishedProducts")
    ).toJSON();

    res.status(200).json({ wishlist: user.wishedProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
