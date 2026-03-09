
export const up = (pgm) => {
    pgm.createTable('catalog', {
        id: 'id',
        title: 'text',
        is_completed: { type: 'boolean', default: false },
        created_at: { type: 'timestamp', default: pgm.func('now()') }
        /*price: { type: 'number', default: '0.00' }*/
    })

};

export const down = (pgm) => {
    pgm.dropTable('catalog');
};
