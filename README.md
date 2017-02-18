Assetzen.JS
===========

Javascript library to generate image links for AssetZen.
This library only includes image link generation and is optimized for use in browers.

Features
--------

* Generate image URLs in server-side javascript or the brower.
* Small footprint (6.8k minified and gzipped)
* Enables advanced use cases such as linking images sized to fit the user's viewport.

Installation
-----

### Installation via `npm`

    npm install --save assetzen

### Plain old Javascript.

Not using a Javascript Package manager? You're missing out but it's OK.
Just download the [minified][dist-min] or [development][dist-dev] compiled sources and use them like any other library.

Usage & Documentation
---------------------

### API Documentation

Full API documentation is available [here][docs].

### Usage Example

````js
    // Create a new Link Generator object
    var linkgen = new AssetZen.LinkGenerator("myAccountId");

    // Generate a link
    var link     = linkgen.link({
        imageId: 'myImageId',
        width: 800,
        height: 600,
        quality: 60
    });

    // Apply it to an image tag on your page.
    document.getElementById('my-dynamic-image').src = link;

````

Browser Compatibility & Support
-------------------------------

This library should be compatible with all modern browers.
While it should also work in Internet Explorer, there is no official support for versions older than 10.

[dist-min]: dist/assetzen.min.js
[dist-dev]: dist/assetzen.js