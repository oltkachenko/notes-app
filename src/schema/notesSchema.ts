export const notesSchema = {
    title: 'notes schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        title: {
            type: 'string'
        },
        body: {
            type: 'string'
        },
        createdAt: {
            type: 'string',
        }
    },
    required: ['id', 'title', 'body', 'createdAt']
};