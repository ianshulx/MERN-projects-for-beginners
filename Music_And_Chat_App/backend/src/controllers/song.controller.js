const Song = require("../models/song.model")

const getAllSongs = async (req, res, next) => {
    try {
        const songs = await Song.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "All Songs Finded",
            songs
        })
    } catch (error) {
        next(error)
    }
}

const getSingleSong = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: { size: 1 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: "Songs Fetch Successfully",
            songs
        })
    } catch (error) {
        next(error)
    }
}

const getFeaturedSongs = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: { size: 8 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])

        res.status(200).json({
            success: true,
            message: "Songs Fetch Successfully",
            songs
        })
    } catch (error) {
        next(error)
    }
}
const getSongsForYou = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: { size: 4 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "Songs Fetch Successfully",
            songs
        })
    } catch (error) {
        next(error)
    }
}
const getTrendingSongs = async (req, res, next) => {
    try {
        const songs = await Song.aggregate([
            {
                $sample: { size: 4 }
            },
            {
                $project: {
                    _id: 1,
                    title: 1,
                    artist: 1,
                    imageUrl: 1,
                    audioUrl: 1,
                }
            }
        ])
        res.status(200).json({
            success: true,
            message: "Songs Fetch Successfully",
            songs
        })
    } catch (error) {
        next(error)
    }
}



module.exports = {
    getAllSongs,
    getFeaturedSongs,
    getSongsForYou,
    getTrendingSongs,
    getSingleSong
}