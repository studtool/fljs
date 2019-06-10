module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    browsers: ['ie >= 11']
                },
                modules: false,
                loose: true
            }
        ]
    ],
    plugins: [
        ['@babel/proposal-object-rest-spread', {loose: true}]
    ]
}
