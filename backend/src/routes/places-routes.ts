import express from "express";

import {
  getPlaceById,
  getPlacesByCreatorId,
  createPlace,
  updatePlace,
  deletePlace,
} from "../controllers/places.controller";

const router = express.Router();

router.get("/:pid", getPlaceById);

router.get("/user/:uid", getPlacesByCreatorId);

router.post("/", createPlace);

router.patch("/:pid", updatePlace);

router.delete("/:pid", deletePlace);

export default router;
