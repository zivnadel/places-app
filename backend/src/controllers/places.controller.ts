import fs from "fs";

import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import getCoordsByAddress from "../utils/location";

import Place from "../models/place.model";
import User, { IUser } from "../models/user.model";
import HttpError from "../utils/HttpError";
import { IPlace } from "../models/place.model";
import mongoose from "mongoose";

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

  res.json(place.toObject({ getters: true }));
};

export const getPlacesByCreatorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uid = req.params.uid;

  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(uid).populate("places");
  } catch (error) {
    return next(
      new HttpError("Fetching places failed, please try again later.", 500)
    );
  }

  if (!userWithPlaces) {
    return next(
      new HttpError("Could not find a places for the provided user id.", 404)
    );
  }

  res.json(
    userWithPlaces.places.map((place) => place.toObject({ getters: true }))
  );
};

export const createPlace = async (
  req: Request & { userData: { uid: string } },
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const place: Omit<Omit<IPlace, "location">, "creator"> = req.body;

  let createdPlace;
  try {
    const location = await getCoordsByAddress(place.address);
    const user = await User.findById(req.userData.uid);

    if (!user) {
      return next(new HttpError("Could not find user for provided id.", 404));
    }

    createdPlace = new Place({
      ...place,
      location,
      creator: req.userData.uid,
      imageUrl: req.file.path,
    });

    const session = await mongoose.startSession();
    session.startTransaction();

    await createdPlace.save({ session });
    user.places.push(createdPlace);
    await user.save({ session });
    await session.commitTransaction();
  } catch (error) {
    return next(
      new HttpError(
        "Creating place failed, check your address and other inputs or try again later.",
        500
      )
    );
  }

  res.status(201).json({ createdPlace });
};

export const updatePlace = async (
  req: Request & { userData: { uid: string } },
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

    if (place.creator.toString() !== req.userData.uid) {
      return next(
        new HttpError("You are not allowed to edit this place.", 401)
      );
    }

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
  req: Request & { userData: { uid: string } },
  res: Response,
  next: NextFunction
) => {
  const pid = req.params.pid;

  let place;
  try {
    place = await Place.findById(pid).populate("creator");

    if (!place) {
      return next(
        new HttpError("Could not find a place for the provided id.", 404)
      );
    }

    const creator = place.creator as unknown as IUser;

    if (creator.id !== req.userData.uid) {
      return next(
        new HttpError("You are not allowed to delete this place.", 401)
      );
    }

    const imagePath = place.imageUrl;

    const session = await mongoose.startSession();
    session.startTransaction();

    await place.remove({ session });

    creator.places.pull(place);

    await creator.save({ session });

    await session.commitTransaction();

    fs.unlink(imagePath, (err) => {
      console.error(err);
    });
  } catch (error) {
    return next(
      new HttpError("Something went wrong, could not delete place.", 500)
    );
  }

  res.json({
    message: "Successfully deleted the place associated with the provided id",
  });
};
