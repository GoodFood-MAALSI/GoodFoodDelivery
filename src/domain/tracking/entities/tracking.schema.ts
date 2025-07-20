import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'; 


@Schema({
  collection: 'tracking',
  timestamps: { createdAt: false, updatedAt: false } 
})
export class Tracking extends Document {


  @Prop({ required: true, index: true }) 
  livreurId: number; 

  @Prop({ required: true, index: true }) 
  deliveryId: number; 

  @Prop({ required: true })
  livreurName: string; 

  @Prop({
    type: {
      type: String, 
      enum: ['Point'],
      default: 'Point',
      required: true,
    },
    coordinates: { 
      type: [Number],
      required: true,
    }, 
  })
  location: { 
    type: string;
    coordinates: [number, number]; 
  };

  @Prop()
  speedKmh: number; 

  @Prop({ default: Date.now }) 
  timestamp: Date;
}


export const TrackingSchema = SchemaFactory.createForClass(Tracking);

TrackingSchema.index({ location: '2dsphere' });