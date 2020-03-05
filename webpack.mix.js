const mix = require('laravel-mix');
const glob = require('glob-all');
const tailwindcss = require('tailwindcss');

require('laravel-mix-purgecss');

mix.options({
    processCssUrls: false,
    postCss: [
        tailwindcss('tailwind.config.js'),
    ],
});

mix.js('app/app.js', 'public/js')

mix.postCss('resources/postcss/bootstrap.css', 'public/css/app.css')

if (process.env.NODE_ENV === 'production') {
    mix.purgeCss({
        // Will *only* look for views and simplemde classes
        paths: () => glob.sync([
            path.join(__dirname, 'app/**/*.vue'),
        ]),
        whitelistPatterns: [/fa/, /fab/, /icon/, /modal/, /fade/],
        extractorPattern: /[\w-/:]+(?<!:)/g,
    });
}
