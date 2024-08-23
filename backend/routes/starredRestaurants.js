const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const ALL_RESTAURANTS = require("./restaurants").restaurants;

/**
 * A list of starred restaurants.
 * In a "real" application, this data would be maintained in a database.
 */
let STARRED_RESTAURANTS = [
  {
    id: "a7272cd9-26fb-44b5-8d53-9781f55175a1",
    restaurantId: "869c848c-7a58-4ed6-ab88-72ee2e8e677c",
    comment: "Best pho in NYC",
  },
  {
    id: "8df59b21-2152-4f9b-9200-95c19aa88226",
    restaurantId: "e8036613-4b72-46f6-ab5e-edd2fc7c4fe4",
    comment: "Their lunch special is the best!",
  },
];

/**
 * Feature 6: Getting the list of all starred restaurants.
 */
router.get("/", (req, res) => {
  /**
   * We need to join our starred data with the all restaurants data to get the names.
   * Normally this join would happen in the database.
   */
  const joinedStarredRestaurants = STARRED_RESTAURANTS.map(
    (starredRestaurant) => {
      const restaurant = ALL_RESTAURANTS.find(
        (restaurant) => restaurant.id === starredRestaurant.restaurantId
      );

      return {
        id: starredRestaurant.id,
        comment: starredRestaurant.comment,
        name: restaurant.name,
      };
    }
  );

  res.json(joinedStarredRestaurants);
});

/**
 * Feature 7: Getting a specific starred restaurant.
 */
router.get("/", (req, res) => {
  // Create a new array with the details of starred restaurants
  const joinedStarredRestaurants = STARRED_RESTAURANTS.map((starredRestaurant) => {
    // Find the corresponding restaurant from ALL_RESTAURANTS
    const restaurant = ALL_RESTAURANTS.find(
      (restaurant) => restaurant.id === starredRestaurant.restaurantId
    );
    
    // Check if restaurant is found
    if (!restaurant) {
      // Send a 404 response if the restaurant is not found
      res.status(404).send('The restaurant was not found.');
      return null; // Skip this iteration
    }
    
    // Return the restaurant details if found
    return {
      id: starredRestaurant.id,
      comment: starredRestaurant.comment,
      name: restaurant.name,
    };
  }).filter((item) => item !== null); // Filter out null values if any

  // Send the result array as the response
  res.json(joinedStarredRestaurants);
});



/**
 * Feature 8: Adding to your list of starred restaurants.
 */
router.post("/", (req, res) => {
  const { restaurantId, comment } = req.body;

  // Validate request data
  if (!restaurantId || !comment) {
    return res.status(400).send('Restaurant ID and comment are required.');
  }

  // Check if the restaurant exists
  const restaurant = ALL_RESTAURANTS.find(
    (restaurant) => restaurant.id === restaurantId
  );

  if (!restaurant) {
    return res.status(404).send('The restaurant was not found.');
  }

  // Create a new starred restaurant entry
  const newStarredRestaurant = {
    id: uuidv4(),
    restaurantId,
    comment,
  };

  STARRED_RESTAURANTS.push(newStarredRestaurant);

  // Respond with the newly added starred restaurant
  res.status(201).json(newStarredRestaurant);
});


/**
 * Feature 9: Deleting from your list of starred restaurants.
 */

router.delete("/", (req, res) => {
  const { restaurantId, comment } = req.body;

  // Validate request data
  if (!restaurantId || !comment) {
    return res.status(400).send('Restaurant ID and comment are required.');
  }

  // Check if the restaurant exists
  const restaurant = ALL_RESTAURANTS.find(
    (restaurant) => restaurant.id === restaurantId
  );

  if (!restaurant) {
    return res.status(404).send('The restaurant was not found.');
  }

  // Create a new starred restaurant entry
  const newStarredRestaurant = {
    id: uuidv4(),
    restaurantId,
    comment,
  };

  STARRED_RESTAURANTS.push(newStarredRestaurant);

  // Respond with the newly added starred restaurant
  res.status(201).json(newStarredRestaurant);
});
/**
 * Feature 10: Updating your comment of a starred restaurant.
 */
router.put("/", (req, res) => {
  const { restaurantId, comment } = req.body;

  // Validate request data
  if (!restaurantId || !comment) {
    return res.status(400).send('Restaurant ID and comment are required.');
  }

  // Check if the restaurant exists
  const restaurant = ALL_RESTAURANTS.find(
    (restaurant) => restaurant.id === restaurantId
  );

  if (!restaurant) {
    return res.status(404).send('The restaurant was not found.');
  }

  // Create a new starred restaurant entry
  const newStarredRestaurant = {
    id: uuidv4(),
    restaurantId,
    comment,
  };

  STARRED_RESTAURANTS.push(newStarredRestaurant);

  // Respond with the newly added starred restaurant
  res.status(201).json(newStarredRestaurant);
});


module.exports = router;