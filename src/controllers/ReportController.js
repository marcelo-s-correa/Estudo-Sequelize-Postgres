const { Op } = require('sequelize');
const User = require('../models/User');

module.exports = {
    async show(req, res) {


        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.iLike]: '%@vigortech.com'
                }
            },
            include: [
                {
                    association: 'addresses',
                    where: {
                        street: 'Rua jorge lossio'
                    }
                },
                {
                    association: 'techs',
                    required: false,
                    where: {
                        name: {
                            [Op.iLike]: 'NodeJS%'
                        }
                    }
                },
            ]
        })

        return res.json(users);
    }
};