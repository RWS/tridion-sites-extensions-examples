export interface SwapiListResponse<TListItem> {
    count: number;
    next: string;
    previous: string;
    results: ReadonlyArray<TListItem>;
}

export interface Specie {
    average_height: string;
    average_lifespan: string;
    classification: string;
    created: string;
    designation: string;
    edited: string;
    eye_colors: string;
    films: ReadonlyArray<string>;
    hair_colors: string;
    homeworld: string;
    language: string;
    name: string;
    people: ReadonlyArray<string>;
    skin_colors: string;
    url: string;
}

/**
 * For this example Star Wars open API is used.
 * Documentation can be found here: https://swapi.dev/documentation.
 * We use the `species` list in our case.
 */
const speciesUrl = 'https://swapi.dev/api/species/';

export const fetchSpeciesList = async () => {
    const list: Array<Specie> = [];
    let nextPageToLoad = speciesUrl;

    /**
     * Since data is paginated, we need to make multiple requests to get the whole list.
     */
    while (nextPageToLoad) {
        const response = await fetch(nextPageToLoad);
        const data = (await response.json()) as SwapiListResponse<Specie>;

        nextPageToLoad = data.next;
        list.push(...data.results);
    }

    return list;
};
