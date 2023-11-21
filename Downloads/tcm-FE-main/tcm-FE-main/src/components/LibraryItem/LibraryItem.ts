export interface LibraryItem {
    Id: number;
    Nr: string;
    Parent: number;
    Title: string;
    Level: number;
    Sequence: number;
    Type: string;

    InterpretationId?: number;
    Interpretation?: string;
    Implementation?: string;
    Applicable?: boolean;
    Reason?: string;
    Root: number;
}

export interface LibraryItemInterpretation {
    InterpretationId: number;
    Expert: string;
    Interpretation: string;
    ItemId: number;
}

export interface LibraryItemImplementation {
    ImplementationId: number;
    Implementation: string;
    Applicable: boolean;
    ItemId: number;
    Reason: string;
}
