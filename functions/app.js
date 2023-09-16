const express = require("express");
const fs = require("fs");

const app = express();

const data = JSON.parse(fs.readFileSync("./hospitalListing (1).json", "utf8"));
let sortData = [...data];
// Get all hospitals

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  console.log(method, url);
  next();
};

app.use(logger);

app.get("/api/v1/allhospitals", (req, res) => {
  try {
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 30;
    const page = parseInt(req.query.page) || 1;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const slicedData = data.slice(startIndex, endIndex);

    res.json(slicedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get Maternity Hospitals
app.get("/api/v1/getantenatalclinics", (req, res) => {
  try {
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 30;
    const page = parseInt(req.query.page) || 1;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    antenatalData = sortData.filter((data) => {
      return data.MaternityServices == "Maternity Services";
    });

    const slicedData = antenatalData.slice(startIndex, endIndex);

    res.json(slicedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get GynecologyClinicServices Hospitals
app.get("/api/v1/gynecologyclinicservices", (req, res) => {
  try {
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 30;
    const page = parseInt(req.query.page) || 1;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    GynecologyData = sortData.filter((data) => {
      return data.GynecologyClinicServices == true;
    });

    const slicedData = GynecologyData.slice(startIndex, endIndex);

    res.json(slicedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get Immunization Hospitals
app.get("/api/v1/immunizationclinics", (req, res) => {
  try {
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 30;
    const page = parseInt(req.query.page) || 1;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    ImmunizationData = sortData.filter((data) => {
      return data.Immunization == true;
    });

    const slicedData = ImmunizationData.slice(startIndex, endIndex);

    res.json(slicedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get Hospital State
app.get("/api/v1/hospitalState", (req, res) => {
  try {
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 30;
    const page = parseInt(req.query.page) || 1;
    const searchItem = req.query.searchItem;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    stateData = sortData.filter((data) => {
      return data.State.startsWith(searchItem);
    });

    const slicedData = stateData.slice(startIndex, endIndex);

    res.json(slicedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Get Maternity Hospital By State
app.get("/api/v1/maternityhospitalbyState", (req, res) => {
  try {
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 30;
    const page = parseInt(req.query.page) || 1;
    const searchItem = req.query.searchItem;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    maternityStateData = sortData.filter((data) => {
      return (
        data.State.startsWith(searchItem) &&
        data.MaternityServices === "Maternity Services"
      );
    });

    const slicedData = maternityStateData.slice(startIndex, endIndex);

    res.json(slicedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//General Search
app.get("/api/v1/generalsearch", (req, res) => {
  try {
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 30;
    const page = parseInt(req.query.page) || 1;
    const searchItem = req.query.searchItem;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    generalData = sortData.filter((data) => {
      return (
        data.HospitalName.includes(searchItem) ||
        data.LGA.includes(searchItem) ||
        data.HospitalOwnership.includes(searchItem)
      );
    });

    const slicedData = generalData.slice(startIndex, endIndex);

    res.json(slicedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is listening on port 5000");
});
