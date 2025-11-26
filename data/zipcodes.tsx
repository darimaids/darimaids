// data/zipcodes.js

export const MIAMI_DADE_ZIPCODES = {
  Aventura: ["33160", "33180"],
  "Bal Harbour": ["33154"],
  "Bay Harbor Islands": ["33154"],
  "Biscayne Park": ["33161"],
  "Coral Gables": ["33133", "33134", "33146", "33156", "33143"],
  Doral: ["33122", "33126", "33166", "33172", "33178", "33182"],
  Hialeah: ["33010", "33012", "33013", "33014", "33015", "33016", "33018"],
  "Hialeah Gardens": ["33018", "33016"],
  "Key Biscayne": ["33149"],
  Miami: [
    "33125",
    "33126",
    "33127",
    "33128",
    "33129",
    "33130",
    "33131",
    "33132",
    "33133",
    "33134",
    "33135",
    "33136",
    "33137",
    "33138",
    "33142",
    "33145",
    "33147",
    "33150",
  ],
  "Miami Beach": ["33109", "33139", "33140", "33141"],
  "Miami Gardens": ["33054", "33055", "33056"],
  "Miami Lakes": ["33014", "33016", "33018"],
  "Miami Shores": ["33138", "33150", "33161", "33168"],
  "North Miami": ["33161", "33162", "33167", "33168", "33181"],
  "North Miami Beach": ["33160", "33162", "33169", "33179", "33180"],
  "Opa-locka": ["33054", "33055"],
  Pinecrest: ["33156", "33157", "33158", "33176"],
  "South Miami": ["33143", "33155", "33156"],
  "Sunny Isles Beach": ["33160", "33162"],
};

export const PALM_BEACH_ZIPCODES = {
  "Boca Raton": [
    "33427",
    "33429",
    "33431",
    "33432",
    "33433",
    "33434",
    "33481",
    "33486",
    "33487",
    "33496",
    "33499",
  ],
  "Highland Beach": ["33487"],
  "Delray Beach": ["33444", "33445", "33448", "33482", "33483", "33484"],
  "Boynton Beach": ["33424", "33425", "33426", "33435", "33436", "33483"],
  "Lake Worth Beach": ["33460", "33461", "33480"],
  Lantana: ["33462", "33464", "33465"],
  "West Palm Beach": [
    "33401",
    "33402",
    "33403",
    "33405",
    "33406",
    "33407",
    "33409",
    "33411",
    "33412",
    "33417",
  ],
  Greenacres: ["33413", "33415", "33454", "33463", "33467"],
  "Palm Beach": ["33401", "33407", "33480"],
  "Palm Beach Gardens": [
    "33403",
    "33408",
    "33410",
    "33412",
    "33418",
    "33420",
    "33478",
  ],
  "Palm Springs": ["33406", "33461"],
  Wellington: ["33411", "33414", "33449", "33470"],
  "North Palm Beach": ["33403", "33404", "33408", "33410"],
  "South Palm Beach": ["33480"],
  "Juno Beach": ["33408"],
  Hypoluxo: ["33462"],
  Watergate: ["33428"],
  "Riviera Beach": ["33403", "33404", "33407", "33410", "33418", "33419"],
};

export const BROWARD_ZIPCODES = {
  "Fort Lauderdale": [
    "33301",
    "33304",
    "33305",
    "33306",
    "33308",
    "33309",
    "33311",
    "33312",
    "33315",
    "33316",
  ],
  "Coral Springs": ["33065", "33067", "33071", "33076"],
  "Pompano Beach": ["33060", "33062", "33064", "33069"],
  "Deerfield Beach": ["33441", "33442"],
  Hollywood: ["33019", "33020", "33021", "33024"],
  "Pembroke Pines": ["33025", "33026", "33027", "33028", "33029", "33082"],
  Plantation: ["33313", "33317", "33322", "33323", "33324", "33325"],
  Miramar: ["33023", "33027", "33029"],
  Davie: ["33312", "33314", "33324", "33325", "33328", "33330", "33331"],
  Weston: ["33326", "33327", "33331", "33332"],
  Sunrise: ["33313", "33322", "33323", "33325", "33326"],
  Lauderhill: ["33311", "33313", "33319", "33321"],
  Tamarac: ["33309", "33319", "33321"],
  "Coconut Creek": ["33063", "33066", "33073"],
  "Hallandale Beach": ["33009"],
};

// Combine all ZIP codes into a single flat array
export const ALL_VALID_ZIPCODES = [
  ...Object.values(MIAMI_DADE_ZIPCODES).flat(),
  ...Object.values(PALM_BEACH_ZIPCODES).flat(),
  ...Object.values(BROWARD_ZIPCODES).flat(),
];

// Remove duplicates
export const UNIQUE_VALID_ZIPCODES = [...new Set(ALL_VALID_ZIPCODES)];

// Helper function to validate ZIP code
export const isValidZipCode = (zipCode: any) => {
  // Remove any spaces and convert to string
  const cleanZip = String(zipCode).trim();
  return UNIQUE_VALID_ZIPCODES.includes(cleanZip);
};

// Helper function to get city by ZIP code
export const getCityByZipCode = (zipCode: any) => {
  const cleanZip = String(zipCode).trim();

  // Check Miami-Dade
  for (const [city, zips] of Object.entries(MIAMI_DADE_ZIPCODES)) {
    if (zips.includes(cleanZip)) {
      return { city, county: "Miami-Dade" };
    }
  }

  // Check Palm Beach
  for (const [city, zips] of Object.entries(PALM_BEACH_ZIPCODES)) {
    if (zips.includes(cleanZip)) {
      return { city, county: "Palm Beach" };
    }
  }

  // Check Broward
  for (const [city, zips] of Object.entries(BROWARD_ZIPCODES)) {
    if (zips.includes(cleanZip)) {
      return { city, county: "Broward" };
    }
  }

  return null;
};
