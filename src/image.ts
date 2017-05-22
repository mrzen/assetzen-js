import * as SHA from "jssha";

export namespace AssetZen {

    /**
     * Point represents a single x/y point position on an image.
     *
     * @class Point
     */
    export class Point {
        /**
         * @var x-axis position of the point
         */
        x: number;

        /**
         * @var y-axis position of the point
         */
        y: number;
    }

    /**
     * ImageParams represents the valid parameters for the image service.
     *
     * @class ImageParams
     */
    export class ImageParams {
        /**
         *
         * Desired width of the image.
         * Must be an integer between 1 and the original image width.
         *
         * @optional
         */
        width: number;

        /**
         * Desired height of the image.
         * Must be an integer between 1 and the original image height.
         *
         * @optional
         */
        height: number;

        /**
         * Desired image Quality.
         * Only used for JPEG images.
         * Must be an integer between 0 and 100.
         *
         * @optional
         * @onlyFormats jpeg
         */
        quality: number;

        /**
         * Number of colours to use in the image palette.
         * Only used for GIF images.
         * Must be an integer between 2 and 256
         *
         * @optional
         * @onlyFormats gif
         */
        colors: number;

        /**
         * ID of the image to use. Can be any image from your account.
         */
        imageId: string;

        /**
         * Override the focus point for this image.
         * Must be a valid Point with X,Y coordinates inside the original image,
         * scaled to the original image.
         *
         * @optional
         */
        focus: Point

        /**
         * Ignore all focus point settings, and crop to the center of the image.
         *
         * @optional
         */
        ignore_focus: boolean;
    }

    /**
     * Default API endpoint
     */
    const DEFAULT_ENDPOINT = 'https://cdn.assetzen.net';

    /**
     * LinkGenerator is a helper to generate image links, given
     * a valid set of `ImageParams` and constructed with an `accountId`
     */
    export class LinkGenerator {

        /**
         * The ID of the account to use and sign requests as.
         *
         */
        private accountId: string;

        /**
         * API endpoint (base URL) to use.
         */
        private endpoint: string;

        /**
         * Constructor
         *
         * @param accountId The ID of the account to use for signing generated links.
         */
        constructor(accountId: string, endpoint?:string) {
            this.accountId = accountId;

            if (endpoint) {
                this.endpoint = endpoint;
            } else {
                this.endpoint = DEFAULT_ENDPOINT;
            }
        }

        /**
         * Get a link to an image with the given parameters.
         *
         * @param params Image Parameters (see `ImageParams`)
         *
         * @return image URL
         */
        public link(params: ImageParams):string {
            var paramsStr = JSON.stringify(params);

            var token = this.urlSafeB64(btoa(paramsStr))

            var hmac = this.getNewHMAC();

            hmac.update(paramsStr);

            var signature = this.urlSafeB64(hmac.getHMAC('B64'));

            return `${this.endpoint}/image/${signature}.${token}`;
        }

        private getNewHMAC(): SHA.jsSHA {
            var sha = new SHA('SHA-256', 'TEXT');
            sha.setHMACKey(this.accountId, 'TEXT');

            return sha;
        }

        private urlSafeB64(text: string):string {
            return text.replace(/=/g,'')
                .replace(/\//,'_')
                .replace(/\+/g,'-');
        }
    }
}

/**
 * Exports the AssetZen namespace to the window
 * so that non TS scripts can easily use it.
 */
window['AssetZen'] = AssetZen;
