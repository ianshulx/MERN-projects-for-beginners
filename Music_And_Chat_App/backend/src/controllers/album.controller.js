const Album = require("../models/album.model")

const AllAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find();
        res.status(200).json({
            success: true,
            message: "All Albums",
            albums
        })
    } catch (error) {
        next(error);
    }
}
const AllAlbumsById = async (req, res, next) => {
    try {
        const { albumId } = req.params;
        const album = await Album.findById(albumId).populate("songs");
        if (!album) {
            return res.status(404).json({
                message: "Invaild Data"
            })
        }

        res.status(200).json({
            success: true,
            message: "Album Founded",
            album
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    AllAlbums,
    AllAlbumsById
}