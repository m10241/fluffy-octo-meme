## Summary
I have implemented the endpoints based on the user stories. There are improvements and thoughts that I have included in at the end of this document.

## To start the project
1. make sure to duplicate `.env.example` file and provide the required values based on the environment that you are running the application in.
2. rename the `.env.example` duplicated file to `.env`.
3. run `npm install` (assuming that you have node.js and npm installed on your machine)
4. run this command `nest start`
5. make sure to import the pokemnons if you need to using the following instructions.

### import pokemons 
you can use `/pokemon/import` endpoint to import your pokemons!

## Guide -> User stories 

1. Obtain a pokemon by id --> http://localhost:3000/pokemon/{id}
2. Obtain list of pokemons (TIP: pagination) --> http://localhost:3000/pokemon?page={pageNumber}&pageSize={pageSize}
3. Obtain a pokemon by name --> http://localhost:3000/pokemon?name={pokemonName}
4. Obtain list of pokemons with different filters --> http://localhost:3000/pokemon?filterKey=filterValue
Possible filters:
    - **weaknesses**: in comma separated format : Fire,Ice
    - **resistant**: in comma separated format : Fire,Grass
    - **type**: in comma separated format : Flying,Fire
    - **specialAttack**: e.g. `Aqua Jet`
    - **fastAttack**: e.g. `Bubble`
    - **hp**: e.g. 1500 (checks if Pokemon at least has that much of HP)
    - **Anything else**: anything else in the query string **is not ignored** but will be applied to filter the results

5. Allow obtain pokemon types --> http://localhost:3000/pokemon?fields=type 
    - This can also include other fileds as a comma separated value like `fields=type,weaknesses,name`
6. Allow add a pokemon as favourite --> http://localhost:3000/pokemon/{id}/add-fav
7. Allow remove a pokemon as favourite --> http://localhost:3000/pokemon/{id}/remove-fav
8. Allow obtain list of favourite pokemons --> http://localhost:3000/pokemon?isFavorite=true


## Improvements/Points

Some of the improvement are mentioned in the code using `TODO:` tag. But here is a list of what can be improved in this implementaion:
- Make the searches case insensitive, specially if the front end uses a text input instead of a select or check box
- Currently we are working with `id` which is different from `_id` (the built-in object id). If we had a front-end, I would use `_id` for look ups
- We have to make sure we create indexes for the look ups (all the queries that we have) in MongoDB
- isFavoite is added to the schema to support fav/unfav functionality. Since we don't have multiple users in this application, it works fine. If we had multiple users (or user document), I would add the following property to the user document 
```json
favoritePokemons: [
    {
        "id": 2,
        "name": "Bulbasaur"
    },
    {
        "id": 4,
        "name": "Charmander"
    }, 
]
```
This allows for quick data retrieval (if a user wants to see a list of their favorite Pokemons, which we will be using the `name` property. Also, if they want to see the details of a specific Pokemon, the id is what we use to retireve the Pokemon document for that purpose.)
- The endpoints are under root. In real application usually they are under `/api/version/`
- the schema file is located here `/pokemon/pokemon.schema.ts`
- in the real applications that I have built, I have followed a standard data structure for the output of all endpoints. An example can be like this:
```json
{
    "data": [
        {"_id": 1},
        {"_id": 2},
        ...
    ],
    "status": "ok",
    "meta":{
        "total": "the total number of records (specially if we have pagination)",
        "errorMessage": "in case of errors"
        ...
    }
}
```
- Since all the endpoitns are using `GET`, you can try the app in your browser. But I also have added Swagger for convenient testing
- I tried to include various functions and tests, but they are not complete of course. Since this is just to give you an idea about how I go about a project like this. The list in my filterProcessor function and tests can be easily expanded, but I think I have included enough so that you are able to evalute the skills (hopefully!)
- I did not include integration tests (the one in there is the default one).

Please let me know if you have any questions 

Mahmood Ramezani
mramezani@outlook.com

Thank you :)