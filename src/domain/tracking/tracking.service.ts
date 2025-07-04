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
    updateDto: UpdateTrackingLocationDto 
  ): Promise<Tracking> {
    const { coordinates: [longitude, latitude] } = updateDto.location;

    const updateData: any = {
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
      timestamp: new Date(), 
    };

    if (updateDto.speedKmh !== undefined) {
      updateData.speedKmh = updateDto.speedKmh;
    }

    const updatedTracking = await this.trackingModel.findOneAndUpdate(
      { livreurId: livreurId }, 
      { $set: updateData },     
      { new: true }             
    ).exec();

    if (!updatedTracking) {
      throw new NotFoundException(`Tracking data for driver with ID ${livreurId} not found.`);
    }

    return updatedTracking;
  }
}