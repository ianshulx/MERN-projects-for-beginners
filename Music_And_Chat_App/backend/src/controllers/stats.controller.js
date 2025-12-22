const Song = require("../models/song.model");
const User = require("../models/user.model");
const Album = require("../models/album.model");

const getStats = async (req, res, next) => {
    try {


        const [totalSongs, totalUsers, totalAlbum] = await Promise.all([
            Song.countDocuments(),
            User.countDocuments(),
            Album.countDocuments(),

            Song.aggregate([
                {
                    $unionWith: {
                        coll: "albums",
                        pipeline: [],
                    },
                },
                {
                    $group: {
                        _id: "$artist",
                    },
                },
                {
                    $count: "count",
                },
            ]),
        ]);

        res.status(200).json({
            totalAlbum,
            totalSongs,
            totalUsers,
            totalArtists: uniqueArtists[0]?.count || 0,
        });

    } catch (error) {

    }
}


module.exports = {
    getStats
}

