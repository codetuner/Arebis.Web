/// Detect hi-res (retina) displays:
/// (from: http://www.sitepoint.com/support-retina-displays/)
var isHighResolutionDisplay = (
    window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches)
);

/// Perform image substitution on high-res ('retina') displays:
/// i.e: <img src="house.jpg" rb-hires-src="house@2x.jpg" />
if (isHighResolutionDisplay) {
    rbLoaderExtensions.push(function (loaded) {
        $(loaded).find("IMG[rb-hires-src]").each(function (index, elem) {
            $(this).attr('src', $(this).attr('rb-hires-src'));
        });
    });
}
