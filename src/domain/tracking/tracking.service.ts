import { Injectable, NotFoundException } from '@nestjs/common'; 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tracking } from './entities/tracking.schema';
import { CreateTrackingDto } from './dto/create-tracking.dto';
import { UpdateTrackingLocationDto } from './dto/update-tracking.dto';

@Injectable()
export class TrackingService {
  constructor(@InjectModel(Tracking.name) private trackingModel: Model<Tracking>) {}

  async create(createTrackingDto: CreateTrackingDto): Promise<Tracking> {
    // Cette méthode est utile pour la première création d'un point de tracking
    const createdTracking = new this.trackingModel(createTrackingDto);
    return createdTracking.save();
  }

  async findAll(): Promise<Tracking[]> {
    return this.trackingModel.find().exec();
  }

  async findLatestLocationByLivreurId(livreurId: number): Promise<Tracking | null> {
    return this.trackingModel.findOne({ livreurId }).sort({ timestamp: -1 }).exec();
  }

  async findDriversNear(longitude: number, latitude: number, radiusKm: number): Promise<Tracking[]> {
    const radiusMeters = radiusKm * 1000;
    return this.trackingModel.find({
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: radiusMeters
        }
      }
    }).exec();
  }
async updateDriverLocation(
    livreurId: number,
    updateDto: UpdateTrackingLocationDto // <-- Accepte le DTO ici
  ): Promise<Tracking> {
    // Extrait les coordonnées du DTO
    const { coordinates: [longitude, latitude] } = updateDto.location;

    // Construit l'objet de mise à jour pour Mongoose
    const updateData: any = {
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      timestamp: new Date(), // Met à jour le timestamp à chaque mise à jour
    };

    if (updateDto.speedKmh !== undefined) {
      updateData.speedKmh = updateDto.speedKmh;
    }

    const updatedTracking = await this.trackingModel.findOneAndUpdate(
      { livreurId: livreurId }, // Filtre par livreurId
      { $set: updateData },     // Les données à mettre à jour
      { new: true }             // Retourne le document mis à jour
    ).exec();

    if (!updatedTracking) {
      throw new NotFoundException(`Tracking data for driver with ID ${livreurId} not found.`);
    }

    return updatedTracking;
  }
}