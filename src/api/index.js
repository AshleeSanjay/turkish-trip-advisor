import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    console.log("Selected Type:", sw);
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },

        headers: {
          "X-RapidAPI-Key":
            "49c524957bmsh4c3a76c35f5cc5cp1f13edjsn8537949dcab6",
          "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
// export const getWeatherData = async (lat, lng) => {
//   try {
//     if (lat && lng) {
//       const { data } = await axios.get(
//         "https://community-open-weather-map.p.rapidapi.com/find",
//         {
//           params: { lat, lon: lng },
//           headers: {
//             "x-rapidapi-key":
//               "49c524957bmsh4c3a76c35f5cc5cp1f13edjsn8537949dcab6",
//             "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
//           },
//         }
//       );

//       return data;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getWeatherData = async (location, lat, lng) => {
//   try {
//     const { data } = await axios.get(
//       `https://open-weather13.p.rapidapi.com/city/${location}`,
//       {
//         headers: {
//           "X-RapidAPI-Key":
//             "49c524957bmsh4c3a76c35f5cc5cp1f13edjsn8537949dcab6",
//           "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
