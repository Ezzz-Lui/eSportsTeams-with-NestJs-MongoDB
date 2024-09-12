import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Team extends Document {
    // mongoId: string => mongo ya lo da
    @Prop({
        unique: true,
        index: true
    })
    name: string;
    
    @Prop({
        unique: true,
        index: true
    })
    idTeam: string;
}


export const TeamsSchema = SchemaFactory.createForClass( Team );