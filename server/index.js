const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://devjunayed-talent-bazar.web.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://TalentBazar:${process.env.DB_PASS}@cluster0.g6k38kz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send({ message: "unauthorized access" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "unauthorized access" });
    }
    console.log(decoded);
    req.user = decoded;
    next();
  });
};

async function run() {
  try {
    const jobCollection = client.db("TalentBazar").collection("postedJobs");
    const appliedJobCollection = client
      .db("TalentBazar")
      .collection("appliedJobs");

    app.post("/jwt", async (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "24h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({ success: true });
    });

    app.post("/logout", async (req, res) => {
      res.clearCookie("token", { maxAge: 0 }).send({ success: true });
    });

    app.post("/addJob", verifyToken, async (req, res) => {
      const jobData = req.body;
      const result = await jobCollection.insertOne(jobData);
      res.send(result);
    });

    app.get("/getCategories", async (req, res) => {
      const options = {
        projection: { category: 1, _id: 0 },
      };
      const result = await jobCollection.find({}, options).toArray();
      const category = result.map((item) => item.category);
      const removedDuplicate = [...new Set(category)];
      res.send(removedDuplicate);
    });

    app.get("/browseJob", async (req, res) => {
      const category = req.query.category;
      const email = req.query.email;
      var result = [];
      if (category) {
        result = await jobCollection.find({ category: category }).toArray();
      }
      if (email) {
        result = await jobCollection.find({ email: email }).toArray();
      }
      res.send(result);
    });

    app.patch("/changeStatus/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const status = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status: status.status,
        },
      };
      const result = appliedJobCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.patch("/job/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDocument = {
        $set: {
          title: data.title,
          description: data.description,
          jobDeadline: data.jobDeadline,
          category: data.category,
          minimumPrice: data.minimumPrice,
          maximumPrice: data.maximumPrice,
        },
      };

      const result = await jobCollection.updateOne(
        filter,
        updateDocument,
        options
      );
      res.send(result);
    });

    app.delete("/job/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobCollection.deleteOne(filter);
      res.send(result);
    });

    app.get("/browseJob/:id", async (req, res) => {
      const jobId = req.params.id;
      const query = { _id: new ObjectId(jobId) };
      const result = await jobCollection.findOne(query);
      res.send(result);
    });

    app.post("/apply", verifyToken, async (req, res) => {
      const data = req.body;
      const result = await appliedJobCollection.insertOne(data);
      res.send(result);
    });

    app.get("/appliedJobs", verifyToken, async (req, res) => {
      const email = req.query.email;
      const isRecruiter = req.query.isRecruiter;
      const sort = req.query.sort;

      var query = {};
      var result; 
      if (isRecruiter) {
        query = { recruiterEmail: email };
      } else {
        query = { jobSeekerEmail: email };
      }
      if (sort) {
         result = await appliedJobCollection.find(query).sort({status: 1}).toArray();
      } else {
         result = await appliedJobCollection.find(query).toArray();
      }
      res.send(result);
    });

    // Connect the client to the server	(optional starting in v4.7)
    // Send a ping to confirm a successful connection
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Talent bazar server is running");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
