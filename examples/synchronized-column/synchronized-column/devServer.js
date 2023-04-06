import { getLocalFrontendAddon } from '@tridion-sites/extensions-cli';

export const getDevServerConfig = ({ targetUrl, manifestPath, addonConfigPath }) => {
    const isHttps = targetUrl.startsWith('https://');
    const protocol = isHttps ? 'https://' : 'http://';
    const serverType = isHttps ? 'https' : 'http';

    return {
        host: '0.0.0.0',
        port: 3000,
        allowedHosts: 'all',
        hot: false,
        compress: true,
        open: `${protocol}localhost:3000/ui`,
        server: {
            type: serverType,
        },
        proxy: [
            {
                context: ['**'],
                secure: false,
                target: targetUrl,
            },
        ],
        setupMiddlewares: (middlewares, { app }) => {
            app.get(`/ui/api/v2.0/extensions`, (req, res) => {
                const localAddon = getLocalFrontendAddon({
                    manifestPath,
                    addonConfigPath,
                });

                const liveAddons = /*await ExtensionsService.getExtensions()*/ [];
                const response = [...liveAddons, localAddon];

                res.json(response);
            });

            return middlewares;
        },
    }
};
