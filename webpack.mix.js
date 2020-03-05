const mix = require('laravel-mix');
const glob = require('glob-all');
const tailwindcss = require('tailwindcss');

// Register laravel-mix puregecss plugin.
require('laravel-mix-purgecss');

// Set laravel-mix options.
mix.options({
    processCssUrls: false,
    postCss: [
        tailwindcss('tailwind.config.js'),
    ],
});

// Compile main js application.
mix.js('app/app.js', 'public/js')

// Compile all css styles.
mix.postCss('resources/postcss/bootstrap.css', 'public/css/app.css')

// Production logic.
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
