import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import getCoordsByAddress from "../utils/location";
import { v4 as uuidv4 } from "uuid";
import HttpError from "../models/HttpErrorModel";
import { Place } from "../models/PlaceModel";

let DUMMY_PLACES = [
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

export const getPlaceById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pid = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === pid);

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided place id.", 404)
    );
  }

  res.json({ place });
};

export const getPlacesByCreatorId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uid = req.params.uid;
  const places = DUMMY_PLACES.filter((p) => p.creator === uid);

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a places for the provided user id.", 404)
    );
  }

  res.json({ places });
};

export const createPlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const place: Omit<Place, "location"> = req.body;

  let location;
  try {
    location = await getCoordsByAddress(place.address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = { id: uuidv4(), ...place, location };
  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ createdPlace });
};

export const updatePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const pid = req.params.pid;
  const { title, description } = req.body;

  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === pid);

  if (placeIndex === -1) {
    return next(
      new HttpError("Could not find a place for the provided place id.", 404)
    );
  }

  const updatedPlace = { ...DUMMY_PLACES[placeIndex] };

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.json({
    message: "Successfully updated the place associated with the provided id",
  });
};

export const deletePlace = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pid = req.params.pid;
  const place = DUMMY_PLACES.find((p) => p.id === pid);

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided place id.", 404)
    );
  }

  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== pid);

  res.json({
    message: "Successfully deleted the place associated with the provided id",
  });
};
