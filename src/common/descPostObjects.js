let apartmentSale = {
  typeApartment: "",
  yearConstruction: "",
  elevator: "",
  gas: "",
  roomsInApartment: 0,
  floorsInHouse: 0,
  floor: 0,
  totalArea: 0,
  livingArea: 0,
  kitchenArea: 0,
  whoPosted: "",
};

let saleHouse = {
  typeHouse: "",
  houseMaterial: "",
  areaHouse: 0,
  floors: 0,
  countBedrooms: 0,
  plotArea: 0,
  whoPosted: "",
};

/* 
{
  "realty": {
    "apartmentSale": {
      "houseParameters": {
        "typeApartment": "допустимые значения secondary(вторичка), и newBuilding(новостройка)",

        "yearConstruction": "1992",

        "elevator": "passenger(легковой) passengerСargo(легковой и грузовой) threeOrMore(три и более)",

        "additional": {
          "gas": "true || false"
        }
      },
      "apartmentParameters": {
        "main": {
          "roomsInApartment": 1 (1,2,3,4,5 и более , apartaments ),
          "floorsInHouse": 9,
          "floor": 1
        },
        "area": {
          "totalArea": 19,
          "livingArea": 6,
          "kitchenArea": 12
        }
      },
      "conditions": {
        "whoPosted": "owner(сообственик),agent(agent)"
      }
    },
    "saleHouse": {
      "houseParameters": {
        "typeHouse": "house(дом) Townhouse(Таунхаус) Cottage(Коттедж) CountryHouse(дача)",
        "houseMaterial": "Brick , wooden, Panel , monolithic , block (Кирпичный , деревянный, Щитовой , монолитный , блочный)",
        "areaHouse": 320,
        "floors": 3,
        "countBedrooms": 5
      },
      "plotParameters": {
        "plotArea": 435
      },
      "conditions": {
        "whoPosted": "owner(сообственик),agent(agent)"
      }
    }
  }
}

*/

export { apartmentSale, saleHouse };
