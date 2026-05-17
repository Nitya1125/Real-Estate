const Property = require("../models/Property");

const PropertiesDetails = async (req,res) => {
  try{
    const {id} = req.params;
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.json({
      success: true,
      property,
    });
  }catch(err) {
    res.status(500).json({
      message: "Error getting Property",
    })
  }
}

const addProperty = async (req, res) => {
  try {
    const image = req.file ? req.file.filename : "";
    const property = await Property.create({ ...req.body, image: image });
    res.json({
      success: true,
      property,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding Property",
    });
  }
};
const getAllProperties = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const skip = (page - 1) * limit;
    const total = await Property.countDocuments();
    const properties = await Property.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
    res.json({
      success: true,
      properties,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error getting Properties",
    });
  }
};

const SearchFilter = async (req, res) => {
  const {
    location,
    district,
    property_type,
    bedrooms,
    bathrooms,
    minPrice,
    maxPrice,
    minArea,
  } = req.query;

  let filter = {};

  if (location) {
    filter.location = location;
  }
  if (district) {
    filter.district = district;
  }
  if (property_type) {
    filter.property_type = property_type;
  }

  if (bedrooms) {
    filter.bedrooms = bedrooms;
  }

  if (bathrooms) {
    filter.bathrooms = bathrooms;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$gte = Number(maxPrice);
  }

  if (minArea) {
    filter.area = { $gte: Number(minArea) };
  }
  console.log(filter);
  const { sort } = req.query;
  let sortOption = {};
  if (sort == "low") {
    sortOption.price = 1;
  } else if (sort == "high") {
    sortOption.price = -1;
  }
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Property.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  const total = await Property.countDocuments(filter);
  res.json({
    total,
    page: Number(page),
    limit: Number(limit),
    data,
  });
};
const editProperty = async (req, res) => {
  try{
    const image = req.file ? req.file.filename: null;
    const updateData = { ...req.body };
    if (image) {
      updateData.image = image;
    }
    const update = await Property.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    res.json(update);
  }catch(err){
    res.status(500).json({
      message: "Error editing Property",
    });
  }
};

const handleDeleteByID = async (req, res) => {
  const { id } = req.params;
  const property = await Property.findByIdAndDelete(id);
  res.json(property);
};

module.exports = {
  PropertiesDetails,
  addProperty,
  getAllProperties,
  SearchFilter,
  editProperty,
  handleDeleteByID,
};
