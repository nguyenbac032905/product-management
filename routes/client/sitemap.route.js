const express = require("express");
const { SitemapStream, streamToPromise } = require("sitemap");
const { createGzip } = require("zlib");
const fs = require("fs");
const router = express.Router();

// 🧠 import models
const Product = require("../../models/product.model");
const Blog = require("../../models/blog.model");

router.get("/sitemap.xml", async (req, res) => {
  try {
    const smStream = new SitemapStream({ hostname: "https://product-management-3tz1.onrender.com" });

    // --- Các route tĩnh ---
    smStream.write({ url: "/", changefreq: "daily", priority: 1.0 });
    smStream.write({ url: "/products", changefreq: "daily", priority: 0.9 });
    smStream.write({ url: "/cart", changefreq: "weekly", priority: 0.6 });
    smStream.write({ url: "/checkout", changefreq: "weekly", priority: 0.6 });
    smStream.write({ url: "/blogs", changefreq: "weekly", priority: 0.7 });
    smStream.write({ url: "/search", changefreq: "weekly", priority: 0.5 });
    smStream.write({ url: "/user/login", changefreq: "monthly", priority: 0.3 });

    // --- Các route động: Product ---
    const products = await Product.find({}).select("slug");
    products.forEach(p => {
      smStream.write({
        url: `/products/detail/${p.slug}`,
        changefreq: "weekly",
        priority: 0.8
      });
    });

    // --- Các route động: Blog ---
    const blogs = await Blog.find({}).select("slug");
    blogs.forEach(b => {
      smStream.write({
        url: `/blogs/detail/${b.slug}`,
        changefreq: "weekly",
        priority: 0.7
      });
    });

    // Kết thúc stream
    smStream.end();

    // Gzip output và gửi về client
    const sitemap = await streamToPromise(smStream).then(sm => sm.toString());
    res.header("Content-Type", "application/xml");
    res.send(sitemap);

    // (tuỳ chọn) ghi ra file public/sitemap.xml để Google dễ đọc
    fs.writeFileSync("./public/sitemap.xml", sitemap);

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

module.exports = router;