require('dotenv').config()
const swaggerJsdoc = require('swagger-jsdoc')

//swagger setup
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Arosaje restful API",
            version: "0.1.0",
            description:
                "This is the api you need to call to retrieve arosaje database informations",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}/api/v1`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: "user's id"
                        },
                        email: {
                            type: 'string',
                            description: "user's email"
                        },
                        pseudo: {
                            type: 'string',
                            description: "user's pseudo"
                        },
                        password: {
                            type: 'string',
                            description: "user's password"
                        },
                        is_botaniste: {
                            type: 'bool',
                            description: "user's role"
                        },
                        createdAt: {
                            type: 'datetime',
                            description: "user's creation date"
                        },
                        updatedAt: {
                            type: 'datetime',
                            description: "user's update date"
                        }
                    },
                    example: {
                        id: 1,
                        pseudo: 'john the gardener',
                        email: 'john.doe@email.com',
                        password: 'my encripted password',
                        is_botaniste: true,
                        createdAt: '2023-06-19T09:03:40.002Z',
                        updatedAt: '2023-06-19T09:03:40.002Z'
                    }
                },
                Garden: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'garden id'
                        },
                        name: {
                            type: 'string',
                            description: 'garden name'
                        },

                        user_id: {
                            type: 'integer',
                            description: 'owner id'
                        },
                        latitude: {
                            type: 'decimal',
                            description: "garden's latitude"
                        },
                        longitude: {
                            type: 'decimal',
                            description: "garden's longitude"
                        },
                        picture: {
                            type: 'string',
                            description: "garden's picture"
                        },
                        createdAt: {
                            type: 'datetime',
                            description: "garden's creation date"
                        },
                        updatedAt: {
                            type: 'datetime',
                            description: "garden's update date"
                        }
                    },

                    example: {
                        id: 1,
                        name: 'my dummy garden',
                        user_id: 1,
                        latitude: 33.0,
                        longitude: 33.0,
                        picture: 'my base64 encoded picture',
                        createdAt: '2023-06-19T09:03:40.002Z',
                        updatedAt: '2023-06-19T09:03:40.002Z'
                    }
                },
                Plant: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Plant id'
                        },
                        name: {
                            type: 'string',
                            description: "Plant's name"
                        },
                        sowing_date:{
                            type: 'date',
                            description: "Plant's sowing date"
                        },
                        type: {
                            type: 'string',
                            description: 'Plants species'
                        },
                        picture: {
                            type: 'string',
                            description: "Plant's base64 endoded picture"
                        },
                        garden_id: {
                            type: 'string',
                            description: "The garden where plant the plant is sowed"
                        },
                        createdAt: {
                            type: 'datetime',
                            description: "garden's creation date",
                        },
                        updatedAt: {
                            type: 'datetime',
                            description: "garden's update date",
                        }
                    },
                    example: {
                        id: 1,
                        name: 'my dummy plant',
                        sowing_date: '2023-06-14',
                        type: 'flower',
                        picture: 'my base64 encoded picture',
                        garden_id: 1,
                        createdAt: '2023-06-19T09:03:40.002Z',
                        updatedAt: '2023-06-19T09:03:40.002Z'
                    }
                },
                Picture: {
                    properties: {
                        id: {
                            type: 'integer',
                            description: "Picture's id"
                        },
                        plant_id: {
                            type: 'integer',
                            description: "The plant id corresponding to the plant appearing in the picture"
                        },
                        user_id: {
                            type: 'integer',
                            description: "The photographer id"
                        },
                        content: {
                            type: 'string',
                            description: 'Base64 encoded picture'
                        },
                        createdAt: {
                            type: 'datetime',
                            description: "picture's creation date"
                        },
                        updatedAt: {
                            type: 'datetime',
                            description: "picture's update date"
                        }
                    },
                    example: {
                        id: 1,
                        plant_id: 1,
                        user_id: 1,
                        content: 'my base64 encoded picture',
                        createdAt: '2023-06-19T09:03:40.002Z',
                        updatedAt: '2023-06-19T09:03:40.002Z'
                    }
                },
                Advice: {
                    properties: {
                        id: {
                            type: 'integer',
                            description: "Picture's id"
                        },
                        plant_id: {
                            type: 'integer',
                            description: "The plant id corresponding to the advice"
                        },
                        user_id: {
                            type: 'integer',
                            description: "The botanist id"
                        },
                        content: {
                            type: 'string',
                            description: 'The advice content'
                        },
                        createdAt: {
                            type: 'datetime',
                            description: "Advice's creation date"
                        },
                        updatedAt: {
                            type: 'datetime',
                            description: "Advice's update date"
                        }
                    },
                    example: {
                        id: 1,
                        plant_id: 1,
                        user_id: 1,
                        content: 'my base64 encoded picture',
                        createdAt: '2023-06-19T09:03:40.002Z',
                        updatedAt: '2023-06-19T09:03:40.002Z'
                    }
                },
                Mission: {
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'Mission id'
                        },
                        name: {
                            type: 'string',
                            description: 'Mission name'
                        },
                        start_date: {
                            type: 'date',
                            description: 'Mission starting date'
                        },
                        end_date: {
                            type: 'date',
                            description: 'Mission ending date'
                        },
                        gardener_id: {
                            type: 'integer',
                            description: 'Gardener id refers to the user executing the mission'
                        },
                        garden_id: {
                            type: 'integer',
                            description: 'Garden id refers to the user executing the mission'
                        },
                        createdAt: {
                            type: 'datetime',
                            description: "Mission creation date"
                        },
                        updatedAt: {
                            type: 'datetime',
                            description: "Mission update date"
                        }
                    },
                    example: {
                        id: 1,
                        name: 'my dummy mission',
                        start_date: '2023-06-15',
                        end_date: '2023-06-30',
                        gardener_id: 1,
                        garden_id: 1,
                        createdAt: '2023-06-19T09:03:40.002Z',
                        updatedAt: '2023-06-19T09:03:40.002Z'
                    }
                }


            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ["./routes/*.js"],
}
const specs = swaggerJsdoc(options)

module.exports = specs