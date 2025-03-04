/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: true
    },

    reactStrictMode: true,

    webpack: (config) => {
        const rules = config.module.rules
            .find((rule) => typeof rule.oneOf === 'object')
            .oneOf.filter((rule) => Array.isArray(rule.use));

        rules.forEach((rule) => {
            rule.use.forEach((moduleLoader) => {
                if (
                    moduleLoader.loader !== undefined &&
                    moduleLoader.loader.includes('css-loader') &&
                    typeof moduleLoader.options.modules === 'object'
                ) {
                    moduleLoader.options = {
                        ...moduleLoader.options,
                        modules: {
                            ...moduleLoader.options.modules,
                            // This is where we allow camelCase class names
                            exportLocalsConvention: 'camelCase',
                        },
                    };
                }
            });
        });

        //alias
        config.resolve.alias = {
            ...config.resolve.alias,
            '@/*': './src/*',
            '@styles/globals': './src/shared/styles/globals.scss',
            '@styles/custom': './src/shared/styles/custom.scss'
        }

        //svg
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })

        return config;
    },
};

export default nextConfig;
