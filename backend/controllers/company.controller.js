import { Company } from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";


export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res
        .status(400)
        .json({ message: "company name is required", success: false });
    }

    let company = await Company.findOne({ name: companyName });

    if (company) {
      return res
        .status(400)
        .json({ message: "This company already exists", success: false });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res
      .status(201)
      .json({ message: "company registered", company, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    const companies = await Company.find({userId});

    if (!companies) {
      return res
        .status(404)
        .json({ message: "companies not found", success: false });
    }

    return res.status(200).json({companies, success: true})
  } catch (error) {
    console.log(error);
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res
        .status(404)
        .json({ message: "companies not found", success: false });
    }

    return res.status(200).json({ company, success: true });
  } catch (error) {
    console.log(error);
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    let cloudResponse = { secure_url: "" };
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    }

    const updateData = { 
      name, 
      description, 
      website, 
      location, 
      ...(cloudResponse.secure_url && { logo: cloudResponse.secure_url }) 
    };

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res
        .status(400)
        .json({ message: "Company not found", success: false });
    }

    return res.status(200).json({
      message: "Company updated",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

