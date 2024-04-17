const express = require('express');
const axios = require('axios');

const server = express();
const PORT = process.env.PORT || 3000;

// get the asteroid data from NASA OS APi :)
const getAsteroids = async (date) => {
    try {
        const response = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2024-01-01&end_date=2024-01-06&api_key=3klXNvHFlGHOPLdV916bsJdhSegNRE3HfVKTJGiL`);
        return response.data.near_earth_objects[date];
    } catch (error) {
        console.error('Error fetching asteroid data:', error.message);
        return null;
    }
};

server.get('/asteroids', async (req, res) => {
    const date = req.query.date;
    if (!date) {
        return res.status(400).json({ error: 'Parameter date is required' });
    }
    const asteroidsData = await getAsteroids(date);
    if (asteroidsData) {
        const asteroidsInfo = asteroidsData.map((asteroid) => ({
            name: asteroid.name,
            diameter: {
                kilometers: {
                    estimated_min: asteroid.estimated_diameter.kilometers.estimated_diameter_min,
                    estimated_max: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
                },
                meters: {
                    estimated_min: asteroid.estimated_diameter.meters.estimated_diameter_min,
                    estimated_max: asteroid.estimated_diameter.meters.estimated_diameter_max,
                },
            },
            closest_approach: {
                date: asteroid.close_approach_data[0].close_approach_date,
                miss_distance: {
                    kilometers: asteroid.close_approach_data[0].close_approach_date,
                    astronomical: asteroid.close_approach_data[0].miss_distance.astronomical,
                },
            },
        }));

        return res.status(200).json({ date, asteroids: asteroidsInfo });
    } else {
        return res.status(500).json({ error: 'Failed to fetch asteroid data from NASA' });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});