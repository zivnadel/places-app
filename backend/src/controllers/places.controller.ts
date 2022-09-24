import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import getCoordsByAddress from "../utils/location";

import Place from "../models/place.model";
import HttpError from "../utils/HttpError";
import { IPlace } from "../models/place.model";

export const getPlaceById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pid = req.params.pid;

  let place;
  try {
    place = await Place.findById(pid);
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not find a place.", 500)
    );
  }

  if (!place) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }

  res.json({ place: place.toObject({ getters: true }) });
};

export const getPlacesByCreatorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uid = req.params.uid;

  let places;
  try {
    places = await Place.find({ creator: uid });
  } catch (error) {
    return next(
      new HttpError("Fetching places failed, please try again later.", 500)
    );
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a places for the provided user id.", 404)
    );
  }

  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
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

  const place: Omit<IPlace, "location"> = req.body;

  let createdPlace;
  try {
    const location = await getCoordsByAddress(place.address);
    createdPlace = new Place({
      ...place,
      location,
      imageUrl: "https://picsum.photos/200",
    });
    await createdPlace.save();
  } catch (error) {
    return next(new HttpError("Creating place failed, please try again.", 500));
  }

  res.status(201).json({ createdPlace });
};

export const updatePlace = async (
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

  let place;
  try {
    place = await Place.findById(pid);
    place.title = title;
    place.description = description;
    await place.save();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not update place.", 500)
    );
  }

  res.json({
    message: "Successfully updated the place associated with the provided id",
    place: place.toObject({ getters: true }),
  });
};

export const deletePlace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pid = req.params.pid;

  let place;
  try {
    place = await Place.findById(pid);
    await place.remove();
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete place.", 500)
    );
  }

  res.json({
    message: "Successfully deleted the place associated with the provided id",
  });
};
