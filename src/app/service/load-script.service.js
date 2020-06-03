module.exports = {
    uploadScript: (callback) => {
        var upload = document.createElement("script");
        upload.type = "text/javascript";
        upload.src = "//cdn.staticfile.org/plupload/2.1.2/plupload.full.min.js";
        upload.onload = function () {
            callback();
        }
        var scNode = document.getElementsByTagName("script")[0];
        scNode.parentNode.insertBefore(upload, scNode);
    }
}
