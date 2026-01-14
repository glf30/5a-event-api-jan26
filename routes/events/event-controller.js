const Event = require("./event-model");

const getEvents = async (queryData) => {
  try {
    const filterObject = {};

    /*
        create an object that keeps track of keys that we want to filter by, as well as their values
        {
            category: queryData.category,
            location: queryData.location, 
            minPrice: queryData.minPrice
        }

    */

    if (queryData.category) {
      filterObject.category = queryData.category;
    }

    // range with minPrice and maxPrice
    // $gte - greater than or equal to
    // $lte - less than or equal to
    const minPrice = 0;
    const maxPrice = Infinity;

    filterObject.price = {
      $gte: queryData.minPrice || minPrice, // check if we have a min price query.  if not, use default variable
      $lte: queryData.maxPrice || maxPrice,
    };

    // if(queryData.minPrice || queryData.maxPrice || (queryData.minPrice && queryData.maxPrice)){
    //     // get items in range of minPrice and maxPrice

    // }

    /*
 else if(queryData.minPrice){
        filterObject.price = {
            $gte: queryData.minPrice
        }
    } else if(queryData.maxPrice){
        filterObject.price = {
            $lte: queryData.maxPrice
        }
    }

    */

    const sortObject = {};
    // figure out which property to sort by
    // if(queryData.sortBy){
    // if(queryData.sortBy === "category"){
    //     sortObject.category = 1;
    // }
    //object bracket notation allows us to evaluate keys
    // sortObject.price = 1
    // queryData.sortBy = "price"
    // sortObject[queryData.sortBy]
    // [queryData.sortBy] will evaluate to its value ("price")
    // bracket notation [] with objects allows for dynamic keys
    sortObject[queryData.sortBy || "_id"] = queryData.sortOrder || "asc";
    // }

    // figure out of it's asc or desc

    // { price: asc }
    // .sort - built in mongoose sort function
    // .sort will sort utilizing an object
    // .sort( { propertyToSortBy: sortOrder })
    // sortOrder can be ascending: "asc", "ascending", 1
    // or descending: "descending" "desc", -1
    // we can grab the property to sort by utilizing queries!
    const events = await Event.find(filterObject).sort(sortObject);
    return events;
  } catch (error) {
    throw error;
  }
};

const getEventByID = async (id) => {
  try {
    const event = await Event.findById(id);
    return event;
  } catch (error) {
    throw error;
  }
};

const createEvent = async (eventData) => {
  try {
    const newEvent = Event.create(eventData);
    return newEvent;
  } catch (error) {
    throw error;
  }
};

const updateEvent = async (id, eventData) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, eventData, {
      new: true,
    });
    return updatedEvent;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventByID,
  updateEvent,
};
