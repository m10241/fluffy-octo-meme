import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PokemonDocument = Pokemon & Document;

export interface Attack {
    name: string,
    type: string,
    damage: number
}

export interface Evolution {
    id: number,
    name: string,
}

@Schema()
export class Pokemon {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    name: string;

    @Prop()
    isFavorite?: boolean;

    @Prop()
    classification: string;

    @Prop([String])
    types: Array<string>;

    @Prop([String])
    resistant: Array<string>;

    @Prop([String])
    weaknesses: Array<string>;

    @Prop(
        raw({
            minimum: { type: String },
            maximum: { type: String },
        }),
    )
    weight: Record<string, string>;

    @Prop(
        raw({
            minimum: { type: String },
            maximum: { type: String },
        }),
    )
    height: Record<string, string>;

    @Prop()
    fleeRate: number;

    @Prop(
        raw({
            amount: { type: Number },
            name: { type: String },
        }),
    )
    evolutionRequirements: Record<string, any>;

    @Prop()
    evolutions: Evolution[];
    
    @Prop()
    'Previous evolution(s)': Evolution[];
    
    @Prop()
    maxCP: number;
    
    @Prop()
    maxHP: number;

    @Prop(raw({
        fast: [] as Attack[],
        special: [] as Attack[]
    }))
    attacks: Object
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);

