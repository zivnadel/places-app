import express from "express";

const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

router.get("/:pid", (req, res) => {
  const pid = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === pid);
  res.json({ place });
});

router.get("/user/:uid", (req, res) => {
  const uid = req.params.uid;
  const place = DUMMY_PLACES.find((p) => p.creator === uid);
  res.json({ place });
});

export default router;
