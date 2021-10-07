(function() {
    var addluminositybutton = null;


    function addLuminosity() {
        var photo = document.getElementById('photo');
        var canvas = document.getElementById('mycanvas');
        var context = canvas.getContext('2d');

        // Get the CanvasPixelArray from the given coordinates and dimensions.
        x = 0;
        y = 0;
        width = canvas.width;
        height = canvas.height;

        var imgd = context.getImageData(x, y, width, height);
        var pix = imgd.data;


        console.log("height=" + height + ", width=" + width);


        var tr = new Array(width).fill().map(() => Array(height));
        var tg = new Array(width).fill().map(() => Array(height));
        var tb = new Array(width).fill().map(() => Array(height));
        var ta = new Array(width).fill().map(() => Array(height));



        // copie des valeurs
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
                tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
                tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
                ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
            }
        }


        for (var y = 0; y < height; y++) { //FILTRE LUMINOSITÉ
            for (var x = 0; x < width; x++) {
                tr[x][y] = tr[x][y] + 10;
                tg[x][y] = tg[x][y] + 10;
                tb[x][y] = tb[x][y] + 10;

            }
        }


        // RETOUR EN 1D POUR AFFICHER LES MODIFICATIONS
        // 4 tab 2D (r,g,b,a) -> 1 tab 1D POUR METTRE A JOUR L'IMAGE
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                pix[x * 4 + y * (width * 4) + 0] = tr[x][y];
                pix[x * 4 + y * (width * 4) + 1] = tg[x][y];
                pix[x * 4 + y * (width * 4) + 2] = tb[x][y];
                pix[x * 4 + y * (width * 4) + 3] = ta[x][y];
            }
        }

        // Draw the ImageData at the given (x,y) coordinates.
        context.putImageData(imgd, 0, 0);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }


    function afterload() {
        addluminositybutton = document.getElementById('addluminositybutton');

        // ICI je fais le lien entre ma fonction myInert() et l'évenement click du bouton addluminositybutton
        addluminositybutton.addEventListener('click', function(ev) { addLuminosity(); }, false);

    }
    window.addEventListener('load', afterload, false);
})();