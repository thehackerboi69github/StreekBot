import type { BaseInteraction } from 'discord.js';
import type { callback as kCallback, structureType as kStructureType, StructureType } from '.';
import type { SlashCommand, ContextMenu, SelectMenu, Autocomplete, Modal, Button } from '../Structures';

export type Callback<T extends BaseInteraction<'cached'>> = (interaction: T) => void;

export interface Structure<T extends BaseInteraction<'cached'>> {
    [kCallback]: Callback<T>;
    [kStructureType]: StructureType;

    run: Callback<T>;
    setCallback(cb: Callback<T>): this;
}

export type AnyCommandStructure = SlashCommand | ContextMenu;

export type AnyComponentStructure = Button | SelectMenu;

export type AnyAutocompleteStructure = Autocomplete;

export type AnyModalStructure = Modal;

export type AnyStructure = AnyCommandStructure | AnyComponentStructure | AnyAutocompleteStructure | AnyModalStructure;
