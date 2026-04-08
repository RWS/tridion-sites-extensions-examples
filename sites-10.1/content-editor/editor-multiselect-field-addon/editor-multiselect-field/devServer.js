import { setupExtensionsResponse } from '@tridion-sites/extensions-cli';

const port = 3000;
const host = `localhost:${port}`;
const webAppPath = '/ui/';

export const getDevServerConfig = ({ targetUrl, manifestPath, addonConfigPath }) => {
    const isHttps = targetUrl.startsWith('https://');
    const protocol = isHttps ? 'https://' : 'http://';
    const serverType = isHttps ? 'https' : 'http';

    return {
        host: '0.0.0.0',
        port: port,
        allowedHosts: 'all',
        hot: false,
        compress: true,
        open: `${protocol}${host}${webAppPath}`,
        server: {
            type: serverType,
        },
        proxy: [
            {
                context: ['**'],
                secure: false,
                target: targetUrl,
                headers: {
                    'X-Forwarded-Host': host,
                },
            },
        ],
        setupMiddlewares: (middlewares, { app }) => {
            setupExtensionsResponse({
                app,
                webAppPath,
                manifestPath,
                addonConfigPath,
                targetUrl,
            });

            return middlewares;
        },
    }
};
