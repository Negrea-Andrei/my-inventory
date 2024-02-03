#!/usr/bin/env node

console.log(
    'This script populates some test products, producers, categories, inventories, and locations to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on the command line
  const userArgs = process.argv.slice(2);
  
  const mongoose = require('mongoose');
  mongoose.set("strictQuery", false);
  
  const Product = require('./models/product');
  const Producer = require('./models/producer');
  const Category = require('./models/category');
  const Inventory = require('./models/inventory');
  const Location = require('./models/location');
  
  const categories = [];
  const producers = [];
  const products = [];
  const inventories = [];
  const locations = [];
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log('Debug: About to connect');
    await mongoose.connect(mongoDB);
    console.log('Debug: Should be connected?');
    await createCategories();
    await createProducers();
    await createLocations();
    await createProducts();
    await createInventories();
    console.log('Debug: Closing mongoose');
    mongoose.connection.close();
  }
  
  async function categoryCreate(index, name) {
    const category = new Category({ name: name });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function producerCreate(index, name, description) {
    const producer = new Producer({ name: name, description: description });
    await producer.save();
    producers[index] = producer;
    console.log(`Added producer: ${name}`);
  }
  
  async function locationCreate(index, name) {
    const location = new Location({ name: name });
    await location.save();
    locations[index] = location;
    console.log(`Added location: ${name}`);
  }
  
  async function productCreate(index, name, description, price, producer, category, location) {
    const product = new Product({
      name: name,
      description: description,
      price: price,
      producer: producer,
      category: [category],
      location: [location],
      img: Buffer.from('Sample Image Data'),
    });
    await product.save();
    products[index] = product;
    console.log(`Added product: ${name}`);
  }
  
  async function inventoryCreate(index, product, location, quantity) {
    const inventory = new Inventory({ product: product, location: location, quantity: quantity });
    await inventory.save();
    inventories[index] = inventory;
    console.log(`Added inventory: ${product.name} at ${location.name}`);
  }
  
  async function createCategories() {
    console.log('Adding categories');
    await Promise.all([
      categoryCreate(0, 'Electronics'),
      categoryCreate(1, 'Books'),
      categoryCreate(2, 'Clothing'),
    ]);
  }
  
  async function createProducers() {
    console.log('Adding producers');
    await Promise.all([
      producerCreate(0, 'Tech Company', 'Leading technology manufacturer'),
      producerCreate(1, 'Book Publisher', 'Publishing company specializing in books'),
      producerCreate(2, 'Fashion Brand', 'Designer clothing brand'),
    ]);
  }
  
  async function createLocations() {
    console.log('Adding locations');
    await Promise.all([
      locationCreate(0, 'Warehouse A'),
      locationCreate(1, 'Store B'),
      locationCreate(2, 'Distribution Center C'),
    ]);
  }
  
  async function createProducts() {
    console.log('Adding products');
    await Promise.all([
      productCreate(0, 'Smartphone', 'High-performance mobile device', 599.99, producers[0], categories[0], locations[0]),
      productCreate(1, 'Bestseller Book', 'Captivating book that topped the charts', 19.99, producers[1], categories[1], locations[1]),
      productCreate(2, 'Designer Jacket', 'Stylish and comfortable jacket', 149.99, producers[2], categories[2], locations[2]),
    ]);
  }
  
  async function createInventories() {
    console.log('Adding inventories');
    await Promise.all([
      inventoryCreate(0, products[0], locations[0], 100),
      inventoryCreate(1, products[1], locations[1], 50),
      inventoryCreate(2, products[2], locations[2], 20),
    ]);
  }
  