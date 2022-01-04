export interface Env {
    DB_URL: string
    ADMIN_SECRET: string,
    PARTNER_SECRET: string
}

export const schema = {
    type: 'object',
    required: ['DB_URL', 'ADMIN_SECRET', 'PARTNER_SECRET'],
    properties: {
        DB_URL: {
            type: 'string'
        },
        ADMIN_SECRET: {
            type: 'string'
        },
        PARTNER_SECRET: {
            type: 'string'
        }
    }
}
